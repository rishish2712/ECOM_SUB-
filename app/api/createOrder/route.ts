import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToDatabase } from '@/lib/db';
import Order from '@/lib/db/models/order.model';
import mongoose from 'mongoose';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const {
      amount,
      currency,
      userId,
      items,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice,
      paymentMethod,
      expectedDeliveryDate,
      shippingAddress } = await req.json();

    console.log("Received Order Request:", {
      amount,
      currency,
      userId,
      items,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice,
      paymentMethod,
      expectedDeliveryDate,
      shippingAddress
    })

    if (!amount || !userId) {
      return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
    }


    let userObjectId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userObjectId = new mongoose.Types.ObjectId(userId);
    } else {
      userObjectId = new mongoose.Types.ObjectId(); // Creates a dummy ObjectId
    }



    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount,
        currency: currency || 'INR',
        receipt: `order_rcptid_${Date.now()}`,
        payment_capture: false,
      });
    } catch (error) {
      console.error("❌ Razorpay Order Creation Failed:", error);
      return NextResponse.json({ success: false, message: 'Error creating Razorpay order' }, { status: 500 });
    }

    if (!razorpayOrder || !razorpayOrder.id) {
      return NextResponse.json({ success: false, message: 'Invalid order response' }, { status: 500 });
    }

    // Save order in database
    try {
      const newOrder = await Order.create({
        user: userObjectId,
        items,
        totalAmount: amount * 100,
        taxPrice,
        shippingPrice,
        itemsPrice,
        totalPrice,
        paymentMethod,
        expectedDeliveryDate,
        shippingAddress,
        paymentStatus: 'pending',
        razorpayOrderId: razorpayOrder.id,
      });


      return NextResponse.json({
        success: true,
        orderId: newOrder._id,
        razorpayOrderId: razorpayOrder.id
      }, { status: 201 });

    } catch (error) {
      console.error("❌ Database save failed:", error);
      return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
    }

  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ success: false, message: "Error creating order" }, { status: 500 });
  }
}
