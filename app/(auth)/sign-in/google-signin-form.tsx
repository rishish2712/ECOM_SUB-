'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

// Assuming that SignInWithGoogle handles the sign-in and you will detect the result in a callback or redirect
import { SignInWithGoogle } from '@/lib/actions/user.actions'

export function GoogleSignInForm() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [userEmail, setUserEmail] = useState('') // Store the email in state
  const { pending } = useFormStatus()

  // Handle Google sign-in success
  const handleSuccess = (response: any) => {
    const { credential } = response;

    if (credential) {
      // Decode the credential (ID Token)
      const userInfo = JSON.parse(atob(credential.split('.')[1]));

      // Update the state with user information
      setUserEmail(userInfo.email)
    }
    else if (session?.user) {
      // Fallback: Use session values if credential is missing
      setUserEmail(session.user.email)
      setUserName(session.user.name)
    }
  } 

  const handleError = (error: any) => {
    console.error('Google Login Error:', error)
  }

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
      if (!userEmail) {
        await sendEmail(userEmail)
      }
      // Call SignInWithGoogle, which might not return anything
      SignInWithGoogle()
      const signInData = await SignInWithGoogle()
      console.log(Sign in data here : ${signInData});

      // If the sign-in is successful, update the UI accordingly
      setSuccessMessage('Successfully logged in!')

      // If the email is available, send the email



    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to send email
  const sendEmail = async (email: string) => {
    const formData = {
      to: email,
      subject: 'Login Success',
      text: 'You have successfully logged in!',
    };

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Make sure you're sending the body as JSON
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