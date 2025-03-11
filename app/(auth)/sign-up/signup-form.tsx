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
import { checkUserExists, registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { Separator } from '@/components/ui/separator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { APP_NAME } from '@/lib/constants'

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
  })

  const { control, handleSubmit, setError } = form

  const sendEmail = async (email: string, name: string) => {
    const formData = {
      to: email,
      subject: 'Account Created Successfully',
      text: `Hello ${name},\n\nThank you for signing up for ${APP_NAME}!`,
    }
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!data.success) {
        console.error('Error sending email:', data.error)
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const onSubmit = async (data: IUserSignUp) => {
    try {
      const userExists = await checkUserExists(data.email)
      if (userExists) {
        setError('email', { type: 'manual', message: 'Email already exists' })
        toast.error('Email already exists', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#ff4d4f',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
          },
        })
        return
      }

      const res = await registerUser(data)
      if (!res.success) {
        toast.error('Error while registering', { duration: 3000, position: 'top-center' })
        return
      }

      await signInWithCredentials({ email: data.email, password: data.password })
      await sendEmail(data.email, data.name)
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast.error('Invalid email or password', { duration: 3000, position: 'top-center' })
    }
  }

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
            <Button type='submit'>Sign Up</Button>
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