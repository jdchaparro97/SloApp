import type { Rule } from './types'

// Contenido extra de Ayudas. Las reglas principales están en cada unidad (unit1.ts…unit10.ts).
// Pendiente de revisión por un hablante nativo.

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

/** Resumen de los 6 casos, para verlos juntos al final de Ayudas. */
export const CASES_SUMMARY: Rule = {
  title: 'Los 6 casos de un vistazo',
  short: 'Cómo cambia la terminación según para qué se usa la palabra.',
  body: [
    'En español usamos preposiciones ("a la casa", "en la casa"); en esloveno, además, cambia la terminación.',
    'Cada caso tiene su unidad con la explicación completa.',
  ],
  table: {
    head: ['Caso', 'Para qué', 'Ejemplo (hiša)', 'Unidad'],
    rows: [
      ['Nominativo', 'sujeto', 'To je hiša.', '2'],
      ['Acusativo', 'lo que querés o ves', 'Vidim hišo.', '4'],
      ['Locativo', '"en" un lugar', 'V hiši sem.', '5'],
      ['Instrumental', '"con", transporte', 'Pred hišo.', '6'],
      ['Genitivo', '"no hay", cantidades', 'Ni hiše.', '8'],
      ['Dativo', '"hacia" alguien', 'Grem k hiši.', '10'],
    ],
  },
}

/** Explicación corta que se muestra antes de practicar géneros y dual. */
export const GENDER_PRACTICE_RULE: Rule = {
  title: 'Antes de empezar',
  body: [
    'Paso 1: decidí si la palabra es masculina, femenina o neutra mirando cómo termina.',
    'Paso 2: elegí cómo se dice "dos" de esa palabra (el dual).',
  ],
  table: {
    head: ['Género', 'Termina en…', 'Dual (2)'],
    rows: [
      ['Masculino', 'consonante (stol)', 'dva stola (+ -a)'],
      ['Femenino', '-a (hiša)', 'dve hiši (-a → -i)'],
      ['Neutro', '-o / -e (okno)', 'dve okni (-o → -i)'],
    ],
  },
}

/** Explicación corta que se muestra antes de la calculadora. */
export const NUMBERS_TOOL_RULE: Rule = {
  title: 'Cómo funciona',
  body: [
    'Escribí un número: te muestra cómo se dice y cómo se arma, por partes.',
    'Elegí una palabra para ver cómo cambia según la cantidad (1, 2, 3–4 o 5 o más).',
  ],
}
