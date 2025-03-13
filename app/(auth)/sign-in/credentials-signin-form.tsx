'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { IUserSignIn } from '@/types';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSignInSchema } from '@/lib/validator';
import { APP_NAME } from '@/lib/constants';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
  });

  const { control, handleSubmit } = form;

  // Function to send an email after login success
  const sendEmail = async (email: string) => {
    const resetToken = uuidv4()
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    try {
      const htmlContent = `
        <body style="padding: 20px; text-align: center;">
          <div style="max-width: 500px; background: white; padding: 20px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); text-align: center;">
          <div style="display: flex; justify-content: center;">
            <img src=" " alt="User Avatar" style="width: 60px; border-radius: 50%;">
          </div>
            <h2 style="color: #333;">🎉 Login Successful! 🎉</h2>
            <p style="font-size: 16px; color: #555;">Hello,</p>
            <p style="font-size: 16px; color: #555;">
              You have successfully logged in to your account. If this was not you, please secure your account immediately.
            </p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Secure My Account
            </a>
            <p style="font-size: 14px; color: #777; margin-top: 20px;">
              If you didn't request this login, please change your password immediately to secure your account.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 14px; color: #999;">
              This is an automated message. If you have any concerns, contact our support team at
              <a href="mailto:hamarabusiness24@gmail.com" style="color: #007bff;">LOKLBIZ</a>.
            </p>
          </div>
        </body>
      `;

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Login Success',
          text: 'You have successfully logged in!',
          html: htmlContent,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Error sending email:', data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const onSubmit = async (data: IUserSignIn) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await signInWithCredentials({
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error('Login failed! Please try again.', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#FF3B30',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
          },
        });
      } else {
        toast.success('Successfully logged in!', {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
          },
        });

        // Send email after successful login
        await sendEmail(data.email);

        // Delay before redirecting
        setTimeout(() => {
          router.push(callbackUrl);
        }, 3000);
      }
    } catch (error) {
      toast.error('Invalid Email or Password', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#FF3B30',
          color: '#fff',
          fontWeight: 'bold',
          padding: '12px',
          borderRadius: '8px',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="text-sm">
            By signing in, you agree to {APP_NAME}&apos;s{' '}
            <Link href="/page/conditions-of-use">Conditions of Use</Link> and{' '}
            <Link href="/page/privacy-policy">Privacy Notice.</Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
