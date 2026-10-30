import { useMemo, useState, type ReactNode } from 'react'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { RuleCard } from '../components/RuleCard'
import { RuleHelpButton } from '../components/RuleHelpButton'
import { SpeakButton } from '../components/SpeakButton'
import { TopBar } from '../components/TopBar'
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

/** Lo que comparten las partes de una sección: a dónde vuelve la ✕, el botón "?" y la etiqueta. */
interface Frame {
  closeHref: string
  help?: ReactNode
  label: string
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

  const frame: Frame = {
    closeHref: `#/unidad/${unitId}`,
    help: unit.rule && section.id !== 'descubri' ? <RuleHelpButton rule={unit.rule} unitId={unit.id} /> : undefined,
    label: `Unidad ${unitId} · ${SECTION_TITLES[section.id]}`,
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
      {result ? (
        <>
          <TopBar closeHref={frame.closeHref} progress={1} help={frame.help} />
          <p className="prompt-label">{frame.label}</p>
          <SectionResult unitId={unitId} sectionId={section.id} score={result.score} passed={result.passed} onRetry={retry} />
        </>
      ) : (
        <SectionBody key={attempt} section={section} rule={section.id === 'descubri' ? unit.rule : undefined} frame={frame} onFinish={finish} />
      )}
    </main>
  )
}

function SectionBody({ section, rule, frame, onFinish }: { section: Section; rule?: Rule; frame: Frame; onFinish: (score: number) => void }) {
  switch (section.kind) {
    case 'discover':
      return <Discover items={section.items} rule={rule} frame={frame} onFinish={() => onFinish(1)} />
    case 'dialogue':
      return <Dialogue section={section} frame={frame} onFinish={onFinish} />
    case 'exercises':
      return <ExerciseRunner exercises={section.exercises} strict={section.id === 'desafio'} onFinish={onFinish} {...frame} />
  }
}

/** Tarjetas de a una: primero la regla (si hay) y después cada palabra. */
function Discover({ items, rule, frame, onFinish }: { items: Pair[]; rule?: Rule; frame: Frame; onFinish: () => void }) {
  const [index, setIndex] = useState(rule ? -1 : 0)
  const isLast = index === items.length - 1
  const item = items[index]
  const total = items.length + (rule ? 1 : 0)
  const position = index + (rule ? 1 : 0)

  return (
    <>
      <TopBar closeHref={frame.closeHref} progress={position / total} />
      <p className="prompt-label">{frame.label} · {position + 1} de {total}</p>
      {index === -1 && rule ? (
        <RuleCard rule={rule} />
      ) : (
        <div className="stack" aria-live="polite" style={{ gap: 16 }}>
          <div className="spread" style={{ alignItems: 'flex-start' }}>
            <p className="prompt-big">{item.sl}</p>
            <SpeakButton text={item.sl} />
          </div>
          <p style={{ fontSize: 20 }}>{item.es}</p>
          {item.note && <p className="notice">{item.note}</p>}
        </div>
      )}
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        {index > (rule ? -1 : 0) && (
          <button type="button" className="btn" onClick={() => setIndex(index - 1)}>Anterior</button>
        )}
        <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => (isLast ? onFinish() : setIndex(index + 1))}>
          {isLast ? 'Terminar' : 'Siguiente'}
        </button>
      </div>
    </>
  )
}

function Dialogue({ section, frame, onFinish }: { section: Extract<Section, { kind: 'dialogue' }>; frame: Frame; onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<'read' | 'questions'>('read')
  const [showEs, setShowEs] = useState(false)

  if (phase === 'questions') return <ExerciseRunner exercises={section.exercises} onFinish={onFinish} {...frame} />

  return (
    <>
      <TopBar closeHref={frame.closeHref} progress={0} help={frame.help} />
      <p className="prompt-label">{frame.label}</p>
      <h2 className="prompt-big">{section.title}</h2>
      <label className="row small">
        <input type="checkbox" checked={showEs} onChange={(e) => setShowEs(e.target.checked)} />
        Mostrar traducción
      </label>
      <ol className="rows">
        {section.lines.map((line, i) => (
          <li key={i} style={{ padding: '14px 0' }}>
            <div className="spread" style={{ alignItems: 'flex-start' }}>
              <div>
                <p className="small muted">{line.speaker}</p>
                <p className="sl" style={{ fontSize: 19 }}>{line.sl}</p>
                {showEs && <p className="small muted">{line.es}</p>}
              </div>
              <SpeakButton text={line.sl} />
            </div>
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn-primary btn-block" onClick={() => setPhase('questions')}>
        Responder preguntas
      </button>
    </>
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
    <div className="stack" role="status" style={{ gap: 24 }}>
      <section className="hero" style={{ minHeight: 220 }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>{passed ? '¡Sección terminada!' : 'Casi'}</span>
        <div>
          {sectionId !== 'descubri' && <p className="hero-number">{percent}%</p>}
          <p className="hero-title">
            {!passed ? 'Necesitás 80% para aprobar el desafío' : sectionId === 'desafio' ? '¡Desbloqueaste la unidad siguiente!' : sectionId === 'descubri' ? 'Ya conocés las palabras nuevas' : 'acertaste al primer intento'}
          </p>
        </div>
      </section>
      {!passed && <button type="button" className="btn btn-primary btn-block" onClick={onRetry}>Reintentar</button>}
      {passed && next && <a className="btn btn-primary btn-block" href={`#/unidad/${unitId}/${next}`}>Seguir: {SECTION_TITLES[next]}</a>}
      <a className="btn btn-block" href={passed && !next ? '#/ruta' : `#/unidad/${unitId}`}>{passed && !next ? 'Volver a la ruta' : 'Volver a la unidad'}</a>
    </div>
  )
}
