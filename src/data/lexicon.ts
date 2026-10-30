import type { Gender } from '../lib/numbers'

// Género de los sustantivos que aparecen en los ejercicios, en todas las formas que se usan
// (kava, kavo, kave…). Sirve para mostrar el punto de color en cada palabra.
// Las palabras que no están (verbos, adjetivos, adverbios…) no tienen género y van sin punto.
// Pendiente de revisión por un hablante nativo.

const MASCULINE = `
avto avtom avtobus avtobusom brat brata bratu bratranec bratranca čaj čas časa četrtek čevlji dan dni dedek denar denarja
dojenček gasilci gasilce grad hotel hotelu hrib hribu kilogram kilograma kolega kolegu kos kovček kozarec krompir krompirja
kruh kruha liter mesec most mož muzej muzeju odhod oče oči otrok otroci park parku pes psa petek ponedeljek popust popusta
potnik prihod prijatelj račun razred razredu rešilec rešilca sedež semafor semaforju sir sladkor sladkorja sladoled sok soka
stol stolu stric tek telefon telefona teden torek trebuh trg trgu večer vikend vlak vlakom voznik vrt vrtu zajtrk zdravnik
zdravniku zemljevid zob luka marko martín matías tomaž tomás jure
`

const FEMININE = `
babica babici banka blagajna cena cerkev cesta družina glava glavo gotovina gotovino hiša hiši hči jesen juha juho kartica
kartice kartico kava kave kavi kavo knjiga knjigo knjižnica knjižnici kopalnica kuhinja ladja ladjo lekarna majica mama mami
minuta miza mizi nedelja nedeljo nesreča noga noč policija policijo pomlad pomoč pomoči postaja postaji postelja postelji
potica pošta pošti reka restavracija riba ribo rib roka rože sestra sestre sestri sestro sestrična slovenščina slovenščino
soba sobota soboto sol solata solato sreda sredo tableta teta televizija televizijo trgovina trgovini ulica ura ur velikost
večerja večerjo voda vode vodi vozovnica vozovnice vozovnici vozovnico vrečka vročina vročino zamuda zamudo zelenjava zima
šola šoli šolo žena ana nina lucía sofía argentina argentine argentini ljubljana ljubljane ljubljani slovenija sloveniji
mendoza mendozi
`

const NEUTER = `
grlo ime jabolko jabolka jabolk jajce jajc jutro kolo kolesom kosilo leto let letalo letalom letališče meso mesa mesto mleko
mleka morje okno poletje sadje vino vrata
`

const LEXICON = new Map<string, Gender>()
for (const [list, gender] of [[MASCULINE, 'm'], [FEMININE, 'f'], [NEUTER, 'n']] as const) {
  for (const word of list.split(/\s+/).filter(Boolean)) LEXICON.set(word, gender)
}

/** Género de una palabra (sin puntuación), o undefined si no es un sustantivo conocido. */
export function genderOf(word: string): Gender | undefined {
  return LEXICON.get(word.toLowerCase())
}

export function lexiconWords(): string[] {
  return [...LEXICON.keys()]
}
