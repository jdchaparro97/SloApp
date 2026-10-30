import type { ReactNode } from 'react'

/** Barra superior de las secciones: cerrar, progreso con degradé y el botón de ayuda. */
export function TopBar({ closeHref, progress, help }: { closeHref: string; progress: number; help?: ReactNode }) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100)
  return (
    <div className="topbar">
      <a href={closeHref} className="close" aria-label="Salir de la sección">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </a>
      <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <span style={{ width: `${percent}%` }} />
      </div>
      {help ?? <span style={{ width: 44 }} aria-hidden="true" />}
    </div>
  )
}
