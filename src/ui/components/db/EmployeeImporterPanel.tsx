import { useEffect, useMemo, useState } from 'react';
import { FileInput } from '../FileList/FileInput';
import { Button } from '../inputs/Button';
import {
  cegekRepository,
  importEmployeesCsvToDb,
  type CegRecord,
  type EmployeeCsvImportResult,
} from '../../../db';
import '../../../screens/DatabaseManagerScreen.css';

export function EmployeeImporterPanel() {
  const [companies, setCompanies] = useState<CegRecord[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [selectedCsvPath, setSelectedCsvPath] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<EmployeeCsvImportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const records = await cegekRepository.listAll();
        records.sort((a, b) => (a['Megnevezése'] ?? '').localeCompare(b['Megnevezése'] ?? ''));
        setCompanies(records);

        if (records.length > 0) {
          setSelectedCompanyId(records[0]['CégAzonosító']);
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : String(error));
      }
    };

    void loadCompanies();
  }, []);

  const selectedCompany = useMemo(
    () => companies.find((company) => company['CégAzonosító'] === selectedCompanyId) ?? null,
    [companies, selectedCompanyId],
  );

  const runImport = async () => {
    if (!selectedCompanyId) {
      setErrorMessage('Valassz ceget az importhoz.');
      return;
    }

    if (!selectedCsvPath) {
      setErrorMessage('Valassz ki egy CSV fajlt az importhoz.');
      return;
    }

    setErrorMessage('');
    setResult(null);
    setIsRunning(true);

    try {
      const bytes = await window.api.readBinaryFile(selectedCsvPath);
      const fileName = selectedCsvPath.replace(/\\/g, '/').split('/').pop() ?? 'employees.csv';

      const importResult = await importEmployeesCsvToDb(bytes, {
        cegAzonosito: selectedCompanyId,
        forrasFajlNev: fileName,
      });

      setResult(importResult);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="database-manager-panel">
      <h2>Munkavállalók betöltése</h2>

      <div className="database-manager-options">
        <label>
          Cég kiválasztása
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            {companies.length === 0 && <option value="">Nincs cég az adatbázisban</option>}
            {companies.map((company) => (
              <option key={company['CégAzonosító']} value={company['CégAzonosító']}>
                {company['Megnevezése']} ({company['Adószáma']})
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="database-manager-section">
        <h3>Munkavállalók CSV import</h3>
        <FileInput
          text="CSV"
          onFilesSelected={(paths) => setSelectedCsvPath(paths[0] ?? '')}
          acceptFileTypes={['.csv', '.txt']}
          multiple={false}
        />
        <div className="database-manager-actions">
          <Button
            onClick={() => {
              void runImport();
            }}
            text={isRunning ? 'Import folyamatban...' : 'Betöltés'}
          />
        </div>

        {result && (
          <div className="database-manager-result">
            <div>Cég: {selectedCompany?.['Megnevezése'] ?? result.cegAzonosito}</div>
            <div>Forrás fájl: {result.forrasFajlNev}</div>
            <div>Feldolgozott sorok: {result.feldolgozottSorok}</div>
            <div>Importált sorok: {result.importaltSorok}</div>
            <div>Kihagyott sorok: {result.kihagyottSorok}</div>
          </div>
        )}
      </section>

      {errorMessage && <div className="database-manager-error">{errorMessage}</div>}
    </div>
  );
}
