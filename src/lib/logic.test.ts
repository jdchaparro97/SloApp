import { describe, expect, it } from 'vitest'
import type { Exercise } from '../data/types'
import { correctAnswerText, isCorrect, shuffle } from './exercises'
import {
  completeSection,
  EMPTY_PROGRESS,
  isSectionUnlocked,
  isUnitUnlocked,
  toggleFavorite,
  updateStreak,
  visibleStreak,
} from './progress'
import { parseRoute } from './router'
import { HELP_TOPICS, normalize, searchHelp } from '../data/help'

describe('isCorrect', () => {
  const choice: Exercise = { kind: 'choice', prompt: '', options: ['a', 'b'], answer: 1 }
  const order: Exercise = { kind: 'order', prompt: '', words: ['Kako', 'si?'] }

  it('acepta la opción correcta y rechaza las demás', () => {
    expect(isCorrect(choice, 1)).toBe(true)
    expect(isCorrect(choice, 0)).toBe(false)
  })

  it('compara el orden de palabras sin importar mayúsculas', () => {
    expect(isCorrect(order, ['kako', 'si?'])).toBe(true)
    expect(isCorrect(order, ['si?', 'Kako'])).toBe(false)
    expect(isCorrect(order, ['Kako'])).toBe(false)
  })

  it('muestra la frase completa en ejercicios de completar', () => {
    const fill: Exercise = { kind: 'fill', prompt: '', before: 'Dobro,', after: '.', options: ['prosim', 'hvala'], answer: 1 }
    expect(correctAnswerText(fill)).toBe('Dobro, hvala.')
  })
})

describe('shuffle', () => {
  it('mantiene los mismos elementos sin modificar el original', () => {
    const original = [1, 2, 3, 4, 5]
    const result = shuffle(original)
    expect([...result].sort()).toEqual(original)
    expect(original).toEqual([1, 2, 3, 4, 5])
  })
})

describe('desbloqueo', () => {
  it('la unidad 1 está abierta y la 2 se abre al aprobar el desafío', () => {
    expect(isUnitUnlocked(1, EMPTY_PROGRESS)).toBe(true)
    expect(isUnitUnlocked(2, EMPTY_PROGRESS)).toBe(false)
    expect(isUnitUnlocked(2, { ...EMPTY_PROGRESS, done: ['u1:desafio'] })).toBe(true)
  })

  it('las secciones se abren en orden', () => {
    expect(isSectionUnlocked(1, 'descubri', EMPTY_PROGRESS)).toBe(true)
    expect(isSectionUnlocked(1, 'frases', EMPTY_PROGRESS)).toBe(false)
    expect(isSectionUnlocked(1, 'frases', { ...EMPTY_PROGRESS, done: ['u1:descubri'] })).toBe(true)
    expect(isSectionUnlocked(2, 'descubri', EMPTY_PROGRESS)).toBe(false)
  })
})

describe('racha', () => {
  const day = (d: string) => new Date(`${d}T12:00:00`)

  it('suma si ayer hubo actividad, se reinicia si no', () => {
    expect(updateStreak({ lastDay: '2026-10-09', count: 4 }, day('2026-10-10'))).toEqual({ lastDay: '2026-10-10', count: 5 })
    expect(updateStreak({ lastDay: '2026-10-07', count: 4 }, day('2026-10-10'))).toEqual({ lastDay: '2026-10-10', count: 1 })
    expect(updateStreak({ lastDay: '2026-10-10', count: 4 }, day('2026-10-10'))).toEqual({ lastDay: '2026-10-10', count: 4 })
  })

  it('funciona al cambiar de mes', () => {
    expect(updateStreak({ lastDay: '2026-09-30', count: 2 }, day('2026-10-01')).count).toBe(3)
  })

  it('muestra 0 si la racha ya se cortó', () => {
    expect(visibleStreak({ lastDay: '2026-10-09', count: 4 }, day('2026-10-10'))).toBe(4)
    expect(visibleStreak({ lastDay: '2026-10-07', count: 4 }, day('2026-10-10'))).toBe(0)
  })

  it('completar una sección no la duplica', () => {
    const once = completeSection(EMPTY_PROGRESS, 'u1:descubri', day('2026-10-10'))
    const twice = completeSection(once, 'u1:descubri', day('2026-10-10'))
    expect(twice.done).toEqual(['u1:descubri'])
    expect(twice.streak.count).toBe(1)
  })
})

describe('favoritos', () => {
  it('agrega y quita', () => {
    const added = toggleFavorite(EMPTY_PROGRESS, 'hvala')
    expect(added.favorites).toEqual(['hvala'])
    expect(toggleFavorite(added, 'hvala').favorites).toEqual([])
  })
})

describe('parseRoute', () => {
  it.each([
    ['', { name: 'ruta' }],
    ['#/ruta', { name: 'ruta' }],
    ['#/unidad/1', { name: 'unidad', unitId: 1 }],
    ['#/unidad/1/frases', { name: 'seccion', unitId: 1, section: 'frases' }],
    ['#/ayudas', { name: 'ayudas', page: undefined, sub: undefined }],
    ['#/ayudas/numeros', { name: 'ayudas', page: 'numeros', sub: undefined }],
    ['#/ayudas/numeros/practicar', { name: 'ayudas', page: 'numeros', sub: 'practicar' }],
    ['#/ayudas/unidad/3', { name: 'ayudas', page: 'unidad', sub: '3' }],
    ['#/viaje', { name: 'viaje' }],
    ['#/cualquier-cosa', { name: 'ruta' }],
  ])('%s', (hash, expected) => {
    expect(parseRoute(hash)).toEqual(expected)
  })
})

describe('buscador de ayudas', () => {
  const titles = (q: string) => searchHelp(q).map((r) => r.title)

  it('encuentra temas por nombre y por palabra clave', () => {
    expect(titles('dual')[0]).toBe('El dual')
    expect(titles('acusativo')).toContain('Los 6 casos')
    expect(titles('calculadora')).toContain('Números')
  })

  it('encuentra reglas de unidades', () => {
    expect(titles('acusativo')).toContain('Unidad 4 · Acusativo')
    expect(titles('locativo')).toContain('Unidad 5 · Locativo con v / na')
  })

  it('ignora tildes y "techitos"', () => {
    expect(normalize('Č')).toBe('c')
    expect(titles('č')).toContain('Pronunciación')
    expect(titles('č')).not.toContain('Los 6 casos')
    expect(titles('genero')).toContain('Géneros')
  })

  it('vacío no devuelve nada y cada tema tiene explicación', () => {
    expect(searchHelp('  ')).toEqual([])
    for (const t of HELP_TOPICS) expect(t.rule.body.length).toBeGreaterThan(0)
  })
})
