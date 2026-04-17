import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../ui/components/inputs/Button';
import { CompanySelector } from '../../ui/components/inputs/CompanySelector';
import { EmployeeSelector } from '../../ui/components/inputs/EmployeeSelector';
import { LabeledDropdown } from '../../ui/components/inputs/LabeledDropdown';
import { LabeledTextInput } from '../../ui/components/inputs/LabeledTextInput';
import { useCompanies } from '../../hooks/useCompanies';
import { useEmployees } from '../../hooks/useEmployees';
import { COMPANY_COURT_OPTIONS } from '../../helpers/companyCourtOptions';
import { getEmployeeValue } from '../../helpers/getEmployeeValue';
import { formatNumberWithDot } from '../../helpers/formatNumberWithDot';
import './PdfCreatorCommon.css';

import { getFEORName } from '../../db';

type GenerationResult = {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
};

type ManualContractInputs = {
  court: string;
  startDate: string;
  trialPeriod: string;
  jobTitle: string;
  weeklyHours: string;
  monthlyGrossSalary: string;
  workplace: string;
  documentPlace: string;
  documentDate: string;
};

export function MunkaszerzodesCreatorScreen() {
  const { companies, selectedCompanyId, setSelectedCompanyId, error: companiesError } = useCompanies();
  const { employees, selectedEmployeeId, setSelectedEmployeeId, error: employeesError } = useEmployees(selectedCompanyId);
  const [outputFolder, setOutputFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(companiesError || employeesError || '');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [inputs, setInputs] = useState<ManualContractInputs>({
    court: '',
    startDate: '',
    trialPeriod: '3',
    jobTitle: '',
    weeklyHours: '',
    monthlyGrossSalary: '',
    workplace: '',
    documentPlace: 'Kecskemét',
    documentDate: new Date().toISOString().slice(0, 10),
  });

  // Update error message if company or employee loading fails
  useEffect(() => {
    if (companiesError || employeesError) {
      setErrorMessage(companiesError || employeesError || '');
    }
  }, [companiesError, employeesError]);

  const selectedCompany = useMemo(
    () => companies.find((company) => company['CégAzonosító'] === selectedCompanyId) ?? null,
    [companies, selectedCompanyId],
  );

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee['MunkavállalóAzonosító'] === selectedEmployeeId) ?? null,
    [employees, selectedEmployeeId],
  );

  const pickOutputFolder = async () => {
    const folder = await window.api.selectFolder(outputFolder || undefined);
    if (folder) {
      setOutputFolder(folder);
    }
  };

  // Pre-fill contract fields based on selected employee and company data
  useEffect(() => {
    if (!selectedCompany || !selectedEmployee) {
      return;
    }

    const defaultJobTitle = selectedEmployee['FEOR']
      ? `${getFEORName(selectedEmployee['FEOR'])}`
      : '';
    const defaultWeeklyHours = selectedEmployee['Telj/rész'] === 'Telj' ? '40' : formatNumberWithDot(selectedEmployee['Részidő']);
    const defaultWorkplace = selectedCompany['Székhelycíme'] || '';
    const defaultSalary = formatNumberWithDot(selectedEmployee['Bes.bér']);

    setInputs((previous) => ({
      ...previous,
      startDate: selectedEmployee['Jvkezd'] || previous.startDate,
      jobTitle: defaultJobTitle || previous.jobTitle,
      weeklyHours: defaultWeeklyHours || previous.weeklyHours,
      monthlyGrossSalary: defaultSalary || previous.monthlyGrossSalary,
      workplace: defaultWorkplace || previous.workplace,
    }));
  }, [selectedCompany, selectedEmployee]);

  const setInputValue = (key: keyof ManualContractInputs, value: string) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const setNumberInputValue = (key: 'trialPeriod' | 'weeklyHours' | 'monthlyGrossSalary', value: string) => {
    setInputValue(key, formatNumberWithDot(value));
  };

  // Create data struct for the template 
  const buildPayload = () => {
    if (!selectedCompany || !selectedEmployee) {
      return null;
    }

    const safeEmployeeName = (selectedEmployee['Név'] || 'munkavallalo').replace(/[\\/:*?"<>|]/g, '_');
    const outputPath = `${outputFolder}\\munkaszerzodes-${safeEmployeeName}.pdf`;

    return {
      outputPath,
      payload: {
        employee: {
          name: selectedEmployee['Név'] || '',
          motherName: getEmployeeValue(selectedEmployee, ['Anyja neve']),
          birthPlaceAndDate: `${getEmployeeValue(selectedEmployee, ['Szül.hely'])}${getEmployeeValue(selectedEmployee, ['Szül.idő']) ? `, ${getEmployeeValue(selectedEmployee, ['Szül.idő'])}` : ''}`,
          address: [
            getEmployeeValue(selectedEmployee, ['Állcím-irsz']),
            getEmployeeValue(selectedEmployee, ['Állcím-hely']),
            getEmployeeValue(selectedEmployee, ['Állcím-utca']),
            getEmployeeValue(selectedEmployee, ['Állcím-jelleg']),
            getEmployeeValue(selectedEmployee, ['Állcím-hsz']),
          ].filter((part) => part).join(' '),
          taxId: selectedEmployee['Adóazon'] || '',
          tajNumber: selectedEmployee['TAJ'] || '',
        },
        employer: {
          name: selectedCompany['Megnevezése'] || '',
          court: inputs.court,
          registrationNumber: selectedCompany['Cégnyilvántartási száma'] || '',
          registeredOffice: selectedCompany['Székhelycíme'] || '',
        },
        employment: {
          startDate: inputs.startDate,
          trialPeriod: inputs.trialPeriod,
          jobTitle: inputs.jobTitle,
          weeklyHours: inputs.weeklyHours,
          monthlyGrossSalary: inputs.monthlyGrossSalary,
          workplace: inputs.workplace,
        },
        document: {
          place: inputs.documentPlace,
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

    if (!selectedEmployeeId) {
      setErrorMessage('Válassz munkavállalót.');
      return;
    }

    if (!outputFolder) {
      setErrorMessage('Válassz kimeneti mappát.');
      return;
    }

    if (!inputs.court || !inputs.startDate || !inputs.trialPeriod || !inputs.jobTitle || !inputs.weeklyHours || !inputs.monthlyGrossSalary || !inputs.workplace || !inputs.documentPlace || !inputs.documentDate) {
      setErrorMessage('Töltsd ki a kötelező mezőket a munkaszerződéshez.');
      return;
    }

    const data = buildPayload();
    if (!data) {
      setErrorMessage('Nincs eleg adat a PDF generalashoz.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await window.api.createSchematicPdf({
        companyId: selectedCompanyId,
        templateId: 'munkaszerzodes',
        payload: data.payload,
        outputPath: data.outputPath,
        autoOpen: true,
      });
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Ismeretlen hiba',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="screen-base pdf-creator-screen">
      <div className="pdf-creator-panel">
        <h2>Munkaszerződés</h2>

        <section className="pdf-creator-section">
          <div className="pdf-creator-options">
            <div className="pdf-creator-base-fields">
              <CompanySelector
                id="mco-company-select"
                label="Cég"
                companies={companies}
                value={selectedCompanyId}
                onChange={setSelectedCompanyId}
                disabled={isLoading}
              />

              <EmployeeSelector
                id="mco-employee-select"
                label="Munkavállaló"
                employees={employees}
                value={selectedEmployeeId}
                onChange={setSelectedEmployeeId}
                disabled={isLoading || !selectedCompanyId}
              />
            </div>

            <div className="pdf-creator-input-grid">

              <LabeledDropdown
                id="munkaszerzodes-court"
                label="Cégjegyzéket vezető bíróság"
                value={inputs.court}
                onChange={(value) => setInputValue('court', value)}
                disabled={isLoading}
                options={[
                  { value: '', label: '-- Válassz cégbíróságot --' },
                  ...COMPANY_COURT_OPTIONS.map((court) => ({ value: court, label: court })),
                ]}
              />

              <LabeledTextInput
                id="munkaszerzodes-start-date"
                label="Munkaviszony kezdete"
                value={inputs.startDate}
                onChange={(value) => setInputValue('startDate', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="munkaszerzodes-trial-period"
                label="Próbaidő (hónap)"
                value={inputs.trialPeriod}
                onChange={(value) => setNumberInputValue('trialPeriod', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="munkaszerzodes-job-title"
                label="Munkakör"
                value={inputs.jobTitle}
                onChange={(value) => setInputValue('jobTitle', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="munkaszerzodes-weekly-hours"
                label="Heti munkaidő (óra)"
                value={inputs.weeklyHours}
                onChange={(value) => setNumberInputValue('weeklyHours', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="munkaszerzodes-monthly-gross"
                label="Havi bruttó alapbér"
                value={inputs.monthlyGrossSalary}
                onChange={(value) => setNumberInputValue('monthlyGrossSalary', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="munkaszerzodes-workplace"
                label="Munkavégzés helye"
                value={inputs.workplace}
                onChange={(value) => setInputValue('workplace', value)}
                disabled={isLoading}
                defaultValue={selectedCompany ? selectedCompany['Székhelycíme'] : ''}
              />

              <LabeledTextInput
                id="munkaszerzodes-document-place"
                label="Kelt helye"
                value={inputs.documentPlace}
                onChange={(value) => setInputValue('documentPlace', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="munkaszerzodes-document-date"
                label="Kelt dátuma (YYYY-MM-DD)"
                value={inputs.documentDate}
                onChange={(value) => setInputValue('documentDate', value)}
                disabled={isLoading}
              />

              <div className="pdf-creator-output-row">
                <label>Kimeneti mappa</label>
                <div className="pdf-creator-actions">
                  <Button text="Mappa kiválasztása" onClick={() => void pickOutputFolder()} />
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
              <p>{result.error || 'Hiba tortent PDF generálás kozben.'}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
