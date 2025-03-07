import sgMail from '@sendgrid/mail';
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

export default async function emailsend() {
    // Set the SendGrid API key
    const ApiKey = process.env.SENDGRID_API_KEY;

    sgMail.setApiKey('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')

    const msg = {
        to: 'happy7singh1@gmail.com',
        from: 'singhhappy0701@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    try {
        // Send email using the SendGrid API
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
