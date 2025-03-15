import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Define an interface for the body structure
interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
    html?: string; // ✅ Made optional
}

export async function POST(req: Request) {
    try {
        const text = await req.text(); // Read the body as text
        let body: EmailRequestBody = { to: '', subject: '', text: '' }; // Default value

        if (text) {
            body = JSON.parse(text);
        }

        // Destructure the expected fields with type safety
        const { to, subject, text: emailText, html } = body;

        if (!to || !subject || !emailText) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS, // Ensure this is set in your .env.local file
            },
        });

        const mailOptions: any = {
            from: process.env.EMAIL_ID,
            to,
            subject,
            text: emailText,
        };

        // ✅ Include HTML only if provided
        if (html) {
            mailOptions.html = html;
        }

        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully!', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
