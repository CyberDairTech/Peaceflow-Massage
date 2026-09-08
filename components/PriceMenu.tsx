import Link from "next/link";
import { getActiveServices } from "@/lib/services";

export default async function PriceMenu({ showHeading = true }: { showHeading?: boolean }) {
  const services = await getActiveServices();

  return (
    <div id="menu">
      {showHeading && (
        <div className="menu-head">
          <span className="eyebrow">The Menu</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Services &amp; Pricing</h2>
          <p className="mt-3 max-w-md text-body">
            Every session is one-on-one, deep tissue technique — pick the
            length that fits your day.
          </p>
        </div>
      )}
      <div className="menu-list mt-6">
        <div className="menu-row">
          <div className="info">
            <div className="name">Deep Tissue Massage</div>
            <div className="desc">
              Focused, unhurried recovery work for gym-goers dealing with
              tight hips, sore shoulders, and everyday tension.
            </div>
          </div>
          <div className="duration-set">
            {services.map((s) => (
              <Link key={s.slug} href={`/book?service=${s.slug}`} className="duration-opt">
                <span className="time">{s.durationMinutes} min</span>
                <span className="price">${s.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="menu-note">
        Lifted Gym members: mention it at booking for $15 off any session.
      </p>
    </div>
  );
}
