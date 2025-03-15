import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components'
  
  import { formatCurrency } from '@/lib/utils'
  import { IOrder } from '@/lib/db/models/order.model'
  import { SERVER_URL } from '@/lib/constants'
  
  type OrderInformationProps = {
    order: IOrder
  }
  
  // ✅ Fix: Ensure `createdAt` exists in the preview
  PurchaseReceiptEmail.PreviewProps = {
    order: {
      _id: '123',
      isPaid: true,
      paidAt: new Date(),
      createdAt: new Date(), // ✅ Fix: Add `createdAt`
      totalPrice: 100,
      itemsPrice: 100,
      taxPrice: 0,
      shippingPrice: 0,
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      shippingAddress: {
        fullName: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        postalCode: '12345',
        country: 'USA',
        phone: '123-456-7890',
        province: 'New York',
      },
      items: [
        {
          clientId: '123',
          name: 'Product 1',
          image: 'https://via.placeholder.com/150',
          price: 100,
          quantity: 1,
          product: '123',
          slug: 'product-1',
          category: 'Category 1',
          countInStock: 10,
        },
      ],
      paymentMethod: 'Razorpay', // ✅ Changed to Razorpay
      expectedDeliveryDate: new Date(),
      isDelivered: true,
    } as IOrder,
  } satisfies OrderInformationProps
  
  const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
  
  // ✅ Fix: Remove `async`
  export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
    return (
      <Html>
        <Preview>View order receipt</Preview>
        <Tailwind>
          <Head />
          <Body className="font-sans bg-white">
            <Container className="max-w-xl">
              <Heading>Purchase Receipt</Heading>
              <Section>
                <Row>
                  <Column>
                    <Text className="mb-0 text-gray-500">Order ID</Text>
                    <Text className="mt-0">{order._id}</Text>
                  </Column>
                  <Column>
                    <Text className="mb-0 text-gray-500">Purchased On</Text>
                    <Text className="mt-0">{dateFormatter.format(order.createdAt)}</Text>
                  </Column>
                  <Column>
                    <Text className="mb-0 text-gray-500">Price Paid</Text>
                    <Text className="mt-0">{formatCurrency(order.totalPrice)}</Text>
                  </Column>
                </Row>
              </Section>
  
              {/* ✅ Order Items Section */}
              <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
                {order.items.map((item) => (
                  <Row key={item.product} className="mt-8">
                    <Column className="w-20">
                      <Img
                        width="80"
                        alt={item.name}
                        className="rounded"
                        src={item.image.startsWith('/') ? `${SERVER_URL}${item.image}` : item.image}
                      />
                    </Column>
                    <Column className="align-top">
                      <Text className="mx-2 my-0">
                        {item.name} x {item.quantity}
                      </Text>
                    </Column>
                    <Column align="right" className="align-top">
                      <Text className="m-0">{formatCurrency(item.price)}</Text>
                    </Column>
                  </Row>
                ))}
  
                {/* ✅ Order Summary */}
                {[
                  { name: 'Items', price: order.itemsPrice },
                  { name: 'Tax', price: order.taxPrice },
                  { name: 'Shipping', price: order.shippingPrice },
                  { name: 'Total', price: order.totalPrice },
                ].map(({ name, price }) => (
                  <Row key={name} className="py-1">
                    <Column align="right">{name}:</Column>
                    <Column align="right" width={70} className="align-top">
                      <Text className="m-0">{formatCurrency(price)}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    )
  }
  