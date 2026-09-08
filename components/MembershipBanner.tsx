import Link from "next/link";
import { membership } from "@/lib/site-data";

export default function MembershipBanner() {
  return (
    <div className="grid items-center gap-10 border-l-2 border-gold py-1 pl-6 md:grid-cols-2 md:pl-8">
      <div>
        <span className="eyebrow">Membership</span>
        <h2 className="mt-3 text-3xl">
          From ${membership.price}/{membership.cadence}
        </h2>
        <p className="mt-3 max-w-md text-sm text-body">{membership.description}</p>
        <p className="mt-2 max-w-md text-xs text-body">
          Plans will eventually be fully build-your-own — pick your services
          and how many sessions a month, and pricing adjusts from there.
        </p>
      </div>
      <div>
        <Link href="/contact" className="btn btn-gold">
          Ask about membership
        </Link>
      </div>
    </div>
  );
}
