import { useState } from 'react';
import {
  importExcelDirectoryToDb,
  importExcelToDb,
  type DeduplicationMode,
  type DirectoryImportResult,
} from '../../../db';
import { SingleFileImporter, type SingleImportView } from './SingleFileImporter';
import { DirectoryImporter } from './DirectoryImporter';
import '../../../screens/DatabaseManagerScreen.css';

export function DatabaseImporterPanel() {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('');
  const [directoryPath, setDirectoryPath] = useState<string>('');
  const [deduplicationMode, setDeduplicationMode] = useState<DeduplicationMode>('replace-company-children');
  const [isSingleImportRunning, setIsSingleImportRunning] = useState<boolean>(false);
  const [isDirectoryImportRunning, setIsDirectoryImportRunning] = useState<boolean>(false);
  const [isDirectoryPickerRunning, setIsDirectoryPickerRunning] = useState<boolean>(false);
  const [singleImportResult, setSingleImportResult] = useState<SingleImportView | null>(null);
  const [directoryImportResult, setDirectoryImportResult] = useState<DirectoryImportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const runSingleImport = async () => {
    if (!selectedFilePath) {
      setErrorMessage('Valassz ki egy Excel fajlt az importhoz.');
      return;
    }

    setErrorMessage('');
    setIsSingleImportRunning(true);

    try {
      const bytes = await window.api.readBinaryFile(selectedFilePath);
      const fileName = selectedFilePath.replace(/\\/g, '/').split('/').pop() ?? 'import.xlsx';

      const result = await importExcelToDb(bytes, {
        forrasFajlNev: fileName,
        deduplicationMode,
      });

      setSingleImportResult({
        path: selectedFilePath,
        result,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsSingleImportRunning(false);
    }
  };

  const runDirectoryImport = async () => {
    if (!directoryPath.trim()) {
      setErrorMessage('Add meg az import mappat.');
      return;
    }

    setErrorMessage('');
    setIsDirectoryImportRunning(true);

    try {
      const result = await importExcelDirectoryToDb(directoryPath.trim(), {
        deduplicationMode,
        stopOnError: false,
      });

      setDirectoryImportResult(result);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsDirectoryImportRunning(false);
    }
  };

  const pickDirectory = async () => {
    setErrorMessage('');
    setIsDirectoryPickerRunning(true);

    try {
      const selectedPath = await window.api.selectFolder(directoryPath || undefined);
      if (selectedPath) {
        setDirectoryPath(selectedPath);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsDirectoryPickerRunning(false);
    }
  };

  return (
    <div className="database-manager-panel">
      <h2>Cégek importálása</h2>

      <div className="database-manager-options">
        <label>
          Import mód kiválasztása
          <select
            value={deduplicationMode}
            onChange={(e) => setDeduplicationMode(e.target.value as DeduplicationMode)}
          >
            <option value="none">Új cég létrehozása</option>
            <option value="replace-company-children">Cég frissítése</option>
          </select>
        </label>
      </div>

      <SingleFileImporter
        isImportRunning={isSingleImportRunning}
        onImport={() => {
          void runSingleImport();
        }}
        onFilesSelected={(paths) => setSelectedFilePath(paths[0] ?? '')}
        result={singleImportResult}
      />

      <DirectoryImporter
        directoryPath={directoryPath}
        isDirectoryPickerRunning={isDirectoryPickerRunning}
        isImportRunning={isDirectoryImportRunning}
        onPickDirectory={() => {
          void pickDirectory();
        }}
        onImport={() => {
          void runDirectoryImport();
        }}
        result={directoryImportResult}
      />

      {errorMessage && <div className="database-manager-error">{errorMessage}</div>}
    </div>
  );
}
