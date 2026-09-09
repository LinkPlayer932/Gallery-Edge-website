"use client";

import { useEffect, useState } from "react";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";

export default function AdminProfileCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        setName(data.profile?.name || "");
        setEmail(data.profile?.email || "");
        setRole(data.profile?.role || "");
      } catch {
        setError("Could not load profile.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save profile.");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6">
        <p className="text-sm text-neutral-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Admin Profile</p>
      <p className="text-sm text-neutral-500">
        This name and role appear in the sidebar and topbar.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <Input
          id="admin-name"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="admin-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="admin-role"
          label="Role / Title"
          placeholder="e.g. Store Owner"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {saved && <p className="mt-3 text-sm text-green-600">Profile updated successfully.</p>}

      <Button type="submit" variant="primary" size="md" className="mt-5" disabled={saving}>
        {saving ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}