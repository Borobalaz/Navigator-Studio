import { initNavigatorStudioDb } from './client';
import { withIndexFields } from './indexing';
import { STORE_NAMES, type StoreName } from './schema';
import type {
  BankszamlaRecord,
  CegGfoKapcsolatRecord,
  CegRecord,
  CegTeaorKapcsolatRecord,
  CimRecord,
  DbRecordMap,
  ForrasDokumentumRecord,
  GfoKodRecord,
  KapcsolattartasiAdatRecord,
  KepviseloRecord,
  KornyezetvedelmiTermekdijTetelRecord,
  MunkavallaloRecord,
  NyilatkozatAdozasiAdatRecord,
  TeaorKodRecord,
  TulajdonosRecord,
} from './types';

type TxMode = IDBTransactionMode;

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Ismeretlen IndexedDB query hiba.'));
  });
}

function txDoneToPromise(transaction: IDBTransaction): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB tranzakcio hiba.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB tranzakcio megszakitva.'));
  });
}

export class IndexedDbTable<TRecord extends object> {
  constructor(private readonly storeName: StoreName) {}

  private async withStore<T>(mode: TxMode, callback: (store: IDBObjectStore) => Promise<T> | T): Promise<T> {
    const db = await initNavigatorStudioDb();
    const transaction = db.transaction(this.storeName, mode);
    const store = transaction.objectStore(this.storeName);

    const result = await callback(store);
    await txDoneToPromise(transaction);
    return result;
  }

  async put(record: TRecord): Promise<void> {
    await this.withStore('readwrite', async (store) => {
      await requestToPromise(store.put(withIndexFields(this.storeName, record)));
    });
  }

  async bulkPut(records: TRecord[]): Promise<void> {
    if (records.length === 0) {
      return;
    }

    await this.withStore('readwrite', async (store) => {
      await Promise.all(records.map((record) => requestToPromise(store.put(withIndexFields(this.storeName, record)))));
    });
  }

  async getByKey(key: IDBValidKey): Promise<TRecord | undefined> {
    return this.withStore('readonly', async (store) => {
      const result = await requestToPromise(store.get(key));
      return result as TRecord | undefined;
    });
  }

  async getAll(): Promise<TRecord[]> {
    return this.withStore('readonly', async (store) => {
      const result = await requestToPromise(store.getAll());
      return result as TRecord[];
    });
  }

  async getAllByIndex(indexName: string, key: IDBValidKey | IDBKeyRange): Promise<TRecord[]> {
    return this.withStore('readonly', async (store) => {
      const index = store.index(indexName);
      const result = await requestToPromise(index.getAll(key));
      return result as TRecord[];
    });
  }

  async getFirstByIndex(indexName: string, key: IDBValidKey | IDBKeyRange): Promise<TRecord | undefined> {
    return this.withStore('readonly', async (store) => {
      const index = store.index(indexName);
      const result = await requestToPromise(index.get(key));
      return result as TRecord | undefined;
    });
  }

  async deleteByKey(key: IDBValidKey): Promise<void> {
    await this.withStore('readwrite', async (store) => {
      await requestToPromise(store.delete(key));
    });
  }

  async clear(): Promise<void> {
    await this.withStore('readwrite', async (store) => {
      await requestToPromise(store.clear());
    });
  }
}

const table = {
  cegek: new IndexedDbTable<CegRecord>(STORE_NAMES.CEGEK),
  teaorKodok: new IndexedDbTable<TeaorKodRecord>(STORE_NAMES.TEAOR_KODOK),
  cegTeaorKapcsolatok: new IndexedDbTable<CegTeaorKapcsolatRecord>(STORE_NAMES.CEG_TEAOR_KAPCSOLATOK),
  gfoKodok: new IndexedDbTable<GfoKodRecord>(STORE_NAMES.GFO_KODOK),
  cegGfoKapcsolatok: new IndexedDbTable<CegGfoKapcsolatRecord>(STORE_NAMES.CEG_GFO_KAPCSOLATOK),
  cimek: new IndexedDbTable<CimRecord>(STORE_NAMES.CIMEK),
  bankszamlaszamok: new IndexedDbTable<BankszamlaRecord>(STORE_NAMES.BANKSZAMLASZAMOK),
  kepviselok: new IndexedDbTable<KepviseloRecord>(STORE_NAMES.KEPVISELOK),
  tulajdonosok: new IndexedDbTable<TulajdonosRecord>(STORE_NAMES.TULAJDONOSOK),
  nyilatkozatokEsAdozasiAdatok: new IndexedDbTable<NyilatkozatAdozasiAdatRecord>(STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK),
  kapcsolattartasiAdatok: new IndexedDbTable<KapcsolattartasiAdatRecord>(STORE_NAMES.KAPCSOLATTARTASI_ADATOK),
  kornyezetvedelmiTermekdijTetelek: new IndexedDbTable<KornyezetvedelmiTermekdijTetelRecord>(STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK),
  forrasDokumentumok: new IndexedDbTable<ForrasDokumentumRecord>(STORE_NAMES.FORRASDOKUMENTUMOK),
  munkavallalok: new IndexedDbTable<MunkavallaloRecord>(STORE_NAMES.MUNKAVALLALOK),
};

export const cegekRepository = {
  put: (record: CegRecord) => table.cegek.put(record),
  getById: (cegAzonosito: string) => table.cegek.getByKey(cegAzonosito),
  getByAdoszam: (adoszam: string) => table.cegek.getFirstByIndex('Adószáma', adoszam),
  getByCegnyilvantartasiSzam: (cegjegyzekSzam: string) => table.cegek.getFirstByIndex('Cégnyilvántartási száma', cegjegyzekSzam),
  listAll: () => table.cegek.getAll(),
  deleteById: (cegAzonosito: string) => table.cegek.deleteByKey(cegAzonosito),
};

export const teaorKodokRepository = {
  put: (record: TeaorKodRecord) => table.teaorKodok.put(record),
  bulkPut: (records: TeaorKodRecord[]) => table.teaorKodok.bulkPut(records),
  getByKod: (teaorKod: string) => table.teaorKodok.getByKey(teaorKod),
  listAll: () => table.teaorKodok.getAll(),
};

export const cegTeaorKapcsolatokRepository = {
  put: (record: CegTeaorKapcsolatRecord) => table.cegTeaorKapcsolatok.put(record),
  bulkPut: (records: CegTeaorKapcsolatRecord[]) => table.cegTeaorKapcsolatok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.cegTeaorKapcsolatok.getAllByIndex('CégAzonosító', cegAzonosito),
  listByTeaorKod: (teaorKod: string) => table.cegTeaorKapcsolatok.getAllByIndex('TEÁOR-kód', teaorKod),
};

export const gfoKodokRepository = {
  put: (record: GfoKodRecord) => table.gfoKodok.put(record),
  bulkPut: (records: GfoKodRecord[]) => table.gfoKodok.bulkPut(records),
  getByKod: (gfoKod: string) => table.gfoKodok.getByKey(gfoKod),
  listAll: () => table.gfoKodok.getAll(),
};

export const cegGfoKapcsolatokRepository = {
  put: (record: CegGfoKapcsolatRecord) => table.cegGfoKapcsolatok.put(record),
  bulkPut: (records: CegGfoKapcsolatRecord[]) => table.cegGfoKapcsolatok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.cegGfoKapcsolatok.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const cimekRepository = {
  put: (record: CimRecord) => table.cimek.put(record),
  bulkPut: (records: CimRecord[]) => table.cimek.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.cimek.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const bankszamlaszamokRepository = {
  put: (record: BankszamlaRecord) => table.bankszamlaszamok.put(record),
  bulkPut: (records: BankszamlaRecord[]) => table.bankszamlaszamok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.bankszamlaszamok.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const kepviselokRepository = {
  put: (record: KepviseloRecord) => table.kepviselok.put(record),
  bulkPut: (records: KepviseloRecord[]) => table.kepviselok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.kepviselok.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const tulajdonosokRepository = {
  put: (record: TulajdonosRecord) => table.tulajdonosok.put(record),
  bulkPut: (records: TulajdonosRecord[]) => table.tulajdonosok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.tulajdonosok.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const nyilatkozatokEsAdozasiAdatokRepository = {
  put: (record: NyilatkozatAdozasiAdatRecord) => table.nyilatkozatokEsAdozasiAdatok.put(record),
  bulkPut: (records: NyilatkozatAdozasiAdatRecord[]) => table.nyilatkozatokEsAdozasiAdatok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.nyilatkozatokEsAdozasiAdatok.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const kapcsolattartasiAdatokRepository = {
  put: (record: KapcsolattartasiAdatRecord) => table.kapcsolattartasiAdatok.put(record),
  bulkPut: (records: KapcsolattartasiAdatRecord[]) => table.kapcsolattartasiAdatok.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.kapcsolattartasiAdatok.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const kornyezetvedelmiTermekdijTetelekRepository = {
  put: (record: KornyezetvedelmiTermekdijTetelRecord) => table.kornyezetvedelmiTermekdijTetelek.put(record),
  bulkPut: (records: KornyezetvedelmiTermekdijTetelRecord[]) => table.kornyezetvedelmiTermekdijTetelek.bulkPut(records),
  listByCegAzonosito: (cegAzonosito: string) => table.kornyezetvedelmiTermekdijTetelek.getAllByIndex('CégAzonosító', cegAzonosito),
};

export const forrasDokumentumokRepository = {
  put: (record: ForrasDokumentumRecord) => table.forrasDokumentumok.put(record),
  getByAzonosito: (azonosito: string) => table.forrasDokumentumok.getByKey(azonosito),
  getByHash: (hash: string) => table.forrasDokumentumok.getFirstByIndex('ForrásFájlHash', hash),
  listAll: () => table.forrasDokumentumok.getAll(),
};

export const munkavallalokRepository = {
  put: (record: MunkavallaloRecord) => table.munkavallalok.put(record),
  bulkPut: (records: MunkavallaloRecord[]) => table.munkavallalok.bulkPut(records),
  getById: (munkavallaloAzonosito: string) => table.munkavallalok.getByKey(munkavallaloAzonosito),
  listByCegAzonosito: (cegAzonosito: string) => table.munkavallalok.getAllByIndex('CégAzonosító', cegAzonosito),
  listAll: () => table.munkavallalok.getAll(),
  deleteById: (munkavallaloAzonosito: string) => table.munkavallalok.deleteByKey(munkavallaloAzonosito),
};

export type DbTables = {
  [K in keyof DbRecordMap]: IndexedDbTable<DbRecordMap[K]>;
};

export const dbTables: DbTables = {
  CEGEK: table.cegek,
  TEAOR_KODOK: table.teaorKodok,
  CEG_TEAOR_KAPCSOLATOK: table.cegTeaorKapcsolatok,
  GFO_KODOK: table.gfoKodok,
  CEG_GFO_KAPCSOLATOK: table.cegGfoKapcsolatok,
  CIMEK: table.cimek,
  BANKSZAMLASZAMOK: table.bankszamlaszamok,
  KEPVISELOK: table.kepviselok,
  TULAJDONOSOK: table.tulajdonosok,
  NYILATKOZATOK_ES_ADOZASI_ADATOK: table.nyilatkozatokEsAdozasiAdatok,
  KAPCSOLATTARTASI_ADATOK: table.kapcsolattartasiAdatok,
  KORNYEZETVEDELMI_TERMEKDIJ_TETELEK: table.kornyezetvedelmiTermekdijTetelek,
  FORRASDOKUMENTUMOK: table.forrasDokumentumok,
  MUNKAVALLALOK: table.munkavallalok,
};

export async function clearAllDatabaseStores(): Promise<void> {
  await Promise.all(Object.values(dbTables).map((tableInstance) => tableInstance.clear()));
}
