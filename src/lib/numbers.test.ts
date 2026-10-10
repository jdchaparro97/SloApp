import { describe, expect, it } from 'vitest'
import { breakdown, COUNTABLE_NOUNS, nounFormFor, toSlovene, withNoun } from './numbers'

const noun = (id: string) => COUNTABLE_NOUNS.find((n) => n.id === id)!

describe('toSlovene', () => {
  it.each([
    [0, 'nič'], [1, 'ena'], [2, 'dva'], [5, 'pet'], [10, 'deset'],
    [11, 'enajst'], [14, 'štirinajst'], [19, 'devetnajst'],
    [20, 'dvajset'], [21, 'enaindvajset'], [34, 'štiriintrideset'], [99, 'devetindevetdeset'],
    [100, 'sto'], [101, 'sto ena'], [200, 'dvesto'], [345, 'tristo petinštirideset'],
    [1000, 'tisoč'], [1001, 'tisoč ena'], [1234, 'tisoč dvesto štiriintrideset'],
    [2000, 'dva tisoč'], [3000, 'tri tisoč'], [21000, 'enaindvajset tisoč'],
    [101000, 'sto en tisoč'], [999999, 'devetsto devetindevetdeset tisoč devetsto devetindevetdeset'],
  ])('%i → %s', (n, expected) => {
    expect(toSlovene(n)).toBe(expected)
  })

  it('rechaza números fuera de rango', () => {
    expect(() => toSlovene(-1)).toThrow(RangeError)
    expect(() => toSlovene(1_000_000)).toThrow(RangeError)
    expect(() => toSlovene(1.5)).toThrow(RangeError)
  })
})

describe('nounFormFor', () => {
  it.each([
    [1, 'singular'], [2, 'dual'], [3, 'plural'], [4, 'plural'], [5, 'genitivo'], [0, 'genitivo'],
    [11, 'genitivo'], [12, 'genitivo'], [21, 'genitivo'], [22, 'genitivo'],
    [101, 'singular'], [102, 'dual'], [103, 'plural'], [105, 'genitivo'], [1001, 'singular'],
  ])('%i → %s', (n, expected) => {
    expect(nounFormFor(n)).toBe(expected)
  })
})

describe('withNoun', () => {
  it('concuerda con femenino', () => {
    expect(withNoun(1, noun('knjiga'))).toBe('ena knjiga')
    expect(withNoun(2, noun('knjiga'))).toBe('dve knjigi')
    expect(withNoun(3, noun('knjiga'))).toBe('tri knjige')
    expect(withNoun(5, noun('knjiga'))).toBe('pet knjig')
  })

  it('concuerda con masculino', () => {
    expect(withNoun(1, noun('stol'))).toBe('en stol')
    expect(withNoun(2, noun('stol'))).toBe('dva stola')
    expect(withNoun(3, noun('fant'))).toBe('trije fantje')
    expect(withNoun(4, noun('stol'))).toBe('štirje stoli')
    expect(withNoun(102, noun('stol'))).toBe('sto dva stola')
  })

  it('concuerda con neutro', () => {
    expect(withNoun(1, noun('okno'))).toBe('eno okno')
    expect(withNoun(2, noun('okno'))).toBe('dve okni')
    expect(withNoun(6, noun('okno'))).toBe('šest oken')
  })
})

describe('breakdown', () => {
  it('divide 1234 en mil, doscientos y treinta y cuatro', () => {
    const blocks = breakdown(1234)
    expect(blocks.map((b) => [b.value, b.text])).toEqual([
      [1000, 'tisoč'],
      [200, 'dvesto'],
      [34, 'štiriintrideset'],
    ])
    expect(blocks[2].explanation).toContain('al revés')
  })

  it('omite bloques vacíos', () => {
    expect(breakdown(5000).map((b) => b.text)).toEqual(['pet tisoč'])
    expect(breakdown(105).map((b) => b.value)).toEqual([100, 5])
  })
})
