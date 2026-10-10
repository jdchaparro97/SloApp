import { useCallback, useEffect, useState } from 'react'
import { SECTION_ORDER, type SectionId } from '../data/types'

// El progreso se guarda solo en el dispositivo: sin cuentas ni datos personales.

export interface Progress {
  /** Secciones terminadas, como "u1:descubri". */
  done: string[]
  /** Frases favoritas del modo viaje. */
  favorites: string[]
  streak: { lastDay: string; count: number }
}

const STORAGE_KEY = 'sloapp-progress-v1'

export const EMPTY_PROGRESS: Progress = { done: [], favorites: [], streak: { lastDay: '', count: 0 } }

export const sectionKey = (unitId: number, section: SectionId) => `u${unitId}:${section}`

export function isUnitUnlocked(unitId: number, progress: Progress): boolean {
  return unitId === 1 || progress.done.includes(sectionKey(unitId - 1, 'desafio'))
}

export function isSectionUnlocked(unitId: number, section: SectionId, progress: Progress): boolean {
  if (!isUnitUnlocked(unitId, progress)) return false
  const index = SECTION_ORDER.indexOf(section)
  return index === 0 || progress.done.includes(sectionKey(unitId, SECTION_ORDER[index - 1]))
}

/** Fecha local en formato AAAA-MM-DD. */
export function dayString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Actualiza la racha: suma un día si ayer hubo actividad, vuelve a 1 si se cortó. */
export function updateStreak(streak: Progress['streak'], today: Date): Progress['streak'] {
  const todayStr = dayString(today)
  if (streak.lastDay === todayStr) return streak
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const count = streak.lastDay === dayString(yesterday) ? streak.count + 1 : 1
  return { lastDay: todayStr, count }
}

/** Racha que se muestra hoy: si el último día fue antes de ayer, ya se cortó. */
export function visibleStreak(streak: Progress['streak'], today: Date): number {
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  return streak.lastDay === dayString(today) || streak.lastDay === dayString(yesterday) ? streak.count : 0
}

export function completeSection(progress: Progress, key: string, today: Date): Progress {
  return {
    ...progress,
    done: progress.done.includes(key) ? progress.done : [...progress.done, key],
    streak: updateStreak(progress.streak, today),
  }
}

export function toggleFavorite(progress: Progress, id: string): Progress {
  const favorites = progress.favorites.includes(id)
    ? progress.favorites.filter((f) => f !== id)
    : [...progress.favorites, id]
  return { ...progress, favorites }
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_PROGRESS
    const parsed = JSON.parse(raw) as Partial<Progress>
    return { ...EMPTY_PROGRESS, ...parsed }
  } catch {
    return EMPTY_PROGRESS
  }
}

function save(progress: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Sin almacenamiento (modo privado): el progreso dura lo que dure la pestaña.
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)
  useEffect(() => save(progress), [progress])
  const update = useCallback((fn: (p: Progress) => Progress) => setProgress(fn), [])
  return { progress, update }
}
