"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-800 text-lg font-semibold text-white">
            G
          </span>
          <p className="mt-3 font-serif text-2xl font-semibold text-neutral-900">
            Gallery Edge
          </p>
          <p className="text-sm text-neutral-500">Admin Panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow-sm"
        >
          <p className="font-serif text-xl font-semibold text-neutral-900">
            Admin Login
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Sign in to manage Gallery Edge.
          </p>

          <div className="mt-6">
            <Input
              id="admin-username"
              name="username"
              label="Username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              id="admin-password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="mt-6 w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-400">
          © 2026 Gallery Edge. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}