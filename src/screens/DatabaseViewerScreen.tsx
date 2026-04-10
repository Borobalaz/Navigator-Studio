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
  type BankszamlaRecord,
  type CegGfoKapcsolatRecord,
  type CegRecord,
  type CegTeaorKapcsolatRecord,
  type CimRecord,
  type KapcsolattartasiAdatRecord,
  type KepviseloRecord,
  type KornyezetvedelmiTermekdijTetelRecord,
  type MunkavallaloRecord,
  type NyilatkozatAdozasiAdatRecord,
  type TulajdonosRecord,
} from '../db';
import { useCompanies } from '../hooks/useCompanies';
import { useEmployees } from '../hooks/useEmployees';
import { CompanySelector } from '../ui/components/inputs/CompanySelector';
import './DatabaseViewerScreen.css';

type ExcelLikeRow = {
  indent: number;
  field: string;
  value?: string;
  kind?: 'section' | 'field';
};

type CompanyViewData = {
  cimek: CimRecord[];
  tevekenysegek: CegTeaorKapcsolatRecord[];
  gfo: CegGfoKapcsolatRecord[];
  bankszamlak: BankszamlaRecord[];
  kepviselok: KepviseloRecord[];
  tulajdonosok: TulajdonosRecord[];
  nyilatkozatok: NyilatkozatAdozasiAdatRecord[];
  kapcsolatok: KapcsolattartasiAdatRecord[];
  termekdijTetelek: KornyezetvedelmiTermekdijTetelRecord[];
};

type ViewerMode = 'company' | 'employees';

const KIEMELT_ADATOK_FIELDS: Array<keyof CegRecord> = [
  'Megnevezése',
  'Adószáma',
  'Vámazonosító száma',
  'Közösségi adószáma',
  'Cégnyilvántartási száma',
  'Székhelycíme',
  'Illetékessége (illetékes igazgatóság kódja és megnevezése)',
  'Állapotkód és érvényesség kezdése',
  'Adózói minősítés és az utolsó minősítés érvényességének kezdete',
  'ÁFA bevallói jogcímkód és gyakoriság',
  'Bevallói típuskód',
  'Összesítő nyilatkozat gyakorisága',
  'Tao tv. hatálya alá tartozik-e, tao-alanyiság',
  'Tevékenység kezdés dátuma',
  'Alakulás módja',
  'Főtevékenység',
];

function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

function pushSection(rows: ExcelLikeRow[], indent: number, field: string, value?: string): void {
  rows.push({ indent, field, value, kind: 'section' });
}

function pushField(rows: ExcelLikeRow[], indent: number, field: string, value?: string): void {
  if (!hasValue(value)) {
    return;
  }

  rows.push({ indent, field, value, kind: 'field' });
}

function buildExcelLikeRows(company: CegRecord, data: CompanyViewData): ExcelLikeRow[] {
  const rows: ExcelLikeRow[] = [];

  pushSection(rows, 0, 'Kiemelt adatok');
  KIEMELT_ADATOK_FIELDS.forEach((field) => {
    pushField(rows, 1, String(field), company[field] ? String(company[field]) : undefined);
  });

  pushSection(rows, 0, 'Címek');
  const cimekByType: Record<string, CimRecord[]> = {
    Székhelye: [],
    'Telephelye(i)': [],
    'Iratőrzési hely': [],
  };
  data.cimek.forEach((cim) => {
    cimekByType[cim['CímTípus']]?.push(cim);
  });

  (Object.keys(cimekByType) as Array<keyof typeof cimekByType>).forEach((tipus) => {
    const group = cimekByType[tipus];
    if (group.length === 0) {
      return;
    }

    pushSection(rows, 1, tipus);
    group.forEach((cim) => {
      pushField(rows, 2, 'Címadat', cim['Címadat']);
      pushField(rows, 2, 'Érvényesség kezdete', cim['Érvényesség kezdete']);
    });
  });

  pushSection(rows, 0, 'Adóköteles tevékenységgel kapcsolatos adatok');
  pushSection(rows, 1, 'Tevékenységek');

  const foTevekenysegek = data.tevekenysegek.filter((t) => t['Típus'] === 'Főtevékenysége');
  const egyebTevekenysegek = data.tevekenysegek.filter((t) => t['Típus'] === 'Egyéb tevékenységek');

  if (foTevekenysegek.length > 0) {
    pushSection(rows, 2, 'Főtevékenysége');
    foTevekenysegek.forEach((t) => {
      pushField(rows, 3, 'TEÁOR-kód és megnevezése', t['TEÁOR-kód és megnevezése']);
      pushField(rows, 3, 'Érvényesség kezdet', t['Érvényesség kezdet']);
    });
  }

  if (egyebTevekenysegek.length > 0) {
    pushSection(rows, 2, 'Egyéb tevékenységek');
    egyebTevekenysegek.forEach((t) => {
      pushField(rows, 3, 'TEÁOR-kód és megnevezése', t['TEÁOR-kód és megnevezése']);
      pushField(rows, 3, 'Érvényesség kezdet', t['Érvényesség kezdet']);
    });
  }

  if (data.gfo.length > 0) {
    pushSection(rows, 1, 'Gazdálkodási formakód (GFO)');
    data.gfo.forEach((g) => {
      pushField(rows, 2, 'GFO kódja és megnevezése', g['GFO kódja és megnevezése']);
      pushField(rows, 2, 'Érvényesség kezdete', g['Érvényesség kezdete']);
    });
  }

  if (data.bankszamlak.length > 0) {
    pushSection(rows, 0, 'Bankszámlaszámok');
    pushSection(rows, 1, 'Cégbíróságtól/hitelintézettől érkezett pénzforgalmi számlaszámok');
    data.bankszamlak.forEach((b) => {
      pushField(rows, 2, 'számla száma', b['számla száma']);
      pushField(rows, 2, 'érvényesség kezdése', b['érvényesség kezdése']);
    });
  }

  if (data.kepviselok.length > 0) {
    pushSection(rows, 0, 'Képviselők');
    pushSection(rows, 1, 'Bíróságon bejelentett törvényes képviselők');
    data.kepviselok.forEach((k) => {
      pushField(rows, 2, 'név/elnevezés', k['név/elnevezés']);
      pushField(rows, 2, 'adóazonosító jel/adószám', k['adóazonosító jel/adószám']);
      pushField(rows, 2, 'képviselet jellege (törvényes képviselő, szervezeti képviselő, felszámoló, végelszámoló)', k['képviselet jellege (törvényes képviselő, szervezeti képviselő, felszámoló, végelszámoló)']);
      pushField(rows, 2, 'képviselet terjedelme (önálló, együttes, képviseleti jogot nem gyakorol)', k['képviselet terjedelme (önálló, együttes, képviseleti jogot nem gyakorol)']);
      pushField(rows, 2, 'képviseleti jog kezdete', k['képviseleti jog kezdete']);
    });
  }

  if (data.tulajdonosok.length > 0) {
    pushSection(rows, 0, 'Tulajdonosok');
    pushSection(rows, 1, 'Cégbejegyzésre kötelezett gazdasági társaság tagjai, tulajdonosai');
    data.tulajdonosok.forEach((t) => {
      pushSection(rows, 2, 'Természetes személy');
      pushField(rows, 3, 'Neve', t['Neve']);
      pushField(rows, 3, 'Adóazonosító jele', t['Adóazonosító jele']);
      pushField(rows, 3, 'Lakóhelye', t['Lakóhelye']);
      pushField(rows, 3, 'Érvényesség kezdete', t['Érvényesség kezdete']);
    });
  }

  if (data.nyilatkozatok.length > 0) {
    pushSection(rows, 0, 'Speciális adózási módok');
    const byCategory = new Map<string, NyilatkozatAdozasiAdatRecord[]>();
    data.nyilatkozatok.forEach((n) => {
      const key = n['Kategória'] || 'Egyéb';
      const list = byCategory.get(key) ?? [];
      list.push(n);
      byCategory.set(key, list);
    });

    Array.from(byCategory.entries()).forEach(([category, items]) => {
      pushSection(rows, 1, category);
      items.forEach((n) => {
        pushField(rows, 2, n['MezőNév'], n['MezőÉrték']);
      });
    });
  }

  if (data.kapcsolatok.length > 0) {
    pushSection(rows, 0, 'Nemzetközi és közösségi szintű adózással kapcsolatos adatok, nyilatkozatok');
    pushSection(rows, 1, 'Vámazonosító szám (EORI/VPID) vonatkozásában bejelentendő adatok');
    data.kapcsolatok.forEach((k) => {
      pushField(rows, 2, 'Elektronikus elérhetősége', k['Elektronikus elérhetősége']);
    });
  }

  if (data.termekdijTetelek.length > 0) {
    pushSection(rows, 0, 'Környezetvédelmi termékdíjjal, átvállalási szerződésekkel kapcsolatos adatok');
    pushSection(rows, 1, 'Kötelezetti státuszok és termékdíj átalányok');
    pushSection(rows, 2, 'Kötelezetti státusz és termékdíj átalány');

    data.termekdijTetelek.forEach((t) => {
      pushField(rows, 3, 'Leírás', t['Leírás']);
      pushField(rows, 3, 'Kezdés dátum', t['Kezdés dátum']);
    });
  }

  return rows;
}

function buildEmployeeRows(employees: MunkavallaloRecord[]): ExcelLikeRow[] {
  const rows: ExcelLikeRow[] = [];

  pushSection(rows, 0, 'Munkavállalók');

  if (employees.length === 0) {
    pushField(rows, 1, 'Státusz', 'Nincs munkavállaló a kiválasztott céghez.');
    return rows;
  }

  employees.forEach((employee, index) => {
    pushSection(rows, 1, `${index + 1}. munkavállaló`);
    pushField(rows, 2, 'Név', employee['Név']);
    pushField(rows, 2, 'Azonosító', employee['Azonosító']);
    pushField(rows, 2, 'Adóazon', employee['Adóazon']);
    pushField(rows, 2, 'TAJ', employee['TAJ']);
    pushField(rows, 2, 'E-mail', employee['E-mail']);
    pushField(rows, 2, 'Munkaszám', employee['Munkaszám']);
    pushField(rows, 2, 'Munkakör', employee['Munkakör']);
    pushField(rows, 2, 'FEOR', employee['FEOR']);
    pushField(rows, 2, 'Jogviszony kezdete', employee['Jogviszony kezdete']);
    pushField(rows, 2, 'Jogviszony vége', employee['Jogviszony vége']);
  });

  return rows;
}

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
    <div className="database-viewer-screen">
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
