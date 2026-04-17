import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  bankszamlaszamokRepository,
  cegGfoKapcsolatokRepository,
  cegTeaorKapcsolatokRepository,
  cimekRepository,
  kapcsolattartasiAdatokRepository,
  kepviselokRepository,
  kornyezetvedelmiTermekdijTetelekRepository,
  nyilatkozatokEsAdozasiAdatokRepository,
  tulajdonosokRepository,
} from '../db';
import { useCompanies } from '../hooks/useCompanies';
import { useEmployees } from '../hooks/useEmployees';
import { CompanySelector } from '../ui/components/inputs/CompanySelector';
import {
  type CompanyViewData,
  type ExcelLikeRow,
  buildBankszamlaRows,
  buildEmployeeRows,
  buildExcelLikeRows,
  buildKepviseloRows,
  buildTulajdonosRows,
} from '../helpers/DatabaseViewerHelpers';
import './DatabaseViewerScreen.css';

type ViewerMode = 'company' | 'employees' | 'kepviselok' | 'tulajdonosok' | 'bankszamlaszamok';

export function DatabaseViewerScreen() {
  const { companies, selectedCompanyId, setSelectedCompanyId, error: companiesError } = useCompanies();
  const { employees, error: employeesError } = useEmployees(selectedCompanyId);
  const [error, setError] = useState<string>(companiesError || employeesError || '');
  const [viewerMode, setViewerMode] = useState<ViewerMode>('company');
  const [companyData, setCompanyData] = useState<CompanyViewData | null>(null);

  const selectedCompany = useMemo(
    () => companies.find((c) => c['CégAzonosító'] === selectedCompanyId) ?? null,
    [companies, selectedCompanyId],
  );

  const excelRows = useMemo(() => {
    if (!selectedCompany) {
      return [] as ExcelLikeRow[];
    }

    if (viewerMode === 'employees') {
      return buildEmployeeRows(employees);
    }

    if (viewerMode === 'kepviselok') {
      return buildKepviseloRows(companyData?.kepviselok ?? []);
    }

    if (viewerMode === 'tulajdonosok') {
      return buildTulajdonosRows(companyData?.tulajdonosok ?? []);
    }

    if (viewerMode === 'bankszamlaszamok') {
      return buildBankszamlaRows(companyData?.bankszamlak ?? []);
    }

    if (!companyData) {
      return [] as ExcelLikeRow[];
    }

    return buildExcelLikeRows(selectedCompany, companyData);
  }, [selectedCompany, companyData, employees, viewerMode]);

  useEffect(() => {
    if (companiesError || employeesError) {
      setError(companiesError || employeesError || '');
    }
  }, [companiesError, employeesError]);

  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedCompanyId) {
        setCompanyData(null);
        return;
      }

      setError('');

      try {
        const [cimek, tevekenysegek, gfo, bankszamlak, kepviselok, tulajdonosok, nyilatkozatok, kapcsolatok, termekdijTetelek] = await Promise.all([
          cimekRepository.listByCegAzonosito(selectedCompanyId),
          cegTeaorKapcsolatokRepository.listByCegAzonosito(selectedCompanyId),
          cegGfoKapcsolatokRepository.listByCegAzonosito(selectedCompanyId),
          bankszamlaszamokRepository.listByCegAzonosito(selectedCompanyId),
          kepviselokRepository.listByCegAzonosito(selectedCompanyId),
          tulajdonosokRepository.listByCegAzonosito(selectedCompanyId),
          nyilatkozatokEsAdozasiAdatokRepository.listByCegAzonosito(selectedCompanyId),
          kapcsolattartasiAdatokRepository.listByCegAzonosito(selectedCompanyId),
          kornyezetvedelmiTermekdijTetelekRepository.listByCegAzonosito(selectedCompanyId),
        ]);

        setCompanyData({
          cimek,
          tevekenysegek,
          gfo,
          bankszamlak,
          kepviselok,
          tulajdonosok,
          nyilatkozatok,
          kapcsolatok,
          termekdijTetelek,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    };

    void loadDetails();
  }, [selectedCompanyId]);

  return (
    <div className="screen-base database-viewer-screen">
      <div className="database-viewer-toolbar">
        <CompanySelector
          id="database-viewer-company-select"
          label="Cég választása"
          companies={companies}
          value={selectedCompanyId}
          onChange={setSelectedCompanyId}
          showTaxNumber
          emptyLabel="Nincs adat"
        />
        <label>
          Megjelenítés
          <select
            value={viewerMode}
            onChange={(e) => setViewerMode(e.target.value as ViewerMode)}
          >
            <option value="company">Cég adatok</option>
            <option value="employees">Munkavállalók</option>
            <option value="kepviselok">Képviselők</option>
            <option value="tulajdonosok">Tulajdonosok</option>
            <option value="bankszamlaszamok">Bankszámlaszámok</option>
          </select>
        </label>
      </div>

      {error && <div className="database-viewer-error">{error}</div>}

      <div className="database-viewer-grid">
        <div className="database-viewer-header mezo">Mező</div>
        <div className="database-viewer-header ertek">Érték</div>

        {excelRows.map((row, index) => (
          <Fragment key={`${row.kind ?? 'field'}-${row.indent}-${row.field}-${index}`}>
            <div
              className={`database-viewer-cell field ${row.kind === 'section' ? 'section' : ''}`}
              style={{ paddingLeft: `${8 + row.indent * 18}px` }}
            >
              {row.field}
            </div>
            <div className="database-viewer-cell value">
              {row.value ?? ''}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
