import { treatmentIcons } from "@/components/treatmentIcons";

const treatments = [
  { name: "Deep Tissue", icon: treatmentIcons.deepTissue },
  { name: "Therapeutic", icon: treatmentIcons.therapeutic },
  { name: "Prenatal", icon: treatmentIcons.prenatal },
];

export default function SignatureTreatments() {
  return (
    <div className="treat-grid">
      {treatments.map((t) => (
        <a key={t.name} href="#menu" className="treat-item">
          <div className="treat-badge">{t.icon}</div>
          <span>{t.name}</span>
        </a>
      ))}
    </div>
  );
}
