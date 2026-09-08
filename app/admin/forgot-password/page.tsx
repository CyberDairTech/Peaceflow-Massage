"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    // Always show the same message, whether or not the email is registered,
    // so this can't be used to check which emails have admin accounts.
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="text-3xl">Reset your password</h1>
      {sent ? (
        <p className="mt-6 text-sm text-body">
          If an account exists for {email}, a password reset link is on its
          way — check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-heading">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-accent px-6 py-3 font-semibold text-surface hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>
      )}
      <Link href="/admin/login" className="mt-4 text-sm text-accent hover:underline">
        Back to sign in
      </Link>
    </div>
  );
}
