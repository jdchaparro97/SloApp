import type { Unit } from './types'
import { unit1 } from './unit1'
import { unit2 } from './unit2'
import { unit3 } from './unit3'
import { unit4 } from './unit4'
import { unit5 } from './unit5'
import { unit6 } from './unit6'
import { unit7 } from './unit7'
import { unit8 } from './unit8'
import { unit9 } from './unit9'
import { unit10 } from './unit10'

export const UNITS: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10]

export function findUnit(id: number): Unit | undefined {
  return UNITS.find((u) => u.id === id)
}
