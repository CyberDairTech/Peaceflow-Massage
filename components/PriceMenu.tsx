import { getActiveServiceGroups } from "@/lib/services";
import ServiceMenuRow from "@/components/ServiceMenuRow";

export default async function PriceMenu({ showHeading = true }: { showHeading?: boolean }) {
  const groups = await getActiveServiceGroups();

  return (
    <div id="menu">
      {showHeading && (
        <div className="menu-head">
          <span className="eyebrow">The Menu</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Services &amp; Pricing</h2>
          <p className="mt-3 max-w-md text-body">
            Pick a massage type, then choose the length that fits your day.
          </p>
        </div>
      )}
      <div className="menu-list mt-6">
        {groups.map((group) => (
          <ServiceMenuRow key={group.groupName} group={group} />
        ))}
        {groups.length === 0 && (
          <p className="py-6 text-sm text-body">Services are being updated — check back shortly.</p>
        )}
      </div>
      <p className="menu-note">
        Lifted Gym members: mention it at booking for $15 off any session.
      </p>
    </div>
  );
}
