import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verificationCodes } from '@/lib/verificationStore';

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, verificationCode);

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
        });

        console.log(' Email sent successfully to', email);
        return NextResponse.json({ success: true, message: 'Verification code sent' });
    } catch (error) {
        console.error(' Error sending email:', error);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
