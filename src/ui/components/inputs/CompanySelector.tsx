import type { CegRecord } from '../../../db';
import { LabeledDropdown } from './LabeledDropdown';

type CompanySelectorProps = {
  id: string;
  label: string;
  companies: CegRecord[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  emptyLabel?: string;
  showTaxNumber?: boolean;
};

export function CompanySelector({
  id,
  label,
  companies,
  value,
  onChange,
  disabled = false,
  placeholder = '-- Válassz céget --',
  emptyLabel = 'Nincs cég az adatbázisban',
  showTaxNumber = false,
}: CompanySelectorProps) {
  const options = companies.length === 0
    ? [{ value: '', label: emptyLabel }]
    : [
      { value: '', label: placeholder },
      ...companies.map((company) => ({
        value: company['CégAzonosító'],
        label: showTaxNumber && company['Adószáma']
          ? `${company['Megnevezése']} (${company['Adószáma']})`
          : company['Megnevezése'],
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
