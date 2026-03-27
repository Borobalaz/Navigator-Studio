export type IsoDateString = string;
export type IsoDateTimeString = string;

export interface TechnikaiMezok {
  'ForrásFájlAzonosító': string;
  'LétrehozásIdeje': IsoDateTimeString;
  'MódosításIdeje': IsoDateTimeString;
}

export interface KomponensUtvonalas {
  'Komponens útvonal': string;
}

export interface CegRecord extends TechnikaiMezok {
  'CégAzonosító': string;
  'Megnevezése': string;
  'Adószáma': string;
  'Vámazonosító száma'?: string;
  'Közösségi adószáma'?: string;
  'Cégnyilvántartási száma'?: string;
  'Székhelycíme'?: string;
  'Illetékessége (illetékes igazgatóság kódja és megnevezése)'?: string;
  'Állapotkód és érvényesség kezdése'?: string;
  'Adózói minősítés és az utolsó minősítés érvényességének kezdete'?: string;
  'ÁFA bevallói jogcímkód és gyakoriság'?: string;
  'Bevallói típuskód'?: string;
  'Összesítő nyilatkozat gyakorisága'?: string;
  'Tao tv. hatálya alá tartozik-e, tao-alanyiság'?: string;
  'Tevékenység kezdés dátuma'?: IsoDateString;
  'Alakulás módja'?: string;
  'Főtevékenység'?: string;
}

export interface TeaorKodRecord {
  'TEÁOR-kód': string;
  'Megnevezés': string;
}

export interface CegTeaorKapcsolatRecord extends TechnikaiMezok, KomponensUtvonalas {
  'CégTEÁORKapcsolatAzonosító': string;
  'CégAzonosító': string;
  'TEÁOR-kód': string;
  'TEÁOR-kód és megnevezése': string;
  'Típus': 'Főtevékenysége' | 'Egyéb tevékenységek';
  'Érvényesség kezdet'?: IsoDateString;
}

export interface GfoKodRecord {
  'GFO kódja': string;
  'Megnevezése': string;
}

export interface CegGfoKapcsolatRecord extends TechnikaiMezok, KomponensUtvonalas {
  'CégGFOKapcsolatAzonosító': string;
  'CégAzonosító': string;
  'GFO kódja': string;
  'GFO kódja és megnevezése': string;
  'Érvényesség kezdete'?: IsoDateString;
}

export interface CimRecord extends TechnikaiMezok, KomponensUtvonalas {
  'CímAzonosító': string;
  'CégAzonosító': string;
  'CímTípus': 'Székhelye' | 'Telephelye(i)' | 'Iratőrzési hely';
  'Címadat': string;
  'Érvényesség kezdete'?: IsoDateString;
}

export interface BankszamlaRecord extends TechnikaiMezok, KomponensUtvonalas {
  'BankszámlaAzonosító': string;
  'CégAzonosító': string;
  'számla száma': string;
  'érvényesség kezdése'?: IsoDateString;
}

export interface KepviseloRecord extends TechnikaiMezok, KomponensUtvonalas {
  'KépviselőAzonosító': string;
  'CégAzonosító': string;
  'név/elnevezés': string;
  'adóazonosító jel/adószám'?: string;
  'képviselet jellege (törvényes képviselő, szervezeti képviselő, felszámoló, végelszámoló)'?: string;
  'képviselet terjedelme (önálló, együttes, képviseleti jogot nem gyakorol)'?: string;
  'képviseleti jog kezdete'?: IsoDateString;
}

export interface TulajdonosRecord extends TechnikaiMezok, KomponensUtvonalas {
  'TulajdonosAzonosító': string;
  'CégAzonosító': string;
  'Természetes személy'?: string;
  'Neve': string;
  'Adóazonosító jele'?: string;
  'Lakóhelye'?: string;
  'Érvényesség kezdete'?: IsoDateString;
}

export interface NyilatkozatAdozasiAdatRecord extends TechnikaiMezok, KomponensUtvonalas {
  'NyilatkozatAzonosító': string;
  'CégAzonosító': string;
  'Kategória': string;
  'MezőNév': string;
  'MezőÉrték'?: string;
  'Érvényesség kezdete'?: IsoDateString;
}

export interface KapcsolattartasiAdatRecord extends TechnikaiMezok, KomponensUtvonalas {
  'KapcsolatAzonosító': string;
  'CégAzonosító': string;
  'Elektronikus elérhetősége': string;
}

export interface KornyezetvedelmiTermekdijTetelRecord extends TechnikaiMezok, KomponensUtvonalas {
  'TermékdíjTételAzonosító': string;
  'CégAzonosító': string;
  'Leírás': string;
  'Kezdés dátum'?: IsoDateString;
}

export interface ForrasDokumentumRecord {
  'ForrásFájlAzonosító': string;
  'ForrásFájlNév': string;
  'ForrásFájlHash': string;
  'ImportálásIdeje': IsoDateTimeString;
  'ParserVerzió': string;
  'SorokSzáma': number;
}

export interface MunkavallaloRecord extends TechnikaiMezok {
  'MunkavállalóAzonosító': string;
  'CégAzonosító': string;
  'Név': string;
  'Szül.idő'?: string;
  'Neme'?: string;
  'Szül.név'?: string;
  'Szül.hely'?: string;
  'Anyja neve'?: string;
  'Azonosító'?: string;
  'Adóazon'?: string;
  'TAJ'?: string;
  'Adóország'?: string;
  'EU.adóazon'?: string;
  'Ny.státusz'?: string;
  'Nyugdíjba'?: string;
  'Végzettség'?: string;
  'Állcím-irsz'?: string;
  'Állcím-hely'?: string;
  'Állcím-utca'?: string;
  'Állcím-jelleg'?: string;
  'Állcím-hsz'?: string;
  'Levcím-irsz'?: string;
  'Levcím-hely'?: string;
  'Levcím-utca'?: string;
  'Levcím-jelleg'?: string;
  'Levcím-hsz'?: string;
  'Áll.polg'?: string;
  'Jvkód'?: string;
  'Alkmin'?: string;
  'Jvkezd'?: string;
  'Jvbef'?: string;
  'Kilép-mód'?: string;
  'Szerzlejár'?: string;
  'Orvoslejár'?: string;
  'Szerv'?: string;
  'E-mail'?: string;
  'Kifh'?: string;
  'El.mhely'?: string;
  'Bérforma'?: string;
  'Bes.bér'?: string;
  'Ing.bérbea.szja'?: string;
  'Ing.bérbea.adóm'?: string;
  'ELSŐ HÁZAS KEDV'?: string;
  'CSALÁDI KEDV'?: string;
  'TESTIF.KEDV'?: string;
  'munkábajárás'?: string;
  'Fiz/szell'?: string;
  'Telj/rész'?: string;
  'Részidő'?: string;
  'Munkaszám'?: string;
  'Munkakör'?: string;
  'FEOR'?: string;
  'Járkedvkód1'?: string;
  'Kedvkezd1'?: string;
  'Kedvbef1'?: string;
  'Járkedvkód2'?: string;
  'Kedvkezd2'?: string;
  'Kedvbef2'?: string;
  'Járkedvkód3'?: string;
  'Kedvkezd3'?: string;
  'Kedvbef3'?: string;
  'Önyp.kód'?: string;
  'Önyp.kezd'?: string;
  'Önyp.tagd%'?: string;
  'Önyp.tagdij'?: string;
  'Önyp.azon'?: string;
  'Öegp.kód'?: string;
  'Öegp.kezd'?: string;
  'Öegp.tagd%'?: string;
  'Öegp.tagdij'?: string;
  'Öegp.azon'?: string;
  'Szaksz.tag'?: string;
  'Cskedv megoszt'?: string;
  'Eházas kezd'?: string;
  'Tp.folykezd'?: string;
  'Jogviszony kezdete'?: IsoDateString;
  'Jogviszony vége'?: IsoDateString;
}

export interface DbRecordMap {
  CEGEK: CegRecord;
  TEAOR_KODOK: TeaorKodRecord;
  CEG_TEAOR_KAPCSOLATOK: CegTeaorKapcsolatRecord;
  GFO_KODOK: GfoKodRecord;
  CEG_GFO_KAPCSOLATOK: CegGfoKapcsolatRecord;
  CIMEK: CimRecord;
  BANKSZAMLASZAMOK: BankszamlaRecord;
  KEPVISELOK: KepviseloRecord;
  TULAJDONOSOK: TulajdonosRecord;
  NYILATKOZATOK_ES_ADOZASI_ADATOK: NyilatkozatAdozasiAdatRecord;
  KAPCSOLATTARTASI_ADATOK: KapcsolattartasiAdatRecord;
  KORNYEZETVEDELMI_TERMEKDIJ_TETELEK: KornyezetvedelmiTermekdijTetelRecord;
  FORRASDOKUMENTUMOK: ForrasDokumentumRecord;
  MUNKAVALLALOK: MunkavallaloRecord;
}
