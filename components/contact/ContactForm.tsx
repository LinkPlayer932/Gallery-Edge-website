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
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitting(true);
  setError("");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    const subjectLabels: Record<string, string> = {
      order: "Order Question",
      custom: "Custom Frame Inquiry",
      sizing: "Sizing & Care",
      other: "Other",
    };

    const message = `*New Contact Message*

*Name:* ${form.name}
*Phone:* ${form.phone}
*Email:* ${form.email}
*Subject:* ${subjectLabels[form.subject] || form.subject}
*Message:* ${form.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "923301711146";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    // Reset form after successful save + WhatsApp redirect
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  } catch {
    setError("Could not reach the server. Please try again.");
  } finally {
    setSubmitting(false);
  }
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
        <Input
          id="contact-phone"
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="e.g. 03XX-XXXXXXX"
          value={form.phone}
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

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
