import { read, utils } from 'xlsx';

import { initNavigatorStudioDb } from './client';
import { withIndexFields } from './indexing';
import { STORE_NAMES, type StoreName } from './schema';
import type {
  BankszamlaRecord,
  CegGfoKapcsolatRecord,
  CegRecord,
  CegTeaorKapcsolatRecord,
  CimRecord,
  ForrasDokumentumRecord,
  GfoKodRecord,
  KapcsolattartasiAdatRecord,
  KepviseloRecord,
  KornyezetvedelmiTermekdijTetelRecord,
  NyilatkozatAdozasiAdatRecord,
  TeaorKodRecord,
  TulajdonosRecord,
} from './types';

type ExcelInput = File | ArrayBuffer | Uint8Array;

interface ParsedRow {
  cimke: string;
  ertek: string;
  utvonal: string[];
}

export type DeduplicationMode = 'none' | 'replace-company-children';

export interface ExcelImportOptions {
  forrasFajlNev?: string;
  parserVerzio?: string;
  cegAzonosito?: string;
  deduplicationMode?: DeduplicationMode;
}

export interface ExcelImportResult {
  cegAzonosito: string;
  forrasFajlAzonosito: string;
  sorokSzama: number;
  tablankentiRekordok: Record<string, number>;
  deduplicationMode: DeduplicationMode;
}

export interface DirectoryImportOptions extends ExcelImportOptions {
  recursive?: boolean;
  stopOnError?: boolean;
  includeExtensions?: string[];
}

export interface DirectoryImportFileResult {
  filePath: string;
  fileName: string;
  success: boolean;
  importResult?: ExcelImportResult;
  error?: string;
}

export interface DirectoryImportResult {
  directoryPath: string;
  totalFiles: number;
  successCount: number;
  failedCount: number;
  files: DirectoryImportFileResult[];
}

const STRUCTURAL_LABELS = new Set<string>([
  'Kiemelt adatok',
  'Címek',
  'Székhelye',
  'Telephelye(i)',
  'Iratőrzési hely',
  'Adóköteles tevékenységgel kapcsolatos adatok',
  'Tevékenységek',
  'Főtevékenysége',
  'Egyéb tevékenységek',
  'Gazdálkodási formakód (GFO)',
  'Bankszámlaszámok',
  'Cégbíróságtól/hitelintézettől érkezett pénzforgalmi számlaszámok',
  'Képviselők',
  'Bíróságon bejelentett törvényes képviselők',
  'Tulajdonosok',
  'Cégbejegyzésre kötelezett gazdasági társaság tagjai, tulajdonosai',
  'Természetes személy',
  'Speciális adózási módok',
  'KIVA adózással kapcsolatos nyilatkozatok',
  'Áfa-nyilatkozatok',
  'Közösségi adószám igénylése vagy megszüntetése',
  'Nemzetközi és közösségi szintű adózással kapcsolatos adatok, nyilatkozatok',
  'Vámazonosító szám (EORI/VPID) vonatkozásában bejelentendő adatok',
  'Környezetvédelmi termékdíjjal, átvállalási szerződésekkel kapcsolatos adatok',
  'Kötelezetti státuszok és termékdíj átalányok',
  'Kötelezetti státusz és termékdíj átalány',
  'Termékkörök',
]);

const DEFAULT_EXCEL_EXTENSIONS = ['.xlsx', '.xlsm', '.xlsb', '.xls'];

function idbRequestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB keres hiba.'));
  });
}

function idbTxDone(transaction: IDBTransaction): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB tranzakcio hiba.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB tranzakcio megszakitva.'));
  });
}

async function toArrayBuffer(input: ExcelInput): Promise<ArrayBuffer> {
  if (input instanceof ArrayBuffer) {
    return input;
  }

  if (input instanceof Uint8Array) {
    return new Uint8Array(input).buffer;
  }

  return input.arrayBuffer();
}

function nowIso(): string {
  return new Date().toISOString();
}

function randomId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  const rand = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `${prefix}-${ts}-${rand}`;
}

async function sha256Hex(buffer: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  const bytes = new Uint8Array(digest);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function cleanText(value: unknown): string {
  return String(value ?? '').replace(/\s+$/g, '').trim();
}

function leadingWhitespaceCount(value: string): number {
  const match = value.match(/^\s+/);
  return match ? match[0].length : 0;
}

function normalizeDate(raw: string): string | undefined {
  const match = raw.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})\.?/);
  if (!match) {
    return undefined;
  }

  const year = match[1];
  const month = match[2].padStart(2, '0');
  const day = match[3].padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function splitKodEsMegnevezes(raw: string): { kod: string; megnevezes: string } {
  const match = raw.match(/^\s*([^\-]+?)\s*-\s*(.+)\s*$/);
  if (!match) {
    return { kod: raw.trim(), megnevezes: '' };
  }

  return {
    kod: match[1].trim(),
    megnevezes: match[2].trim(),
  };
}

function isValueEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  return String(value).trim() === '';
}

function parseFieldValueRows(buffer: ArrayBuffer): ParsedRow[] {
  const workbook = read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error('Az Excel fajl nem tartalmaz munkalapot.');
  }

  const sheet = workbook.Sheets[firstSheetName];
  const rows = utils.sheet_to_json<(string | number | null)[]>(sheet, {
    header: 1,
    raw: false,
    defval: null,
  });

  const parsed: ParsedRow[] = [];
  const stack: Array<{ indent: number; cimke: string }> = [];

  rows.forEach((row) => {
    const fieldRaw = row[0];
    const valueRaw = row[1];

    if (isValueEmpty(fieldRaw) && isValueEmpty(valueRaw)) {
      return;
    }

    if (isValueEmpty(fieldRaw)) {
      return;
    }

    const fieldRawString = String(fieldRaw);
    const indent = leadingWhitespaceCount(fieldRawString);
    const cimke = cleanText(fieldRawString);

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    if (isValueEmpty(valueRaw)) {
      stack.push({ indent, cimke });
      return;
    }

    const ertek = cleanText(valueRaw);
    if (!ertek) {
      return;
    }

    parsed.push({
      cimke,
      ertek,
      utvonal: stack.map((s) => s.cimke),
    });
  });

  return parsed;
}

function cimTipusFromPath(path: string[]): CimRecord['CímTípus'] | null {
  if (path.includes('Székhelye')) {
    return 'Székhelye';
  }

  if (path.includes('Telephelye(i)')) {
    return 'Telephelye(i)';
  }

  if (path.includes('Iratőrzési hely')) {
    return 'Iratőrzési hely';
  }

  return null;
}

function isNyilatkozatRow(path: string[], label: string): boolean {
  const top = path[0] ?? '';
  if (top !== 'Speciális adózási módok') {
    return false;
  }

  if (STRUCTURAL_LABELS.has(label)) {
    return false;
  }

  return true;
}

async function putMany<T extends object>(storeName: StoreName, store: IDBObjectStore, records: T[]): Promise<void> {
  for (const record of records) {
    await idbRequestToPromise(store.put(withIndexFields(storeName, record)));
  }
}

async function getForrasDokumentumByHash(db: IDBDatabase, hash: string): Promise<ForrasDokumentumRecord | undefined> {
  const tx = db.transaction(STORE_NAMES.FORRASDOKUMENTUMOK, 'readonly');
  const store = tx.objectStore(STORE_NAMES.FORRASDOKUMENTUMOK);
  const existing = (await idbRequestToPromise(store.index('ForrásFájlHash').get(hash))) as ForrasDokumentumRecord | undefined;
  await idbTxDone(tx);
  return existing;
}

async function deleteByIndexExact(store: IDBObjectStore, indexName: string, key: IDBValidKey): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const request = store.index(indexName).openCursor(IDBKeyRange.only(key));

    request.onerror = () => {
      reject(request.error ?? new Error('Nem sikerult torolni az index alapjan.'));
    };

    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        resolve();
        return;
      }

      cursor.delete();
      cursor.continue();
    };
  });
}

export async function importExcelToDb(input: ExcelInput, options: ExcelImportOptions = {}): Promise<ExcelImportResult> {
  const buffer = await toArrayBuffer(input);
  const parsedRows = parseFieldValueRows(buffer);

  if (parsedRows.length === 0) {
    throw new Error('Nem talalhato importalhato adat a fajlban.');
  }

  const deduplicationMode: DeduplicationMode = options.deduplicationMode ?? 'none';
  const forrasFajlHash = await sha256Hex(buffer);
  const importalasIdeje = nowIso();
  const parserVerzio = options.parserVerzio ?? '1.0.0';
  const forrasFajlNev = options.forrasFajlNev ?? (typeof File !== 'undefined' && input instanceof File ? input.name : 'import.xlsx');

  const db = await initNavigatorStudioDb();
  let forrasFajlAzonosito = randomId('forras');

  if (deduplicationMode === 'replace-company-children') {
    const existingForrasDoc = await getForrasDokumentumByHash(db, forrasFajlHash);
    if (existingForrasDoc) {
      forrasFajlAzonosito = existingForrasDoc['ForrásFájlAzonosító'];
    }
  }

  const cegek: CegRecord[] = [];
  const teaorKodMap = new Map<string, TeaorKodRecord>();
  const cegTeaorKapcsolatok: CegTeaorKapcsolatRecord[] = [];
  const gfoKodMap = new Map<string, GfoKodRecord>();
  const cegGfoKapcsolatok: CegGfoKapcsolatRecord[] = [];
  const cimek: CimRecord[] = [];
  const bankszamlaszamok: BankszamlaRecord[] = [];
  const kepviselok: KepviseloRecord[] = [];
  const tulajdonosok: TulajdonosRecord[] = [];
  const nyilatkozatok: NyilatkozatAdozasiAdatRecord[] = [];
  const kapcsolatok: KapcsolattartasiAdatRecord[] = [];
  const termekdijTetelek: KornyezetvedelmiTermekdijTetelRecord[] = [];

  const commonTech = {
    'ForrásFájlAzonosító': forrasFajlAzonosito,
    'LétrehozásIdeje': importalasIdeje,
    'MódosításIdeje': importalasIdeje,
  };

  const cegPartial: Partial<CegRecord> = {
    ...commonTech,
  };

  let lastCim: CimRecord | null = null;
  let lastTeaor: CegTeaorKapcsolatRecord | null = null;
  let lastGfo: CegGfoKapcsolatRecord | null = null;
  let lastBankszamla: BankszamlaRecord | null = null;
  let currentKepviselo: KepviseloRecord | null = null;
  let currentTulajdonos: TulajdonosRecord | null = null;
  let lastTermekdijTetel: KornyezetvedelmiTermekdijTetelRecord | null = null;

  for (const row of parsedRows) {
    const top = row.utvonal[0] ?? '';
    const utvonalText = row.utvonal.join(' > ');

    if (top === 'Kiemelt adatok') {
      switch (row.cimke) {
        case 'Megnevezése':
          cegPartial['Megnevezése'] = row.ertek;
          break;
        case 'Adószáma':
          cegPartial['Adószáma'] = row.ertek;
          break;
        case 'Vámazonosító száma':
          cegPartial['Vámazonosító száma'] = row.ertek;
          break;
        case 'Közösségi adószáma':
          cegPartial['Közösségi adószáma'] = row.ertek;
          break;
        case 'Cégnyilvántartási száma':
          cegPartial['Cégnyilvántartási száma'] = row.ertek;
          break;
        case 'Székhelycíme':
          cegPartial['Székhelycíme'] = row.ertek;
          break;
        case 'Illetékessége (illetékes igazgatóság kódja és megnevezése)':
          cegPartial['Illetékessége (illetékes igazgatóság kódja és megnevezése)'] = row.ertek;
          break;
        case 'Állapotkód és érvényesség kezdése':
          cegPartial['Állapotkód és érvényesség kezdése'] = row.ertek;
          break;
        case 'Adózói minősítés és az utolsó minősítés érvényességének kezdete':
          cegPartial['Adózói minősítés és az utolsó minősítés érvényességének kezdete'] = row.ertek;
          break;
        case 'ÁFA bevallói jogcímkód és gyakoriság':
          cegPartial['ÁFA bevallói jogcímkód és gyakoriság'] = row.ertek;
          break;
        case 'Bevallói típuskód':
          cegPartial['Bevallói típuskód'] = row.ertek;
          break;
        case 'Összesítő nyilatkozat gyakorisága':
          cegPartial['Összesítő nyilatkozat gyakorisága'] = row.ertek;
          break;
        case 'Tao tv. hatálya alá tartozik-e, tao-alanyiság':
          cegPartial['Tao tv. hatálya alá tartozik-e, tao-alanyiság'] = row.ertek;
          break;
        case 'Tevékenység kezdés dátuma': {
          const datum = normalizeDate(row.ertek);
          if (datum) {
            cegPartial['Tevékenység kezdés dátuma'] = datum;
          }
          break;
        }
        case 'Alakulás módja':
        case 'Alakulás módja,':
          cegPartial['Alakulás módja'] = row.ertek;
          break;
        case 'Főtevékenység':
          cegPartial['Főtevékenység'] = row.ertek;
          break;
        default:
          break;
      }
      continue;
    }

    if (row.cimke === 'Címadat' && row.utvonal.includes('Címek')) {
      const cimTipus = cimTipusFromPath(row.utvonal);
      if (cimTipus) {
        lastCim = {
          ...commonTech,
          'CímAzonosító': randomId('cim'),
          'CégAzonosító': '',
          'CímTípus': cimTipus,
          'Címadat': row.ertek,
          'Komponens útvonal': utvonalText,
        };
        cimek.push(lastCim);
      }
      continue;
    }

    if (row.cimke === 'Érvényesség kezdete' && row.utvonal.includes('Címek')) {
      if (lastCim) {
        lastCim['Érvényesség kezdete'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (row.cimke === 'TEÁOR-kód és megnevezése' && row.utvonal.includes('Tevékenységek')) {
      const split = splitKodEsMegnevezes(row.ertek);
      if (split.kod) {
        teaorKodMap.set(split.kod, {
          'TEÁOR-kód': split.kod,
          'Megnevezés': split.megnevezes,
        });

        const tipus: CegTeaorKapcsolatRecord['Típus'] = row.utvonal.includes('Főtevékenysége')
          ? 'Főtevékenysége'
          : 'Egyéb tevékenységek';

        lastTeaor = {
          ...commonTech,
          'CégTEÁORKapcsolatAzonosító': randomId('ceg-teaor'),
          'CégAzonosító': '',
          'TEÁOR-kód': split.kod,
          'TEÁOR-kód és megnevezése': row.ertek,
          'Típus': tipus,
          'Komponens útvonal': utvonalText,
        };
        cegTeaorKapcsolatok.push(lastTeaor);
      }
      continue;
    }

    if (row.cimke === 'Érvényesség kezdet' && row.utvonal.includes('Tevékenységek')) {
      if (lastTeaor) {
        lastTeaor['Érvényesség kezdet'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (row.cimke === 'GFO kódja és megnevezése' && row.utvonal.includes('Gazdálkodási formakód (GFO)')) {
      const split = splitKodEsMegnevezes(row.ertek);
      if (split.kod) {
        gfoKodMap.set(split.kod, {
          'GFO kódja': split.kod,
          'Megnevezése': split.megnevezes,
        });

        lastGfo = {
          ...commonTech,
          'CégGFOKapcsolatAzonosító': randomId('ceg-gfo'),
          'CégAzonosító': '',
          'GFO kódja': split.kod,
          'GFO kódja és megnevezése': row.ertek,
          'Komponens útvonal': utvonalText,
        };
        cegGfoKapcsolatok.push(lastGfo);
      }
      continue;
    }

    if (row.cimke === 'Érvényesség kezdete' && row.utvonal.includes('Gazdálkodási formakód (GFO)')) {
      if (lastGfo) {
        lastGfo['Érvényesség kezdete'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (row.cimke === 'számla száma' && row.utvonal.includes('Bankszámlaszámok')) {
      lastBankszamla = {
        ...commonTech,
        'BankszámlaAzonosító': randomId('bankszamla'),
        'CégAzonosító': '',
        'számla száma': row.ertek,
        'Komponens útvonal': utvonalText,
      };
      bankszamlaszamok.push(lastBankszamla);
      continue;
    }

    if (row.cimke === 'érvényesség kezdése' && row.utvonal.includes('Bankszámlaszámok')) {
      if (lastBankszamla) {
        lastBankszamla['érvényesség kezdése'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (row.cimke === 'név/elnevezés' && row.utvonal.includes('Képviselők')) {
      currentKepviselo = {
        ...commonTech,
        'KépviselőAzonosító': randomId('kepviselo'),
        'CégAzonosító': '',
        'név/elnevezés': row.ertek,
        'Komponens útvonal': utvonalText,
      };
      kepviselok.push(currentKepviselo);
      continue;
    }

    if (currentKepviselo && row.utvonal.includes('Képviselők')) {
      if (row.cimke === 'adóazonosító jel/adószám') {
        currentKepviselo['adóazonosító jel/adószám'] = row.ertek;
      } else if (row.cimke === 'képviselet jellege (törvényes képviselő, szervezeti képviselő, felszámoló, végelszámoló)') {
        currentKepviselo['képviselet jellege (törvényes képviselő, szervezeti képviselő, felszámoló, végelszámoló)'] = row.ertek;
      } else if (row.cimke === 'képviselet terjedelme (önálló, együttes, képviseleti jogot nem gyakorol)') {
        currentKepviselo['képviselet terjedelme (önálló, együttes, képviseleti jogot nem gyakorol)'] = row.ertek;
      } else if (row.cimke === 'képviseleti jog kezdete') {
        currentKepviselo['képviseleti jog kezdete'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (row.cimke === 'Neve' && row.utvonal.includes('Tulajdonosok')) {
      currentTulajdonos = {
        ...commonTech,
        'TulajdonosAzonosító': randomId('tulajdonos'),
        'CégAzonosító': '',
        'Neve': row.ertek,
        'Komponens útvonal': utvonalText,
      };

      if (row.utvonal.includes('Természetes személy')) {
        currentTulajdonos['Természetes személy'] = 'Természetes személy';
      }

      tulajdonosok.push(currentTulajdonos);
      continue;
    }

    if (currentTulajdonos && row.utvonal.includes('Tulajdonosok')) {
      if (row.cimke === 'Adóazonosító jele') {
        currentTulajdonos['Adóazonosító jele'] = row.ertek;
      } else if (row.cimke === 'Lakóhelye') {
        currentTulajdonos['Lakóhelye'] = row.ertek;
      } else if (row.cimke === 'Érvényesség kezdete') {
        currentTulajdonos['Érvényesség kezdete'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (row.cimke === 'Elektronikus elérhetősége') {
      kapcsolatok.push({
        ...commonTech,
        'KapcsolatAzonosító': randomId('kapcsolat'),
        'CégAzonosító': '',
        'Elektronikus elérhetősége': row.ertek,
        'Komponens útvonal': utvonalText,
      });
      continue;
    }

    if (row.cimke === 'Leírás' && row.utvonal[0] === 'Környezetvédelmi termékdíjjal, átvállalási szerződésekkel kapcsolatos adatok') {
      lastTermekdijTetel = {
        ...commonTech,
        'TermékdíjTételAzonosító': randomId('termekdij'),
        'CégAzonosító': '',
        'Leírás': row.ertek,
        'Komponens útvonal': utvonalText,
      };
      termekdijTetelek.push(lastTermekdijTetel);
      continue;
    }

    if (row.cimke === 'Kezdés dátum' && row.utvonal[0] === 'Környezetvédelmi termékdíjjal, átvállalási szerződésekkel kapcsolatos adatok') {
      if (lastTermekdijTetel) {
        lastTermekdijTetel['Kezdés dátum'] = normalizeDate(row.ertek);
      }
      continue;
    }

    if (isNyilatkozatRow(row.utvonal, row.cimke)) {
      nyilatkozatok.push({
        ...commonTech,
        'NyilatkozatAzonosító': randomId('nyilatkozat'),
        'CégAzonosító': '',
        'Kategória': row.utvonal[1] ?? row.utvonal[0] ?? 'Ismeretlen',
        'MezőNév': row.cimke,
        'MezőÉrték': row.ertek,
        'Érvényesség kezdete': normalizeDate(row.ertek),
        'Komponens útvonal': utvonalText,
      });
    }
  }

  const megnevezes = cegPartial['Megnevezése'];
  const adoszam = cegPartial['Adószáma'];

  if (!megnevezes || !adoszam) {
    throw new Error('A ceg importhoz kotelezo a Megnevezése es Adószáma mező.');
  }

  const cegAzonosito = options.cegAzonosito ?? `ceg-${adoszam.replace(/[^0-9A-Za-z]/g, '')}`;

  const cegRecord: CegRecord = {
    ...(cegPartial as CegRecord),
    'CégAzonosító': cegAzonosito,
    'Megnevezése': megnevezes,
    'Adószáma': adoszam,
  };

  cegek.push(cegRecord);

  const setCegAzonosito = <T extends { 'CégAzonosító': string }>(records: T[]): void => {
    records.forEach((record) => {
      record['CégAzonosító'] = cegAzonosito;
    });
  };

  setCegAzonosito(cegTeaorKapcsolatok);
  setCegAzonosito(cegGfoKapcsolatok);
  setCegAzonosito(cimek);
  setCegAzonosito(bankszamlaszamok);
  setCegAzonosito(kepviselok);
  setCegAzonosito(tulajdonosok);
  setCegAzonosito(nyilatkozatok);
  setCegAzonosito(kapcsolatok);
  setCegAzonosito(termekdijTetelek);

  const teaorKodok = Array.from(teaorKodMap.values());
  const gfoKodok = Array.from(gfoKodMap.values());

  const forrasDokumentum: ForrasDokumentumRecord = {
    'ForrásFájlAzonosító': forrasFajlAzonosito,
    'ForrásFájlNév': forrasFajlNev,
    'ForrásFájlHash': forrasFajlHash,
    'ImportálásIdeje': importalasIdeje,
    'ParserVerzió': parserVerzio,
    'SorokSzáma': parsedRows.length,
  };

  const allStores = Object.values(STORE_NAMES);
  const tx = db.transaction(allStores, 'readwrite');

  if (deduplicationMode === 'replace-company-children') {
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.CEG_TEAOR_KAPCSOLATOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.CEG_GFO_KAPCSOLATOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.CIMEK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.BANKSZAMLASZAMOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.KEPVISELOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.TULAJDONOSOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.KAPCSOLATTARTASI_ADATOK), 'CégAzonosító', cegAzonosito);
    await deleteByIndexExact(tx.objectStore(STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK), 'CégAzonosító', cegAzonosito);
  }

  await putMany(STORE_NAMES.FORRASDOKUMENTUMOK, tx.objectStore(STORE_NAMES.FORRASDOKUMENTUMOK), [forrasDokumentum]);
  await putMany(STORE_NAMES.CEGEK, tx.objectStore(STORE_NAMES.CEGEK), cegek);
  await putMany(STORE_NAMES.TEAOR_KODOK, tx.objectStore(STORE_NAMES.TEAOR_KODOK), teaorKodok);
  await putMany(STORE_NAMES.CEG_TEAOR_KAPCSOLATOK, tx.objectStore(STORE_NAMES.CEG_TEAOR_KAPCSOLATOK), cegTeaorKapcsolatok);
  await putMany(STORE_NAMES.GFO_KODOK, tx.objectStore(STORE_NAMES.GFO_KODOK), gfoKodok);
  await putMany(STORE_NAMES.CEG_GFO_KAPCSOLATOK, tx.objectStore(STORE_NAMES.CEG_GFO_KAPCSOLATOK), cegGfoKapcsolatok);
  await putMany(STORE_NAMES.CIMEK, tx.objectStore(STORE_NAMES.CIMEK), cimek);
  await putMany(STORE_NAMES.BANKSZAMLASZAMOK, tx.objectStore(STORE_NAMES.BANKSZAMLASZAMOK), bankszamlaszamok);
  await putMany(STORE_NAMES.KEPVISELOK, tx.objectStore(STORE_NAMES.KEPVISELOK), kepviselok);
  await putMany(STORE_NAMES.TULAJDONOSOK, tx.objectStore(STORE_NAMES.TULAJDONOSOK), tulajdonosok);
  await putMany(STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK, tx.objectStore(STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK), nyilatkozatok);
  await putMany(STORE_NAMES.KAPCSOLATTARTASI_ADATOK, tx.objectStore(STORE_NAMES.KAPCSOLATTARTASI_ADATOK), kapcsolatok);
  await putMany(STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK, tx.objectStore(STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK), termekdijTetelek);

  await idbTxDone(tx);

  return {
    cegAzonosito,
    forrasFajlAzonosito,
    sorokSzama: parsedRows.length,
    deduplicationMode,
    tablankentiRekordok: {
      [STORE_NAMES.FORRASDOKUMENTUMOK]: 1,
      [STORE_NAMES.CEGEK]: cegek.length,
      [STORE_NAMES.TEAOR_KODOK]: teaorKodok.length,
      [STORE_NAMES.CEG_TEAOR_KAPCSOLATOK]: cegTeaorKapcsolatok.length,
      [STORE_NAMES.GFO_KODOK]: gfoKodok.length,
      [STORE_NAMES.CEG_GFO_KAPCSOLATOK]: cegGfoKapcsolatok.length,
      [STORE_NAMES.CIMEK]: cimek.length,
      [STORE_NAMES.BANKSZAMLASZAMOK]: bankszamlaszamok.length,
      [STORE_NAMES.KEPVISELOK]: kepviselok.length,
      [STORE_NAMES.TULAJDONOSOK]: tulajdonosok.length,
      [STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK]: nyilatkozatok.length,
      [STORE_NAMES.KAPCSOLATTARTASI_ADATOK]: kapcsolatok.length,
      [STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK]: termekdijTetelek.length,
    },
  };
}

function joinFsPath(basePath: string, childName: string): string {
  if (!basePath) {
    return childName;
  }

  const separator = basePath.includes('\\') ? '\\' : '/';
  const normalizedBase = basePath.endsWith('/') || basePath.endsWith('\\')
    ? basePath.slice(0, -1)
    : basePath;

  return `${normalizedBase}${separator}${childName}`;
}

function getFileName(filePath: string): string {
  const normalized = filePath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  return parts[parts.length - 1] ?? filePath;
}

function hasAllowedExtension(fileName: string, includeExtensions: string[]): boolean {
  const lower = fileName.toLowerCase();
  return includeExtensions.some((ext) => lower.endsWith(ext.toLowerCase()));
}

interface ReadFolderEntry {
  name: string;
  isDirectory: boolean;
}

async function collectExcelFilesFromDirectory(
  directoryPath: string,
  recursive: boolean,
  includeExtensions: string[],
): Promise<string[]> {
  const readFolder = window.api?.readFolder as ((path: string) => Promise<ReadFolderEntry[]>) | undefined;
  if (!readFolder) {
    throw new Error('window.api.readFolder nem erheto el.');
  }

  const result: string[] = [];
  const entries = await readFolder(directoryPath);

  for (const entry of entries) {
    const fullPath = joinFsPath(directoryPath, entry.name);

    if (entry.isDirectory) {
      if (recursive) {
        const nested = await collectExcelFilesFromDirectory(fullPath, recursive, includeExtensions);
        result.push(...nested);
      }
      continue;
    }

    if (hasAllowedExtension(entry.name, includeExtensions)) {
      result.push(fullPath);
    }
  }

  return result;
}

async function readFileAsUint8Array(filePath: string): Promise<Uint8Array> {
  const reader = window.api?.readBinaryFile as ((path: string) => Promise<Uint8Array>) | undefined;
  if (!reader) {
    throw new Error('window.api.readBinaryFile nem erheto el. Frissitsd a preload API-t.');
  }

  const bytes = await reader(filePath);
  return bytes;
}

export async function importExcelDirectoryToDb(
  directoryPath: string,
  options: DirectoryImportOptions = {},
): Promise<DirectoryImportResult> {
  const recursive = options.recursive ?? true;
  const stopOnError = options.stopOnError ?? false;
  const includeExtensions = options.includeExtensions ?? DEFAULT_EXCEL_EXTENSIONS;

  const excelFiles = await collectExcelFilesFromDirectory(directoryPath, recursive, includeExtensions);
  const fileResults: DirectoryImportFileResult[] = [];

  for (const filePath of excelFiles) {
    const fileName = getFileName(filePath);

    try {
      const bytes = await readFileAsUint8Array(filePath);
      const importResult = await importExcelToDb(bytes, {
        forrasFajlNev: fileName,
        parserVerzio: options.parserVerzio,
        cegAzonosito: options.cegAzonosito,
        deduplicationMode: options.deduplicationMode,
      });

      fileResults.push({
        filePath,
        fileName,
        success: true,
        importResult,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      fileResults.push({
        filePath,
        fileName,
        success: false,
        error: errorMessage,
      });

      if (stopOnError) {
        break;
      }
    }
  }

  const successCount = fileResults.filter((r) => r.success).length;
  const failedCount = fileResults.length - successCount;

  return {
    directoryPath,
    totalFiles: excelFiles.length,
    successCount,
    failedCount,
    files: fileResults,
  };
}
