import { useEffect, useState } from 'react';

interface UseCompanyScopedRecordsOptions<T> {
  fetchRecords: (cegAzonosito: string) => Promise<T[]>;
  sortKey: (record: T) => string;
  idKey: (record: T) => string;
  errorMessage: string;
}

interface UseCompanyScopedRecordsResult<T> {
  records: T[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  isLoading: boolean;
  error: string;
}

export function useCompanyScopedRecords<T>(
  cegAzonosito: string,
  { fetchRecords, sortKey, idKey, errorMessage }: UseCompanyScopedRecordsOptions<T>,
): UseCompanyScopedRecordsResult<T> {
  const [records, setRecords] = useState<T[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cegAzonosito) {
      setRecords([]);
      setSelectedId('');
      setError('');
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result = await fetchRecords(cegAzonosito);
        result.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
        setRecords(result);
        setSelectedId(result[0] ? idKey(result[0]) : '');
      } catch (err) {
        setError(err instanceof Error ? err.message : errorMessage);
        setRecords([]);
        setSelectedId('');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cegAzonosito]);

  return { records, selectedId, setSelectedId, isLoading, error };
}
