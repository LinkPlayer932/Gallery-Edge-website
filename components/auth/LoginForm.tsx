"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/system/Input";
import Checkbox from "@/components/system/Checkbox";
import Button from "@/components/system/Button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded-xl bg-white p-8"
    >
      <div className="flex flex-col gap-5">
        {error && (
          <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Input
          id="login-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="login-password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox id="remember-me" label="Remember me" />
          <Link
            href="/account/forgot-password"
            className="text-xs font-medium text-amber-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-neutral-500">
          New to Gallery Edge?{" "}
          <Link
            href="/account/register"
            className="font-medium text-amber-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}
