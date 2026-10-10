// Modelo de contenido. Todo el contenido vive en src/data/ separado del código para poder revisarlo fácil.

export interface Pair {
  /** Texto en esloveno. */
  sl: string
  /** Traducción al español. */
  es: string
  note?: string
}

export type Exercise =
  /** Elegir la opción correcta. Si tiene `sl`, se puede escuchar. */
  | { kind: 'choice'; prompt: string; sl?: string; options: string[]; answer: number; explain?: string }
  /** Ordenar palabras para armar la frase en esloveno. */
  | { kind: 'order'; prompt: string; words: string[]; distractors?: string[]; explain?: string }
  /** Completar el hueco de una frase. */
  | { kind: 'fill'; prompt: string; before: string; after: string; options: string[]; answer: number; explain?: string }
  /** Escuchar y elegir qué se dijo. */
  | { kind: 'listen'; sl: string; options: string[]; answer: number; explain?: string }

export type Answer = number | string[]

export interface Rule {
  title: string
  body: string[]
  table?: { head: string[]; rows: string[][] }
  examples?: Pair[]
}

export type SectionId = 'descubri' | 'frases' | 'dialogo' | 'practica' | 'desafio'

export type Section =
  | { id: 'descubri'; kind: 'discover'; items: Pair[] }
  | { id: 'dialogo'; kind: 'dialogue'; title: string; lines: (Pair & { speaker: string })[]; exercises: Exercise[] }
  | { id: 'frases' | 'practica' | 'desafio'; kind: 'exercises'; exercises: Exercise[] }

export interface Unit {
  id: number
  title: string
  /** Tema gramatical nuevo de la unidad. */
  topic: string
  rule?: Rule
  /** Sin secciones = unidad todavía sin contenido. */
  sections?: Section[]
}

export const SECTION_ORDER: SectionId[] = ['descubri', 'frases', 'dialogo', 'practica', 'desafio']

export const SECTION_TITLES: Record<SectionId, string> = {
  descubri: 'Descubrí',
  frases: 'Frases',
  dialogo: 'Diálogo',
  practica: 'Práctica',
  desafio: 'Desafío',
}

/** Porcentaje mínimo de respuestas correctas para aprobar el desafío. */
export const CHALLENGE_PASS = 0.8
