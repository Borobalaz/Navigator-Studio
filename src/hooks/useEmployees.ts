import { munkavallalokRepository, type MunkavallaloRecord } from '../db';
import { useCompanyScopedRecords } from './useCompanyScopedRecords';

interface UseEmployeesResult {
  employees: MunkavallaloRecord[];
  selectedEmployeeId: string;
  setSelectedEmployeeId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useEmployees(cegAzonosito: string): UseEmployeesResult {
  const { records, selectedId, setSelectedId, isLoading, error } = useCompanyScopedRecords(cegAzonosito, {
    fetchRecords: (id) => munkavallalokRepository.listByCegAzonosito(id),
    sortKey: (employee) => employee['Név'] ?? '',
    idKey: (employee) => employee['MunkavállalóAzonosító'] ?? '',
    errorMessage: 'Munkavállalók betöltése sikertelen.',
  });

  return {
    employees: records,
    selectedEmployeeId: selectedId,
    setSelectedEmployeeId: setSelectedId,
    isLoading,
    error,
  };
}
