import type { Exercise, Pair, Section, Unit } from '../data/types'
import { EXTRAS } from '../data/vocabulary'
import { shuffle } from './exercises'

// Arma las secciones completas de una unidad: los ejercicios escritos a mano más
// ejercicios generados a partir del vocabulario y las frases de ejemplo.
// Se vuelve a generar en cada intento, así que las preguntas cambian de orden y de opciones.

/** Frases de ejemplo que se usan para "escuchar" en la Práctica. */
const PRACTICE_LISTEN = 5
/** Preguntas generadas que se suman al Desafío. */
const CHALLENGE_EXTRA = 10
/** Las frases más largas no se usan para ordenar: serían difíciles de armar. */
const MAX_ORDER_WORDS = 8

type Random = () => number

export function vocabularyOf(unit: Unit): Pair[] {
  const discover = unit.sections?.find((s) => s.kind === 'discover')
  const base = discover?.kind === 'discover' ? discover.items : []
  return [...base, ...(EXTRAS[unit.id]?.vocab ?? [])]
}

export function examplesOf(unit: Unit): Pair[] {
  return EXTRAS[unit.id]?.examples ?? []
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

function orderQuestion(example: Pair): Exercise | null {
  const words = example.sl.split(' ')
  if (words.length < 2 || words.length > MAX_ORDER_WORDS) return null
  return { kind: 'order', prompt: `Armá: "${example.es}"`, words, explain: example.note }
}

function listenQuestion(example: Pair, examples: Pair[], random: Random): Exercise {
  return { kind: 'listen', sl: example.sl, ...withDistractors(example.es, examples.map((e) => e.es), 2, random) }
}

/** Las 5 secciones de la unidad con el contenido ampliado. Sin secciones escritas, devuelve []. */
export function buildSections(unit: Unit, random: Random = Math.random): Section[] {
  if (!unit.sections) return []
  const vocab = vocabularyOf(unit)
  const examples = examplesOf(unit)
  const orders = examples.map(orderQuestion).filter((e): e is Exercise => e !== null)

  return unit.sections.map((section): Section => {
    switch (section.id) {
      case 'descubri':
        return {
          id: 'descubri',
          kind: 'discover',
          items: [
            ...vocab,
            ...examples.map((e) => ({ ...e, note: e.note ? `Frase de ejemplo. ${e.note}` : 'Frase de ejemplo.' })),
          ],
        }
      case 'frases':
        if (section.kind !== 'exercises') return section
        return { ...section, exercises: shuffle([...section.exercises, ...orders], random) }
      case 'practica':
        if (section.kind !== 'exercises') return section
        return {
          ...section,
          exercises: shuffle([
            ...section.exercises,
            ...vocab.map((w) => vocabQuestion(w, vocab, random)),
            ...shuffle(examples, random).slice(0, PRACTICE_LISTEN).map((e) => listenQuestion(e, examples, random)),
          ], random),
        }
      case 'desafio': {
        if (section.kind !== 'exercises') return section
        const pool = [...vocab.map((w) => vocabQuestion(w, vocab, random)), ...orders]
        return { ...section, exercises: shuffle([...section.exercises, ...shuffle(pool, random).slice(0, CHALLENGE_EXTRA)], random) }
      }
      default:
        return section
    }
  })
}
