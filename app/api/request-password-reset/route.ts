import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import IUser from '@/lib/db/models/user.model';


export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }


    await connectToDatabase();


    const user = await IUser.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }


    const resetToken = uuidv4();

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Reset Your Password',
        text: 'Click the link to reset your password',
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
    <h2>🔒 Reset Your Password</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Use the code below to proceed:</p>
    <h3 style="color: blue; font-size: 24px;">${resetToken}</h3>
    <p>Or click the button below:</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}"
       style="display: inline-block; padding: 12px 24px; color: white; background-color: #007bff; 
              text-decoration: none; border-radius: 6px; font-weight: bold;">
      Reset Password
    </a>
    <p>If you didn't request this, please ignore this email.</p>
  </div>
`,
      }),
    });


    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Failed to send email:", errorText);
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: emailResponse.status });
    }

    return NextResponse.json({ success: true, message: 'Password reset email sent!' });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
