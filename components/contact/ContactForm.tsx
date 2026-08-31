"use client";

import { useState } from "react";
import Input from "@/components/system/Input";
import Textarea from "@/components/system/Textarea";
import Select from "@/components/system/Select";
import Button from "@/components/system/Button";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to email/API endpoint
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-8">
      <p className="font-serif text-xl font-semibold text-neutral-900">Send a Message</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="contact-name"
          name="name"
          label="Full Name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          id="contact-email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-5">
        <Select
          id="contact-subject"
          name="subject"
          label="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        >
          <option value="">Choose a topic...</option>
          <option value="order">Order Question</option>
          <option value="custom">Custom Frame Inquiry</option>
          <option value="sizing">Sizing & Care</option>
          <option value="other">Other</option>
        </Select>
      </div>

      <div className="mt-5">
        <Textarea
          id="contact-message"
          name="message"
          label="Message"
          placeholder="Tell us how we can help..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
        Send Message
      </Button>
    </form>
  );
}