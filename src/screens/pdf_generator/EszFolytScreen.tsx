import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../ui/components/inputs/Button';
import { LabeledDropdown } from '../../ui/components/inputs/LabeledDropdown';
import { LabeledTextInput } from '../../ui/components/inputs/LabeledTextInput';
import { COMPANY_COURT_OPTIONS } from '../../helpers/companyCourtOptions';
import './PdfCreatorCommon.css';
import { useCompanies } from '../../hooks/useCompanies';
import { CompanySelector } from '../../ui/components/inputs/CompanySelector';
import { useOwners } from '../../hooks/useOwners';

type GenerationResult = {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
};

type EszFolytInputs = {
  court: string;
  dissolutionDate: string;
  documentDate: string;
  dissolverPerson: string;
};

export function EszFolytScreen() {
  const { companies, selectedCompanyId, setSelectedCompanyId, error: companiesError } = useCompanies();
  const { owners, isLoading: isOwnersLoading, error: ownersError } = useOwners(selectedCompanyId);
  const [errorMessage, setErrorMessage] = useState(companiesError || '');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [outputFolder, setOutputFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState<EszFolytInputs>({
    court: '',
    dissolutionDate: '',
    documentDate: new Date().toISOString().slice(0, 10),
    dissolverPerson: '',
  });

  const selectedCompany = useMemo(
    () => companies.find((company) => company['CégAzonosító'] === selectedCompanyId) ?? null,
    [companies, selectedCompanyId],
  );

  useEffect(() => {
    if (companiesError || ownersError) {
      setErrorMessage(companiesError || ownersError || '');
    }
  }, [companiesError, ownersError]);

  const pickOutputFolder = async () => {
    const folder = await window.api.selectFolder(outputFolder || undefined);
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const setInputValue = (key: keyof EszFolytInputs, value: string) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const buildPayload = () => {
    if (!selectedCompany) {
      return null;
    }

    const safeCompanyName = (selectedCompany['Megnevezése'] || 'ceg').replace(/[\\/:*?"<>|]/g, '_');
    const outputPath = `${outputFolder}\\alapitoi-hatarozat-folytatas-${safeCompanyName}.pdf`;

    return {
      outputPath,
      payload: {
        company: {
          name: selectedCompany['Megnevezése'],
          registrationNumber: selectedCompany['Cégnyilvántartási száma'],
          court: inputs.court,
        },
        document: {
          dissolutionDate: inputs.dissolutionDate,
          dissolverPerson: inputs.dissolverPerson,
          date: inputs.documentDate,
        },
      },
    };
  };

  const handleGeneratePdf = async () => {
    setErrorMessage('');
    setResult(null);

    if (!selectedCompanyId) {
      setErrorMessage('Válassz céget.');
      return;
    }

    if (!outputFolder) {
      setErrorMessage('Válassz kimeneti mappát.');
      return;
    }

    if (!inputs.court || !inputs.dissolutionDate || !inputs.documentDate || !inputs.dissolverPerson) {
      setErrorMessage('Töltsd ki a kötelező mezőket az alapítói határozathoz.');
      return;
    }

    const data = buildPayload();
    if (!data) {
      setErrorMessage('Nincs elég adat a PDF generáláshoz.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await window.api.createSchematicPdf({
        companyId: selectedCompanyId,
        templateId: 'esz-folyt',
        payload: data.payload,
        outputPath: data.outputPath,
        autoOpen: true,
      });
      setResult(response);
    } catch (e) {
      setResult({
        success: false,
        error: e instanceof Error ? e.message : 'Ismeretlen hiba',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="screen-base pdf-creator-screen">
      <div className="pdf-creator-panel">
        <h2>Alapítói Határozat működés folytatásáról</h2>
        <p style={{ textAlign: 'center' }}>Végelszámolás megszüntetése és tevékenység továbbfolytatása</p>

        <section className="pdf-creator-section">
          <div className="pdf-creator-options">
            <div className="pdf-creator-input-grid">
              <CompanySelector
                id="esz-folyt-company-select"
                label="Cég"
                companies={companies}
                value={selectedCompanyId}
                onChange={setSelectedCompanyId}
                disabled={isLoading}
              />

              <LabeledDropdown
                id="esz-folyt-court"
                label="Cégjegyzéket vezető bíróság"
                value={inputs.court}
                onChange={(value) => setInputValue('court', value)}
                disabled={isLoading}
                options={[
                  { value: '', label: '-- Válassz cégbíróságot --' },
                  ...COMPANY_COURT_OPTIONS.map((court) => ({ value: court, label: court })),
                ]}
              />

              <LabeledDropdown
                id="esz-folyt-dissolver-person"
                label="Alapító (tulajdonos)"
                value={inputs.dissolverPerson}
                onChange={(value) => setInputValue('dissolverPerson', value)}
                disabled={isLoading || isOwnersLoading || !selectedCompanyId || owners.length === 0}
                options={[
                  { value: '', label: '-- Válassz tulajdonost --' },
                  ...owners.map((owner) => ({
                    value: owner['Neve'],
                    label: `${owner['Neve']} (${owner['Adóazonosító jele'] || '-'})`,
                  })),
                ]}
              />

              <LabeledTextInput
                id="esz-folyt-dissolution-date"
                label="Végelszámolás kezdő időpontja"
                value={inputs.dissolutionDate}
                onChange={(value) => setInputValue('dissolutionDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="esz-folyt-document-date"
                label="Kelt dátuma (YYYY-MM-DD)"
                value={inputs.documentDate}
                onChange={(value) => setInputValue('documentDate', value)}
                disabled={isLoading}
              />

              <div className="pdf-creator-output-row">
                <div className="pdf-creator-actions">
                  <Button text="Pdf helye" onClick={() => void pickOutputFolder()} />
                </div>
                {outputFolder && <p>{outputFolder}</p>}
              </div>
            </div>
          </div>

          <div className="pdf-creator-actions">
            <Button text={isLoading ? 'Generálás...' : 'Generálás'} onClick={() => void handleGeneratePdf()} />
          </div>
        </section>

        {errorMessage && <div className="pdf-creator-result error"><p>{errorMessage}</p></div>}

        {result && (
          <div className={`pdf-creator-result ${result.success ? 'success' : 'error'}`}>
            {result.success ? (
              <>
                <p><strong>Sikeres PDF generálás</strong></p>
                {result.outputPath && <p>Helye: {result.outputPath}</p>}
                {result.pageCount && <p>Oldalak száma: {result.pageCount}</p>}
              </>
            ) : (
              <p>{result.error || 'Hiba történt PDF generálás közben.'}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
