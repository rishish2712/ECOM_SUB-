import { NextResponse } from 'next/server';
import { verificationCodes } from '@/lib/verificationStore';

export async function POST(req: Request) {
    const { email, verificationCode } = await req.json();

    if (!email || !verificationCode) {
        return NextResponse.json({ error: 'Email and verification code are required' }, { status: 400 });
    }

    const storedCode = verificationCodes.get(email);

    console.log(` Checking verification for email: ${email}`);
    console.log(` Entered Code: ${verificationCode}`);
    console.log(` Stored Code: ${storedCode}`);

    if (storedCode && storedCode === verificationCode) {
        verificationCodes.delete(email); // Delete code after successful verification
        console.log(` Verification successful for ${email}`);
        return NextResponse.json({ success: true, message: 'Verification successful' });
    } else {
        console.log(` Invalid verification attempt for ${email}`);
        return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }
}


