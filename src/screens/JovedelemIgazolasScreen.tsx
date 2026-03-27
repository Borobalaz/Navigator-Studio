import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/components/inputs/Button';
import { LabeledTextInput } from '../ui/components/inputs/LabeledTextInput';
import './JovedelemIgazolasScreen.css';

import {
  cegekRepository,
  munkavallalokRepository,
  type CegRecord,
  type MunkavallaloRecord,
} from '../db';

type GenerationResult = {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
};

type ManualEmploymentInputs = {
  grossMonthlySalary: string;
  year: string;
  firstMonth: string;
  secondMonth: string;
  thirdMonth: string;
  firstMonthNetIncome: string;
  secondMonthNetIncome: string;
  thirdMonthNetIncome: string;
  deductions: string;
};

function getEmployeeValue(employee: MunkavallaloRecord, keys: string[]): string {
  const row = employee as unknown as Record<string, unknown>;

  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}

export function JovedelemIgazolasScreen() {
  const [companies, setCompanies] = useState<CegRecord[]>([]);
  const [employees, setEmployees] = useState<MunkavallaloRecord[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [outputFolder, setOutputFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [inputs, setInputs] = useState<ManualEmploymentInputs>({
    grossMonthlySalary: '',
    year: String(new Date().getFullYear()),
    firstMonth: '',
    secondMonth: '',
    thirdMonth: '',
    firstMonthNetIncome: '',
    secondMonthNetIncome: '',
    thirdMonthNetIncome: '',
    deductions: '',

  });

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const allCompanies = await cegekRepository.listAll();
        allCompanies.sort((a, b) => (a['Megnevezése'] ?? '').localeCompare(b['Megnevezése'] ?? ''));
        setCompanies(allCompanies);
        if (allCompanies.length > 0) {
          setSelectedCompanyId(allCompanies[0]['CégAzonosító']);
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Cégek betöltése sikertelen.');
      }
    };

    void loadCompanies();
  }, []);

  useEffect(() => {
    const loadEmployees = async () => {
      if (!selectedCompanyId) {
        setEmployees([]);
        setSelectedEmployeeId('');
        return;
      }

      try {
        const records = await munkavallalokRepository.listByCegAzonosito(selectedCompanyId);
        records.sort((a, b) => (a['Név'] ?? '').localeCompare(b['Név'] ?? ''));
        setEmployees(records);
        setSelectedEmployeeId(records[0]?.['MunkavállalóAzonosító'] ?? '');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Munkavállalók betöltése sikertelen.');
        setEmployees([]);
        setSelectedEmployeeId('');
      }
    };

    void loadEmployees();
  }, [selectedCompanyId]);

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

  const setInputValue = (key: keyof ManualEmploymentInputs, value: string) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const buildPayload = () => {
    if (!selectedCompany || !selectedEmployee) {
      return null;
    }

    const safeEmployeeName = (selectedEmployee['Név'] || 'munkavallalo').replace(/[\\/:*?"<>|]/g, '_');
    const outputPath = `${outputFolder}\\jovedelemigazolas-mco-${safeEmployeeName}.pdf`;

    return {
      outputPath,
      payload: {
        employee: {
          name: selectedEmployee['Név'] || '',
          maidenName: getEmployeeValue(selectedEmployee, ['Szül.név']),
          motherName: getEmployeeValue(selectedEmployee, ['Anyja neve']),
          birthPlaceAndDate: `${getEmployeeValue(selectedEmployee, ['Szül.hely'])}${getEmployeeValue(selectedEmployee, ['Szül.idő']) ? `, ${getEmployeeValue(selectedEmployee, ['Szül.idő'])}` : ''}`,
          permanentAddress: [
            getEmployeeValue(selectedEmployee, ['Állcím-irsz']),
            getEmployeeValue(selectedEmployee, ['Állcím-hely']),
            getEmployeeValue(selectedEmployee, ['Állcím-utca']),
            getEmployeeValue(selectedEmployee, ['Állcím-jelleg']),
            getEmployeeValue(selectedEmployee, ['Állcím-hsz']),
          ].filter((part) => part).join(' '),
          temporaryAddress: [
            getEmployeeValue(selectedEmployee, ['Levcím-irsz']),
            getEmployeeValue(selectedEmployee, ['Levcím-hely']),
            getEmployeeValue(selectedEmployee, ['Levcím-utca']),
            getEmployeeValue(selectedEmployee, ['Levcím-jelleg']),
            getEmployeeValue(selectedEmployee, ['Levcím-hsz']),
          ].filter((part) => part).join(' '),
          taxId: selectedEmployee['Adóazon'] || selectedEmployee['Azonosító'] || '',
          taj: selectedEmployee['TAJ'] || '',
        },
        employer: {
          name: selectedCompany['Megnevezése'] || '',
          registrationNumber: selectedCompany['Cégnyilvántartási száma'] || '',
          registeredOffice: selectedCompany['Székhelycíme'] || '',
          operationStart: selectedCompany['Tevékenység kezdés dátuma'] || '',
          taxNumber: selectedCompany['Adószáma'] || '',
          activity: selectedCompany['Főtevékenység'] || '',
        },
        employment: {
          occupation: selectedEmployee['FEOR'] || '',
          weeklyHours: selectedEmployee['Telj/rész'] === 'Teljes' ? '40' : selectedEmployee['Részidő'] || '',
          startDate: selectedEmployee['Jogviszony kezdete'] || '',
          grossMonthlySalary: inputs.grossMonthlySalary,
          year: inputs.year,
          firstMonth: inputs.firstMonth,
          secondMonth: inputs.secondMonth,
          thirdMonth: inputs.thirdMonth,
          firstMonthNetIncome: inputs.firstMonthNetIncome,
          secondMonthNetIncome: inputs.secondMonthNetIncome,
          thirdMonthNetIncome: inputs.thirdMonthNetIncome,
          deductions: inputs.deductions,
          contractType: getEmployeeValue(selectedEmployee, ['Munkaszerződés típusa', 'Munkaszerzodes tipusa']),
        },
        document: {
          place: 'Budapest',
          date: new Date().toISOString().slice(0, 10),
          representative: getEmployeeValue(selectedEmployee, ['Képviselő', 'Kepviselo']),
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

    if (!inputs.grossMonthlySalary || !inputs.year || !inputs.firstMonth || !inputs.secondMonth || !inputs.thirdMonth || !inputs.firstMonthNetIncome || !inputs.secondMonthNetIncome || !inputs.thirdMonthNetIncome) {
      setErrorMessage('Töltsd ki a kötelező mezőket: bruttó bér, év, hónapok, havi netto jövedelem.');
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
        templateId: 'jovedelemigazolas-mco',
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
    <div className="jovedelem-igazolas-screen">
      <div className="pdf-creator-panel">
        <h2>Jövedelemigazolás</h2>

        <section className="pdf-creator-section">
          <div className="pdf-creator-options">
            <div className="jovedelem-base-fields">
              <div>
                <label htmlFor="mco-company-select">Cég</label>
                <select
                  id="mco-company-select"
                  value={selectedCompanyId}
                  onChange={(event) => setSelectedCompanyId(event.target.value)}
                  disabled={isLoading}
                >
                  <option value="">-- Válassz céget --</option>
                  {companies.map((company) => (
                    <option key={company['CégAzonosító']} value={company['CégAzonosító']}>
                      {company['Megnevezése']}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mco-employee-select">Munkavállaló</label>
                <select
                  id="mco-employee-select"
                  value={selectedEmployeeId}
                  onChange={(event) => setSelectedEmployeeId(event.target.value)}
                  disabled={isLoading || !selectedCompanyId}
                >
                  <option value="">-- Válassz munkavállalót --</option>
                  {employees.map((employee) => (
                    <option key={employee['MunkavállalóAzonosító']} value={employee['MunkavállalóAzonosító']}>
                      {employee['Név']}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="jovedelem-input-grid">
              <LabeledTextInput
                id="mco-gross-salary"
                label="Bruttó havi fizetés"
                value={inputs.grossMonthlySalary}
                onChange={(value) => setInputValue('grossMonthlySalary', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-year"
                label="Év"
                value={inputs.year}
                onChange={(value) => setInputValue('year', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-first-month"
                label="1. hónap"
                value={inputs.firstMonth}
                onChange={(value) => setInputValue('firstMonth', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-first-month-net"
                label="1. hónap nettó jövedelem"
                value={inputs.firstMonthNetIncome}
                onChange={(value) => setInputValue('firstMonthNetIncome', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-second-month"
                label="2. hónap"
                value={inputs.secondMonth}
                onChange={(value) => setInputValue('secondMonth', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-second-month-net"
                label="2. hónap nettó jövedelem"
                value={inputs.secondMonthNetIncome}
                onChange={(value) => setInputValue('secondMonthNetIncome', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-third-month"
                label="3. hónap"
                value={inputs.thirdMonth}
                onChange={(value) => setInputValue('thirdMonth', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-third-month-net"
                label="3. hónap nettó jövedelem"
                value={inputs.thirdMonthNetIncome}
                onChange={(value) => setInputValue('thirdMonthNetIncome', value)}
                disabled={isLoading}
              />

              <LabeledTextInput
                id="mco-deductions"
                label="Levonások munkabérből"
                value={inputs.deductions}
                onChange={(value) => setInputValue('deductions', value)}
                disabled={isLoading}
              />

              <div className="jovedelem-output-row">
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
