'use client'

import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Youtube, MessageCircleMore } from 'lucide-react';

export default function HelpPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: 'support@loklbiz.com',
                    subject: formData.subject,
                    text: `
          Name: ${formData.name}
          Email: ${formData.email}
          Message: ${formData.message}
        `,
                    html: `
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                alert('Failed to send message: ' + data.error);
            }
        } catch (error) {
            alert('An error occurred while sending the message.');
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-hidden py-10 px-4 font-poppins">
            {/* Animated background glow */}
            <div
                className="absolute inset-0 z-0 pointer-events-none animate-pulse-slow 
                bg-[radial-gradient(circle_at_20%_30%,#ff9933_0%,transparent_40%),radial-gradient(circle_at_80%_70%,#138808_0%,transparent_40%)] 
                opacity-20"
            />

            {/* Foreground content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                <h1
                    className="text-3xl font-bold mb-6 text-center"
                    style={{
                        fontWeight: '700',
                        letterSpacing: '0.05em',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    }}
                >
                    <span style={{ color: '#FF9933' /* saffron */ }}>Need Help? </span>
                    <span
                        style={{
                            background: 'linear-gradient(90deg, #ffffff 0%, #3b82f6 100%)', // white to blue
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            MozBackgroundClip: 'text',
                            display: 'inline-block',
                        }}
                    >
                        Get{' '}
                    </span>
                    <span style={{ color: '#138808' /* green */ }}> in Touch!</span>
                </h1>



                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6 border-3 border-gray-800 rounded-lg shadow-lg"
                    style={{
                        background: 'linear-gradient(30deg,rgb(207, 194, 181) 0%, #FFFFFF 100%)',
                    }}
                >
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Decorative separator */}
                    <div className="flex justify-center my-2">
                        <div className="w-16 border-t-2 border-dotted border-blue-300"></div>
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div className="flex justify-center my-2">
                        <div className="w-16 border-t-2 border-dotted border-blue-300"></div>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div className="flex justify-center my-2">
                        <div className="w-16 border-t-2 border-dotted border-blue-300"></div>
                    </div>

                    <div>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md block mx-auto"
                    >
                        Send Message
                    </button>

                </form>


                <div className="flex flex-wrap justify-center gap-5 mt-8">
                    {[
                        {
                            href: 'mailto:support@loklbiz.com',
                            bg: 'bg-blue-600',
                            icon: <Mail size={18} />,
                            label: 'Support',
                        },
                        {
                            href: 'https://wa.me/919148783991',
                            bg: 'bg-green-600',
                            icon: <MessageCircleMore size={18} />,
                            label: 'WhatsApp',
                        },
                        {
                            href: 'https://instagram.com/loklbiz',
                            bg: 'bg-pink-500',
                            icon: <Instagram size={18} />,
                            label: 'Instagram',
                        },
                        {
                            href: 'https://fb.com/loklbiz',
                            bg: 'bg-blue-800',
                            icon: <Facebook size={18} />,
                            label: 'Facebook',
                        },
                        {
                            href: 'https://youtube.com/@loklbiz',
                            bg: 'bg-red-600',
                            icon: <Youtube size={18} />,
                            label: 'YouTube',
                        },
                    ].map(({ href, bg, icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            className={`${bg} flex items-center gap-2 text-white px-5 py-2 rounded-md text-sm font-medium
                                transition-transform duration-300 transform hover:scale-110 hover:z-10 hover:brightness-105
                                hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]`}
                        >
                            {icon} {label}
                        </a>
                    ))}
                </div>
            </div>
        </div >
    );
}
