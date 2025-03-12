import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';
import { connectToDatabase } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      toast.error('Email required', { position: 'top-center' })
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const user = await db.user.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const resetToken = uuidv4();

    // Construct reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Call the send-email API
    const res = await fetch("http://localhost:3000/api/send-email", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Reset Your Password',
        text: 'Click the link to reset your password',
        html: `<div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; 
                    background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>If you didn’t request this, you can ignore this email.</p>
        </div>
      `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text(); // Get raw response text for debugging
      console.error("Failed to send email:", errorText);
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: res.status });
    }

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Password reset email sent!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
