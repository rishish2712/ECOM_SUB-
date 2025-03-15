import { NextResponse } from 'next/server';
import Order from '@/lib/db/models/order.model';
import { connectToDatabase } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
    await connectToDatabase();

    try {
        const order = await Order.findById(params.orderId);
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
