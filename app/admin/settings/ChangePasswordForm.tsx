"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    setSaving(true);
    const supabase = createBrowserSupabaseClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setError("Couldn't verify your session — try signing in again.");
      setSaving(false);
      return;
    }

    // Re-verify the current password before allowing a change.
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (verifyError) {
      setError("Current password is incorrect.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="text-sm font-semibold text-heading">Current password</label>
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          required
          className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-heading">New password</label>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
      <button type="submit" disabled={saving} className="btn btn-solid">
        {saving ? "Updating…" : "Update Password"}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {success && <p className="text-sm text-accent">Password updated.</p>}
    </form>
  );
}
