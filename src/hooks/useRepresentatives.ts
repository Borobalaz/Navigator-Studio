import { kepviselokRepository, type KepviseloRecord } from '../db';
import { useCompanyScopedRecords } from './useCompanyScopedRecords';

interface UseRepresentativesResult {
  representatives: KepviseloRecord[];
  selectedRepresentativeId: string;
  setSelectedRepresentativeId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useRepresentatives(cegAzonosito: string): UseRepresentativesResult {
  const { records, selectedId, setSelectedId, isLoading, error } = useCompanyScopedRecords(cegAzonosito, {
    fetchRecords: (id) => kepviselokRepository.listByCegAzonosito(id),
    sortKey: (representative) => representative['név/elnevezés'] ?? '',
    idKey: (representative) => representative['KépviselőAzonosító'] ?? '',
    errorMessage: 'Képviselők betöltése sikertelen.',
  });

  return {
    representatives: records,
    selectedRepresentativeId: selectedId,
    setSelectedRepresentativeId: setSelectedId,
    isLoading,
    error,
  };
}
