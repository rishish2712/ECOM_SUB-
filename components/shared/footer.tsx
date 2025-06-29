'use client'
import { ChevronUp, Youtube, Facebook, Twitch, Send, MapPin, PackageOpen, Mail, Instagram, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className='bg-black text-white'>
      <div className='w-full'>
        <Button
          variant='ghost'
          className='bg-amber-50 w-full rounded-none text-black hover:bg-amber-100'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className='mr-2 h-4 w-4' />
          Back to top
        </Button>
      </div>
      
      {/* Main Footer Content */}
      <div className='px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          
          {/* Customer Policies Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold mb-6'>CUSTOMER POLICIES</h3>
            <div className='space-y-3'>
              <Link href='/page/privacy-policy' className='block text-gray-300 hover:text-white transition-colors'>
                FAQ
              </Link>
              <Link href='/page/privacy-policy' className='block text-gray-300 hover:text-white transition-colors'>
                T&C
              </Link>
              <Link href='/account/orders' className='block text-gray-300 hover:text-white transition-colors'>
                Track Orders
              </Link>
              <Link href='/page/privacy-policy' className='block text-gray-300 hover:text-white transition-colors'>
                Privacy policy
              </Link>
            </div>
          </div>

          {/* Address Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold mb-6'>ADDRESS</h3>
            <div className='space-y-2 text-gray-300'>
              <p className='font-medium'>LOREM</p>
            </div>
          </div>

          {/* Help Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold mb-6'>HELP</h3>
            <div className='space-y-3 text-gray-300'>
              <a href='tel:9148783991' className='block text-xl font-medium hover:text-white transition-colors'>
                +91 9148783991
              </a>
              <a href="mailto:loklbiz25@gmail.com" className="block text-xl font-medium hover:text-white transition-colors">
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
                <a href='https://instagram.com/loklbiz' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'>
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
              <div className='w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4'>
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
          <div className='flex flex-col md:flex-row justify-center items-center gap-3 text-sm text-gray-300 mb-4'>
            <Link href='/page/privacy-policy' className='hover:text-white transition-colors'>
              Conditions of Use
            </Link>
            <span className='hidden md:inline'>|</span>
            <Link href='/page/privacy-policy' className='hover:text-white transition-colors'>
              Privacy Notice
            </Link>
            <span className='hidden md:inline'>|</span>
            <Link href='/page/help' className='hover:text-white transition-colors'>
              Help
            </Link>
          </div>
          <div className='text-center text-sm text-gray-400'>
            <p>© 2024-2025, {APP_NAME}, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  )
}