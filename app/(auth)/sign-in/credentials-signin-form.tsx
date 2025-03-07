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
import { IUserSignIn } from '@/types'
import { signInWithCredentials } from '@/lib/actions/user.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignInSchema } from '@/lib/validator'
import { APP_NAME } from '@/lib/constants'
import { useState, useEffect } from 'react'

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
      email: '',
      password: '',
    }
    : ''

export default function CredentialsSignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
  })

  const { control, handleSubmit } = form
  const [error, setError] = useState("")
  const [showerror, setshowerror] = useState(false)

  const onSubmit = async (data: IUserSignIn) => {
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      })
      setError("SignIn Successfully")
      setshowerror(true)
      redirect(callbackUrl)
    } catch (error) {
      setError("Invalid email or password");
      setshowerror(true)
    }
  }


  useEffect(() => {
    if (showerror) {
      const timer = setTimeout(() => {
        setshowerror(false)
      }, 2000) // Hide the error after 4 seconds
      return () => clearTimeout(timer) // Cleanup the timer on component unmount
    }
  }, [showerror])


  return (
    <>    {showerror && error && (
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-b-md shadow-lg z-50">
        {error}
      </div>
    )}


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
              <Button type="submit">Sign In</Button>
            </div>
            <div className="text-sm">
              By signing in, you agree to {APP_NAME}&apos;s{' '}
              <Link href="/page/conditions-of-use">Conditions of Use</Link> and{' '}
              <Link href="/page/privacy-policy">Privacy Notice.</Link>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
