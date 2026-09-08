"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignaturePad from "@/components/SignaturePad";

export default function SignForm({
  bookingId,
  defaultName,
  defaultEmail,
}: {
  bookingId: string;
  defaultName: string;
  defaultEmail: string;
}) {
  const router = useRouter();
  const [signerName, setSignerName] = useState(defaultName);
  const [signerEmail, setSignerEmail] = useState(defaultEmail);
  const [initials, setInitials] = useState("");
  const [signatureType, setSignatureType] = useState<"typed" | "drawn">("typed");
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (signatureType === "drawn" && !signatureImage) {
      setError("Please sign in the box before submitting.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        signerName,
        signerEmail,
        initials,
        signatureType,
        signatureText: signatureType === "typed" ? signerName : undefined,
        signatureImage: signatureType === "drawn" ? signatureImage : undefined,
      }),
    });
    setSaving(false);
    if (res.ok) {
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-sm border border-border bg-surface p-6">
      <p className="text-sm font-semibold text-heading">
        Hand this screen to your client to review, initial, and sign.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-heading">Client name</label>
          <input
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            required
            className="mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-heading">Client email</label>
          <input
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
            type="email"
            required
            className="mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-heading">
          Client initials <span className="font-normal text-body">(for the policy above)</span>
        </label>
        <input
          value={initials}
          onChange={(e) => setInitials(e.target.value)}
          required
          placeholder="e.g. M.J."
          className="mt-1 w-40 rounded-sm border border-border bg-bg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-heading">Signature</label>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => setSignatureType("typed")}
            className={`rounded-sm border px-3 py-1.5 text-xs font-semibold ${
              signatureType === "typed" ? "border-accent bg-accent text-surface" : "border-border text-body"
            }`}
          >
            Type name
          </button>
          <button
            type="button"
            onClick={() => setSignatureType("drawn")}
            className={`rounded-sm border px-3 py-1.5 text-xs font-semibold ${
              signatureType === "drawn" ? "border-accent bg-accent text-surface" : "border-border text-body"
            }`}
          >
            Sign with finger
          </button>
        </div>

        {signatureType === "typed" ? (
          <div className="mt-3 rounded-sm border border-border bg-bg px-4 py-4">
            <p className="wordmark text-2xl text-heading" style={{ fontStyle: "italic" }}>
              {signerName || "Your name will appear here"}
            </p>
          </div>
        ) : (
          <div className="mt-3">
            <SignaturePad onChange={setSignatureImage} />
          </div>
        )}
      </div>

      <button type="submit" disabled={saving} className="btn btn-solid">
        {saving ? "Submitting…" : "Submit Signature"}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
