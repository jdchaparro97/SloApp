import { RuleCard } from '../components/RuleCard'
import { SECTION_TITLES } from '../data/types'
import { findUnit } from '../data/units'
import { isSectionUnlocked, isUnitUnlocked, sectionKey, type Progress } from '../lib/progress'
import { NotFound } from './NotFound'

export function UnitScreen({ unitId, progress }: { unitId: number; progress: Progress }) {
  const unit = findUnit(unitId)
  if (!unit?.sections || !isUnitUnlocked(unitId, progress)) return <NotFound message="Esta unidad todavía no está disponible." />

  return (
    <main className="screen">
      <a href="#/ruta" className="back">← Ruta</a>
      <div className="stack" style={{ gap: 6 }}>
        <p className="muted">Unidad {unit.id}</p>
        <h1>{unit.title}</h1>
      </div>
      {unit.rule && <RuleCard rule={unit.rule} />}
      <ol className="rows" aria-label="Secciones">
        {unit.sections.map((section, i) => {
          const done = progress.done.includes(sectionKey(unit.id, section.id))
          const unlocked = isSectionUnlocked(unit.id, section.id, progress)
          const dot = done ? 'dot-done' : unlocked ? 'dot-current' : 'dot-locked'
          const label = (
            <>
              <span className={`dot ${dot}`} aria-hidden="true" />
              <span className="row-title">{i + 1}. {SECTION_TITLES[section.id]}{section.kind === 'dialogue' ? ` · ${section.title}` : ''}</span>
              <span className="row-status">{done ? 'Hecha' : unlocked ? 'Empezar' : 'Bloqueada'}</span>
            </>
          )
          return (
            <li key={section.id}>
              {unlocked ? (
                <a href={`#/unidad/${unit.id}/${section.id}`} className="row-item">{label}</a>
              ) : (
                <div className="row-item is-locked" aria-disabled="true">{label}</div>
              )}
            </li>
          )
        })}
      </ol>
    </main>
  )
}
