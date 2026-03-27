import { STORE_NAMES, type StoreName } from './schema';

type AnyRecord = Record<string, unknown>;

function setIfString(target: AnyRecord, key: string, value: unknown): void {
  if (typeof value === 'string') {
    target[key] = value;
  }
}

function cloneRecord(record: AnyRecord): AnyRecord {
  return { ...record };
}

export function withIndexFields<T extends object>(storeName: StoreName, record: T): T {
  const r = cloneRecord(record as AnyRecord);

  switch (storeName) {
    case STORE_NAMES.CEGEK:
      setIfString(r, '_pk', r['CégAzonosító']);
      setIfString(r, '_adoszama', r['Adószáma']);
      setIfString(r, '_cegnyilvantartasiSzama', r['Cégnyilvántartási száma']);
      setIfString(r, '_vamazonositoSzama', r['Vámazonosító száma']);
      setIfString(r, '_kozossegiAdoszama', r['Közösségi adószáma']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      setIfString(r, '_modositasIdeje', r['MódosításIdeje']);
      break;

    case STORE_NAMES.TEAOR_KODOK:
      setIfString(r, '_pk', r['TEÁOR-kód']);
      setIfString(r, '_megnevezes', r['Megnevezés']);
      break;

    case STORE_NAMES.CEG_TEAOR_KAPCSOLATOK:
      setIfString(r, '_pk', r['CégTEÁORKapcsolatAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_teaorKod', r['TEÁOR-kód']);
      setIfString(r, '_tipus', r['Típus']);
      setIfString(r, '_komponensUtvonal', r['Komponens útvonal']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      if (typeof r['_cegAzonosito'] === 'string' && typeof r['_tipus'] === 'string') {
        r['_cegAzonosito_tipus'] = [r['_cegAzonosito'], r['_tipus']];
      }
      break;

    case STORE_NAMES.GFO_KODOK:
      setIfString(r, '_pk', r['GFO kódja']);
      setIfString(r, '_megnevezese', r['Megnevezése']);
      break;

    case STORE_NAMES.CEG_GFO_KAPCSOLATOK:
      setIfString(r, '_pk', r['CégGFOKapcsolatAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_gfoKod', r['GFO kódja']);
      setIfString(r, '_komponensUtvonal', r['Komponens útvonal']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.CIMEK:
      setIfString(r, '_pk', r['CímAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_cimTipus', r['CímTípus']);
      setIfString(r, '_komponensUtvonal', r['Komponens útvonal']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      if (typeof r['_cegAzonosito'] === 'string' && typeof r['_cimTipus'] === 'string') {
        r['_cegAzonosito_cimTipus'] = [r['_cegAzonosito'], r['_cimTipus']];
      }
      break;

    case STORE_NAMES.BANKSZAMLASZAMOK:
      setIfString(r, '_pk', r['BankszámlaAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_szamlaSzama', r['számla száma']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.KEPVISELOK:
      setIfString(r, '_pk', r['KépviselőAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_adoazonositoJelAdoszam', r['adóazonosító jel/adószám']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.TULAJDONOSOK:
      setIfString(r, '_pk', r['TulajdonosAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_adoazonositoJele', r['Adóazonosító jele']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.NYILATKOZATOK_ES_ADOZASI_ADATOK:
      setIfString(r, '_pk', r['NyilatkozatAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_kategoria', r['Kategória']);
      setIfString(r, '_mezoNev', r['MezőNév']);
      setIfString(r, '_komponensUtvonal', r['Komponens útvonal']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.KAPCSOLATTARTASI_ADATOK:
      setIfString(r, '_pk', r['KapcsolatAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_elektronikusElerhetosege', r['Elektronikus elérhetősége']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.KORNYEZETVEDELMI_TERMEKDIJ_TETELEK:
      setIfString(r, '_pk', r['TermékdíjTételAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_kezdesDatum', r['Kezdés dátum']);
      setIfString(r, '_komponensUtvonal', r['Komponens útvonal']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      break;

    case STORE_NAMES.FORRASDOKUMENTUMOK:
      setIfString(r, '_pk', r['ForrásFájlAzonosító']);
      setIfString(r, '_forrasFajlHash', r['ForrásFájlHash']);
      setIfString(r, '_importalasIdeje', r['ImportálásIdeje']);
      setIfString(r, '_forrasFajlNev', r['ForrásFájlNév']);
      break;

    case STORE_NAMES.MUNKAVALLALOK:
      setIfString(r, '_pk', r['MunkavállalóAzonosító']);
      setIfString(r, '_cegAzonosito', r['CégAzonosító']);
      setIfString(r, '_nev', r['Név']);
      setIfString(r, '_szulido', r['Szül.idő']);
      setIfString(r, '_neme', r['Neme']);
      setIfString(r, '_szulnev', r['Szül.név']);
      setIfString(r, '_szulhely', r['Szül.hely']);
      setIfString(r, '_anyjaneve', r['Anyja neve']);
      setIfString(r, '_azonosito', r['Azonosító']);
      setIfString(r, '_adoazon', r['Adóazon']);
      setIfString(r, '_taj', r['TAJ']);
      setIfString(r, '_adoorszag', r['Adóország']);
      setIfString(r, '_euadoazon', r['EU.adóazon']);
      setIfString(r, '_nystatusz', r['Ny.státusz']);
      setIfString(r, '_nyugdijba', r['Nyugdíjba']);
      setIfString(r, '_vegzettseg', r['Végzettség']);
      setIfString(r, '_allcimhely', r['Állcím-hely']);
      setIfString(r, '_allcimutca', r['Állcím-utca']);
      setIfString(r, '_levcimhely', r['Levcím-hely']);
      setIfString(r, '_levcimutca', r['Levcím-utca']);
      setIfString(r, '_allpolg', r['Áll.polg']);
      setIfString(r, '_jvkod', r['Jvkód']);
      setIfString(r, '_alkmin', r['Alkmin']);
      setIfString(r, '_jvkezd', r['Jvkezd']);
      setIfString(r, '_jvbef', r['Jvbef']);
      setIfString(r, '_kilepmod', r['Kilép-mód']);
      setIfString(r, '_munkaszam', r['Munkaszám']);
      setIfString(r, '_email', r['E-mail']);
      setIfString(r, '_berforma', r['Bérforma']);
      setIfString(r, '_besber', r['Bes.bér']);
      setIfString(r, '_elsohazaskedv', r['ELSŐ HÁZAS KEDV']);
      setIfString(r, '_csaladikedv', r['CSALÁDI KEDV']);
      setIfString(r, '_testifkedv', r['TESTIF.KEDV']);
      setIfString(r, '_munkabajaras', r['munkábajárás']);
      setIfString(r, '_fizszell', r['Fiz/szell']);
      setIfString(r, '_teljresz', r['Telj/rész']);
      setIfString(r, '_reszido', r['Részidő']);
      setIfString(r, '_munkakor', r['Munkakör']);
      setIfString(r, '_feor', r['FEOR']);
      setIfString(r, '_tpfolykezd', r['Tp.folykezd']);
      setIfString(r, '_forrasFajlAzonosito', r['ForrásFájlAzonosító']);
      setIfString(r, '_modositasIdeje', r['MódosításIdeje']);
      break;
  }

  return r as T;
}

export function withIndexFieldsMany<T extends object>(storeName: StoreName, records: T[]): T[] {
  return records.map((record) => withIndexFields(storeName, record));
}
