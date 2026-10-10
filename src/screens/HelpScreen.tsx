import type { ReactNode } from 'react'
import { RuleCard } from '../components/RuleCard'
import { SpeakButton } from '../components/SpeakButton'
import { GENDER_TIPS } from '../data/gender'
import { Calculator } from './Calculator'
import { GenderSort } from './GenderSort'
import { NotFound } from './NotFound'

interface HelpPage {
  id: string
  title: string
  description: string
  render: () => ReactNode
}

// Contenido de referencia. Pendiente de revisión por un hablante nativo.
const PRONUNCIATION = [
  { letter: 'c', sound: 'como "ts" en "tsunami"', example: 'cesta (calle)' },
  { letter: 'č', sound: 'como "ch" en "chau"', example: 'večer (noche)' },
  { letter: 'š', sound: 'como "sh" en "show"', example: 'šola (escuela)' },
  { letter: 'ž', sound: 'como la "y" de "yo" en Argentina', example: 'žaba (rana)' },
  { letter: 'j', sound: 'como "i" en "hierro"', example: 'jutro (mañana)' },
  { letter: 'h', sound: 'como una "j" suave', example: 'hvala (gracias)' },
  { letter: 'l, v al final', sound: 'suelen sonar como "u"', example: 'bil (fue), lev (león)' },
  { letter: 'r entre consonantes', sound: 'hace de vocal', example: 'trg (plaza)' },
]

const PAGES: HelpPage[] = [
  {
    id: 'calculadora',
    title: 'Calculadora de números',
    description: 'Escribí un número y mirá cómo se dice y cómo se forma.',
    render: () => <Calculator />,
  },
  {
    id: 'generos',
    title: 'Practicar géneros y dual',
    description: 'Clasificá palabras por género y elegí su forma dual.',
    render: () => <GenderSort />,
  },
  {
    id: 'pronunciacion',
    title: 'Pronunciación',
    description: 'Las letras que suenan distinto que en español.',
    render: () => (
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
    ),
  },
  {
    id: 'tips-genero',
    title: 'Cómo reconocer el género',
    description: 'Pistas para saber si una palabra es masculina, femenina o neutra.',
    render: () => (
      <ul className="list">
        {GENDER_TIPS.map((tip) => (
          <li key={tip.rule} className="card">
            <strong>{tip.rule}</strong>
            <p className="small">{tip.examples}</p>
            {tip.exception && <p className="small muted">Ojo: {tip.exception}</p>}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'dual',
    title: 'El dual',
    description: 'La forma para exactamente dos cosas, según el género.',
    render: () => (
      <RuleCard
        rule={{
          title: 'El dual según el género',
          body: [
            'El esloveno tiene singular, dual (exactamente 2) y plural (3 o más).',
            'El número dos cambia: dva (masculino) / dve (femenino y neutro).',
            'Truco: masculino → -a; femenino y neutro → -i.',
          ],
          table: {
            head: ['Género', 'Singular', 'Dual'],
            rows: [
              ['Masculino', 'stol', 'dva stola'],
              ['Femenino', 'hiša', 'dve hiši'],
              ['Neutro', 'okno', 'dve okni'],
            ],
          },
          examples: [
            { sl: 'midva greva', es: 'nosotros dos vamos' },
            { sl: 'mi gremo', es: 'nosotros (3 o más) vamos' },
          ],
        }}
      />
    ),
  },
  {
    id: 'casos',
    title: 'Los 6 casos',
    description: 'Cómo cambia la terminación según la función de la palabra.',
    render: () => (
      <RuleCard
        rule={{
          title: 'Los 6 casos (con hiša, casa)',
          body: ['En español usamos preposiciones; en esloveno, además, cambia la terminación de la palabra.'],
          table: {
            head: ['Caso', 'Para qué', 'Ejemplo'],
            rows: [
              ['Nominativo', 'sujeto', 'To je hiša.'],
              ['Genitivo', '"de", falta, cantidad', 'Ni hiše.'],
              ['Dativo', '"a / hacia"', 'Grem k hiši.'],
              ['Acusativo', 'objeto directo', 'Vidim hišo.'],
              ['Locativo', '"en" (lugar)', 'V hiši sem.'],
              ['Instrumental', '"con"', 'Pred hišo.'],
            ],
          },
        }}
      />
    ),
  },
]

export function HelpScreen({ page }: { page?: string }) {
  if (page) {
    const current = PAGES.find((p) => p.id === page)
    if (!current) return <NotFound />
    return (
      <main className="screen">
        <a href="#/ayudas" className="small">← Ayudas</a>
        <h1>{current.title}</h1>
        {current.render()}
      </main>
    )
  }

  return (
    <main className="screen">
      <h1>Ayudas</h1>
      <p className="muted">Consultá cuando quieras, sin seguir la ruta.</p>
      <ul className="list">
        {PAGES.map((p) => (
          <li key={p.id}>
            <a href={`#/ayudas/${p.id}`} className="list-item">
              <div>
                <h2>{p.title}</h2>
                <p className="small muted">{p.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
