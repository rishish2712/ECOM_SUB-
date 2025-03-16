'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

// Assuming that SignInWithGoogle handles the sign-in and you will detect the result in a callback or redirect
import { SignInWithGoogle } from '@/lib/actions/user.actions'

export function GoogleSignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { pending } = useFormStatus()

  const SignInButton = () => {
    return (
      <Button
        disabled={pending || isLoading}
        className='w-full'
        variant='outline'
      >
        {pending || isLoading
          ? 'Redirecting to Google...'
          : 'Sign In with Google'}
      </Button>
    )
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setErrorMessage('')  // Clear any previous errors
    setSuccessMessage('') // Clear any previous success messages

    try {
      // Call SignInWithGoogle, which might not return anything
      SignInWithGoogle()
      const signInData = await SignInWithGoogle()
      console.log(`Signindata here : ${signInData}`);


      setSuccessMessage('Successfully logged in!')



    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleGoogleSignIn()
        }}
      >
        <SignInButton />
      </form>

      {/* Show success or error messages */}
      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-red-500 mt-4">{errorMessage}</div>
      )}
    </div>
  )
}