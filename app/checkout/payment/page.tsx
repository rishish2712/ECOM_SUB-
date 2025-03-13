'use client';

import { useState } from 'react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PaymentPage = () => {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/createOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount * 100, currency: 'INR' }), // Convert to paise
            });

            const order = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Your E-Commerce Store',
                description: 'Test Transaction',
                order_id: order.id,
                handler: async (response: any) => {
                    alert('Payment Successful');
                    console.log(response);
                },
                prefill: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#007bff',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment failed', error);
            alert('Payment failed. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center mb-4">Complete Your Payment</h1>
                <input
                    type="number"
                    placeholder="Enter Amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
