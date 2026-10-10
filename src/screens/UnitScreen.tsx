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
      <a href="#/ruta" className="small">← Ruta</a>
      <div>
        <p className="muted small">Unidad {unit.id}</p>
        <h1>{unit.title}</h1>
      </div>
      {unit.rule && <RuleCard rule={unit.rule} />}
      <ol className="list">
        {unit.sections.map((section, i) => {
          const done = progress.done.includes(sectionKey(unit.id, section.id))
          const unlocked = isSectionUnlocked(unit.id, section.id, progress)
          const label = (
            <>
              <span>{i + 1}. {SECTION_TITLES[section.id]}{section.kind === 'dialogue' ? ` · ${section.title}` : ''}</span>
              <span className="status small">{done ? 'Hecho' : unlocked ? 'Empezar' : 'Bloqueada'}</span>
            </>
          )
          return (
            <li key={section.id}>
              {unlocked ? (
                <a href={`#/unidad/${unit.id}/${section.id}`} className={`list-item ${done ? 'is-done' : ''}`}>{label}</a>
              ) : (
                <div className="list-item is-locked" aria-disabled="true">{label}</div>
              )}
            </li>
          )
        })}
      </ol>
    </main>
  )
}
