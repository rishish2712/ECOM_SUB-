'use client'
import {
  ChevronUp,
  Youtube,
  Facebook,
  Instagram,
  Mail,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="bg-white text-black bg-gradient-to-r from-orange-100 via-white to-green-100 border-t border-b border-amber-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Top Row */}
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            
            {/* Customer Policies */}
            <div className="space-y-4 w-full lg:w-1/3">
              <h3 className="text-base sm:text-lg font-semibold">CUSTOMER POLICIES</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <Link href="/page/privacy-policy" className="block text-gray-800 hover:text-blue-600 transition">FAQ</Link>
                <Link href="/page/privacy-policy" className="block text-gray-800 hover:text-blue-600 transition">T&C</Link>
                <Link href="/account/orders" className="block text-gray-800 hover:text-blue-600 transition">Track Orders</Link>
                <Link href="/page/privacy-policy" className="block text-gray-800 hover:text-blue-600 transition">Privacy Policy</Link>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4 w-full lg:w-1/3">
              <h3 className="text-base sm:text-lg font-semibold">ADDRESS</h3>
              <p className="text-gray-800 font-medium text-sm sm:text-base leading-relaxed">
                PKT 7 DDA FLATS, SEC A-6, NARELA<br />
                NEW DELHI- 110040
              </p>
            </div>

            {/* Help */}
            <div className="space-y-4 w-full lg:w-1/3">
              <h3 className="text-base sm:text-lg font-semibold">HELP</h3>
              <a href="tel:9148783991" className="block text-base sm:text-lg font-medium text-gray-800 hover:text-blue-600 transition">
                +91 9148783991
              </a>
              <a href="mailto:loklbiz25@gmail.com" className="block text-base sm:text-lg font-medium text-gray-800 hover:text-blue-600 transition">
                loklbiz25@gmail.com
              </a>
            </div>
          </div>

          {/* Follow Us */}
          <div className="text-center">
            <h4 className="text-base sm:text-lg font-semibold mb-3">FOLLOW US</h4>
            <div className="flex justify-center items-center gap-3 sm:gap-5 flex-wrap">
              {[
                { href: 'https://youtube.com/@loklbiz', icon: <Youtube className="w-5 h-5 text-black" /> },
                { href: 'https://fb.com/loklbiz', icon: <Facebook className="w-5 h-5 text-black" /> },
                { href: 'https://www.instagram.com/loklbizz/', icon: <Instagram className="w-5 h-5 text-black" /> },
                { href: 'https://wa.me/919148783991', icon: <MessageCircle className="w-5 h-5 text-black" /> },
                { href: 'mailto:loklbiz25@gmail.com', icon: <Mail className="w-5 h-5 text-black" /> },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-700">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 mb-3">
              <Link href="/page/privacy-policy" className="hover:text-black">Conditions of Use</Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/page/privacy-policy" className="hover:text-black">Privacy Notice</Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/page/help" className="hover:text-black">Help</Link>
            </div>
            <p>© 2024-2025, LOKLBIZ, Inc. or its affiliates</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 h-10 bg-white text-black rounded-full shadow hover:bg-orange-400 hover:text-white transition-all duration-300 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  )
}
