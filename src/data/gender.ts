import type { Gender } from '../lib/numbers'

export interface GenderWord {
  sl: string
  es: string
  gender: Gender
  /** Forma dual correcta, con el número ("dva stola"). */
  dual: string
  /** Forma dual incorrecta típica, para el ejercicio. */
  wrongDual: string
  note?: string
}

export const GENDER_LABELS: Record<Gender, string> = { m: 'Masculino', f: 'Femenino', n: 'Neutro' }

// Lista del ejercicio de géneros. Pendiente de revisión por un hablante nativo.
export const GENDER_WORDS: GenderWord[] = [
  { sl: 'stol', es: 'silla', gender: 'm', dual: 'dva stola', wrongDual: 'dve stoli' },
  { sl: 'brat', es: 'hermano', gender: 'm', dual: 'dva brata', wrongDual: 'dve brati' },
  { sl: 'kruh', es: 'pan', gender: 'm', dual: 'dva kruha', wrongDual: 'dve kruhi' },
  { sl: 'avto', es: 'auto', gender: 'm', dual: 'dva avta', wrongDual: 'dve avti', note: 'Excepción: termina en -o pero es masculino.' },
  { sl: 'hiša', es: 'casa', gender: 'f', dual: 'dve hiši', wrongDual: 'dva hiša' },
  { sl: 'miza', es: 'mesa', gender: 'f', dual: 'dve mizi', wrongDual: 'dva miza' },
  { sl: 'mačka', es: 'gata', gender: 'f', dual: 'dve mački', wrongDual: 'dva mačka' },
  { sl: 'knjiga', es: 'libro', gender: 'f', dual: 'dve knjigi', wrongDual: 'dva knjiga' },
  { sl: 'okno', es: 'ventana', gender: 'n', dual: 'dve okni', wrongDual: 'dva okna' },
  { sl: 'mesto', es: 'ciudad', gender: 'n', dual: 'dve mesti', wrongDual: 'dva mesta' },
  { sl: 'jabolko', es: 'manzana', gender: 'n', dual: 'dve jabolki', wrongDual: 'dva jabolka' },
  { sl: 'morje', es: 'mar', gender: 'n', dual: 'dve morji', wrongDual: 'dva morja' },
]

export const GENDER_TIPS: { rule: string; examples: string; exception?: string }[] = [
  { rule: 'Termina en consonante → casi siempre masculino', examples: 'stol (silla), brat (hermano)' },
  { rule: 'Termina en -a → casi siempre femenino', examples: 'hiša (casa), miza (mesa)', exception: 'Nombres de varones: Luka, Miha.' },
  { rule: 'Termina en -o / -e → neutro', examples: 'okno (ventana), morje (mar)', exception: 'Palabras extranjeras masculinas: avto, radio, kino.' },
  { rule: 'Termina en -ost → femenino (como "-dad")', examples: 'mladost (juventud)' },
  { rule: 'Termina en -ica → femenino', examples: 'ulica (calle), učiteljica (maestra)' },
  { rule: 'Termina en -nik / -ec → masculino', examples: 'zdravnik (médico), Slovenec (esloveno)' },
  { rule: 'Termina en -išče → neutro (un lugar)', examples: 'igrišče (patio de juegos)' },
  { rule: 'Algunas femeninas terminan en consonante', examples: 'noč (noche), stvar (cosa), pesem (canción)', exception: 'Hay que aprenderlas de memoria.' },
]
