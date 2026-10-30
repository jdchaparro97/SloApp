import { useEffect, type ReactNode } from 'react'
import { RuleCard } from '../components/RuleCard'
import { SpeakButton } from '../components/SpeakButton'
import { GENDER_TIPS } from '../data/gender'
import { CASES_SUMMARY, GENDER_PRACTICE_RULE, NUMBERS_TOOL_RULE, PRONUNCIATION } from '../data/help'
import type { Unit } from '../data/types'
import { UNITS } from '../data/units'
import { isUnitUnlocked, sectionKey, type Progress } from '../lib/progress'
import { Calculator } from './Calculator'
import { GenderSort } from './GenderSort'
import { NotFound } from './NotFound'

/**
 * Ayudas en una sola página: herramientas arriba y las reglas en el orden de la ruta.
 *   #/ayudas               la página
 *   #/ayudas/regla/<n>     la página con la regla de la unidad n abierta
 *   #/ayudas/calculadora   herramienta (explicación primero)
 *   #/ayudas/generos       herramienta (explicación primero)
 */
export function HelpScreen({ page, sub, progress }: { page?: string; sub?: string; progress: Progress }) {
  if (!page) return <HelpIndex progress={progress} />
  if (page === 'regla') return <HelpIndex progress={progress} open={Number(sub)} />
  if (page === 'calculadora') return <Tool title="Calculadora de números" intro={<RuleCard rule={NUMBERS_TOOL_RULE} />}><Calculator /></Tool>
  if (page === 'generos') return <Tool title="Practicar géneros y dual" intro={<RuleCard rule={GENDER_PRACTICE_RULE} />}><GenderSort /></Tool>
  return <NotFound />
}

/** Mismo código de puntos que la Ruta: unidad terminada, actual o bloqueada. */
function unitDot(unitId: number, progress: Progress): string {
  if (progress.done.includes(sectionKey(unitId, 'desafio'))) return 'dot-done'
  return isUnitUnlocked(unitId, progress) ? 'dot-current' : 'dot-locked'
}

function HelpIndex({ open, progress }: { open?: number; progress: Progress }) {
  // Al llegar con una regla abierta, se muestra en pantalla.
  useEffect(() => {
    if (open) document.getElementById(`regla-${open}`)?.scrollIntoView({ block: 'start' })
  }, [open])

  return (
    <main className="screen">
      <h1>Ayudas</h1>

      <section className="stack">
        <div className="tools">
          <a href="#/ayudas/calculadora" className="tool tool-blue">
            <strong>Calculadora de números</strong>
          </a>
          <a href="#/ayudas/generos" className="tool tool-pink">
            <strong>Géneros y dual</strong>
          </a>
        </div>
      </section>

      <section className="stack">
        <h2 className="section-label">Reglas, en el orden de la ruta. Tocá una para ver la explicación.</h2>
        <div className="accordion">
          {UNITS.filter((u) => u.rule).map((unit) => (
            <details key={unit.id} id={`regla-${unit.id}`} open={unit.id === open}>
              <summary>
                <span className={`dot ${unitDot(unit.id, progress)}`} aria-hidden="true" />
                <span>
                  <span className="row-title" style={{ display: 'block' }}>{String(unit.id).padStart(2, '0')} · {unit.topic}</span>
                  {unit.rule!.short && <span className="row-sub" style={{ display: 'block' }}>{unit.rule!.short}</span>}
                </span>
                <span className="sign" aria-hidden="true" />
              </summary>
              <div className="accordion-body">
                <RuleCard rule={unit.rule!} />
                <UnitExtras unit={unit} />
                <a href={`#/unidad/${unit.id}`} className="btn btn-block">Ir a la unidad {unit.id}</a>
              </div>
            </details>
          ))}
          <details id="regla-casos">
            <summary>
              <span className="dot dot-done" aria-hidden="true" />
              <span>
                <span className="row-title" style={{ display: 'block' }}>{CASES_SUMMARY.title}</span>
                <span className="row-sub" style={{ display: 'block' }}>{CASES_SUMMARY.short}</span>
              </span>
              <span className="sign" aria-hidden="true" />
            </summary>
            <div className="accordion-body">
              <RuleCard rule={CASES_SUMMARY} />
            </div>
          </details>
        </div>
      </section>
    </main>
  )
}

/** Lo que se agrega debajo de la regla de algunas unidades. */
function UnitExtras({ unit }: { unit: Unit }) {
  switch (unit.id) {
    case 1:
      return <PronunciationList />
    case 2:
      return (
        <>
          <GenderTips />
          <a href="#/ayudas/generos" className="btn btn-primary btn-block">Practicar géneros y dual</a>
        </>
      )
    case 3:
      return (
        <>
          <a href="#/ayudas/calculadora" className="btn btn-primary btn-block">Abrir la calculadora de números</a>
          <a href="#/ayudas/generos" className="btn btn-block">Practicar el dual</a>
        </>
      )
    default:
      return null
  }
}

function Tool({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <main className="screen">
      <a href="#/ayudas" className="back">← Ayudas</a>
      <h1>{title}</h1>
      {intro}
      {children}
    </main>
  )
}

function PronunciationList() {
  return (
    <section className="stack">
      <h3>Letras especiales</h3>
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
      <h3>Pistas para reconocer el género</h3>
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
