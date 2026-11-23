"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

const inputClass =
  "w-full border border-sand-dark bg-ivory px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest/50 transition-colors";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.alert("Thank you for your message! We will get back to you shortly.");
    setForm(EMPTY);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1.5">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here…"
          className={inputClass}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-forest text-warm-white px-6 py-3 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#244B3C] transition-colors"
        >
          Send Message →
        </button>
      </div>
    </form>
  );
}
