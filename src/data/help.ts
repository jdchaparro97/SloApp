import type { Rule } from './types'
import { UNITS } from './units'

// Temas de Ayudas: primero la explicación, después los ejemplos y al final la práctica.
// Pendiente de revisión por un hablante nativo.

export type HelpPractice = 'generos' | 'calculadora'

export interface HelpTopic {
  id: string
  title: string
  summary: string
  /** Palabras extra para el buscador. */
  keywords: string[]
  rule: Rule
  /** Contenido adicional después de la explicación. */
  extra?: 'pronunciacion' | 'tips-genero'
  practice?: { id: HelpPractice; label: string }
  /** Unidades donde se ve el tema. */
  units?: number[]
}

export const PRONUNCIATION = [
  { letter: 'c', sound: 'como "ts" en "tsunami"', example: 'cesta (calle)' },
  { letter: 'č', sound: 'como "ch" en "chau"', example: 'večer (noche)' },
  { letter: 'š', sound: 'como "sh" en "show"', example: 'šola (escuela)' },
  { letter: 'ž', sound: 'como la "y" de "yo" en Argentina', example: 'žaba (rana)' },
  { letter: 'j', sound: 'como "i" en "hierro"', example: 'jutro (mañana)' },
  { letter: 'h', sound: 'como una "j" suave', example: 'hvala (gracias)' },
  { letter: 'l, v al final', sound: 'suelen sonar como "u"', example: 'bil (fue), lev (león)' },
  { letter: 'r entre consonantes', sound: 'hace de vocal', example: 'trg (plaza)' },
]

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: 'pronunciacion',
    title: 'Pronunciación',
    summary: 'Las letras que suenan distinto que en español.',
    keywords: ['letras', 'abecedario', 'sonido', 'c', 'č', 'š', 'ž', 'j', 'h'],
    rule: {
      title: 'Cómo se pronuncia',
      body: [
        'El esloveno se lee casi como se escribe: cada letra tiene un solo sonido.',
        'Las letras con "techito" (č, š, ž) son las más importantes: cambian el sonido de la letra.',
      ],
    },
    extra: 'pronunciacion',
    units: [1],
  },
  {
    id: 'generos',
    title: 'Géneros',
    summary: 'Cómo saber si una palabra es masculina, femenina o neutra.',
    keywords: ['masculino', 'femenino', 'neutro', 'terminación', 'moj', 'moja'],
    rule: {
      title: 'Los 3 géneros',
      body: [
        'Cada sustantivo es masculino, femenino o neutro. Casi siempre se reconoce por la terminación.',
        'Las palabras que acompañan cambian con el género: moj brat, moja sestra, moje mesto.',
      ],
      table: {
        head: ['Género', 'Termina en…', 'Ejemplos'],
        rows: [
          ['Masculino', 'consonante', 'stol, brat, kruh'],
          ['Femenino', '-a', 'hiša, miza, mačka'],
          ['Neutro', '-o / -e', 'okno, mesto, morje'],
        ],
      },
      examples: [
        { sl: 'moj brat', es: 'mi hermano' },
        { sl: 'moja sestra', es: 'mi hermana' },
        { sl: 'moje mesto', es: 'mi ciudad' },
      ],
    },
    extra: 'tips-genero',
    practice: { id: 'generos', label: 'Practicar: clasificar palabras y formar el dual' },
    units: [2],
  },
  {
    id: 'dual',
    title: 'El dual',
    summary: 'La forma para exactamente dos cosas, según el género.',
    keywords: ['dos', 'dva', 'dve', 'midva', 'vidva', 'onadva', 'pares'],
    rule: {
      title: 'El dual según el género',
      body: [
        'El esloveno tiene singular, dual (exactamente 2) y plural (3 o más).',
        'El número dos cambia: dva (masculino) / dve (femenino y neutro).',
        'Truco: masculino → -a; femenino y neutro → -i.',
        'En los verbos: midva (nosotros dos) termina en -va; vidva y onadva en -ta.',
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
    },
    practice: { id: 'generos', label: 'Practicar: clasificar palabras y formar el dual' },
    units: [3, 9],
  },
  {
    id: 'numeros',
    title: 'Números',
    summary: 'Cómo se forman y cómo cambian la palabra que acompañan.',
    keywords: ['contar', 'cantidad', 'calculadora', 'najst', 'deset', 'sto', 'tisoč', 'cinco'],
    rule: {
      title: 'Cómo se forman los números',
      body: [
        '11 a 19: unidad + -najst (enajst, dvanajst…).',
        'Decenas: unidad + -deset (trideset, štirideset…), salvo 20 = dvajset.',
        '21 a 99, al revés que en español: "uno y veinte", todo junto (enaindvajset).',
        'La palabra que acompaña cambia según el final del número: 1 singular, 2 dual, 3–4 plural, 5 o más "cinco de libros".',
      ],
      table: {
        head: ['Cantidad', 'knjiga (libro)', 'stol (silla)'],
        rows: [
          ['1', 'ena knjiga', 'en stol'],
          ['2', 'dve knjigi', 'dva stola'],
          ['3–4', 'tri knjige', 'trije stoli'],
          ['5 o más', 'pet knjig', 'pet stolov'],
        ],
      },
      examples: [
        { sl: 'enaindvajset', es: 'veintiuno' },
        { sl: 'tisoč dvesto štiriintrideset', es: '1234' },
      ],
    },
    practice: { id: 'calculadora', label: 'Abrir la calculadora de números' },
    units: [3],
  },
  {
    id: 'casos',
    title: 'Los 6 casos',
    summary: 'Cómo cambia la terminación según la función de la palabra.',
    keywords: ['nominativo', 'genitivo', 'dativo', 'acusativo', 'locativo', 'instrumental', 'declinación', 'terminaciones'],
    rule: {
      title: 'Los 6 casos (con hiša, casa)',
      body: [
        'En español usamos preposiciones ("a la casa", "en la casa"); en esloveno, además, cambia la terminación de la palabra.',
        'Cada caso tiene su unidad con la explicación completa.',
      ],
      table: {
        head: ['Caso', 'Para qué', 'Ejemplo', 'Unidad'],
        rows: [
          ['Nominativo', 'sujeto', 'To je hiša.', '2'],
          ['Acusativo', 'objeto ("quiero algo")', 'Vidim hišo.', '4'],
          ['Locativo', '"en" (lugar)', 'V hiši sem.', '5'],
          ['Instrumental', '"con", transporte, "delante de"', 'Pred hišo.', '6'],
          ['Genitivo', '"no hay", cantidades', 'Ni hiše.', '8'],
          ['Dativo', '"a / hacia" alguien', 'Grem k hiši.', '10'],
        ],
      },
    },
    units: [4, 5, 6, 8, 10],
  },
  {
    id: 'verbos',
    title: 'Verbos',
    summary: 'El verbo biti (ser / estar) y el presente.',
    keywords: ['biti', 'ser', 'estar', 'presente', 'conjugación', 'sem', 'delati'],
    rule: {
      title: 'Biti y el presente',
      body: [
        'Biti significa "ser" y "estar" a la vez.',
        'Los demás verbos cambian la terminación según quién hace la acción, como en español. El dual también aparece.',
      ],
      table: {
        head: ['Persona', 'biti', 'delati (hacer)'],
        rows: [
          ['jaz', 'sem', 'delam'],
          ['ti', 'si', 'delaš'],
          ['on / ona', 'je', 'dela'],
          ['midva (2)', 'sva', 'delava'],
          ['vidva / onadva (2)', 'sta', 'delata'],
          ['mi', 'smo', 'delamo'],
          ['vi', 'ste', 'delate'],
          ['oni', 'so', 'delajo'],
        ],
      },
      examples: [
        { sl: 'Jaz sem iz Argentine.', es: 'Soy de Argentina.' },
        { sl: 'Midva igrava nogomet.', es: 'Nosotros dos jugamos al fútbol.' },
      ],
    },
    units: [2, 9],
  },
]

export function findHelpTopic(id: string): HelpTopic | undefined {
  return HELP_TOPICS.find((t) => t.id === id)
}

/** Minúsculas y sin tildes ni "techitos", para buscar sin importar si se escriben. */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

function ruleText(rule: Rule): string {
  return [rule.title, ...rule.body, ...(rule.table?.rows.flat() ?? []), ...(rule.examples?.flatMap((e) => [e.sl, e.es]) ?? [])].join(' ')
}

export interface HelpResult {
  title: string
  summary: string
  href: string
}

/** Busca en los temas y en las reglas de cada unidad. Los temas aparecen primero. */
export function searchHelp(query: string): HelpResult[] {
  const raw = query.trim().toLowerCase()
  if (!raw) return []
  // Si la búsqueda tiene tildes o "techitos" (č, š, ž), se busca exacto: "č" no debe encontrar cada "c".
  const exact = normalize(raw) !== raw
  const matches = (parts: string[]) => {
    const text = parts.join(' ')
    return exact ? text.toLowerCase().includes(raw) : normalize(text).includes(raw)
  }
  const topics = HELP_TOPICS
    .filter((t) => matches([t.title, t.summary, ...t.keywords, ruleText(t.rule)]))
    .map((t) => ({ title: t.title, summary: t.summary, href: `#/ayudas/${t.id}` }))
  const units = UNITS
    .filter((u) => u.rule && matches([u.title, u.topic, ruleText(u.rule)]))
    .map((u) => ({ title: `Unidad ${u.id} · ${u.topic}`, summary: u.title, href: `#/ayudas/unidad/${u.id}` }))
  return [...topics, ...units]
}
