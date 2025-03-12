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
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Login Success',
          text: 'You have successfully logged in!',
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
