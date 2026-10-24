import { describe, expect, it } from 'vitest'
import { buildSections, examplesOf, vocabularyOf } from '../lib/generate'
import { GENDER_WORDS } from './gender'
import { TRAVEL_GROUPS } from './travel'
import { SECTION_ORDER, type Exercise } from './types'
import { UNITS } from './units'

// Validación automática del contenido: atrapa errores de carga antes de que lleguen a la app.

function exerciseProblems(ex: Exercise): string[] {
  const problems: string[] = []
  if (ex.kind === 'order') {
    if (ex.words.length < 2) problems.push('ordenar necesita al menos 2 palabras')
    for (const d of ex.distractors ?? []) if (ex.words.includes(d)) problems.push(`distractor "${d}" también es correcto`)
  } else {
    if (ex.options.length < 2) problems.push('necesita al menos 2 opciones')
    if (ex.answer < 0 || ex.answer >= ex.options.length) problems.push(`respuesta ${ex.answer} fuera de rango`)
    if (new Set(ex.options).size !== ex.options.length) problems.push('opciones repetidas')
  }
  return problems
}

describe('unidades', () => {
  it('hay 10 unidades numeradas del 1 al 10', () => {
    expect(UNITS.map((u) => u.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  for (const unit of UNITS.filter((u) => u.sections)) {
    describe(`unidad ${unit.id}`, () => {
      it('tiene las 5 secciones en orden', () => {
        expect(unit.sections!.map((s) => s.id)).toEqual(SECTION_ORDER)
      })

      for (const section of unit.sections!) {
        it(`${section.id}: contenido válido`, () => {
          if (section.kind === 'discover') {
            expect(section.items.length).toBeGreaterThan(0)
            return
          }
          expect(section.exercises.length).toBeGreaterThan(0)
          const problems = section.exercises.flatMap((ex, i) => exerciseProblems(ex).map((p) => `#${i + 1}: ${p}`))
          expect(problems).toEqual([])
        })
      }
    })
  }
})

/** Generador pseudoaleatorio con semilla, para que las pruebas sean repetibles. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

describe('contenido ampliado', () => {
  for (const unit of UNITS) {
    describe(`unidad ${unit.id}`, () => {
      it('tiene al menos 20 palabras y 10 frases de ejemplo', () => {
        expect(vocabularyOf(unit).length).toBeGreaterThanOrEqual(20)
        expect(examplesOf(unit).length).toBeGreaterThanOrEqual(10)
      })

      it('no repite palabras ni traducciones (si no, habría dos opciones correctas)', () => {
        const vocab = vocabularyOf(unit)
        const repeated = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i)
        expect(repeated(vocab.map((v) => v.sl))).toEqual([])
        expect(repeated(vocab.map((v) => v.es))).toEqual([])
        expect(repeated(examplesOf(unit).map((e) => e.es))).toEqual([])
      })

      it('las secciones generadas son válidas y más largas', () => {
        for (const seed of [1, 2, 3, 42, 99]) {
          const sections = buildSections(unit, seeded(seed))
          expect(sections.map((s) => s.id)).toEqual(SECTION_ORDER)
          for (const section of sections) {
            if (section.kind === 'discover') {
              expect(section.items.length).toBeGreaterThanOrEqual(30)
              continue
            }
            const problems = section.exercises.flatMap((ex, i) => exerciseProblems(ex).map((p) => `${section.id} #${i + 1}: ${p}`))
            expect(problems).toEqual([])
          }
          const count = (id: string) => sections.find((s) => s.id === id)
          const exercises = (id: string) => {
            const s = count(id)
            return s && s.kind === 'exercises' ? s.exercises.length : 0
          }
          expect(exercises('frases')).toBeGreaterThanOrEqual(14)
          expect(exercises('practica')).toBeGreaterThanOrEqual(25)
          expect(exercises('desafio')).toBe(15)
        }
      })
    })
  }
})

describe('modo viaje', () => {
  it('los ids de frases son únicos', () => {
    const ids = TRAVEL_GROUPS.flatMap((g) => g.phrases.map((p) => p.id))
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('géneros', () => {
  it('hay palabras de los 3 géneros y el dual correcto difiere del incorrecto', () => {
    expect(new Set(GENDER_WORDS.map((w) => w.gender))).toEqual(new Set(['m', 'f', 'n']))
    for (const w of GENDER_WORDS) {
      expect(w.dual).not.toBe(w.wrongDual)
      expect(w.dual.startsWith(w.gender === 'm' ? 'dva ' : 'dve ')).toBe(true)
    }
  })
})
