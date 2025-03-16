import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verificationCodes } from '@/lib/verificationStore';

export async function POST(req: Request) {

  const { email } = await req.json();
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes.set(email, verificationCode);

  const htmlContent = `
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
        <div style="max-width: 500px; background: white; padding: 20px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); text-align: center;">
          <div style="display: flex; justify-content: center;">
            <img src="cid:logo" alt="User Avatar" style="width: 60px; border-radius: 50%;">
          </div>
          <h2 style="color: #333;">🔒 Verify Your Email</h2>
          <p style="font-size: 16px; color: #555;">Hello,</p>
          <p style="font-size: 16px; color: #555;">
            Thank you for signing up! Please enter the following verification code to activate your account:
          </p>
          <h2 style="font-size: 22px; font-weight: bold; color: #007bff;">${verificationCode}</h2>
          <p style="font-size: 14px; color: #777;">
            If you didn't sign up for an account, please ignore this email.
          </p>
          <p style="font-size: 12px; color: #999;">
            If you need help, contact our support team at
            <a href="mailto:hamarabusiness24@gmail.com" style="color: #007bff;">LOKLBIZ</a>.
          </p>
      </body>
    `;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }



  console.log(` Verification code generated for ${email}: ${verificationCode}`);
  console.log(' Current verification codes:', Object.fromEntries(verificationCodes));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}`,
      html: htmlContent,
    });

    console.log(' Email sent successfully to', email);
    return NextResponse.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error(' Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
