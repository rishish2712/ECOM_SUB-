'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { createRazorpayOrder, approveRazorpayPayment } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'

export default function OrderPaymentForm({
  order,
  razorpayKey,
}: {
  order: IOrder
  razorpayKey: string
}) {
  const router = useRouter()
  const { toast } = useToast()

  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    expectedDeliveryDate,
    isPaid,
  } = order

  if (isPaid) {
    router.push(`/account/orders/${order._id}`)
    return null
  }

  const handleRazorpayPayment = async () => {
    try {
      // 1. Create an order on the backend
      const res = await createRazorpayOrder(order._id)
      if (!res.success) {
        return toast({ description: res.message, variant: 'destructive' })
      }

      const { razorpay_order_id, amount, currency } = res.data

      // 2. Open Razorpay modal
      const options = {
        key: razorpayKey,
        amount,
        currency,
        name: 'My Store',
        description: `Order #${order._id}`,
        order_id: razorpay_order_id,
        handler: async (response: any) => {
          const approveRes = await approveRazorpayPayment(order._id, response)
          toast({
            description: approveRes.message,
            variant: approveRes.success ? 'default' : 'destructive',
          })

          if (approveRes.success) {
            router.push(`/account/orders/${order._id}`)
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: order.user?.email || '',
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Razorpay Error:', error)
      toast({ description: 'Payment failed. Please try again.', variant: 'destructive' })
    }
  }

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
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
                {shippingPrice === undefined ? '--' : shippingPrice === 0 ? 'FREE' : <ProductPrice price={shippingPrice} plain />}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Tax:</span>
              <span>
                {taxPrice === undefined ? '--' : <ProductPrice price={taxPrice} plain />}
              </span>
            </div>
            <div className='flex justify-between pt-1 font-bold text-lg'>
              <span>Order Total:</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>

            {!isPaid && paymentMethod === 'Razorpay' && (
              <Button className='w-full rounded-full' onClick={handleRazorpayPayment}>
                Pay with Razorpay
              </Button>
            )}

            {!isPaid && paymentMethod === 'Cash On Delivery' && (
              <Button className='w-full rounded-full' onClick={() => router.push(`/account/orders/${order._id}`)}>
                View Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Shipping Address */}
          <div>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Shipping Address</span>
              </div>
              <div className='col-span-2'>
                <p>
                  {shippingAddress.fullName} <br />
                  {shippingAddress.street} <br />
                  {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='border-y'>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Payment Method</span>
              </div>
              <div className='col-span-2'>
                <p>{paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>
              <span>Items and Shipping</span>
            </div>
            <div className='col-span-2'>
              <p>Delivery date: {formatDateTime(expectedDeliveryDate).dateOnly}</p>
              <ul>
                {items.map((item) => (
                  <li key={item.slug}>
                    {item.name} x {item.quantity} = {item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='block md:hidden'>
            <CheckoutSummary />
          </div>
        </div>

        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
