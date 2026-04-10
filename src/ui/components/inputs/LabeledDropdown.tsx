import "./InputComponentStyles.css";

type LabeledDropdownOption = {
  value: string;
  label: string;
};

type LabeledDropdownProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: LabeledDropdownOption[];
  disabled?: boolean;
};

export function LabeledDropdown({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
}: LabeledDropdownProps) {
  return (
    <div className="labeled-dropdown">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        style={{
          userSelect: 'text',
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          cursor: 'text',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
