'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
});

export default function ForgotPassword() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email }),
            });

            const response = await res.json();
            if (response.success) {
                toast.success('Reset link sent to your email!', { position: 'top-center' });
            } else {
                toast.error(response.message || 'Something went wrong!', { position: 'top-center' });
            }
        } catch (error) {
            toast.error('Network error. Try again.', { position: 'top-center' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <p className="text-gray-600 mb-4">Enter your email to receive a password reset link.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm font-medium"/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
            </Form>
            <div className="mt-4 text-center">
                <Link href="/sign-in" className="text-blue-600 hover:underline">Back to Sign In</Link>
            </div>
        </div>
    );
}
