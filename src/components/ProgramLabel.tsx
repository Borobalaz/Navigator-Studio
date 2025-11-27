import "./ProgramLabel.css"

export interface ProgramLabelProps {
  label: string;
  onClick: () => void;
}

export function ProgramLabel({ label, onClick }: ProgramLabelProps) {

  return (
    <div className="program-label" onClick={() => onClick()}>
      {label}
    </div>
  );
}