import { useState } from 'react'
import { GENDER_LABELS, GENDER_WORDS, type GenderWord } from '../data/gender'
import { shuffle } from '../lib/exercises'
import type { Gender } from '../lib/numbers'

const GENDERS: Gender[] = ['m', 'f', 'n']

/** Ejercicio en 2 pasos: clasificar por género y después elegir el dual correcto. */
export function GenderSort() {
  const [round, setRound] = useState(0)
  return <GenderSortRound key={round} onRestart={() => setRound(round + 1)} />
}

function GenderSortRound({ onRestart }: { onRestart: () => void }) {
  const [words] = useState(() => shuffle(GENDER_WORDS))
  const [step, setStep] = useState<'sort' | 'dual' | 'done'>('sort')
  const [index, setIndex] = useState(0)
  const [placed, setPlaced] = useState<GenderWord[]>([])
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null)
  const [mistakes, setMistakes] = useState(0)
  // Opciones del paso 2, mezcladas una sola vez por palabra.
  const [dualOptions] = useState(() => words.map((w) => shuffle([w.dual, w.wrongDual])))

  const word = words[index]

  const advance = (nextStep: 'sort' | 'dual') => {
    setFeedback(null)
    if (index + 1 < words.length) {
      setIndex(index + 1)
    } else if (nextStep === 'sort') {
      setStep('dual')
      setIndex(0)
    } else {
      setStep('done')
    }
  }

  const answerGender = (g: Gender) => {
    const correct = g === word.gender
    if (correct) setPlaced([...placed, word])
    else setMistakes(mistakes + 1)
    setFeedback({
      correct,
      text: correct
        ? `Sí: ${word.sl} es ${GENDER_LABELS[word.gender].toLowerCase()}.${word.note ? ` ${word.note}` : ''}`
        : `No: ${word.sl} es ${GENDER_LABELS[word.gender].toLowerCase()}.${word.note ? ` ${word.note}` : ''}`,
    })
  }

  const answerDual = (option: string) => {
    const correct = option === word.dual
    if (!correct) setMistakes(mistakes + 1)
    const rule = word.gender === 'm' ? 'masculino → dva + -a' : 'femenino y neutro → dve + -i'
    setFeedback({ correct, text: `${correct ? 'Sí' : 'No'}: ${word.dual}. Regla: ${rule}.` })
  }

  if (step === 'done') {
    return (
      <div className="stack">
        <div className="feedback is-correct" role="status">
          <strong>¡Terminaste!</strong>
          <p>{mistakes === 0 ? 'Sin errores.' : `Tuviste ${mistakes} ${mistakes === 1 ? 'error' : 'errores'}.`}</p>
          <p>Truco: masculino → -a (dva stola); femenino y neutro → -i (dve hiši, dve okni).</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onRestart}>Jugar de nuevo</button>
      </div>
    )
  }

  return (
    <div className="stack">
      <p className="small muted">
        Paso {step === 'sort' ? '1: ¿qué género es?' : '2: ¿cómo es el dual?'} · {index + 1} de {words.length}
      </p>
      <div className="card">
        <p className="sl sl-big">{step === 'sort' ? word.sl : `2 × ${word.sl}`}</p>
        <p className="muted">{word.es}</p>
      </div>

      {step === 'sort' ? (
        <>
          <div className="gender-bins">
            {GENDERS.map((g) => (
              <div key={g} className={`gender-bin g-${g}`}>
                <button type="button" className={`btn g-${g}`} disabled={feedback !== null} onClick={() => answerGender(g)}>
                  {GENDER_LABELS[g]}
                </button>
                {placed.filter((w) => w.gender === g).map((w) => (
                  <span key={w.sl} className="small">{w.sl}</span>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="options">
          {dualOptions[index].map((option) => (
            <button key={option} type="button" className="btn option" disabled={feedback !== null} onClick={() => answerDual(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.correct ? 'is-correct' : 'is-wrong'}`} role="status">
          <p>{feedback.text}</p>
          <button type="button" className="btn btn-primary btn-block" onClick={() => advance(step === 'sort' ? 'sort' : 'dual')} autoFocus>
            Continuar
          </button>
        </div>
      )}
    </div>
  )
}
