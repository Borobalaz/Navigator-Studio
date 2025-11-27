interface TabCardProps {
  label: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
}

export function TabCard({ label, active, onClick, onClose }: TabCardProps) {
  return (
    <div
      className={`tab-card ${active ? "active-tab-card" : ""}`}
      onClick={onClick}
    >
      <span className="tab-card-label">{label}</span>
      <button
        className="tab-card-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
    </div>
  );
}
