import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../ui/components/inputs/Button';
import { LabeledDropdown } from '../../ui/components/inputs/LabeledDropdown';
import { LabeledTextInput } from '../../ui/components/inputs/LabeledTextInput';
import { COMPANY_COURT_OPTIONS } from '../../helpers/companyCourtOptions';
import './PdfCreatorCommon.css';
import { useCompanies } from '../../hooks/useCompanies';
import { CompanySelector } from '../../ui/components/inputs/CompanySelector';
import { useRepresentatives } from '../../hooks/useRepresentatives';

type GenerationResult = {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
};

type TszFolytInputs = {
  court: string;
  gatheringDate: string;
  dissolutionDate: string;
  documentDate: string;
  dissolverPerson: string;
  memberPerson: string;
};

export function TszFolytScreen() {
  const { companies, selectedCompanyId, setSelectedCompanyId, error: companiesError } = useCompanies();
  const { representatives, isLoading: isRepresentativesLoading, error: representativesError } = useRepresentatives(selectedCompanyId);
  const [errorMessage, setErrorMessage] = useState(companiesError || '');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [outputFolder, setOutputFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState<TszFolytInputs>({
    court: '',
    gatheringDate: '',
    dissolutionDate: '',
    documentDate: new Date().toISOString().slice(0, 10),
    dissolverPerson: '',
    memberPerson: '',
  });

  const selectedCompany = useMemo(
    () => companies.find((company) => company['CégAzonosító'] === selectedCompanyId) ?? null,
    [companies, selectedCompanyId],
  );

  useEffect(() => {
    if (companiesError || representativesError) {
      setErrorMessage(companiesError || representativesError || '');
    }
  }, [companiesError, representativesError]);

  const pickOutputFolder = async () => {
    const folder = await window.api.selectFolder(outputFolder || undefined);
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const setInputValue = (key: keyof TszFolytInputs, value: string) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const buildPayload = () => {
    if (!selectedCompany) {
      return null;
    }

    const safeCompanyName = (selectedCompany['Megnevezése'] || 'ceg').replace(/[\\/:*?"<>|]/g, '_');
    const outputPath = `${outputFolder}\\taggyulesi-hatarozat-${safeCompanyName}.pdf`;

    return {
      outputPath,
      payload: {
        company: {
          name: selectedCompany['Megnevezése'],
          registrationNumber: selectedCompany['Cégnyilvántartási száma'],
          court: inputs.court,
        },
        document: {
          gatheringDate: inputs.gatheringDate,
          dissolutionDate: inputs.dissolutionDate,
          dissolverPerson: inputs.dissolverPerson,
          memberPerson: inputs.memberPerson || undefined,
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

    if (!inputs.court || !inputs.gatheringDate || !inputs.dissolutionDate || !inputs.documentDate || !inputs.dissolverPerson) {
      setErrorMessage('Töltsd ki a kötelező mezőket a taggyűlési határozathoz.');
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
        templateId: 'tsz-folyt',
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
        <h2>Taggyűlési Határozat működés folytatásáról</h2>
        <p style={{ textAlign: 'center' }}>Folyamatban lévő végelszámolás közbeni döntés a működés folytatásáról</p>
        <section className="pdf-creator-section">
          <div className="pdf-creator-options">
            <div className="pdf-creator-input-grid">
              <CompanySelector
                id="tsz-folyt-company-select"
                label="Cég"
                companies={companies}
                value={selectedCompanyId}
                onChange={setSelectedCompanyId}
                disabled={isLoading}
              />


              <LabeledDropdown
                id="tsz-folyt-court"
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
                id="tsz-folyt-dissolver-person"
                label="Végelszámoló (képviselő)"
                value={inputs.dissolverPerson}
                onChange={(value) => setInputValue('dissolverPerson', value)}
                disabled={isLoading || isRepresentativesLoading || !selectedCompanyId || representatives.length === 0}
                options={[
                  { value: '', label: '-- Válassz képviselőt --' },
                  ...representatives.map((kepviselo) => ({
                    value: kepviselo['név/elnevezés'],
                    label: `${kepviselo['név/elnevezés']} (${kepviselo['adóazonosító jel/adószám'] || '-'})`,
                  })),
                ]}
              />

              <LabeledTextInput
                id="tsz-folyt-gathering-date"
                label="Taggyűlés dátuma"
                value={inputs.gatheringDate}
                onChange={(value) => setInputValue('gatheringDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="tsz-folyt-dissolution-date"
                label="Végelszámolás befejezésének dátuma"
                value={inputs.dissolutionDate}
                onChange={(value) => setInputValue('dissolutionDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="tsz-folyt-document-date"
                label="Kelt dátuma (YYYY-MM-DD)"
                value={inputs.documentDate}
                onChange={(value) => setInputValue('documentDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="tsz-folyt-member-person"
                label="Aláíró tag neve (opcionális)"
                value={inputs.memberPerson}
                onChange={(value) => setInputValue('memberPerson', value)}
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
