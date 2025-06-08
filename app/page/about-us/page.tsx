'use client';

import React from 'react';

export default function AboutUsPage() {
    return (
        <div className="relative min-h-screen overflow-hidden font-[Poppins]">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-indigo-100 via-white to-indigo-200 bg-size-200" />

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
                <h1
                    className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-blue-500 to-purple-600 drop-shadow-xl tracking-wide"
                >
                    About Us
                </h1>

                <section className="mb-14 p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200">
                    <h2 className="text-3xl font-bold mb-5 text-indigo-800 tracking-wide drop-shadow-sm border-b-2 border-indigo-300 pb-2">
                        Our Mission
                    </h2>
                    <p className="text-lg text-indigo-700 leading-relaxed max-w-3xl mx-auto">
                        To make every local product of India visible, sellable, and respected nationwide by empowering micro & small entrepreneurs.
                    </p>
                </section>

                <section className="mb-14 p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200">
                    <h2 className="text-3xl font-bold mb-5 text-indigo-800 tracking-wide drop-shadow-sm border-b-2 border-indigo-300 pb-2">
                        Our Vision
                    </h2>
                    <p className="text-lg text-indigo-700 leading-relaxed max-w-3xl mx-auto">
                        To become India’s most trusted platform for selling Made in India products by providing free digital access, guidance, and support.
                    </p>
                </section>

                <section className="mb-14 p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
                    <h2 className="text-3xl font-bold mb-5 text-gray-900 tracking-wide border-b-2 border-indigo-400 pb-2">
                        What We Offer
                    </h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                        <li>100% Indian platform to promote Indian products</li>
                        <li>Digital tools and marketing (social media & website listing)</li>
                        <li>Free guidance for seller growth</li>
                        <li>Ethical and transparent process</li>
                    </ul>
                </section>

                <section className="p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
                    <h2 className="text-3xl font-bold mb-5 text-gray-900 tracking-wide border-b-2 border-indigo-400 pb-2">
                        Why LoklBiz
                    </h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
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
