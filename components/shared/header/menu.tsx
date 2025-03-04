

import Link from 'next/link'
import CartButton from './cart-button'
import { UserIcon } from 'lucide-react'
import UserButton from './user-button'
export default function Menu() {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <Link href='/sign-in' className='header-button'>
          <UserIcon className='h-8 w-8' />
          <span className='font-bold'>Sign in</span>
        </Link>
        <UserButton />

        <CartButton />
      </nav>
    </div>
  )
}
