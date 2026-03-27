import { munkavallalokRepository } from './repository';
import type { MunkavallaloRecord } from './types';

export interface EmployeeCsvImportOptions {
  cegAzonosito: string;
  forrasFajlNev?: string;
}

export interface EmployeeCsvImportResult {
  cegAzonosito: string;
  forrasFajlNev: string;
  feldolgozottSorok: number;
  importaltSorok: number;
  kihagyottSorok: number;
}

interface EmployeeCsvRow {
  normalized: Record<string, string>;
  original: Record<string, string>;
}

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeHeaderKey(header: string): string {
  return header
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function makeUniqueHeaders(headers: string[]): string[] {
  const counts = new Map<string, number>();

  return headers.map((header, index) => {
    const base = header.trim() || `Oszlop_${index + 1}`;
    const seen = counts.get(base) ?? 0;
    counts.set(base, seen + 1);

    if (seen === 0) {
      return base;
    }

    return `${base} (${seen + 1})`;
  });
}

function makeUniqueNormalizedHeaders(headers: string[]): string[] {
  const counts = new Map<string, number>();

  return headers.map((header, index) => {
    const normalized = normalizeHeaderKey(header) || `oszlop${index + 1}`;
    const seen = counts.get(normalized) ?? 0;
    counts.set(normalized, seen + 1);

    if (seen === 0) {
      return normalized;
    }

    return `${normalized}_${seen + 1}`;
  });
}

function getValueByNormalizedKeys(row: EmployeeCsvRow, keys: string[]): string {
  for (const key of keys) {
    if (row.normalized[key]) {
      return row.normalized[key];
    }
  }

  return '';
}

function parseDelimitedLine(line: string, delimiter = ';'): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === delimiter && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  values.push(current);
  return values;
}

function decodeCsvBytes(bytes: Uint8Array): string {
  try {
    return new TextDecoder('windows-1250').decode(bytes);
  } catch {
    return new TextDecoder('utf-8').decode(bytes);
  }
}

function parseEmployeeCsv(bytes: Uint8Array): EmployeeCsvRow[] {
  const text = decodeCsvBytes(bytes).replace(/^\uFEFF/, '');
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return [];
  }

  const rawHeaders = parseDelimitedLine(lines[0]);
  const originalHeaders = makeUniqueHeaders(rawHeaders);
  const normalizedHeaders = makeUniqueNormalizedHeaders(originalHeaders);
  const rows: EmployeeCsvRow[] = [];

  for (let i = 1; i < lines.length; i += 1) {
    const values = parseDelimitedLine(lines[i]);
    const row: EmployeeCsvRow = {
      normalized: {},
      original: {},
    };

    originalHeaders.forEach((key, idx) => {
      row.original[key] = (values[idx] ?? '').trim();
    });

    normalizedHeaders.forEach((key, idx) => {
      row.normalized[key] = (values[idx] ?? '').trim();
    });

    rows.push(row);
  }

  return rows;
}

function buildEmployeeId(cegAzonosito: string, row: EmployeeCsvRow, rowIndex: number): string {
  const preferred = getValueByNormalizedKeys(row, ['azonosito', 'adoazon', 'taj', 'email', 'munkaszam']);
  if (preferred) {
    return `${cegAzonosito}-${preferred.replace(/\s+/g, '')}`;
  }

  const nev = getValueByNormalizedKeys(row, ['nev']);
  const szuletesiIdo = getValueByNormalizedKeys(row, ['szulido', 'szulido_2', 'szulido_3', 'szulido_4']);
  const fallbackBase = `${nev || 'ismeretlen'}-${szuletesiIdo || ''}-${rowIndex + 1}`;
  return `${cegAzonosito}-${fallbackBase.replace(/\s+/g, '').toLowerCase()}`;
}

function mapRowToEmployee(
  cegAzonosito: string,
  row: EmployeeCsvRow,
  rowIndex: number,
  forrasFajlAzonosito: string,
): MunkavallaloRecord | null {
  const nev = getValueByNormalizedKeys(row, ['nev']).trim();

  if (!nev) {
    return null;
  }

  const timestamp = nowIso();

  return {
    ...row.original,
    'MunkavállalóAzonosító': buildEmployeeId(cegAzonosito, row, rowIndex),
    'CégAzonosító': cegAzonosito,
    'Név': nev,
    'Azonosító': getValueByNormalizedKeys(row, ['azonosito']) || undefined,
    'Adóazon': getValueByNormalizedKeys(row, ['adoazon']) || undefined,
    'TAJ': getValueByNormalizedKeys(row, ['taj']) || undefined,
    'E-mail': getValueByNormalizedKeys(row, ['email']) || undefined,
    'Munkaszám': getValueByNormalizedKeys(row, ['munkaszam']) || undefined,
    'Munkakör': getValueByNormalizedKeys(row, ['munkakor']) || undefined,
    'FEOR': getValueByNormalizedKeys(row, ['feor']) || undefined,
    'Jogviszony kezdete': getValueByNormalizedKeys(row, ['jvkezd']) || undefined,
    'Jogviszony vége': getValueByNormalizedKeys(row, ['jvbef']) || undefined,
    'ForrásFájlAzonosító': forrasFajlAzonosito,
    'LétrehozásIdeje': timestamp,
    'MódosításIdeje': timestamp,
  };
}

export async function importEmployeesCsvToDb(
  bytes: Uint8Array,
  options: EmployeeCsvImportOptions,
): Promise<EmployeeCsvImportResult> {
  const { cegAzonosito, forrasFajlNev = 'employees.csv' } = options;

  if (!cegAzonosito) {
    throw new Error('A cegAzonosito megadasa kotelezo.');
  }

  const rows = parseEmployeeCsv(bytes);
  const forrasFajlAzonosito = `employees-${Date.now().toString(36)}`;
  const records: MunkavallaloRecord[] = [];

  rows.forEach((row, idx) => {
    const mapped = mapRowToEmployee(cegAzonosito, row, idx, forrasFajlAzonosito);
    if (mapped) {
      records.push(mapped);
    }
  });

  await munkavallalokRepository.bulkPut(records);

  return {
    cegAzonosito,
    forrasFajlNev,
    feldolgozottSorok: rows.length,
    importaltSorok: records.length,
    kihagyottSorok: Math.max(0, rows.length - records.length),
  };
}
