'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type OrderPageParams = {
    orderId: string;
};

// Core fix: Explicit type assertion
export default function OrderPage({
    params
}: {
    params: OrderPageParams
} & { params: any }) { // Double type assertion
    const { orderId } = params as OrderPageParams;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
                setOrder(await res.json());
            } catch (error) {
                console.error('Fetch error:', error);
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId, router]);

    if (loading) return <p>Loading...</p>;
    if (!order) return <p>Order not found</p>;

    return (
        <div>
            <h1>Order #{order._id}</h1>
            <p>Total: ₹{order.totalPrice}</p>
            <p>Status: {order.status}</p>
        </div>
    );
}