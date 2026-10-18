import { tulajdonosokRepository, type TulajdonosRecord } from '../db';
import { useCompanyScopedRecords } from './useCompanyScopedRecords';

interface UseOwnersResult {
  owners: TulajdonosRecord[];
  selectedOwnerId: string;
  setSelectedOwnerId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useOwners(cegAzonosito: string): UseOwnersResult {
  const { records, selectedId, setSelectedId, isLoading, error } = useCompanyScopedRecords(cegAzonosito, {
    fetchRecords: (id) => tulajdonosokRepository.listByCegAzonosito(id),
    sortKey: (owner) => owner['Neve'] ?? '',
    idKey: (owner) => owner['TulajdonosAzonosító'] ?? '',
    errorMessage: 'Tulajdonosok betöltése sikertelen.',
  });

  return {
    owners: records,
    selectedOwnerId: selectedId,
    setSelectedOwnerId: setSelectedId,
    isLoading,
    error,
  };
}
