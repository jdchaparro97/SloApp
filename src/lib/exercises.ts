import type { Answer, Exercise } from '../data/types'

const normalize = (s: string) => s.trim().toLowerCase()

export function isCorrect(exercise: Exercise, answer: Answer): boolean {
  if (exercise.kind === 'order') {
    if (!Array.isArray(answer)) return false
    return answer.map(normalize).join(' ') === exercise.words.map(normalize).join(' ')
  }
  return answer === exercise.answer
}

/** La respuesta correcta, para mostrarla cuando el usuario se equivoca. */
export function correctAnswerText(exercise: Exercise): string {
  switch (exercise.kind) {
    case 'order':
      return exercise.full ?? exercise.words.join(' ')
    case 'fill':
      return `${exercise.before} ${exercise.options[exercise.answer]}${exercise.after}`.trim()
    default:
      return exercise.options[exercise.answer]
  }
}

/** Copia mezclada (Fisher–Yates). `random` se puede inyectar para tests. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
