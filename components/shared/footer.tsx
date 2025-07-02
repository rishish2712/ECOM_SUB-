'use client'
import {
  ChevronUp,
  Youtube,
  Facebook,
  Twitch,
  Send,
  MapPin,
  PackageOpen,
  Mail,
  Instagram,
  MessageCircle
} from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function Footer() {
  return (
    <>
      <footer className='bg-white text-black bg-gradient-to-r from-orange-100 via-white to-green-100 border-t border-b border-amber-100 px-4 py-2'>
        <div className='px-6 py-5 max-w-7xl mx-auto'>

          {/* First Row: Customer Policies, Address, Help */}
          <div className='flex flex-col lg:flex-row justify-between items-start gap-70'>
            {/* Customer Policies */}
            <div className='space-y-4 lg:w-1/3'>
              <h3 className='text-lg font-semibold mb-2'>CUSTOMER POLICIES</h3>
              <div className='space-y-2'>
                <Link href='/page/privacy-policy' className='block text-gray-800 hover:text-blue-600 transition-colors'>FAQ</Link>
                <Link href='/page/privacy-policy' className='block text-gray-800 hover:text-blue-600 transition-colors'>T&C</Link>
                <Link href='/account/orders' className='block text-gray-800 hover:text-blue-600 transition-colors'>Track Orders</Link>
                <Link href='/page/privacy-policy' className='block text-gray-800 hover:text-blue-600 transition-colors'>Privacy policy</Link>
              </div>
            </div>

            {/* Address */}
            <div className='space-y-4 lg:w-1/3'>
              <h3 className='text-lg font-semibold mb-2'>ADDRESS</h3>
              <p className='text-gray-800 font-medium'>
                PKT 7 DDA FLATS, SEC A-6, NARELA<br />
                NEW DELHI- 110040
              </p>
            </div>

            {/* Help */}
            <div className='space-y-4 lg:w-1/3'>
              <h3 className='text-lg font-semibold mb-2'>HELP</h3>
              <a href='tel:9148783991' className='block text-xl font-medium text-gray-800 hover:text-blue-600/75 transition-colors mb-1'>
                +91 9148783991
              </a>
              <a href='mailto:loklbiz25@gmail.com' className='block text-xl font-medium text-gray-800 hover:text-blue-600/75 transition-colors'>
                loklbiz25@gmail.com
              </a>
            </div>
          </div>

          {/* Second Row: Follow Us Centered */}
          <div className='text-center'>
            <h4 className='text-lg font-semibold'>FOLLOW US</h4>
            <div className='flex justify-center gap-8 flex-wrap'>
              <a href='https://youtube.com/@loklbiz' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors pt-1'>
                <Youtube className='w-5 h-5 text-black' />
              </a>
              <a href='https://fb.com/loklbiz' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
                <Facebook className='w-5 h-5 text-black' />
              </a>
              <a href='https://www.instagram.com/loklbizz/' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
                <Instagram className='w-5 h-5 text-black' />
              </a>
              <a href='https://wa.me/919148783991' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
                <MessageCircle className='w-5 h-5 text-black' />
              </a>
              <a href='mailto:loklbiz25@gmail.com' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
                <Mail className='w-5 h-5 text-black' />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='border-t border-gray-800 px-4 py-6'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-3 text-sm text-gray-800 mb-4'>
              <Link href='/page/privacy-policy' className='hover:text-black transition-colors'>Conditions of Use</Link>
              <span className='hidden md:inline'>|</span>
              <Link href='/page/privacy-policy' className='hover:text-black transition-colors'>Privacy Notice</Link>
              <span className='hidden md:inline'>|</span>
              <Link href='/page/help' className='hover:text-black transition-colors'>Help</Link>
            </div>
            <div className='text-center text-sm text-gray-900'>
              <p>© 2024-2025, LOKLBIZ, Inc. or its affiliates</p>
            </div>
          </div>
        </div>
      </footer>

      < button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-white text-black rounded-full shadow hover:bg-gradient-to-r hover:from-orange-300 hover:to-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  )
}
