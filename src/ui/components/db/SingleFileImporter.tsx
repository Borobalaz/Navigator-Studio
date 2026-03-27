import { useMemo } from 'react';
import { FileInput } from '../FileList/FileInput';
import { Button } from '../inputs/Button';
import type { ExcelImportResult } from '../../../db';

export type SingleImportView = {
  path: string;
  result: ExcelImportResult;
};

type SingleFileImporterProps = {
  isImportRunning: boolean;
  onImport: () => void;
  onFilesSelected: (paths: string[]) => void;
  result: SingleImportView | null;
};

export function SingleFileImporter({
  isImportRunning,
  onImport,
  onFilesSelected,
  result,
}: SingleFileImporterProps) {
  const summary = useMemo(() => {
    if (!result) {
      return null;
    }

    return Object.entries(result.result.tablankentiRekordok).sort(([a], [b]) => a.localeCompare(b));
  }, [result]);

  return (
    <section className="database-manager-section">
      <h3>Cég import</h3>
      <FileInput
        text="Excel"
        onFilesSelected={onFilesSelected}
        acceptFileTypes={['.xlsx', '.xlsm', '.xlsb', '.xls']}
        multiple={false}
      />
      <div className="database-manager-actions">
        <Button
          onClick={onImport}
          text={isImportRunning ? 'Import folyamatban...' : 'Betöltés'}
        />
      </div>

      {result && (
        <div className="database-manager-result">
          <strong>Utolso import:</strong>
          <div>{result.path}</div>
          <div>CegAzonosito: {result.result.cegAzonosito}</div>
          <div>SorokSzama: {result.result.sorokSzama}</div>
          <ul>
            {summary?.map(([tabla, count]) => (
              <li key={tabla}>
                {tabla}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
