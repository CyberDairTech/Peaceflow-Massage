"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setStatus("ready");
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus("ready");
    });

    const timeout = setTimeout(() => {
      setStatus((s) => (s === "checking" ? "invalid" : s));
    }, 4000);

    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);
    const supabase = createBrowserSupabaseClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1500);
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="text-3xl">Set a new password</h1>

      {status === "checking" && <p className="mt-6 text-sm text-body">Checking your reset link…</p>}

      {status === "invalid" && (
        <div className="mt-6">
          <p className="text-sm text-red-700">
            This reset link is invalid or has expired.
          </p>
          <Link href="/admin/forgot-password" className="mt-4 inline-block text-sm text-accent hover:underline">
            Request a new link
          </Link>
        </div>
      )}

      {status === "ready" && (
        <>
          {success ? (
            <p className="mt-6 text-sm text-accent">Password updated — signing you in…</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-sm font-semibold text-heading">New password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  minLength={8}
                  className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-heading">Confirm new password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  minLength={8}
                  className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-sm bg-accent px-6 py-3 font-semibold text-surface hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Updating…" : "Update Password"}
              </button>
              {error && <p className="text-sm text-red-700">{error}</p>}
            </form>
          )}
        </>
      )}
    </div>
  );
}
