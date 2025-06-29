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
        <div className='w-full'>
          {/* Removed large back to top button */}
        </div>

        {/* Main Footer Content */}
        <div className='px-8 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>

            {/* Customer Policies Column */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold mb-6'>CUSTOMER POLICIES</h3>
              <div className='space-y-3'>
                <Link href='/page/privacy-policy' className='block text-gray-800 hover:text-black transition-colors'>
                  FAQ
                </Link>
                <Link href='/page/privacy-policy' className='block text-gray-800 hover:text-black transition-colors'>
                  T&C
                </Link>
                <Link href='/account/orders' className='block text-gray-800 hover:text-black transition-colors'>
                  Track Orders
                </Link>
                <Link href='/page/privacy-policy' className='block text-gray-800 hover:text-black transition-colors'>
                  Privacy policy
                </Link>
              </div>
            </div>

            {/* Address Column */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold mb-6'>ADDRESS</h3>
              <div className='space-y-2 text-gray-800'>
                <p className='font-medium'>MISS. SURENA 
                                          HOUSE NO 769 GROUND FLOOR 
                                          TYPE A PKT 7 DDA FLATS, 
                                          SEC A-6, A.P.S NARELA 
                                          NEW DELHI- 110040
                                          </p>
              </div>
            </div>

            {/* Help Column */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold mb-6'>HELP</h3>
              <div className='space-y-3 text-gray-800'>
                <a href='tel:9148783991' className='block text-xl font-medium hover:text-black transition-colors'>
                  +91 9148783991
                </a>
                <a href='mailto:loklbiz25@gmail.com' className='block text-xl font-medium hover:text-black transition-colors'>
                  loklbiz25@gmail.com
                </a>
              </div>

              <div className='mt-8'>
                <h4 className='text-lg font-semibold mb-4'>FOLLOW US</h4>
                <div className='flex space-x-4'>
                  <a href='https://youtube.com/@loklbiz' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
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

            {/* Return Policy Column */}
            <div className='space-y-4'>
              <div className='flex flex-col items-center text-center'>
                <div className='w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mb-4'>
                  <PackageOpen className='w-10 h-10 text-white' />
                </div>
                <h3 className='text-lg font-semibold mb-2'>Easy Exchange</h3>
                <h3 className='text-lg font-semibold mb-2'>&</h3>
                <h3 className='text-lg font-semibold'>14 Days Return Policy</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='border-t border-gray-800 px-4 py-6'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-3 text-sm text-gray-800 mb-4'>
              <Link href='/page/privacy-policy' className='hover:text-black transition-colors'>
                Conditions of Use
              </Link>
              <span className='hidden md:inline'>|</span>
              <Link href='/page/privacy-policy' className='hover:text-black transition-colors'>
                Privacy Notice
              </Link>
              <span className='hidden md:inline'>|</span>
              <Link href='/page/help' className='hover:text-black transition-colors'>
                Help
              </Link>
            </div>
            <div className='text-center text-sm text-gray-900'>
              <p>© 2024-2025, {APP_NAME}, Inc. or its affiliates</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Arrow Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-white text-black rounded-full shadow hover:bg-gradient-to-r hover:from-orange-300 hover:to-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  )
}
