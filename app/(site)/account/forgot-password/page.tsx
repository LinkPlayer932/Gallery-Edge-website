"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/customer/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessage(data.message);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md px-4">
      <h1 className="text-center text-xl font-semibold text-neutral-900">
        Forgot your password?
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-500">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-xl bg-white p-8">
        <div className="flex flex-col gap-5">
          {error && (
            <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}
          {message && (
            <p className="rounded-md bg-green-50 px-4 py-2 text-sm text-green-700">{message}</p>
          )}

          <Input
            id="forgot-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <p className="text-center text-sm text-neutral-500">
            <Link href="/account/login" className="font-medium text-amber-700 hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}