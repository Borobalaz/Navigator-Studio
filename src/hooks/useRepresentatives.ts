import { useEffect, useState } from 'react';
import { kepviselokRepository, type KepviseloRecord } from '../db';

interface UseRepresentativesResult {
  representatives: KepviseloRecord[];
  selectedRepresentativeId: string;
  setSelectedRepresentativeId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useRepresentatives(cegAzonosito: string): UseRepresentativesResult {
  const [representatives, setRepresentatives] = useState<KepviseloRecord[]>([]);
  const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!cegAzonosito) {
      setRepresentatives([]);
      setSelectedRepresentativeId('');
      setError('');
      return;
    }

    const loadRepresentatives = async () => {
      setIsLoading(true);
      setError('');

      try {
        const records = await kepviselokRepository.listByCegAzonosito(cegAzonosito);
        records.sort((a, b) => (a['név/elnevezés'] ?? '').localeCompare(b['név/elnevezés'] ?? ''));
        setRepresentatives(records);
        setSelectedRepresentativeId(records[0]?.['KépviselőAzonosító'] ?? '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Képviselők betöltése sikertelen.');
        setRepresentatives([]);
        setSelectedRepresentativeId('');
      } finally {
        setIsLoading(false);
      }
    };

    void loadRepresentatives();
  }, [cegAzonosito]);

  return {
    representatives,
    selectedRepresentativeId,
    setSelectedRepresentativeId,
    isLoading,
    error,
  };
}
