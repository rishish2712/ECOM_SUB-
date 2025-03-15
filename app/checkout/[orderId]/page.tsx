'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const OrderPage = ({ params }: { params: { orderId: string } }) => {
    const { orderId } = params;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                const data = await res.json();

                if (data.success) {
                    setOrder(data.order);
                } else {
                    throw new Error(data.message || 'Order not found');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                router.push('/'); 
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId, router]);

    if (loading) return <p>Loading...</p>;

    if (!order) return <p>Order not found.</p>;

    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Order ID: {order._id}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Status: {order.status}</p>
        </div>
    );
};

export default OrderPage;
