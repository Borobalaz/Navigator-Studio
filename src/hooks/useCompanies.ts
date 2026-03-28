import { useEffect, useState } from 'react';
import { cegekRepository, type CegRecord } from '../db';

interface UseCompaniesResult {
  companies: CegRecord[];
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useCompanies(): UseCompaniesResult {
  const [companies, setCompanies] = useState<CegRecord[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCompanies = async () => {
      setIsLoading(true);
      setError('');

      try {
        const allCompanies = await cegekRepository.listAll();
        allCompanies.sort((a, b) => (a['Megnevezése'] ?? '').localeCompare(b['Megnevezése'] ?? ''));
        setCompanies(allCompanies);

        if (allCompanies.length > 0) {
          setSelectedCompanyId(allCompanies[0]['CégAzonosító']);
        } else {
          setSelectedCompanyId('');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Cégek betöltése sikertelen.');
        setCompanies([]);
        setSelectedCompanyId('');
      } finally {
        setIsLoading(false);
      }
    };

    void loadCompanies();
  }, []);

  return {
    companies,
    selectedCompanyId,
    setSelectedCompanyId,
    isLoading,
    error,
  };
}
