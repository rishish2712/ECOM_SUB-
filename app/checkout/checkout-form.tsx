'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  calculateFutureDate,
  formatDateTime,
  timeUntilMidnight,
} from '@/lib/utils'
import { ShippingAddressSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CheckoutFooter from './checkout-footer'
import { ShippingAddress } from '@/types'
import useIsMounted from '@/hooks/use-is-mounted'
import Link from 'next/link'
import useCartStore from '@/hooks/use-cart-store'
import ProductPrice from '@/components/shared/product/product-price'
import {
  APP_NAME,
  AVAILABLE_DELIVERY_DATES,
  AVAILABLE_PAYMENT_METHODS,
  DEFAULT_PAYMENT_METHOD,
} from '@/lib/constants'
import { toast } from 'react-hot-toast'
import { createOrder } from '@/lib/actions/order.actions'
import Script from 'next/script'

declare global {
  interface Window {
    Razorpay: any
  }
}


const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter()

  const {
    cart: {
      items,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      shippingAddress,
      deliveryDateIndex,
      paymentMethod = DEFAULT_PAYMENT_METHOD,
    },
    setShippingAddress,
    setPaymentMethod,
    updateItem,
    removeItem,
    setDeliveryDateIndex,
    clearCart
  } = useCartStore()

  const isMounted = useIsMounted()

  const shippingAddressForm = useForm<ShippingAddress>({
    resolver: zodResolver(ShippingAddressSchema),
  })
  const onSubmitShippingAddress: SubmitHandler<ShippingAddress> = (values) => {
    setShippingAddress(values)
    setIsAddressSelected(true)
  }

  useEffect(() => {
    if (!isMounted || !shippingAddress) return
    shippingAddressForm.setValue('fullName', shippingAddress.fullName)
    shippingAddressForm.setValue('street', shippingAddress.street)
    shippingAddressForm.setValue('city', shippingAddress.city)
    shippingAddressForm.setValue('country', shippingAddress.country)
    shippingAddressForm.setValue('postalCode', shippingAddress.postalCode)
    shippingAddressForm.setValue('province', shippingAddress.province)
    shippingAddressForm.setValue('phone', shippingAddress.phone)
    shippingAddressForm.setValue('email', shippingAddress.email)
  }, [items, isMounted, router, shippingAddress, shippingAddressForm])

  const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false)
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] =
    useState<boolean>(false)
  const [isDeliveryDateSelected, setIsDeliveryDateSelected] =
    useState<boolean>(false)


  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const userId = shippingAddress?.fullName; // ✅ Use fullName as userId

      if (!userId) {
        console.error("❌ User name (fullName) is missing.");
        toast.error('Full Name is required to place an order.', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#FF3B30',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
          },
        });
        setIsProcessing(false);
        return;
      }

      const res = await createOrder({
        items,
        shippingAddress,
        expectedDeliveryDate: calculateFutureDate(
          AVAILABLE_DELIVERY_DATES[deliveryDateIndex!].daysToDeliver
        ),
        deliveryDateIndex,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      if (!res.success) {
        toast.error("Cart is empty", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#FF3B30',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
          },
        });
        setIsProcessing(false);
        return;
      }

      // Ensure Razorpay is loaded
      if (typeof window === 'undefined' || !window.Razorpay) {
        console.error('Razorpay SDK not loaded');
        setIsProcessing(false);
        return;
      }

      // Call API to create order in Razorpay
      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId, // ✅ Using Full Name as userId
          amount: Math.round(totalPrice * 100),
          currency: "INR",
          items,
          taxPrice,
          shippingPrice,
          itemsPrice,
          totalPrice,
          paymentMethod,
          shippingAddress: {
            ...shippingAddress,
            email: shippingAddress.email,
          },
          expectedDeliveryDate: calculateFutureDate(
            AVAILABLE_DELIVERY_DATES[deliveryDateIndex!].daysToDeliver
          ),
        }),
      });

      const order = await response.json();
      console.log('API Response:', order);

      if (!order.razorpayOrderId) {
        console.error('Invalid order response:', order);
        throw new Error('Invalid order response');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(totalPrice * 100), // Convert to paise
        currency: "INR",
        name: 'LOKLBIZ',
        description: 'Test Transaction',
        order_id: order.razorpayOrderId,
        handler: async (response: any) => {
          toast.success('Payment Successfully.', {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#000000',
              color: '#FFFFFF',
              fontWeight: 'bold',
              padding: '12px',
              borderRadius: '8px',
            },
          });
        },
        prefill: {
          name: userId,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#007bff',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      try {
        const htmlContent = `
          <body style="padding: 20px; text-align: center; background-color: #f4f4f4;">
    <div style="max-width: 500px; background: white; padding: 20px; margin: auto; border-radius: 8px; 
                box-shadow: 0px 0px 10px rgba(0,0,0,0.1); text-align: center;">
      
      <div style="display: flex; justify-content: center;">
        <img src="cid:logo" alt="Company Logo" style="width: auto; hight: auto; border-radius: 50%;">
      </div>
  
      <h2 style="color: #28a745;">✅ Payment Successful! ✅</h2>
  
      <p style="font-size: 16px; color: #555;">Hello,</p>
      
      <p style="font-size: 16px; color: #555;">
        Your payment of <strong>₹${totalPrice}</strong> has been successfully processed.
      </p>
  
      <p style="font-size: 16px; color: #555;">
        Your order 
        <p>
        <strong>
        Your order includes (${items.length} items):<br>
${items.map((item, index) => `${index + 1}. ${item.name}`).join("<br>")}</strong>
  </p> is now confirmed and will be shipped soon.
      </p>
  
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders/" 
         style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; 
                background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">
        View Order Details
      </a>
  
      <p style="font-size: 14px; color: #777; margin-top: 20px;">
        If you have any questions regarding your order, please contact our support team.
      </p>
  
      <hr style="border: none; border-top: 1px solid #ddd;">
  
      <p style="font-size: 14px; color: #999;">
        Thank you for shopping with <strong>LOKLBIZ</strong>!  
      </p>
  
      <p style="font-size: 14px; color: #999;">
        Need help? Contact us at <a href="mailto:hamarabusiness24@gmail.com" style="color: #007bff;">Customer Support</a>.
      </p>
    </div>
  </body>
  
        `;

        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: shippingAddress?.email,
            subject: 'Payment Successful ',
            text: 'We have successfully Placed Your Order!',
            html: htmlContent,
          }),
        });

        const data = await res.json();
        if (!data.success) {
          console.error('Error sending email:', data.error);
        }
        clearCart();
        router.push('/')
      } catch (error) {
        console.error('Error sending email:', error);
      }


    } catch (error) {
      console.error('❌ Payment failed:', error);
      toast.error('Payment Failed', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#FF3B30',
          color: '#fff',
          fontWeight: 'bold',
          padding: '12px',
          borderRadius: '8px',
        },
      });
    }


    setIsProcessing(false);



  };

  const handleSelectPaymentMethod = () => {
    setIsAddressSelected(true)
    setIsPaymentMethodSelected(true)
  }
  const handleSelectShippingAddress = () => {
    shippingAddressForm.handleSubmit(onSubmitShippingAddress)()
  }
  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        {!isAddressSelected && (
          <div className='border-b mb-4'>
            <Button
              className='rounded-full w-full bg-amber-300 hover:bg-amber-400'
              onClick={handleSelectShippingAddress}
            >
              Ship to this address
            </Button>
            <p className='text-xs text-center py-2'>
              Choose a shipping address and payment method in order to calculate
              shipping, handling, and tax.
            </p>
          </div>
        )}
        {isAddressSelected && !isPaymentMethodSelected && (
          <div className=' mb-4'>
            <Button
              className='rounded-full w-full bg-amber-300 hover:bg-amber-400'
              onClick={handleSelectPaymentMethod}
            >
              Use this payment method
            </Button>

            <p className='text-xs text-center py-2'>
              Choose a payment method to continue checking out. You&apos;ll
              still have a chance to review and edit your order before it&apos;s
              final.
            </p>
          </div>
        )}
        {isPaymentMethodSelected && isAddressSelected && (
          <div>
            <Button onClick={handlePlaceOrder} className='rounded-full w-full bg-amber-300 hover:bg-amber-400'>
              Place Your Order
            </Button>
            <p className='text-xs text-center py-2'>
              By placing your order, you agree to {APP_NAME}&apos;s{' '}
              <Link href='/page/privacy-policy'>privacy notice</Link> and
              <Link href='/page/conditions-of-use'> conditions of use</Link>.
            </p>
          </div>
        )}

        <div>
          <div className='text-lg font-bold'>Order Summary</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping & Handling:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice === 0 ? (
                  'FREE'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span> Tax:</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between  pt-4 font-bold text-lg'>
              <span> Order Total:</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto highlight-link'>
      <Script src='http://checkout.razorpay.com/v1/checkout.js' />
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* shipping address */}
          <div>
            {isAddressSelected && shippingAddress ? (
              <div className='grid grid-cols-1 md:grid-cols-12    my-3  pb-3'>
                <div className='col-span-5 flex text-lg font-bold '>
                  <span className='w-8'>1 </span>
                  <span>Shipping address</span>
                </div>
                <div className='col-span-5 '>
                  <p>
                    {shippingAddress.fullName} <br />
                    {shippingAddress.street} <br />
                    {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                  </p>
                </div>
                <div className='col-span-2'>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      setIsAddressSelected(false)
                      setIsPaymentMethodSelected(true)
                      setIsDeliveryDateSelected(true)
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className='flex text-primary text-lg font-bold my-2'>
                  <span className='w-8'>1 </span>
                  <span>Enter shipping address</span>
                </div>
                <Form {...shippingAddressForm}>
                  <form
                    method='post'
                    onSubmit={shippingAddressForm.handleSubmit(
                      onSubmitShippingAddress
                    )}
                    className='space-y-4'
                  >
                    <Card className='md:ml-8 my-4'>
                      <CardContent className='p-4 space-y-2'>
                        <div className='text-lg font-bold mb-2'>
                          Your address
                        </div>

                        <div className='flex flex-col gap-5 md:flex-row'>
                          <FormField
                            control={shippingAddressForm.control}
                            name='fullName'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Enter full name'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={shippingAddressForm.control}
                            name='street'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Enter address'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <FormField
                            control={shippingAddressForm.control}
                            name='city'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder='Enter city' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='province'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Enter province'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='country'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Enter country'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <FormField
                            control={shippingAddressForm.control}
                            name='postalCode'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Enter postal code'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='phone'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Enter phone number'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='email'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder='Enter email' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className='  p-4'>
                        <Button
                          type='submit'
                          className='rounded-full font-bold bg-amber-300 hover:bg-amber-400'
                        >
                          Ship to this address
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Form>
              </>
            )}
          </div>
          {/* payment method */}
          <div className='border-y'>
            {isPaymentMethodSelected && paymentMethod ? (
              <div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
                <div className='flex text-lg font-bold  col-span-5'>
                  <span className='w-8'>2 </span>
                  <span>Payment Method</span>
                </div>
                <div className='col-span-5 '>
                  <p>{paymentMethod}</p>
                </div>
                <div className='col-span-2'>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setIsPaymentMethodSelected(false)
                      if (paymentMethod) setIsDeliveryDateSelected(true)
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : isAddressSelected ? (
              <>
                <div className='flex text-primary text-lg font-bold my-2'>
                  <span className='w-8'>2 </span>
                  <span>Choose a payment method</span>
                </div>
                <Card className='md:ml-8 my-4'>
                  <CardContent className='p-4'>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value)}
                    >
                      {AVAILABLE_PAYMENT_METHODS.map((pm) => (
                        <div key={pm.name} className='flex items-center py-1 '>
                          <RadioGroupItem
                            value={pm.name}
                            id={`payment-${pm.name}`}
                          />
                          <Label
                            className='font-bold pl-2 cursor-pointer'
                            htmlFor={`payment-${pm.name}`}
                          >
                            {pm.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className='p-4'>
                    <Button
                      onClick={handleSelectPaymentMethod}
                      className='rounded-full font-bold bg-amber-300 hover:bg-amber-400'
                    >
                      Use this payment method
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ) : (
              <div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
                <span className='w-8'>2 </span>
                <span>Choose a payment method</span>
              </div>
            )}
          </div>
          {/* items and delivery date */}
          <div>
            {isDeliveryDateSelected && deliveryDateIndex != undefined ? (
              <div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
                <div className='flex text-lg font-bold  col-span-5'>
                  <span className='w-8'>3 </span>
                  <span>Items and shipping</span>
                </div>
                <div className='col-span-5'>
                  <p>
                    Delivery date:{' '}
                    {
                      formatDateTime(
                        calculateFutureDate(
                          AVAILABLE_DELIVERY_DATES[deliveryDateIndex]
                            .daysToDeliver
                        )
                      ).dateOnly
                    }
                  </p>
                  <ul>
                    {items.map((item, _index) => (
                      <li key={_index}>
                        {item.name} x {item.quantity} = {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='col-span-2'>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      setIsPaymentMethodSelected(true)
                      setIsDeliveryDateSelected(false)
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : isPaymentMethodSelected && isAddressSelected ? (
              <>
                <div className='flex text-primary  text-lg font-bold my-2'>
                  <span className='w-8'>3 </span>
                  <span>Review items and shipping</span>
                </div>
                <Card className='md:ml-8'>
                  <CardContent className='p-4'>
                    <p className='mb-2'>
                      <span className='text-lg font-bold text-green-700'>
                        Arriving{' '}
                        {
                          formatDateTime(
                            calculateFutureDate(
                              AVAILABLE_DELIVERY_DATES[deliveryDateIndex!]
                                .daysToDeliver
                            )
                          ).dateOnly
                        }
                      </span>{' '}
                      If you order in the next {timeUntilMidnight().hours} hours
                      and {timeUntilMidnight().minutes} minutes.
                    </p>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        {items.map((item, _index) => (
                          <div key={_index} className='flex gap-4 py-2'>
                            <div className='relative w-16 h-16'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes='20vw'
                                style={{
                                  objectFit: 'contain',
                                }}
                              />
                            </div>

                            <div className='flex-1'>
                              <p className='font-semibold'>
                                {item.name}, {item.color}, {item.size}
                              </p>
                              <p className='font-bold'>
                                <ProductPrice price={item.price} plain />
                              </p>

                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => {
                                  if (value === '0') removeItem(item)
                                  else updateItem(item, Number(value))
                                }}
                              >
                                <SelectTrigger className='w-24'>
                                  <SelectValue>
                                    Qty: {item.quantity}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent position='popper'>
                                  {Array.from({
                                    length: item.countInStock,
                                  }).map((_, i) => (
                                    <SelectItem key={i + 1} value={`${i + 1}`}>
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                  <SelectItem key='delete' value='0'>
                                    Delete
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className=' font-bold'>
                          <p className='mb-2'> Choose a shipping speed:</p>

                          <ul>
                            <RadioGroup
                              value={
                                AVAILABLE_DELIVERY_DATES[deliveryDateIndex!]
                                  .name
                              }
                              onValueChange={(value) =>
                                setDeliveryDateIndex(
                                  AVAILABLE_DELIVERY_DATES.findIndex(
                                    (address) => address.name === value
                                  )!
                                )
                              }
                            >
                              {AVAILABLE_DELIVERY_DATES.map((dd) => (
                                <div key={dd.name} className='flex'>
                                  <RadioGroupItem
                                    value={dd.name}
                                    id={`address-${dd.name}`}
                                  />
                                  <Label
                                    className='pl-2 space-y-2 cursor-pointer'
                                    htmlFor={`address-${dd.name}`}
                                  >
                                    <div className='text-green-700 font-semibold'>
                                      {
                                        formatDateTime(
                                          calculateFutureDate(dd.daysToDeliver)
                                        ).dateOnly
                                      }
                                    </div>
                                    <div>
                                      {(dd.freeShippingMinPrice > 0 &&
                                        itemsPrice >= dd.freeShippingMinPrice
                                        ? 0
                                        : dd.shippingPrice) === 0 ? (
                                        'FREE Shipping'
                                      ) : (
                                        <ProductPrice
                                          price={dd.shippingPrice}
                                          plain
                                        />
                                      )}
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
                <span className='w-8'>3 </span>
                <span>Items and shipping</span>
              </div>
            )}
          </div>
          {isPaymentMethodSelected && isAddressSelected && (
            <div className='mt-6'>
              <div className='block md:hidden'>
                <CheckoutSummary />
              </div>

              <Card className='hidden md:block '>
                <CardContent className='p-4 flex flex-col md:flex-row justify-between items-center gap-3'>
                  <Button onClick={handlePlaceOrder} className='rounded-full bg-amber-300 hover:bg-amber-400'>
                    {isProcessing ? 'Processing...' : 'Place Your Order'}
                  </Button>
                  <div className='flex-1'>
                    <p className='font-bold text-lg'>
                      Order Total: <ProductPrice price={totalPrice} plain />
                    </p>
                    <p className='text-xs'>
                      {' '}
                      By placing your order, you agree to {APP_NAME}&apos;s{' '}
                      <Link href='/page/privacy-policy'>privacy notice</Link>{' '}
                      and
                      <Link href='/page/conditions-of-use'>
                        {' '}
                        conditions of use
                      </Link>
                      .
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <CheckoutFooter />
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
export default CheckoutForm
