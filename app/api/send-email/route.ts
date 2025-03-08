// app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { to, subject, text } = await req.json();

        // Set up the email transporter (use environment variables for sensitive data)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rishish2712@gmail.com', // Set your environment variables
                pass: 'jogezjyewfrssxzj',
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'rishish2712@gmail.com',
            to,
            subject,
            text,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, error: 'Failed to send email' });
    }
}
