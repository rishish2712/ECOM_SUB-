'use client';

import React from 'react';
import { ShieldCheck, ScrollText, RotateCcw, AlertCircle, ShoppingCart, Star, Triangle } from 'lucide-react';

export default function PolicyPage() {
    return (
        <main className="relative min-h-screen w-full px-6 py-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-orange-50 to-green-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {/* Background Floating Blobs with Icons */}

            {/* Orange Bubble with Cone (Triangle icon) */}
            <div className="absolute top-10 left-5 w-28 h-28 bg-orange-400 rounded-full opacity-25 animate-floatSlow flex items-center justify-center">
                <Triangle className="text-white w-14 h-14" strokeWidth={2} />
            </div>

            {/* Green Bubble with Cone */}
            <div className="absolute top-1/4 right-10 w-32 h-32 bg-green-400 rounded-full opacity-25 animate-floatSlow delay-2000 flex items-center justify-center">
                <Triangle className="text-white w-16 h-16" strokeWidth={2} />
            </div>

            {/* White bubble with orange border */}
            <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white border-4 border-orange-400 rounded-full opacity-40 animate-floatSlow delay-4000 flex items-center justify-center">
                {/* Star icon */}
                <Star className="text-orange-400 w-10 h-10" />
            </div>

            {/* Saffron bubble */}
            <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-[#ff9933] rounded-full opacity-15 animate-floatSlow delay-6000" />

            {/* Extra Cart Icons */}

            <ShoppingCart
                className="absolute top-1/3 left-16 w-20 h-20 text-orange-400 opacity-15 animate-floatSlow delay-1500"
                strokeWidth={2}
            />

            <ShoppingCart
                className="absolute bottom-1/4 right-32 w-16 h-16 text-green-400 opacity-20 animate-floatSlow delay-3500"
                strokeWidth={2}
            />

            {/* Extra Rupee Symbol */}
            <svg
                className="absolute bottom-1/3 right-20 w-12 h-12 text-green-400 opacity-15 animate-floatSlow delay-3000"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M7 7h10M7 12h7M7 17h7M17 7v10a4 4 0 01-4 4H7" />
            </svg>

            {/* Main content container */}
            <div className="relative w-full max-w-6xl bg-white border border-gray-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 md:p-16 backdrop-blur-md z-10">
                <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600 mb-16 tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Privacy Policy & Terms of Use
                </h1>

                {/* Privacy Policy Section */}
                <section className="mb-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <div className="flex items-center gap-4 mb-6">
                        <ShieldCheck className="text-orange-600 w-10 h-10 animate-bounce" />
                        <h2 className="text-3xl font-semibold text-gray-900">Privacy Policy</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
                        At <span className="font-semibold text-orange-600">LoklBiz</span>, we respect your privacy. Your data will never be sold or shared with third parties without your consent. We collect minimal personal information solely to enhance your experience, enable better communication, and improve our services. Your trust is our top priority.
                    </p>
                </section>

                {/* Terms and Conditions Section */}
                <section className="mb-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <div className="flex items-center gap-4 mb-6">
                        <ScrollText className="text-orange-600 w-10 h-10 animate-bounce" />
                        <h2 className="text-3xl font-semibold text-gray-900">Terms & Conditions</h2>
                    </div>
                    <ol className="list-decimal list-inside space-y-5 text-gray-800 text-lg leading-relaxed">
                        <li><span className="font-semibold">Only Made in India products</span> can be listed. No imported or resale items.</li>
                        <li><span className="text-orange-700">LoklBiz</span> reserves the right to approve/reject listings at its discretion.</li>
                        <li>Sellers are responsible for accurate <span className="underline decoration-green-400">product details</span>, pricing, and stock.</li>
                        <li>Commission is charged only after a <span className="font-medium">successful sale</span>.</li>
                        <li>No pressuring LoklBiz for leads/sales. <span className="italic">Lead generation is goodwill-based</span>.</li>
                        <li>Sellers manage their own packaging and logistics.</li>
                        <li>Business support is optional and offered via <span className="text-green-600 font-semibold">paid plans</span>.</li>
                        <li>We’re not liable for disputes between buyers and sellers.</li>
                        <li>Any <span className="text-red-600">fraud or misuse</span> may lead to permanent suspension.</li>
                        <li>Terms may change. Continued use = acceptance of new terms.</li>
                    </ol>
                </section>

                {/* Refund & Return Policy */}
                <section className="mb-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <div className="flex items-center gap-4 mb-6">
                        <RotateCcw className="text-orange-600 w-10 h-10 animate-bounce" />
                        <h2 className="text-3xl font-semibold text-gray-900">Refund & Return Policy</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        As <span className="font-medium text-orange-600">LoklBiz</span> is a platform provider and not a direct seller, refund or return policies depend on individual sellers. Buyers are encouraged to confirm terms before making a purchase.
                    </p>
                </section>

                {/* Disclaimer */}
                <section style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <div className="flex items-center gap-4 mb-6">
                        <AlertCircle className="text-orange-600 w-10 h-10 animate-bounce" />
                        <h2 className="text-3xl font-semibold text-gray-900">Disclaimer</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-medium text-orange-600">LoklBiz</span> promotes Made in India sellers only. We do not guarantee sales and shall not be held liable for any product or service disputes. Our role is limited to facilitating seller visibility and lead generation.
                    </p>
                </section>
            </div>

            <style jsx>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-floatSlow {
          animation: floatSlow 10s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
        .delay-3500 {
          animation-delay: 3.5s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
        .delay-6000 {
          animation-delay: 6s;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
        </main>
    );
}
