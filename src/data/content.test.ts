import { describe, expect, it } from 'vitest'
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
