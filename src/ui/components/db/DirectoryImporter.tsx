import { Button } from '../inputs/Button';
import type { DirectoryImportResult } from '../../../db';

type DirectoryImporterProps = {
  directoryPath: string;
  isDirectoryPickerRunning: boolean;
  isImportRunning: boolean;
  onPickDirectory: () => void;
  onImport: () => void;
  result: DirectoryImportResult | null;
};

export function DirectoryImporter({
  directoryPath,
  isDirectoryPickerRunning,
  isImportRunning,
  onPickDirectory,
  onImport,
  result,
}: DirectoryImporterProps) {
  return (
    <section className="database-manager-section">
      <h3>Ceg mappa import</h3>

      <label className="database-manager-input-row">
        Mappa kivalasztasa
        <div className="database-manager-path-selector">
          <input
            type="text"
            value={directoryPath}
            readOnly
            placeholder="Valassz egy mappat"
          />
          <Button
            onClick={onPickDirectory}
            text={isDirectoryPickerRunning ? 'Valasztas...' : 'Mappa valasztasa'}
          />
        </div>
      </label>

      <div className="database-manager-actions">
        <Button
          onClick={onImport}
          text={isImportRunning ? 'Import folyamatban...' : 'Betöltés'}
        />
      </div>

      {result && (
        <div className="database-manager-result">
          <div>Total files: {result.totalFiles}</div>
          <div>Success: {result.successCount}</div>
          <div>Failed: {result.failedCount}</div>
          <ul>
            {result.files.map((file) => (
              <li key={file.filePath} className={file.success ? 'ok' : 'fail'}>
                {file.success ? 'OK' : 'HIBA'} - {file.fileName}
                {file.error ? ` (${file.error})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
