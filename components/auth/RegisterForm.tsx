"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/system/Input";
import Checkbox from "@/components/system/Checkbox";
import Button from "@/components/system/Button";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/customer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md rounded-xl bg-white p-8">
      <div className="flex flex-col gap-5">
        {error && (
          <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="first-name"
            name="firstName"
            label="First Name"
            placeholder="Eleanor"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <Input
            id="last-name"
            name="lastName"
            label="Last Name"
            placeholder="Voss"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          id="register-email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          id="register-password"
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Checkbox
          id="agree-terms"
          label="I agree to the Terms of Service and Privacy Policy"
          required
        />

        <Button type="submit" variant="secondary" size="lg" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/account/login" className="font-medium text-amber-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}