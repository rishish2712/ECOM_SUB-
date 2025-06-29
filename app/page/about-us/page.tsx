'use client';

import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            About Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about our mission, vision, and what makes LoklBiz different.
          </p>
        </header>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To make every local product of India visible, sellable, and respected nationwide by empowering micro & small entrepreneurs.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/shop1.svg" // Replace this
              alt="Mission Illustration"
              className="max-w-md w-full"
            />
          </div>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20 md:flex-row-reverse">
          
          <div className="flex justify-center">
            <img
              src="/images/shop2.svg" // Replace this
              alt="Vision Illustration"
              className="max-w-md w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To become India’s most trusted platform for selling Made in India products by providing free digital access, guidance, and support.
            </p>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-10 mb-20 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>100% Indian platform to promote Indian products</li>
            <li>Digital tools and marketing (social media & website listing)</li>
            <li>Free guidance for seller growth</li>
            <li>Ethical and transparent process</li>
          </ul>
        </section>

        {/* Why LoklBiz Section */}
        <section className="bg-white border border-gray-200 rounded-xl p-10 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why LoklBiz
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>No upfront investment required</li>
            <li>No unnecessary lead pressure</li>
            <li>Fair and transparent business environment</li>
            <li>Focused on empowerment, not exploitation</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
