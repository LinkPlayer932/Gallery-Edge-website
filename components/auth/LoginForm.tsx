"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/system/Input";
import Checkbox from "@/components/system/Checkbox";
import Button from "@/components/system/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to auth API
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md rounded-xl bg-white p-8">
      <div className="flex flex-col gap-5">
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
          <Link href="#" className="text-xs font-medium text-amber-700 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg">
          Sign In
        </Button>

        <p className="text-center text-sm text-neutral-500">
          New to Gallery Edge?{" "}
          <Link href="/account/register" className="font-medium text-amber-700 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}