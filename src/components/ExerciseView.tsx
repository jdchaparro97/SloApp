import { useState } from 'react'
import { genderOf } from '../data/lexicon'
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
    <div className="stack" style={{ gap: 24 }}>
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

/** Separa la consigna en una etiqueta chica y el texto grande: 'Armá: "Hola"' → "Armá la frase" + "Hola". */
export function splitPrompt(prompt: string): { label?: string; big: string } {
  const prefixes: [string, string][] = [['Armá: ', 'Armá la frase'], ['Completá: ', 'Completá la frase'], ['Repaso: ', 'Repaso']]
  for (const [prefix, label] of prefixes) {
    if (prompt.startsWith(prefix)) return { label, big: prompt.slice(prefix.length).replace(/^"(.+?)"/, '$1') }
  }
  return { big: prompt }
}

function Prompt({ text }: { text: string }) {
  const { label, big } = splitPrompt(text)
  return (
    <div className="stack" style={{ gap: 8 }}>
      {label && <span className="prompt-label">{label}</span>}
      <h2 className="prompt-big">{big}</h2>
    </div>
  )
}

/** Palabra en píldora, con el punto de su género si es un sustantivo. */
function WordChip({ word, placed, disabled, onClick }: { word: string; placed?: boolean; disabled: boolean; onClick: () => void }) {
  const gender = genderOf(word)
  return (
    <button type="button" className={`word ${placed ? 'word-placed' : ''} ${gender ? 'has-dot' : ''}`} disabled={disabled} onClick={onClick}>
      {gender && <span className={`gdot g-${gender}`} aria-hidden="true" />}
      {word}
    </button>
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
        <div className="stack" style={{ gap: 20 }}>
          <Prompt text={exercise.prompt} />
          {exercise.kind === 'fill' && (
            <p className="card sl" style={{ fontSize: 22 }}>
              <span>{exercise.before} <span aria-label="hueco" style={{ borderBottom: '2px solid currentColor', paddingInline: 4 }}>{selected !== null ? exercise.options[selected] : '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</span>{exercise.after}</span>
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
    <div className="stack" style={{ gap: 24 }}>
      <Prompt text={exercise.prompt} />
      <div className="word-answer" aria-label="Tu frase">
        {pickedIds.map((id) => (
          <WordChip key={id} word={bank.find((b) => b.id === id)!.word} placed disabled={disabled} onClick={() => update(pickedIds.filter((p) => p !== id))} />
        ))}
        {picked.length === 0 && !disabled && <span className="muted small">Tocá las palabras en orden.</span>}
      </div>
      <div className="word-panel word-bank" aria-label="Palabras disponibles">
        {bank.filter((b) => !pickedIds.includes(b.id)).map((b) => (
          <WordChip key={b.id} word={b.word} disabled={disabled} onClick={() => update([...pickedIds, b.id])} />
        ))}
      </div>
      {bank.some((b) => genderOf(b.word)) && (
        <p className="legend">
          El punto marca el género: <span className="g-m">azul</span> masculino, <span className="g-f">naranja</span> femenino,{' '}
          <span className="g-n">verde</span> neutro. Sin punto: no tiene género.
        </p>
      )}
    </div>
  )
}
