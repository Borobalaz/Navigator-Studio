import { useEffect, useState } from 'react';
import { munkavallalokRepository, type MunkavallaloRecord } from '../db';

interface UseEmployeesResult {
  employees: MunkavallaloRecord[];
  selectedEmployeeId: string;
  setSelectedEmployeeId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useEmployees(cegAzonosito: string): UseEmployeesResult {
  const [employees, setEmployees] = useState<MunkavallaloRecord[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!cegAzonosito) {
      setEmployees([]);
      setSelectedEmployeeId('');
      setError('');
      return;
    }

    const loadEmployees = async () => {
      setIsLoading(true);
      setError('');

      try {
        const records = await munkavallalokRepository.listByCegAzonosito(cegAzonosito);
        records.sort((a, b) => (a['Név'] ?? '').localeCompare(b['Név'] ?? ''));
        setEmployees(records);
        setSelectedEmployeeId(records[0]?.['MunkavállalóAzonosító'] ?? '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Munkavállalók betöltése sikertelen.');
        setEmployees([]);
        setSelectedEmployeeId('');
      } finally {
        setIsLoading(false);
      }
    };

    void loadEmployees();
  }, [cegAzonosito]);

  return {
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    isLoading,
    error,
  };
}
