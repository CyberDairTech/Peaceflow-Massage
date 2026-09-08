"use client";

import { useState } from "react";
import type { Service } from "@/lib/services";

export default function InquiryForm({
  type,
  service,
}: {
  type: "contact" | "booking_request";
  service?: Service;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        serviceSlug: service?.slug,
        preferredDate: form.get("preferredDate") || undefined,
        preferredTime: form.get("preferredTime") || undefined,
        message: form.get("message"),
      }),
    });

    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-sm border border-border bg-linen/40 p-6 text-body">
        <p className="font-semibold text-heading">Got it — thank you!</p>
        <p className="mt-1 text-sm">
          Maranda will reach out shortly to confirm
          {service ? ` your ${service.name.toLowerCase()} session` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-heading">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-heading">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-heading">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
          />
        </div>
        {type === "booking_request" && (
          <div>
            <label htmlFor="preferredDate" className="text-sm font-semibold text-heading">
              Preferred date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
            />
          </div>
        )}
      </div>
      {type === "booking_request" && (
        <div>
          <label htmlFor="preferredTime" className="text-sm font-semibold text-heading">
            Preferred time
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            placeholder="e.g. Tuesday around 5pm"
            className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
          />
        </div>
      )}
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-heading">
          {type === "booking_request" ? "Anything else?" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-accent px-6 py-3 font-semibold text-surface hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading"
          ? "Sending…"
          : type === "booking_request"
            ? "Request to Book"
            : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong — please call or text {" "}
          <a href="tel:9707399857" className="underline">
            970-739-9857
          </a>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
