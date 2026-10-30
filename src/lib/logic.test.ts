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
import { genderOf, lexiconWords } from '../data/lexicon'
import { splitPrompt } from '../components/ExerciseView'
import { isNameSlot, randomChoices, render, slotsOf, templateProblems } from './templates'

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
    ['#/viaje', { name: 'viaje' }],
    ['#/cualquier-cosa', { name: 'ruta' }],
  ])('%s', (hash, expected) => {
    expect(parseRoute(hash)).toEqual(expected)
  })
})

describe('frases con partes que cambian', () => {
  const pair = { sl: 'Nasvidenje, {gospod|gospa}!', es: '¡Adiós, {señor|señora}!' }

  it('reemplaza cada hueco por la opción elegida, igual en los dos idiomas', () => {
    expect(slotsOf(pair.sl)).toEqual([['gospod', 'gospa']])
    expect(render(pair.sl, [1])).toBe('Nasvidenje, gospa!')
    expect(render(pair.es, [1])).toBe('¡Adiós, señora!')
    expect(render('Sin huecos.', [])).toBe('Sin huecos.')
  })

  it('marca el hueco a completar', () => {
    expect(render(pair.sl, [0], 0).split('\u0000')).toEqual(['Nasvidenje, ', '!'])
  })

  it('elige opciones dentro del rango', () => {
    for (let i = 0; i < 20; i++) expect(randomChoices(pair.sl, Math.random)[0]).toBeLessThan(2)
  })

  it('detecta plantillas mal armadas y huecos de nombres', () => {
    expect(templateProblems(pair)).toEqual([])
    expect(templateProblems({ sl: '{a|b}', es: 'sin hueco' })).toHaveLength(1)
    expect(templateProblems({ sl: '{a|b}', es: '{x|y|z}' })).toHaveLength(1)
    expect(isNameSlot({ sl: 'Ime mi je {Ana|Luka}.', es: 'Me llamo {Ana|Luka}.' }, 0)).toBe(true)
    expect(isNameSlot(pair, 0)).toBe(false)
  })
})

describe('rutas de ayudas', () => {
  it.each([
    ['#/ayudas/regla/3', { name: 'ayudas', page: 'regla', sub: '3' }],
    ['#/ayudas/calculadora', { name: 'ayudas', page: 'calculadora', sub: undefined }],
  ])('%s', (hash, expected) => {
    expect(parseRoute(hash)).toEqual(expected)
  })
})

describe('género de las palabras (puntos de color)', () => {
  it('reconoce sustantivos en distintas formas y deja sin punto lo que no es sustantivo', () => {
    expect(genderOf('kava')).toBe('f')
    expect(genderOf('kavo')).toBe('f')
    expect(genderOf('Dan')).toBe('m')
    expect(genderOf('jutro')).toBe('n')
    expect(genderOf('oče')).toBe('m')
    expect(genderOf('Luka')).toBe('m')
    expect(genderOf('Dober')).toBeUndefined()
    expect(genderOf('je')).toBeUndefined()
  })

  it('tiene las formas de los sustantivos de los ejercicios', () => {
    expect(lexiconWords().length).toBeGreaterThan(200)
  })
})

describe('consigna en dos partes', () => {
  it('separa la etiqueta del texto grande', () => {
    expect(splitPrompt('Armá: "¡Buen día, señora!"')).toEqual({ label: 'Armá la frase', big: '¡Buen día, señora!' })
    expect(splitPrompt('Armá: "¿Cómo estás?" (informal)')).toEqual({ label: 'Armá la frase', big: '¿Cómo estás? (informal)' })
    expect(splitPrompt('Completá: "Tomo café."')).toEqual({ label: 'Completá la frase', big: 'Tomo café.' })
    expect(splitPrompt('¿Qué significa?')).toEqual({ big: '¿Qué significa?' })
  })
})
