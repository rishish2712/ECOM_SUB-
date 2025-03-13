import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db'; // Ensure this connects with Mongoose
import { v4 as uuidv4 } from 'uuid';
import IUser from '@/lib/db/models/user.model';


export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // ✅ Connect to the database
    await connectToDatabase();

    // ✅ Find user in the database
    const user = await IUser.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // ✅ Generate password reset token
    const resetToken = uuidv4();

    // ✅ Save token in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // ✅ Construct reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // ✅ Call the send-email API
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Reset Your Password',
        text: 'Click the link to reset your password',
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
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

    // ✅ Check if email was sent successfully
    if (!emailResponse.ok) {
      const errorText = await emailResponse.text(); // Get error details
      console.error("Failed to send email:", errorText);
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: emailResponse.status });
    }

    return NextResponse.json({ success: true, message: 'Password reset email sent!' });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
