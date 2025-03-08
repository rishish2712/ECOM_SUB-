// File: /app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define an interface for the body structure
interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
}

export async function POST(req: Request) {
    try {
        const text = await req.text(); // Read the body as text
        let body: EmailRequestBody = { to: '', subject: '', text: '' }; // Default value

        if (text) {
            body = JSON.parse(text);  // Parse the text into the body manually
        }

        console.log('Received request body:', body);

        // Destructure the expected fields with type safety
        const { to, subject, text: emailText } = body;

        if (!to || !subject || !emailText) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to,
            subject,
            text: emailText,
        };

        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
