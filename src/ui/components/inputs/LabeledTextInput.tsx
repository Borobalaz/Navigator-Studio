type LabeledTextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  defaultValue?: string;
};

export function LabeledTextInput({
  id,
  label,
  value,
  onChange,
  disabled = false,
  defaultValue,
}: LabeledTextInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        defaultValue={defaultValue}

      />
    </div>
  );
}
