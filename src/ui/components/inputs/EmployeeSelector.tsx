import type { MunkavallaloRecord } from '../../../db';
import { LabeledDropdown } from './LabeledDropdown';

type EmployeeSelectorProps = {
  id: string;
  label: string;
  employees: MunkavallaloRecord[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  emptyLabel?: string;
};

export function EmployeeSelector({
  id,
  label,
  employees,
  value,
  onChange,
  disabled = false,
  placeholder = '-- Válassz munkavállalót --',
  emptyLabel = 'Nincs munkavállaló',
}: EmployeeSelectorProps) {
  const options = employees.length === 0
    ? [{ value: '', label: emptyLabel }]
    : [
      { value: '', label: placeholder },
      ...employees.map((employee) => ({
        value: employee['MunkavállalóAzonosító'],
        label: employee['Név'],
      })),
    ];

  return (
    <LabeledDropdown
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      options={options}
    />
  );
}
