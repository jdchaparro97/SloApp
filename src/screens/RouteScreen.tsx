import { UNITS } from '../data/units'
import { SECTION_ORDER } from '../data/types'
import { isUnitUnlocked, sectionKey, visibleStreak, type Progress } from '../lib/progress'

export function RouteScreen({ progress }: { progress: Progress }) {
  const streak = visibleStreak(progress.streak, new Date())
  return (
    <main className="screen">
      <div className="spread">
        <div>
          <h1>Dober dan!</h1>
          <p className="muted">Tu ruta de esloveno</p>
        </div>
        <p className="small" aria-label={`Racha de ${streak} días`}>
          Racha: <strong>{streak} {streak === 1 ? 'día' : 'días'}</strong>
        </p>
      </div>
      <ol className="list">
        {UNITS.map((unit) => {
          const unlocked = isUnitUnlocked(unit.id, progress)
          const doneCount = SECTION_ORDER.filter((s) => progress.done.includes(sectionKey(unit.id, s))).length
          const available = unlocked && Boolean(unit.sections)
          const status = !unit.sections ? 'Próximamente' : !unlocked ? 'Bloqueada' : `${doneCount}/5`
          const content = (
            <>
              <div>
                <p className="small muted">Unidad {unit.id}</p>
                <h2>{unit.title}</h2>
                <p className="small muted">{unit.topic}</p>
              </div>
              <span className="status small">{status}</span>
            </>
          )
          return (
            <li key={unit.id}>
              {available ? (
                <a href={`#/unidad/${unit.id}`} className={`list-item ${doneCount === 5 ? 'is-done' : ''}`}>{content}</a>
              ) : (
                <div className="list-item is-locked" aria-disabled="true">{content}</div>
              )}
            </li>
          )
        })}
      </ol>
    </main>
  )
}
