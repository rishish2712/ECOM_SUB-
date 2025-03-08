'use client'
import { useState } from "react";
import React from "react";


export default function Contact() {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        text: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('api/email/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
            alert('Email sent Successfully');
        }
        else {
            alert('Error sending email: ' + data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <label>
                To:
                <input type="email" name="to" value={formData.to} onChange={handleChange} required />
            </label>
            <label>
                Subject:
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
            </label>
            <label >
                Message
                <textarea name="text" value={formData.text} onChange={handleChange} required></textarea>
            </label>
            <button type="submit">Send Email</button>
        </form>
    );
}