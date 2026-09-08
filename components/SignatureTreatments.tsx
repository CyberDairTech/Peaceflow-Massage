const treatments = [
  {
    name: "Deep Tissue",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="13" cy="17" r="9" />
        <circle cx="22" cy="17" r="9" />
      </svg>
    ),
  },
  {
    name: "Therapeutic",
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="17" cy="17" r="5.5" />
        <path d="M17 3v5M17 26v5M3 17h5M26 17h5M7 7l3.5 3.5M23.5 23.5L27 27M27 7l-3.5 3.5M10.5 23.5L7 27" />
      </svg>
    ),
  },
  {
    name: "Prenatal",
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M8 24c0-9 4-16 9-19 5 3 9 10 9 19" />
        <circle cx="17" cy="24" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
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
