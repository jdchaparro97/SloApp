// Números en esloveno: escritura, desglose explicado y concordancia con sustantivos.

export const MAX_NUMBER = 999_999

const UNITS = ['nič', 'ena', 'dva', 'tri', 'štiri', 'pet', 'šest', 'sedem', 'osem', 'devet']
const TEENS = ['deset', 'enajst', 'dvanajst', 'trinajst', 'štirinajst', 'petnajst', 'šestnajst', 'sedemnajst', 'osemnajst', 'devetnajst']
const TENS = ['', '', 'dvajset', 'trideset', 'štirideset', 'petdeset', 'šestdeset', 'sedemdeset', 'osemdeset', 'devetdeset']
const HUNDREDS = ['', 'sto', 'dvesto', 'tristo', 'štiristo', 'petsto', 'šeststo', 'sedemsto', 'osemsto', 'devetsto']

const UNITS_ES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']

export type Gender = 'm' | 'f' | 'n'

/** Forma del sustantivo que pide un número: depende de las dos últimas cifras. */
export type NounForm = 'singular' | 'dual' | 'plural' | 'genitivo'

export interface Block {
  /** Valor numérico del bloque (p. ej. 200 en 1234). */
  value: number
  /** Cómo se dice el bloque en esloveno. */
  text: string
  /** Explicación de cómo se forma, en español. */
  explanation: string
}

function assertInRange(n: number) {
  if (!Number.isInteger(n) || n < 0 || n > MAX_NUMBER) {
    throw new RangeError(`El número debe ser un entero entre 0 y ${MAX_NUMBER}`)
  }
}

/** 1–99 en una sola palabra. */
function below100(n: number): string {
  if (n < 10) return UNITS[n]
  if (n < 20) return TEENS[n - 10]
  const unit = n % 10
  const ten = Math.floor(n / 10)
  return unit === 0 ? TENS[ten] : `${UNITS[unit]}in${TENS[ten]}`
}

/** 1–999, con centenas y decenas separadas por espacio. */
function below1000(n: number): string {
  const hundred = Math.floor(n / 100)
  const rest = n % 100
  return [HUNDREDS[hundred], rest ? below100(rest) : ''].filter(Boolean).join(' ')
}

/** Cambia la última palabra según el género cuando el número termina en 01–04. */
function applyGender(words: string, lastTwo: number, gender: Gender | undefined): string {
  if (!gender || lastTwo < 1 || lastTwo > 4) return words
  const forms: Record<number, Record<Gender, string>> = {
    1: { m: 'en', f: 'ena', n: 'eno' },
    2: { m: 'dva', f: 'dve', n: 'dve' },
    3: { m: 'trije', f: 'tri', n: 'tri' },
    4: { m: 'štirje', f: 'štiri', n: 'štiri' },
  }
  const parts = words.split(' ')
  parts[parts.length - 1] = forms[lastTwo][gender]
  return parts.join(' ')
}

/**
 * El número escrito en esloveno.
 * Sin género devuelve la forma para contar (ena, dva…); con género, la que acompaña a un sustantivo.
 */
export function toSlovene(n: number, gender?: Gender): string {
  assertInRange(n)
  if (n === 0) return UNITS[0]
  const thousands = Math.floor(n / 1000)
  const rest = n % 1000
  const parts: string[] = []
  if (thousands === 1) parts.push('tisoč')
  // 101 000 = "sto en tisoč": solo el 1 final cambia delante de "tisoč" (2000 = "dva tisoč", 3000 = "tri tisoč").
  else if (thousands > 1) parts.push(`${thousands % 100 === 1 ? applyGender(below1000(thousands), 1, 'm') : below1000(thousands)} tisoč`)
  if (rest) parts.push(applyGender(below1000(rest), rest % 100, gender))
  return parts.join(' ')
}

function explainBelow100(n: number): string {
  if (n < 10) return `${UNITS_ES[n]}: se aprende de memoria`
  if (n === 10) return 'diez: se aprende de memoria'
  if (n < 20) return `${UNITS[n - 10]} + najst ("sobre diez")`
  const unit = n % 10
  const ten = Math.floor(n / 10)
  const tenExplanation = ten === 2 ? 'dvajset (veinte, forma especial)' : `${UNITS[ten]} + deset`
  if (unit === 0) return tenExplanation
  return `al revés que en español: ${UNITS[unit]} + in ("y") + ${TENS[ten]}, todo junto`
}

function explainHundreds(hundred: number): string {
  return hundred === 1 ? 'cien' : `${UNITS[hundred]} + sto, en una sola palabra`
}

/** Desglose del número en bloques (miles / centenas / decenas y unidades) con su explicación. */
export function breakdown(n: number): Block[] {
  assertInRange(n)
  if (n === 0) return [{ value: 0, text: UNITS[0], explanation: 'cero ("nada")' }]

  const blocks: Block[] = []
  const thousands = Math.floor(n / 1000)
  const hundred = Math.floor((n % 1000) / 100)
  const lastTwo = n % 100

  if (thousands === 1) {
    blocks.push({ value: 1000, text: 'tisoč', explanation: 'mil: se dice solo "tisoč", sin "uno"' })
  } else if (thousands > 1) {
    blocks.push({
      value: thousands * 1000,
      text: toSlovene(thousands * 1000),
      explanation: `${thousands} × mil: el número va antes, separado, y "tisoč" no cambia`,
    })
  }
  if (hundred) {
    blocks.push({ value: hundred * 100, text: HUNDREDS[hundred], explanation: explainHundreds(hundred) })
  }
  if (lastTwo) {
    blocks.push({ value: lastTwo, text: below100(lastTwo), explanation: explainBelow100(lastTwo) })
  }
  return blocks
}

/** Qué forma toma el sustantivo según el número (regla 1 / 2 / 3–4 / 5+). */
export function nounFormFor(n: number): NounForm {
  assertInRange(n)
  const lastTwo = n % 100
  if (lastTwo === 1) return 'singular'
  if (lastTwo === 2) return 'dual'
  if (lastTwo === 3 || lastTwo === 4) return 'plural'
  return 'genitivo'
}

export const NOUN_FORM_EXPLANATION: Record<NounForm, string> = {
  singular: 'Termina en 1: el sustantivo va en singular.',
  dual: 'Termina en 2: el sustantivo va en dual (exactamente dos).',
  plural: 'Termina en 3 o 4: el sustantivo va en plural.',
  genitivo: '0, o 5 en adelante: el sustantivo va en genitivo plural ("…de libros").',
}

export interface CountableNoun {
  id: string
  es: string
  gender: Gender
  forms: Record<NounForm, string>
}

export const COUNTABLE_NOUNS: CountableNoun[] = [
  { id: 'knjiga', es: 'libro', gender: 'f', forms: { singular: 'knjiga', dual: 'knjigi', plural: 'knjige', genitivo: 'knjig' } },
  { id: 'hisa', es: 'casa', gender: 'f', forms: { singular: 'hiša', dual: 'hiši', plural: 'hiše', genitivo: 'hiš' } },
  { id: 'stol', es: 'silla', gender: 'm', forms: { singular: 'stol', dual: 'stola', plural: 'stoli', genitivo: 'stolov' } },
  { id: 'fant', es: 'chico', gender: 'm', forms: { singular: 'fant', dual: 'fanta', plural: 'fantje', genitivo: 'fantov' } },
  { id: 'okno', es: 'ventana', gender: 'n', forms: { singular: 'okno', dual: 'okni', plural: 'okna', genitivo: 'oken' } },
  { id: 'jabolko', es: 'manzana', gender: 'n', forms: { singular: 'jabolko', dual: 'jabolki', plural: 'jabolka', genitivo: 'jabolk' } },
]

/** Número + sustantivo con la concordancia correcta, p. ej. "tri knjige", "pet knjig". */
export function withNoun(n: number, noun: CountableNoun): string {
  return `${toSlovene(n, noun.gender)} ${noun.forms[nounFormFor(n)]}`
}
