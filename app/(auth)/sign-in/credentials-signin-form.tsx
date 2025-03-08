'use client';
import { redirect, useSearchParams } from 'next/navigation';
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
import Toast from '@/components/ui/credentials_valiadate';

export default function LoginPage() {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: IUserSignIn) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set submitting state to true

    try {
      const res = await signInWithCredentials({
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        // Handle failure case
        setToastMessage('Invalid email or password');
        setIsToastVisible(true);
        setIsSubmitting(false);
      } else {
        // Handle success
        setToastMessage('Successfully logged in!');
        setIsToastVisible(true);

        // Send an email on successful login
        await sendEmail(data.email);

        // Use a delay before redirecting to ensure the toast message is visible
        setTimeout(() => {
          redirect(callbackUrl);
        }, 3000); // Delay the redirection to show the success message for 3 seconds
      }
    } catch (error) {
      // Handle error case
      setToastMessage('Invalid Email or Password');
      setIsToastVisible(true);
      setIsSubmitting(false);
    }
  };

  // Function to send an email
  const sendEmail = async (email: string) => {
    const formData = {
      to: email,  // Use the email from the data
      subject: 'Login Success',
      text: 'You have successfully logged in!',
    };

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
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

            <div>
              <Button type="submit" disabled={isSubmitting}> {/* Disable submit button if submitting */}
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
            <div className="text-sm">
              By signing in, you agree to {APP_NAME}&apos;s{' '}
              <Link href="/page/conditions-of-use">Conditions of Use</Link> and{' '}
              <Link href="/page/privacy-policy">Privacy Notice.</Link>
            </div>
          </div>
        </form>
      </Form>

      {/* Toast component */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </>
  );
}
