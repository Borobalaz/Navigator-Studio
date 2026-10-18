import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../ui/components/inputs/Button';
import { LabeledDropdown } from '../../ui/components/inputs/LabeledDropdown';
import { LabeledTextInput } from '../../ui/components/inputs/LabeledTextInput';
import { COMPANY_COURT_OPTIONS } from '../../helpers/companyCourtOptions';
import './PdfCreatorCommon.css';
import { useCompanies } from '../../hooks/useCompanies';
import { CompanySelector } from '../../ui/components/inputs/CompanySelector';
import { useRepresentatives } from '../../hooks/useRepresentatives';
import { usePdfGenerationFlow } from '../../hooks/usePdfGenerationFlow';
import { PdfResultPanel } from '../../ui/components/PdfResultPanel';

type TszDontesInputs = {
  court: string;
  gatheringDate: string;
  dissolutionDate: string;
  documentDate: string;
  dissolverPerson: string;
  memberPerson: string;
};

export function TszDontesScreen() {
  const { companies, selectedCompanyId, setSelectedCompanyId, error: companiesError } = useCompanies();
  const { representatives, isLoading: isRepresentativesLoading, error: representativesError } = useRepresentatives(selectedCompanyId);
  const { outputFolder, isLoading, result, errorMessage, setErrorMessage, pickOutputFolder, generate } = usePdfGenerationFlow(companiesError || '');

  const [inputs, setInputs] = useState<TszDontesInputs>({
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
  }, [companiesError, representativesError, setErrorMessage]);

  const setInputValue = (key: keyof TszDontesInputs, value: string) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const buildPayload = () => {
    if (!selectedCompany) {
      return null;
    }

    const safeCompanyName = (selectedCompany['Megnevezése'] || 'ceg').replace(/[\\/:*?"<>|]/g, '_');
    const outputPath = `${outputFolder}\\taggyulesi-hatarozat-dontes-${safeCompanyName}.pdf`;

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

  const validate = () => {
    if (!inputs.court || !inputs.gatheringDate || !inputs.dissolutionDate || !inputs.documentDate || !inputs.dissolverPerson) {
      return 'Töltsd ki a kötelező mezőket a taggyűlési határozathoz.';
    }
    return null;
  };

  const handleGeneratePdf = () => generate({
    companyId: selectedCompanyId,
    templateId: 'tsz-dontes',
    buildPayload,
    validate,
  });

  return (
    <div className="screen-base pdf-creator-screen">
      <div className="pdf-creator-panel">
        <h2>Taggyűlési Határozat döntésről</h2>
        <p style={{ textAlign: 'center' }}>Döntés egyszerűsített végelszámolási eljárás elindításáról</p>

        <section className="pdf-creator-section">
          <div className="pdf-creator-options">
            <div className="pdf-creator-input-grid">
              <CompanySelector
                id="tsz-dontes-company-select"
                label="Cég"
                companies={companies}
                value={selectedCompanyId}
                onChange={setSelectedCompanyId}
                disabled={isLoading}
              />

              <LabeledDropdown
                id="tsz-dontes-court"
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
                id="tsz-dontes-dissolver-person"
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
                id="tsz-dontes-gathering-date"
                label="Taggyűlés dátuma"
                value={inputs.gatheringDate}
                onChange={(value) => setInputValue('gatheringDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="tsz-dontes-dissolution-date"
                label="Végelszámolás kezdő időpontja"
                value={inputs.dissolutionDate}
                onChange={(value) => setInputValue('dissolutionDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="tsz-dontes-document-date"
                label="Kelt dátuma (YYYY-MM-DD)"
                value={inputs.documentDate}
                onChange={(value) => setInputValue('documentDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="tsz-dontes-member-person"
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

        <PdfResultPanel errorMessage={errorMessage} result={result} />
      </div>
    </div>
  );
}
