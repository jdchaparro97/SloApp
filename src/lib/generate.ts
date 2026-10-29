import type { Exercise, Pair, Section, Unit } from '../data/types'
import { EXTRAS, type Example } from '../data/vocabulary'
import { shuffle } from './exercises'
import { isNameSlot, randomChoices, render, slotsOf } from './templates'

// Arma las secciones completas de una unidad: los ejercicios escritos a mano más
// ejercicios generados a partir del vocabulario y las frases de ejemplo.
// Se vuelve a generar en cada intento: cambian las frases (señor/señora, persona, nombres…),
// las opciones y el orden.

/** Preguntas de "¿Cómo se dice esta frase?" y de "Completá" en la Práctica. */
const PRACTICE_PHRASES = 5
/** Preguntas generadas que se suman al Desafío. */
const CHALLENGE_EXTRA = 10
/** Las frases más largas no se usan para armar: serían difíciles de ordenar. */
const MAX_ORDER_WORDS = 8

type Random = () => number

/** Palabras que sobran al armar una frase: 2 en las primeras unidades, 3 desde la 4. */
export function extraWordsFor(unitId: number): number {
  return unitId <= 3 ? 2 : 3
}

export function vocabularyOf(unit: Unit): Pair[] {
  const discover = unit.sections?.find((s) => s.kind === 'discover')
  const base = discover?.kind === 'discover' ? discover.items : []
  return [...base, ...(EXTRAS[unit.id]?.vocab ?? [])]
}

export function examplesOf(unit: Unit): Example[] {
  return EXTRAS[unit.id]?.examples ?? []
}

/** Quita la puntuación de los bordes: así el signo final no delata cuál es la última palabra. */
export function bareWord(token: string): string {
  return token.replace(/^[¡¿"«(]+|[.,!?…"»):;]+$/g, '')
}

function tokens(sentence: string): string[] {
  return sentence.split(/\s+/).map(bareWord).filter(Boolean)
}

/** Palabras sueltas de la unidad, para completar las trampas. */
function unitWordPool(unit: Unit): string[] {
  const words = vocabularyOf(unit).filter((v) => !/[ /…]/.test(v.sl)).map((v) => bareWord(v.sl))
  return [...new Set(words)].filter(Boolean)
}

/** Opciones: la correcta más `count` distractores distintos, sacados del resto. */
function withDistractors(correct: string, pool: string[], count: number, random: Random): { options: string[]; answer: number } {
  const distractors = shuffle([...new Set(pool.filter((p) => p !== correct))], random).slice(0, count)
  const options = shuffle([correct, ...distractors], random)
  return { options, answer: options.indexOf(correct) }
}

/** "¿Qué significa X?" (esloveno → español). */
function meaningQuestion(word: Pair, vocab: Pair[], random: Random): Exercise {
  return { kind: 'choice', prompt: '¿Qué significa?', sl: word.sl, ...withDistractors(word.es, vocab.map((v) => v.es), 2, random), explain: word.note }
}

/** "¿Cómo se dice X?" (español → esloveno). */
function translateQuestion(word: Pair, vocab: Pair[], random: Random): Exercise {
  return { kind: 'choice', prompt: `¿Cómo se dice "${word.es}"?`, ...withDistractors(word.sl, vocab.map((v) => v.sl), 2, random), explain: word.note }
}

function vocabQuestion(word: Pair, vocab: Pair[], random: Random): Exercise {
  return random() < 0.5 ? meaningQuestion(word, vocab, random) : translateQuestion(word, vocab, random)
}

/** Una versión concreta de la frase (si tiene partes que cambian, elige al azar). */
function resolve(example: Example, random: Random): { sl: string; es: string; choices: number[] } {
  const choices = randomChoices(example.sl, random)
  return { sl: render(example.sl, choices), es: render(example.es, choices), choices }
}

/** Trampas de la frase: las otras opciones de cada parte que cambia y las trampas escritas a mano. */
function trapWords(example: Example, choices: number[]): string[] {
  const fromSlots = slotsOf(example.sl).flatMap((alts, k) =>
    isNameSlot(example, k) ? [] : alts.filter((_, i) => i !== choices[k]).flatMap(tokens),
  )
  return [...fromSlots, ...(example.traps ?? []).map(bareWord)]
}

/** Elige `count` palabras que sobran: primero trampas, después palabras de la unidad. Nunca una de la respuesta. */
function pickExtras(answer: string[], traps: string[], pool: string[], count: number, random: Random): string[] {
  const used = new Set(answer.map((w) => w.toLowerCase()))
  const extras: string[] = []
  for (const candidate of [...shuffle(traps, random), ...shuffle(pool, random)]) {
    if (extras.length >= count) break
    if (!used.has(candidate.toLowerCase())) {
      used.add(candidate.toLowerCase())
      extras.push(candidate)
    }
  }
  return extras
}

function orderQuestion(example: Example, pool: string[], count: number, random: Random): Exercise | null {
  const { sl, es, choices } = resolve(example, random)
  const words = tokens(sl)
  if (words.length < 2 || words.length > MAX_ORDER_WORDS) return null
  const distractors = pickExtras(words, trapWords(example, choices), pool, count, random)
  return { kind: 'order', prompt: `Armá: "${es}"`, words, distractors, full: sl, explain: example.note }
}

/** Ejercicios de ordenar escritos a mano: sin puntuación en los botones y con palabras que sobren. */
function withMoreDistractors(exercise: Exercise, pool: string[], count: number, random: Random): Exercise {
  if (exercise.kind !== 'order') return exercise
  const words = exercise.words.map(bareWord)
  const traps = (exercise.distractors ?? []).map(bareWord)
  const distractors = pickExtras(words, traps, pool, Math.max(count, traps.length), random)
  return { ...exercise, words, distractors, full: exercise.full ?? exercise.words.join(' ') }
}

/** "¿Cómo se dice esta frase?": la traducción correcta contra variantes parecidas. */
function phraseQuestion(example: Example, examples: Example[], random: Random): Exercise {
  const { sl, es } = resolve(example, random)
  const variants: string[] = []
  for (let i = 0; i < 12 && variants.length < 2; i++) {
    const other = resolve(example, random)
    if (other.sl !== sl && other.es !== es && !variants.includes(other.sl)) variants.push(other.sl)
  }
  const others = shuffle(examples.filter((e) => e !== example), random).map((e) => resolve(e, random).sl)
  const pool = [...variants, ...others].filter((x, i, xs) => x !== sl && xs.indexOf(x) === i).slice(0, 2)
  const options = shuffle([sl, ...pool], random)
  return { kind: 'choice', prompt: `¿Cómo se dice "${es}"?`, options, answer: options.indexOf(sl), explain: example.note }
}

/** "Completá": se elige la forma correcta de una parte que cambia (gospod/gospa, sem/si…). */
function fillQuestion(example: Example, random: Random): Exercise | null {
  const slots = slotsOf(example.sl)
  const candidates = slots.map((_, k) => k).filter((k) => !isNameSlot(example, k) && slots[k].length >= 2)
  if (candidates.length === 0) return null
  const blank = candidates[Math.floor(random() * candidates.length)]
  const choices = randomChoices(example.sl, random)
  const [before, after] = render(example.sl, choices, blank).split('\u0000')
  const options = shuffle(slots[blank].slice(), random)
  return {
    kind: 'fill',
    prompt: `Completá: "${render(example.es, choices)}"`,
    before: before.trimEnd(),
    after,
    options,
    answer: options.indexOf(slots[blank][choices[blank]]),
    explain: example.note,
  }
}

/** Los ejercicios de "escuchar" se convierten en lectura: con o sin voz en el dispositivo, sirven igual. */
function withoutListening(exercise: Exercise): Exercise {
  if (exercise.kind !== 'listen') return exercise
  return { kind: 'choice', prompt: '¿Qué significa?', sl: exercise.sl, options: exercise.options, answer: exercise.answer, explain: exercise.explain }
}

function notNull<T>(x: T | null): x is T {
  return x !== null
}

/** Las 5 secciones de la unidad con el contenido ampliado. Sin secciones escritas, devuelve []. */
export function buildSections(unit: Unit, random: Random = Math.random): Section[] {
  if (!unit.sections) return []
  const vocab = vocabularyOf(unit)
  const examples = examplesOf(unit)
  const pool = unitWordPool(unit)
  const extra = extraWordsFor(unit.id)
  const prepare = (exercises: Exercise[]) => exercises.map(withoutListening).map((e) => withMoreDistractors(e, pool, extra, random))
  const orders = () => examples.map((e) => orderQuestion(e, pool, extra, random)).filter(notNull)
  const phrases = (count: number) => shuffle(examples, random).slice(0, count).map((e) => phraseQuestion(e, examples, random))
  const fills = (count: number) => shuffle(examples.map((e) => fillQuestion(e, random)).filter(notNull), random).slice(0, count)

  return unit.sections.map((section): Section => {
    switch (section.id) {
      case 'descubri':
        return {
          id: 'descubri',
          kind: 'discover',
          items: [...vocab, ...examples.map((e) => discoverCard(e, random))],
        }
      case 'dialogo':
        if (section.kind !== 'dialogue') return section
        return { ...section, exercises: prepare(section.exercises) }
      case 'frases':
        if (section.kind !== 'exercises') return section
        return { ...section, exercises: shuffle([...prepare(section.exercises), ...orders()], random) }
      case 'practica':
        if (section.kind !== 'exercises') return section
        return {
          ...section,
          exercises: shuffle([
            ...prepare(section.exercises),
            ...vocab.map((w) => vocabQuestion(w, vocab, random)),
            ...phrases(PRACTICE_PHRASES),
            ...fills(PRACTICE_PHRASES),
          ], random),
        }
      case 'desafio': {
        if (section.kind !== 'exercises') return section
        const generated = [...vocab.map((w) => vocabQuestion(w, vocab, random)), ...orders(), ...phrases(4), ...fills(4)]
        return { ...section, exercises: shuffle([...prepare(section.exercises), ...shuffle(generated, random).slice(0, CHALLENGE_EXTRA)], random) }
      }
      default:
        return section
    }
  })
}

/** Tarjeta de "Descubrí" para una frase: una versión al azar y, si cambia, cómo cambia. */
function discoverCard(example: Example, random: Random): Pair {
  const { sl, es } = resolve(example, random)
  const slSlots = slotsOf(example.sl)
  const esSlots = slotsOf(example.es)
  const changes = slSlots
    .map((alts, k) => (isNameSlot(example, k) ? null : alts.map((alt, i) => `${alt} (${esSlots[k][i]})`).join(' · ')))
    .filter(notNull)
  const parts = ['Frase de ejemplo.', example.note, changes.length ? `Puede cambiar: ${changes.join(' — ')}.` : undefined]
  return { sl, es, note: parts.filter(Boolean).join(' ') }
}
