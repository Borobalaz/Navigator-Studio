import {
  cegekRepository,
  cimekRepository,
  cegTeaorKapcsolatokRepository,
  kepviselokRepository,
  munkavallalokRepository,
  bankszamlaszamokRepository,
  cegGfoKapcsolatokRepository,
} from './repository';
import { CegRecord, MunkavallaloRecord } from './types';

export interface CompanyPdfPayload {
  company: CegRecord;
  addresses: any[];
  activities: any[];
  representatives: any[];
  employees: MunkavallaloRecord[];
  bankAccounts: any[];
  gfo: any[];
  generatedAt: string;
}

/**
 * Load company data for PDF generation
 * Composes company info with all related entities and employees
 */
export async function loadCompanyForPdf(cegAzonosito: string): Promise<CompanyPdfPayload> {
  try {
    // Load company data in parallel
    const [company, addresses, activities, representatives, employees, bankAccounts, gfo] = 
      await Promise.all([
        cegekRepository.getById(cegAzonosito),
        cimekRepository.listByCegAzonosito(cegAzonosito),
        cegTeaorKapcsolatokRepository.listByCegAzonosito(cegAzonosito),
        kepviselokRepository.listByCegAzonosito(cegAzonosito),
        munkavallalokRepository.listByCegAzonosito(cegAzonosito),
        bankszamlaszamokRepository.listByCegAzonosito(cegAzonosito),
        cegGfoKapcsolatokRepository.listByCegAzonosito(cegAzonosito),
      ]);

    if (!company) {
      throw new Error(`Cég nem található: ${cegAzonosito}`);
    }

    return {
      company,
      addresses: addresses || [],
      activities: activities || [],
      representatives: representatives || [],
      employees: employees || [],
      bankAccounts: bankAccounts || [],
      gfo: gfo || [],
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(
      `Cég adatok betöltési hiba (${cegAzonosito}): ${error instanceof Error ? error.message : 'Ismeretlen hiba'}`
    );
  }
}

/**
 * Normalize payload for Handlebars templating
 * Converts Hungarian field names to template-friendly format
 */
export function normalizePayloadForTemplate(payload: CompanyPdfPayload): Record<string, any> {
  return {
    company: {
      id: payload.company.CégAzonosító,
      name: payload.company.Megnevezése,
      taxId: (payload.company as any)['Adó azonosító szám'],
      countryCode: (payload.company as any)['Ország kódja'],
      city: (payload.company as any)['Város'],
      postalCode: (payload.company as any)['Irányítószám'],
      address: (payload.company as any)['Cím'],
      type: (payload.company as any)['Típus'],
      ...payload.company, // Include all original fields for flexibility
    },
    addresses: payload.addresses.map((addr: any) => ({
      type: addr.Típus,
      city: addr.Város,
      postalCode: addr['Irányítószám'],
      address: addr.Cím,
      ...addr,
    })),
    activities: payload.activities.map((act: any) => ({
      code: (act as any)['TEAOR-kód'],
      description: (act as any)['Megnevezés'],
      ...act,
    })),
    representatives: payload.representatives.map((rep: any) => ({
      name: rep.Név,
      title: rep.Tisztség,
      taxId: (rep as any)['Adó azonosító szám'],
      ...rep,
    })),
    employees: payload.employees.map((emp) => ({
      id: emp.MunkavállalóAzonosító,
      name: emp.Név,
      personalId: emp.Azonosító,
      taxId: emp.Adóazon,
      TAJ: emp.TAJ,
      email: emp['E-mail'],
      jobNumber: emp.Munkaszám,
      jobTitle: emp.Munkakör,
      FEOR: emp.FEOR,
      startDate: emp['Jogviszony kezdete'],
      endDate: emp['Jogviszony vége'],
      ...emp,
    })),
    bankAccounts: payload.bankAccounts.map((bank: any) => ({
      accountNumber: (bank as any)['Bankszámla száma'],
      bankName: (bank as any)['Banknév'],
      ...bank,
    })),
    gfo: payload.gfo.map((item: any) => ({
      type: item.Típus,
      name: item.Név,
      ...item,
    })),
    metadata: {
      generatedAt: payload.generatedAt,
      generatedAtFormatted: new Date(payload.generatedAt).toLocaleString('hu-HU'),
      employeeCount: payload.employees.length,
      addressCount: payload.addresses.length,
      activityCount: payload.activities.length,
    },
  };
}
