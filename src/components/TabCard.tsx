import "./TabCard.css"

interface TabCardProps {
  label: string,
  active: boolean,
  onClick: () => void,
}

export function TabCard({ label, active, onClick }: TabCardProps) {

  return (
    <div className={`tab-card ${active ? "active-tab-card" : ""}`}
      onClick={() => onClick()}>
      {label}
    </div>
  );
}