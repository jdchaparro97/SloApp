import type { Unit } from './types'
import { unit1 } from './unit1'

export const UNITS: Unit[] = [
  unit1,
  { id: 2, title: 'Presentarme y mi familia', topic: 'Verbo biti y los 3 géneros' },
  { id: 3, title: 'Números', topic: 'Regla 1 / 2 / 3–4 / 5+ y el dual' },
  { id: 4, title: 'Comida y bebida', topic: 'Acusativo' },
  { id: 5, title: 'En la ciudad', topic: 'Locativo con v / na' },
  { id: 6, title: 'Transporte', topic: 'Instrumental' },
  { id: 7, title: 'Días, horas y fechas', topic: 'Días de la semana y la hora' },
  { id: 8, title: 'Compras', topic: 'Genitivo' },
  { id: 9, title: 'Mi casa y mi día', topic: 'Verbos en presente y dual en verbos' },
  { id: 10, title: 'Ayuda y repaso final', topic: 'Dativo' },
]

export function findUnit(id: number): Unit | undefined {
  return UNITS.find((u) => u.id === id)
}
