import { SECTION_ORDER, SECTION_TITLES } from '../data/types'
import { UNITS } from '../data/units'
import { isUnitUnlocked, sectionKey, visibleStreak, type Progress } from '../lib/progress'

const pad = (n: number) => String(n).padStart(2, '0')

export function RouteScreen({ progress }: { progress: Progress }) {
  const streak = visibleStreak(progress.streak, new Date())
  const doneIn = (unitId: number) => SECTION_ORDER.filter((s) => progress.done.includes(sectionKey(unitId, s)))
  // La unidad actual: la primera desbloqueada que no está terminada (o la última, si todo está hecho).
  const current = UNITS.find((u) => isUnitUnlocked(u.id, progress) && doneIn(u.id).length < SECTION_ORDER.length) ?? UNITS[UNITS.length - 1]
  const currentDone = doneIn(current.id)
  const nextSection = SECTION_ORDER.find((s) => !currentDone.includes(s))

  return (
    <main className="screen">
      <div className="spread">
        <span className="wordmark">
          sloapp
          <span className="flag" role="img" aria-label="Colores de la bandera eslovena"><span /><span /><span /></span>
        </span>
        <span className="row-status">{streak} {streak === 1 ? 'día seguido' : 'días seguidos'}</span>
      </div>

      <div className="stack" style={{ gap: 6 }}>
        <h1>Dober dan.</h1>
        <p className="muted">Unidad {current.id} de {UNITS.length}</p>
      </div>

      <section className="hero" aria-label={`Unidad actual: ${current.title}`}>
        <div className="spread">
          <span style={{ fontSize: 15, fontWeight: 500 }}>{nextSection ? 'Ahora' : 'Terminada'}</span>
          <span className="hero-progress" role="img" aria-label={`${currentDone.length} de ${SECTION_ORDER.length} secciones`}>
            {SECTION_ORDER.map((s) => <span key={s} className={currentDone.includes(s) ? 'is-done' : ''} />)}
          </span>
        </div>
        <div>
          <p className="hero-number">{pad(current.id)}</p>
          <p className="hero-title">{current.title}</p>
        </div>
        <a href={nextSection ? `#/unidad/${current.id}/${nextSection}` : `#/unidad/${current.id}`} className="btn-light">
          {nextSection ? `Seguir: ${SECTION_TITLES[nextSection]}` : 'Repasar la unidad'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </section>

      <ol className="rows" aria-label="Todas las unidades">
        {UNITS.filter((u) => u.id !== current.id).map((unit) => {
          const unlocked = isUnitUnlocked(unit.id, progress)
          const finished = doneIn(unit.id).length === SECTION_ORDER.length
          const content = (
            <>
              <span className={`dot ${unlocked ? 'dot-done' : 'dot-locked'}`} aria-hidden="true" />
              <span className="row-title">{pad(unit.id)} · {unit.title}</span>
              {unlocked ? (
                <span className="row-status">{finished ? 'Hecha' : `${doneIn(unit.id).length}/5`}</span>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" role="img" aria-label="Bloqueada"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              )}
            </>
          )
          return (
            <li key={unit.id}>
              {unlocked ? (
                <a href={`#/unidad/${unit.id}`} className="row-item">{content}</a>
              ) : (
                <div className="row-item is-locked" aria-disabled="true">{content}</div>
              )}
            </li>
          )
        })}
      </ol>
    </main>
  )
}
