'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signInWithCredentials } from '@/lib/actions/user.actions'

const VerifyPage = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isResending, setIsResending] = useState(false);
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('signupEmail');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    // Handle verification
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);

        const res = await fetch('/api/verifyCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, verificationCode }),
        });

        const data = await res.json();

        if (data.success) {
            toast.success(' Verification successful!', { duration: 3000, position: 'top-center' });

            const tempPassword = sessionStorage.getItem('tempPassword');
            if (tempPassword) {
                await signInWithCredentials({
                    email,
                    password: tempPassword,
                });

                sessionStorage.removeItem('tempPassword');
            }


        } else {
            toast.error(' Invalid verification code!', { duration: 3000, position: 'top-center' });
        }
    };

    // Handle resend verification code
    const handleResendCode = async () => {
        if (!email) {
            toast.error(' Please enter your email first.', { duration: 3000, position: 'top-center' });
            return;
        }

        setIsResending(true);

        try {
            const res = await fetch('/api/sendVerificationCode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(' Verification code sent!', { duration: 3000, position: 'top-center' });
            } else {
                toast.error(' Failed to resend code. Try again.', { duration: 3000, position: 'top-center' });
            }
        } catch (error) {
            toast.error(' Error sending code!', { duration: 3000, position: 'top-center' });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center mb-4">Enter Verification Code</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Verification Code</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Verify
                    </button>
                </form>

                <button
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition disabled:opacity-50"
                >
                    {isResending ? 'Resending...' : 'Resend Code'}
                </button>
            </div>
        </div>
    );
};

export default VerifyPage;
