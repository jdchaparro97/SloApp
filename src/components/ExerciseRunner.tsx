import { useState, type ReactNode } from 'react'
import type { Exercise } from '../data/types'
import { ExerciseView } from './ExerciseView'
import { TopBar } from './TopBar'

interface Props {
  exercises: Exercise[]
  /** En modo estricto (desafío) los errores no se repiten: cuentan para la nota. */
  strict?: boolean
  /** `score` = proporción de ejercicios acertados al primer intento (0–1). */
  onFinish: (score: number) => void
  closeHref: string
  help?: ReactNode
  label: string
}

/** Muestra los ejercicios de a uno. Fuera del modo estricto, los que fallás vuelven al final una vez. */
export function ExerciseRunner({ exercises, strict = false, onFinish, closeHref, help, label }: Props) {
  const [queue, setQueue] = useState(() => exercises.map((_, i) => i))
  const [position, setPosition] = useState(0)
  const [firstTry, setFirstTry] = useState<Record<number, boolean>>({})

  const current = queue[position]
  const handleNext = (correct: boolean) => {
    const isFirstAttempt = !(current in firstTry)
    const nextFirstTry = isFirstAttempt ? { ...firstTry, [current]: correct } : firstTry
    const nextQueue = !correct && !strict && isFirstAttempt ? [...queue, current] : queue
    setFirstTry(nextFirstTry)
    setQueue(nextQueue)
    if (position + 1 >= nextQueue.length) {
      onFinish(Object.values(nextFirstTry).filter(Boolean).length / exercises.length)
    } else {
      setPosition(position + 1)
    }
  }

  return (
    <>
      <TopBar closeHref={closeHref} progress={position / queue.length} help={help} />
      <p className="prompt-label">{label} · {position + 1} de {queue.length}</p>
      <ExerciseView key={position} exercise={exercises[current]} onNext={handleNext} />
    </>
  )
}
