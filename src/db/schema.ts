export const DB_NAME = 'navigatorStudioDb';
export const DB_VERSION = 4;

export const STORE_NAMES = {
  CEGEK: 'CEGEK',
  TEAOR_KODOK: 'TEAOR_KODOK',
  CEG_TEAOR_KAPCSOLATOK: 'CEG_TEAOR_KAPCSOLATOK',
  GFO_KODOK: 'GFO_KODOK',
  CEG_GFO_KAPCSOLATOK: 'CEG_GFO_KAPCSOLATOK',
  CIMEK: 'CIMEK',
  BANKSZAMLASZAMOK: 'BANKSZAMLASZAMOK',
  KEPVISELOK: 'KEPVISELOK',
  TULAJDONOSOK: 'TULAJDONOSOK',
  NYILATKOZATOK_ES_ADOZASI_ADATOK: 'NYILATKOZATOK_ES_ADOZASI_ADATOK',
  KAPCSOLATTARTASI_ADATOK: 'KAPCSOLATTARTASI_ADATOK',
  KORNYEZETVEDELMI_TERMEKDIJ_TETELEK: 'KORNYEZETVEDELMI_TERMEKDIJ_TETELEK',
  FORRASDOKUMENTUMOK: 'FORRASDOKUMENTUMOK',
  MUNKAVALLALOK: 'MUNKAVALLALOK',
} as const;

export type StoreName = (typeof STORE_NAMES)[keyof typeof STORE_NAMES];

export interface StoreIndexDefinition {
  name: string;
  keyPath: string | string[];
  unique?: boolean;
}

export interface StoreDefinition {
  name: StoreName;
  keyPath: string;
  indexes: StoreIndexDefinition[];
}

export const STORE_DEFINITIONS: StoreDefinition[] = [
  {
    name: STORE_NAMES.CEGEK,
    keyPath: '_pk',
    indexes: [
      { name: 'Adószáma', keyPath: '_adoszama', unique: true },
      { name: 'Cégnyilvántartási száma', keyPath: '_cegnyilvantartasiSzama', unique: true },
      { name: 'Vámazonosító száma', keyPath: '_vamazonositoSzama' },
      { name: 'Közösségi adószáma', keyPath: '_kozossegiAdoszama' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
      { name: 'MódosításIdeje', keyPath: '_modositasIdeje' },
    ],
  },
  {
    name: STORE_NAMES.TEAOR_KODOK,
    keyPath: '_pk',
    indexes: [{ name: 'Megnevezés', keyPath: '_megnevezes' }],
  },
  {
    name: STORE_NAMES.CEG_TEAOR_KAPCSOLATOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'TEÁOR-kód', keyPath: '_teaorKod' },
      { name: 'Típus', keyPath: '_tipus' },
      { name: 'CégAzonosító_Típus', keyPath: '_cegAzonosito_tipus' },
      { name: 'Komponens útvonal', keyPath: '_komponensUtvonal' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.GFO_KODOK,
    keyPath: '_pk',
    indexes: [{ name: 'Megnevezése', keyPath: '_megnevezese' }],
  },
  {
    name: STORE_NAMES.CEG_GFO_KAPCSOLATOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'GFO kódja', keyPath: '_gfoKod' },
      { name: 'Komponens útvonal', keyPath: '_komponensUtvonal' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.CIMEK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'CímTípus', keyPath: '_cimTipus' },
      { name: 'CégAzonosító_CímTípus', keyPath: '_cegAzonosito_cimTipus' },
      { name: 'Komponens útvonal', keyPath: '_komponensUtvonal' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.BANKSZAMLASZAMOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'számla száma', keyPath: '_szamlaSzama' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.KEPVISELOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'adóazonosító jel/adószám', keyPath: '_adoazonositoJelAdoszam' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.TULAJDONOSOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'Adóazonosító jele', keyPath: '_adoazonositoJele' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'Kategória', keyPath: '_kategoria' },
      { name: 'MezőNév', keyPath: '_mezoNev' },
      { name: 'Komponens útvonal', keyPath: '_komponensUtvonal' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.KAPCSOLATTARTASI_ADATOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'Elektronikus elérhetősége', keyPath: '_elektronikusElerhetosege' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'Kezdés dátum', keyPath: '_kezdesDatum' },
      { name: 'Komponens útvonal', keyPath: '_komponensUtvonal' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
    ],
  },
  {
    name: STORE_NAMES.FORRASDOKUMENTUMOK,
    keyPath: '_pk',
    indexes: [
      { name: 'ForrásFájlHash', keyPath: '_forrasFajlHash', unique: true },
      { name: 'ImportálásIdeje', keyPath: '_importalasIdeje' },
      { name: 'ForrásFájlNév', keyPath: '_forrasFajlNev' },
    ],
  },
  {
    name: STORE_NAMES.MUNKAVALLALOK,
    keyPath: '_pk',
    indexes: [
      { name: 'CégAzonosító', keyPath: '_cegAzonosito' },
      { name: 'Név', keyPath: '_nev' },
      { name: 'Szül.idő', keyPath: '_szulido' },
      { name: 'Neme', keyPath: '_neme' },
      { name: 'Szül.név', keyPath: '_szulnev' },
      { name: 'Szül.hely', keyPath: '_szulhely' },
      { name: 'Anyja neve', keyPath: '_anyjaneve' },
      { name: 'Azonosító', keyPath: '_azonosito' },
      { name: 'Adóazon', keyPath: '_adoazon' },
      { name: 'TAJ', keyPath: '_taj' },
      { name: 'Adóország', keyPath: '_adoorszag' },
      { name: 'EU.adóazon', keyPath: '_euadoazon' },
      { name: 'Ny.státusz', keyPath: '_nystatusz' },
      { name: 'Nyugdíjba', keyPath: '_nyugdijba' },
      { name: 'Végzettség', keyPath: '_vegzettseg' },
      { name: 'Állcím-hely', keyPath: '_allcimhely' },
      { name: 'Állcím-utca', keyPath: '_allcimutca' },
      { name: 'Levcím-hely', keyPath: '_levcimhely' },
      { name: 'Levcím-utca', keyPath: '_levcimutca' },
      { name: 'Áll.polg', keyPath: '_allpolg' },
      { name: 'Jvkód', keyPath: '_jvkod' },
      { name: 'Alkmin', keyPath: '_alkmin' },
      { name: 'Jvkezd', keyPath: '_jvkezd' },
      { name: 'Jvbef', keyPath: '_jvbef' },
      { name: 'Kilép-mód', keyPath: '_kilepmod' },
      { name: 'Munkaszám', keyPath: '_munkaszam' },
      { name: 'E-mail', keyPath: '_email' },
      { name: 'Bérforma', keyPath: '_berforma' },
      { name: 'Bes.bér', keyPath: '_besber' },
      { name: 'ELSŐ HÁZAS KEDV', keyPath: '_elsohazaskedv' },
      { name: 'CSALÁDI KEDV', keyPath: '_csaladikedv' },
      { name: 'TESTIF.KEDV', keyPath: '_testifkedv' },
      { name: 'munkábajárás', keyPath: '_munkabajaras' },
      { name: 'Fiz/szell', keyPath: '_fizszell' },
      { name: 'Telj/rész', keyPath: '_teljresz' },
      { name: 'Részidő', keyPath: '_reszido' },
      { name: 'Munkakör', keyPath: '_munkakor' },
      { name: 'FEOR', keyPath: '_feor' },
      { name: 'Tp.folykezd', keyPath: '_tpfolykezd' },
      { name: 'ForrásFájlAzonosító', keyPath: '_forrasFajlAzonosito' },
      { name: 'MódosításIdeje', keyPath: '_modositasIdeje' },
    ],
  },
];
