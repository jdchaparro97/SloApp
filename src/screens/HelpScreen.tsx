import { useState } from 'react'
import { RuleCard } from '../components/RuleCard'
import { SpeakButton } from '../components/SpeakButton'
import { GENDER_TIPS } from '../data/gender'
import { findHelpTopic, HELP_TOPICS, PRONUNCIATION, searchHelp, type HelpTopic } from '../data/help'
import { findUnit, UNITS } from '../data/units'
import { Calculator } from './Calculator'
import { GenderSort } from './GenderSort'
import { NotFound } from './NotFound'

/**
 * Ayudas, ordenadas por tema. Rutas:
 *   #/ayudas                  índice con buscador
 *   #/ayudas/<tema>           explicación → ejemplos → botón "Practicar"
 *   #/ayudas/<tema>/practicar la práctica del tema
 *   #/ayudas/unidad/<n>       regla de una unidad
 */
export function HelpScreen({ page, sub }: { page?: string; sub?: string }) {
  if (!page) return <HelpIndex />
  if (page === 'unidad') return <UnitRule unitId={Number(sub)} />
  const topic = findHelpTopic(page)
  if (!topic) return <NotFound />
  if (sub === 'practicar' && topic.practice) return <TopicPractice topic={topic} />
  if (sub) return <NotFound />
  return <TopicPage topic={topic} />
}

function HelpIndex() {
  const [query, setQuery] = useState('')
  const results = searchHelp(query)

  return (
    <main className="screen">
      <h1>Ayudas</h1>
      <label className="stack">
        <span className="muted small">Buscá un tema, una regla o una palabra</span>
        <input
          type="search"
          className="search-input"
          placeholder="Ej.: dual, acusativo, č"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {query.trim() ? (
        <section className="stack" aria-label="Resultados">
          {results.length === 0 ? (
            <p className="notice">No encontramos nada con "{query}". Probá con otra palabra.</p>
          ) : (
            <ul className="list">
              {results.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="list-item">
                    <div>
                      <h2>{r.title}</h2>
                      <p className="small muted">{r.summary}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <>
          <section className="stack">
            <h2 className="section-label">Temas</h2>
            <ul className="list">
              {HELP_TOPICS.map((t) => (
                <li key={t.id}>
                  <a href={`#/ayudas/${t.id}`} className="list-item">
                    <div>
                      <h2>{t.title}</h2>
                      <p className="small muted">{t.summary}</p>
                    </div>
                    {t.practice && <span className="small muted">+ práctica</span>}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className="stack">
            <h2 className="section-label">Reglas por unidad</h2>
            <ul className="list">
              {UNITS.filter((u) => u.rule).map((u) => (
                <li key={u.id}>
                  <a href={`#/ayudas/unidad/${u.id}`} className="list-item">
                    <div>
                      <p className="small muted">Unidad {u.id} · {u.title}</p>
                      <h2>{u.topic}</h2>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  )
}

function TopicPage({ topic }: { topic: HelpTopic }) {
  return (
    <main className="screen">
      <a href="#/ayudas" className="small">← Ayudas</a>
      <h1>{topic.title}</h1>
      <RuleCard rule={topic.rule} />
      {topic.extra === 'pronunciacion' && <PronunciationList />}
      {topic.extra === 'tips-genero' && <GenderTips />}
      {topic.units && (
        <p className="small muted">
          Lo ves en {topic.units.length === 1 ? 'la unidad' : 'las unidades'}{' '}
          {topic.units.map((id, i) => (
            <span key={id}>
              {i > 0 && (i === topic.units!.length - 1 ? ' y ' : ', ')}
              <a href={`#/ayudas/unidad/${id}`}>{id}</a>
            </span>
          ))}
          .
        </p>
      )}
      {topic.practice && (
        <a href={`#/ayudas/${topic.id}/practicar`} className="btn btn-primary btn-block">{topic.practice.label}</a>
      )}
    </main>
  )
}

function TopicPractice({ topic }: { topic: HelpTopic }) {
  return (
    <main className="screen">
      <a href={`#/ayudas/${topic.id}`} className="small">← Volver a la explicación</a>
      <h1>{topic.practice!.label.replace(/^Practicar: /, '').replace(/^Abrir la /, '')}</h1>
      {topic.practice!.id === 'calculadora' ? <Calculator /> : <GenderSort />}
    </main>
  )
}

function UnitRule({ unitId }: { unitId: number }) {
  const unit = findUnit(unitId)
  if (!unit?.rule) return <NotFound />
  return (
    <main className="screen">
      <a href="#/ayudas" className="small">← Ayudas</a>
      <div>
        <p className="muted small">Unidad {unit.id} · {unit.title}</p>
        <h1>{unit.topic}</h1>
      </div>
      <RuleCard rule={unit.rule} />
      <a href={`#/unidad/${unit.id}`} className="btn btn-block">Ir a la unidad {unit.id}</a>
    </main>
  )
}

function PronunciationList() {
  return (
    <section className="stack">
      <h2>Letras especiales</h2>
      <ul className="list">
        {PRONUNCIATION.map((p) => (
          <li key={p.letter} className="card">
            <div className="spread">
              <p><span className="sl sl-big">{p.letter}</span> {p.sound}</p>
              <SpeakButton text={p.example.split(' (')[0]} />
            </div>
            <p className="small muted">Ejemplo: {p.example}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function GenderTips() {
  return (
    <section className="stack">
      <h2>Pistas para reconocer el género</h2>
      <ul className="list">
        {GENDER_TIPS.map((tip) => (
          <li key={tip.rule} className="card">
            <strong>{tip.rule}</strong>
            <p className="small">{tip.examples}</p>
            {tip.exception && <p className="small muted">Ojo: {tip.exception}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
