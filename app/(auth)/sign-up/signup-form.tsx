'use client'
import { redirect, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IUserSignUp } from '@/types'
import { checkUserExists, registerUser } from '@/lib/actions/user.actions'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { Separator } from '@/components/ui/separator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { APP_NAME } from '@/lib/constants'
import { useState } from 'react'


export default function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
  })

  const { control, handleSubmit, setError } = form

  const onSubmit = async (data: IUserSignUp) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userExists = await checkUserExists(data.email);
      if (userExists) {
        setError('email', { type: 'manual', message: 'Email already exists' });
        toast.error('Email already exists', { duration: 3000, position: 'top-center' });
        return;
      }

      const res = await registerUser(data);
      if (!res.success) {
        toast.error('Error while registering', { duration: 3000, position: 'top-center' });
        return;
      }

      // ✅ Store email & temp password in sessionStorage for verification step
      sessionStorage.setItem('tempPassword', data.password);
      localStorage.setItem('signupEmail', data.email);

      // ✅ Send verification code
      const verifyRes = await fetch('/api/sendVerificationCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        toast.error('Failed to send verification code', { duration: 3000, position: 'top-center' });
        return;
      }

      toast.success('Verification code sent to your email', { duration: 3000, position: 'top-center' });

      // ✅ Redirect to verify page
      redirect(`/verify?email=${data.email}`);

    } catch (error) {
      if (isRedirectError(error)) throw error;
      toast.error('Something went wrong', { duration: 3000, position: 'top-center' });
    }
    finally {
      setIsSubmitting(false);
    }
  };



  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div className='space-y-6'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email' {...field} />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Enter password' {...field} />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Confirm Password' {...field} />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-sm" />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </div>
          <div className='text-sm'>
            By creating an account, you agree to {APP_NAME}&apos;s{' '}
            <Link href='/page/conditions-of-use'>Conditions of Use</Link> and{' '}
            <Link href='/page/privacy-policy'> Privacy Notice. </Link>
          </div>
          <Separator className='mb-4' />
          <div className='text-sm'>
            Already have an account?{' '}
            <Link className='link' href={`/sign-in?callbackUrl=${callbackUrl}`}>
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}

