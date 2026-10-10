import { useState } from 'react'
import { SpeakButton } from '../components/SpeakButton'
import { GENDER_LABELS } from '../data/gender'
import { breakdown, COUNTABLE_NOUNS, MAX_NUMBER, NOUN_FORM_EXPLANATION, nounFormFor, toSlovene, withNoun } from '../lib/numbers'

/** Calculadora: no suma, muestra cómo se dice un número y cómo se forma. */
export function Calculator() {
  const [raw, setRaw] = useState('1234')
  const [nounId, setNounId] = useState(COUNTABLE_NOUNS[0].id)

  const digits = raw.replace(/\D/g, '')
  const n = digits === '' ? null : Number(digits)
  const valid = n !== null && n <= MAX_NUMBER
  const noun = COUNTABLE_NOUNS.find((c) => c.id === nounId)!

  return (
    <div className="stack">
      <label className="stack">
        <span>Escribí un número (0 a {MAX_NUMBER.toLocaleString('es-AR')})</span>
        <input
          className="calc-input"
          inputMode="numeric"
          autoComplete="off"
          value={raw}
          onChange={(e) => setRaw(e.target.value.replace(/\D/g, '').slice(0, 6))}
        />
      </label>

      {n === null && <p className="muted">Escribí un número para ver cómo se dice.</p>}
      {n !== null && !valid && <p className="notice">Por ahora la calculadora llega hasta {MAX_NUMBER.toLocaleString('es-AR')}.</p>}

      {valid && (
        <>
          <div className="card" aria-live="polite">
            <p className="small muted">{n.toLocaleString('es-AR')} se dice</p>
            <div className="spread">
              <p className="sl sl-big">{toSlovene(n)}</p>
              <SpeakButton text={toSlovene(n)} />
            </div>
          </div>

          <section className="stack" aria-label="Cómo se forma">
            <h2>Cómo se forma</h2>
            <div className="blocks">
              {breakdown(n).map((block) => (
                <div key={block.value} className="block">
                  <p><strong>{block.value.toLocaleString('es-AR')}</strong> → <span className="sl">{block.text}</span></p>
                  <p className="small muted">{block.explanation}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="stack" aria-label="Con una palabra">
            <h2>Con una palabra</h2>
            <label className="row">
              <span>Objeto:</span>
              <select value={nounId} onChange={(e) => setNounId(e.target.value)}>
                {COUNTABLE_NOUNS.map((c) => (
                  <option key={c.id} value={c.id}>{c.forms.singular} ({c.es})</option>
                ))}
              </select>
            </label>
            <div className="card">
              <p className="small"><span className={`chip g-${noun.gender}`}>{GENDER_LABELS[noun.gender]}</span></p>
              <div className="spread">
                <p className={`sl sl-big g-${noun.gender}`}>{withNoun(n, noun)}</p>
                <SpeakButton text={withNoun(n, noun)} />
              </div>
              <p className="small">{NOUN_FORM_EXPLANATION[nounFormFor(n)]}</p>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
