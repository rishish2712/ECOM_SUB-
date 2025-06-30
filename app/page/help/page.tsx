'use client';

import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  Facebook,
  Youtube,
  MessageCircleMore,
} from 'lucide-react';

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen bg-gradient-to-br from-[#fffdf6] via-white to-[#f0fdf4] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-gray-900">
          Need <span className="text-orange-500">Help?</span>{' '}
          <span className="text-green-600">Get in Touch!</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10">
          Whether you&apos;re a seller, shopper, or just curious about LoklBiz, we&apos;re here to help.
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl px-8 py-10 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-600 text-white py-3 rounded-lg transition duration-200 shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 px-4">
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
            href: 'https://www.instagram.com/loklbizz/',
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
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${bg} text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-xl hover:scale-105 transition-transform`}
          >
            {icon} {label}
          </a>
        ))}
      </div>
    </div>
  );
}
