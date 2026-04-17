import { useEffect, useState } from 'react';
import { tulajdonosokRepository, type TulajdonosRecord } from '../db';

interface UseOwnersResult {
  owners: TulajdonosRecord[];
  selectedOwnerId: string;
  setSelectedOwnerId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useOwners(cegAzonosito: string): UseOwnersResult {
  const [owners, setOwners] = useState<TulajdonosRecord[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!cegAzonosito) {
      setOwners([]);
      setSelectedOwnerId('');
      setError('');
      return;
    }

    const loadOwners = async () => {
      setIsLoading(true);
      setError('');

      try {
        const records = await tulajdonosokRepository.listByCegAzonosito(cegAzonosito);
        records.sort((a, b) => (a['Neve'] ?? '').localeCompare(b['Neve'] ?? ''));
        setOwners(records);
        setSelectedOwnerId(records[0]?.['TulajdonosAzonosító'] ?? '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Tulajdonosok betöltése sikertelen.');
        setOwners([]);
        setSelectedOwnerId('');
      } finally {
        setIsLoading(false);
      }
    };

    void loadOwners();
  }, [cegAzonosito]);

  return {
    owners,
    selectedOwnerId,
    setSelectedOwnerId,
    isLoading,
    error,
  };
}
