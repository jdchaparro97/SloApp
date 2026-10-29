import { useEffect, useRef, useState } from 'react'
import type { Rule } from '../data/types'
import { RuleCard } from './RuleCard'

/** Botón "?" que muestra la regla de la unidad en una ventana, sin salir del ejercicio. */
export function RuleHelpButton({ rule, unitId }: { rule: Rule; unitId: number }) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button type="button" className="btn btn-icon" aria-label="Ver la regla de la unidad" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        ?
      </button>
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-label={rule.title} onClick={(e) => e.stopPropagation()}>
            <RuleCard rule={rule} />
            <a href={`#/ayudas/regla/${unitId}`} className="small">Ver en Ayudas</a>
            <button ref={closeRef} type="button" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
              Volver al ejercicio
            </button>
          </div>
        </div>
      )}
    </>
  )
}
