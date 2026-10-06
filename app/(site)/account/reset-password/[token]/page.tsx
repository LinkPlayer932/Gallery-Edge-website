"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/customer/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/account/login"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md px-4">
      <h1 className="text-center text-xl font-semibold text-neutral-900">
        Reset your password
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 rounded-xl bg-white p-8">
        <div className="flex flex-col gap-5">
          {error && (
            <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="rounded-md bg-green-50 px-4 py-2 text-sm text-green-700">
              Password reset! Redirecting to login...
            </p>
          )}

          <Input
            id="new-password"
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="lg" disabled={loading || success}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}