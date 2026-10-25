import { useMemo, useState } from 'react'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { RuleCard } from '../components/RuleCard'
import { RuleHelpButton } from '../components/RuleHelpButton'
import { SpeakButton } from '../components/SpeakButton'
import { CHALLENGE_PASS, SECTION_ORDER, SECTION_TITLES, type Pair, type Rule, type Section, type SectionId } from '../data/types'
import { findUnit } from '../data/units'
import { buildSections } from '../lib/generate'
import { completeSection, isSectionUnlocked, sectionKey, type Progress } from '../lib/progress'
import { NotFound } from './NotFound'

interface Props {
  unitId: number
  sectionId: string
  progress: Progress
  update: (fn: (p: Progress) => Progress) => void
}

export function SectionScreen({ unitId, sectionId, progress, update }: Props) {
  const unit = findUnit(unitId)
  // `attempt` reinicia la sección al reintentar, con preguntas nuevas.
  const [attempt, setAttempt] = useState(0)
  const section = useMemo(
    () => (unit ? buildSections(unit) : []).find((s) => s.id === sectionId),
    [unit, sectionId, attempt],
  )
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null)

  if (!unit || !section || !isSectionUnlocked(unitId, section.id, progress)) {
    return <NotFound message="Esta sección todavía está bloqueada." />
  }

  const finish = (score: number) => {
    const passed = section.id !== 'desafio' || score >= CHALLENGE_PASS
    if (passed) update((p) => completeSection(p, sectionKey(unitId, section.id), new Date()))
    setResult({ score, passed })
  }
  const retry = () => {
    setResult(null)
    setAttempt(attempt + 1)
  }

  return (
    <main className="screen">
      <a href={`#/unidad/${unitId}`} className="small">← Unidad {unitId}</a>
      <div className="spread">
        <h1>{SECTION_TITLES[section.id]}</h1>
        {unit.rule && section.id !== 'descubri' && <RuleHelpButton rule={unit.rule} />}
      </div>
      {result ? (
        <SectionResult unitId={unitId} sectionId={section.id} score={result.score} passed={result.passed} onRetry={retry} />
      ) : (
        <SectionBody key={attempt} section={section} rule={section.id === 'descubri' ? unit.rule : undefined} onFinish={finish} />
      )}
    </main>
  )
}

function SectionBody({ section, rule, onFinish }: { section: Section; rule?: Rule; onFinish: (score: number) => void }) {
  switch (section.kind) {
    case 'discover':
      return <Discover items={section.items} rule={rule} onFinish={() => onFinish(1)} />
    case 'dialogue':
      return <Dialogue section={section} onFinish={onFinish} />
    case 'exercises':
      return <ExerciseRunner exercises={section.exercises} strict={section.id === 'desafio'} onFinish={onFinish} />
  }
}

/** Tarjetas de a una: primero la regla (si hay) y después cada palabra. */
function Discover({ items, rule, onFinish }: { items: Pair[]; rule?: Rule; onFinish: () => void }) {
  const [index, setIndex] = useState(rule ? -1 : 0)
  const isLast = index === items.length - 1
  const item = items[index]

  return (
    <div className="stack">
      {index === -1 && rule ? (
        <RuleCard rule={rule} />
      ) : (
        <div className="card" aria-live="polite">
          <p className="small muted">{index + 1} de {items.length}</p>
          <div className="spread">
            <p className="sl sl-big">{item.sl}</p>
            <SpeakButton text={item.sl} />
          </div>
          <p>{item.es}</p>
          {item.note && <p className="small muted">{item.note}</p>}
        </div>
      )}
      <div className="row">
        {index > (rule ? -1 : 0) && (
          <button type="button" className="btn" onClick={() => setIndex(index - 1)}>Anterior</button>
        )}
        <button type="button" className="btn btn-primary" onClick={() => (isLast ? onFinish() : setIndex(index + 1))}>
          {isLast ? 'Terminar' : 'Siguiente'}
        </button>
      </div>
    </div>
  )
}

function Dialogue({ section, onFinish }: { section: Extract<Section, { kind: 'dialogue' }>; onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<'read' | 'questions'>('read')
  const [showEs, setShowEs] = useState(false)

  if (phase === 'questions') return <ExerciseRunner exercises={section.exercises} onFinish={onFinish} />

  return (
    <div className="stack">
      <h2>{section.title}</h2>
      <label className="row small">
        <input type="checkbox" checked={showEs} onChange={(e) => setShowEs(e.target.checked)} />
        Mostrar traducción
      </label>
      <ol className="list">
        {section.lines.map((line, i) => (
          <li key={i} className="card">
            <div className="spread">
              <p><strong>{line.speaker}:</strong> <span className="sl">{line.sl}</span></p>
              <SpeakButton text={line.sl} />
            </div>
            {showEs && <p className="small muted">{line.es}</p>}
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn-primary btn-block" onClick={() => setPhase('questions')}>
        Responder preguntas
      </button>
    </div>
  )
}

function SectionResult({ unitId, sectionId, score, passed, onRetry }: {
  unitId: number
  sectionId: SectionId
  score: number
  passed: boolean
  onRetry: () => void
}) {
  const next = SECTION_ORDER[SECTION_ORDER.indexOf(sectionId) + 1]
  const percent = Math.round(score * 100)
  return (
    <div className={`feedback ${passed ? 'is-correct' : 'is-wrong'}`} role="status">
      <strong>{passed ? '¡Sección terminada!' : 'Casi: necesitás 80% para aprobar el desafío'}</strong>
      {sectionId !== 'descubri' && <p>Acertaste {percent}% al primer intento.</p>}
      {passed && sectionId === 'desafio' && <p>¡Desbloqueaste la unidad siguiente!</p>}
      <div className="row">
        {!passed && <button type="button" className="btn btn-primary" onClick={onRetry}>Reintentar</button>}
        {passed && next && <a className="btn btn-primary" href={`#/unidad/${unitId}/${next}`}>Seguir: {SECTION_TITLES[next]}</a>}
        <a className="btn" href={passed && !next ? '#/ruta' : `#/unidad/${unitId}`}>{passed && !next ? 'Volver a la ruta' : 'Volver a la unidad'}</a>
      </div>
    </div>
  )
}
