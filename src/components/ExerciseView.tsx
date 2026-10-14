import { useState } from 'react'
import type { Answer, Exercise } from '../data/types'
import { correctAnswerText, isCorrect, shuffle } from '../lib/exercises'
import { useSloveneVoice } from '../lib/speech'
import { SpeakButton } from './SpeakButton'

interface Props {
  exercise: Exercise
  /** Se llama al tocar "Continuar", con el resultado del intento. */
  onNext: (correct: boolean) => void
}

/** Un ejercicio: responder → comprobar → ver la corrección → continuar. Montar con `key` distinta por ejercicio. */
export function ExerciseView({ exercise, onNext }: Props) {
  const [answer, setAnswer] = useState<Answer | null>(exercise.kind === 'order' ? [] : null)
  const [checked, setChecked] = useState(false)
  const correct = checked && answer !== null && isCorrect(exercise, answer)
  const canCheck = Array.isArray(answer) ? answer.length > 0 : answer !== null

  return (
    <div className="stack">
      {exercise.kind === 'order' ? (
        <OrderExercise exercise={exercise} picked={answer as string[]} disabled={checked} onChange={setAnswer} />
      ) : (
        <OptionsExercise exercise={exercise} selected={answer as number | null} checked={checked} onSelect={setAnswer} />
      )}

      {checked ? (
        <div className={`feedback ${correct ? 'is-correct' : 'is-wrong'}`} role="status">
          <strong>{correct ? '¡Correcto!' : 'No es correcto'}</strong>
          {!correct && <p>Respuesta correcta: <span className="sl">{correctAnswerText(exercise)}</span></p>}
          {exercise.explain && <p>{exercise.explain}</p>}
          <button type="button" className="btn btn-primary btn-block" onClick={() => onNext(correct)} autoFocus>
            Continuar
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-primary btn-block" disabled={!canCheck} onClick={() => setChecked(true)}>
          Comprobar
        </button>
      )}
    </div>
  )
}

type OptionsKind = Extract<Exercise, { kind: 'choice' | 'fill' | 'listen' }>

function OptionsExercise({ exercise, selected, checked, onSelect }: {
  exercise: OptionsKind
  selected: number | null
  checked: boolean
  onSelect: (i: number) => void
}) {
  const hasVoice = useSloveneVoice()
  const [showText, setShowText] = useState(false)
  // Opciones mezcladas para que la respuesta no se memorice por posición (las de 2 opciones, tipo sí/no, quedan fijas).
  const [order] = useState(() => {
    const indexes = exercise.options.map((_, i) => i)
    return indexes.length > 2 ? shuffle(indexes) : indexes
  })

  return (
    <>
      {exercise.kind === 'listen' ? (
        <div className="stack">
          <h2>¿Qué escuchaste?</h2>
          <div className="row">
            <SpeakButton text={exercise.sl} />
            {(!hasVoice || showText) ? (
              <span className="sl sl-big">{exercise.sl}</span>
            ) : (
              <button type="button" className="btn" onClick={() => setShowText(true)}>Mostrar texto</button>
            )}
          </div>
          {!hasVoice && <p className="notice">Tu dispositivo no tiene voz en esloveno, así que te mostramos el texto.</p>}
        </div>
      ) : (
        <div className="stack">
          <h2>{exercise.prompt}</h2>
          {exercise.kind === 'fill' && (
            <p className="sl sl-big">
              {exercise.before} <span aria-label="hueco">{selected !== null ? exercise.options[selected] : '____'}</span>{exercise.after}
            </p>
          )}
          {exercise.kind === 'choice' && exercise.sl && (
            <div className="row"><span className="sl sl-big">{exercise.sl}</span><SpeakButton text={exercise.sl} /></div>
          )}
        </div>
      )}
      <div className="options">
        {order.map((i) => {
          const option = exercise.options[i]
          const state = checked ? (i === exercise.answer ? 'is-correct' : i === selected ? 'is-wrong' : '') : ''
          return (
            <button
              key={option}
              type="button"
              className={`btn option ${state}`}
              aria-pressed={selected === i}
              disabled={checked}
              onClick={() => onSelect(i)}
            >
              {option}
            </button>
          )
        })}
      </div>
    </>
  )
}

function OrderExercise({ exercise, picked, disabled, onChange }: {
  exercise: Extract<Exercise, { kind: 'order' }>
  picked: string[]
  disabled: boolean
  onChange: (words: string[]) => void
}) {
  // Cada palabra del banco se identifica por su posición, por si hay palabras repetidas.
  const [bank] = useState(() => shuffle([...exercise.words, ...(exercise.distractors ?? [])].map((word, id) => ({ word, id }))))
  const [pickedIds, setPickedIds] = useState<number[]>([])

  const update = (ids: number[]) => {
    setPickedIds(ids)
    onChange(ids.map((id) => bank.find((b) => b.id === id)!.word))
  }

  return (
    <div className="stack">
      <h2>{exercise.prompt}</h2>
      <div className="word-answer" aria-label="Tu frase">
        {pickedIds.map((id) => (
          <button key={id} type="button" className="btn" disabled={disabled} onClick={() => update(pickedIds.filter((p) => p !== id))}>
            {bank.find((b) => b.id === id)!.word}
          </button>
        ))}
      </div>
      <div className="word-bank" aria-label="Palabras disponibles">
        {bank.filter((b) => !pickedIds.includes(b.id)).map((b) => (
          <button key={b.id} type="button" className="btn" disabled={disabled} onClick={() => update([...pickedIds, b.id])}>
            {b.word}
          </button>
        ))}
      </div>
      {picked.length === 0 && !disabled && <p className="muted small">Tocá las palabras en orden.</p>}
    </div>
  )
}
