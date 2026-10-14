import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit7: Unit = {
  id: 7,
  title: 'Días, horas y fechas',
  topic: 'Días de la semana y la hora',
  rule: {
    title: 'Regla nueva: "el lunes" y "a las cinco"',
    body: [
      'Para decir "el lunes", "el sábado"… se usa v + el día. Los días femeninos cambian -a → -o: sreda → v sredo, sobota → v soboto. Los masculinos no cambian: v ponedeljek.',
      'Para preguntar la hora: Koliko je ura? Se responde: Ura je ena / dve / tri / pet.',
      'Para "a las…" se usa ob: ob petih (a las cinco), ob desetih (a las diez).',
    ],
    table: {
      head: ['Día', 'Significa', '"El…"'],
      rows: [
        ['ponedeljek', 'lunes', 'v ponedeljek'],
        ['torek', 'martes', 'v torek'],
        ['sreda', 'miércoles', 'v sredo'],
        ['četrtek', 'jueves', 'v četrtek'],
        ['petek', 'viernes', 'v petek'],
        ['sobota', 'sábado', 'v soboto'],
        ['nedelja', 'domingo', 'v nedeljo'],
      ],
    },
    examples: [
      { sl: 'Danes je petek.', es: 'Hoy es viernes.' },
      { sl: 'Koliko je ura? Ura je tri.', es: '¿Qué hora es? Son las tres.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'ponedeljek', es: 'lunes' },
        { sl: 'torek', es: 'martes' },
        { sl: 'sreda', es: 'miércoles', note: 'Literalmente "el del medio".' },
        { sl: 'četrtek', es: 'jueves', note: 'Viene de "cuarto".' },
        { sl: 'petek', es: 'viernes', note: 'Viene de "quinto".' },
        { sl: 'sobota', es: 'sábado' },
        { sl: 'nedelja', es: 'domingo', note: 'Literalmente "día sin trabajo".' },
        { sl: 'danes / jutri / včeraj', es: 'hoy / mañana / ayer' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "miércoles"?', options: ['sreda', 'sobota', 'petek'], answer: 0 },
        {
          kind: 'fill',
          prompt: 'Completá: "Voy al cine el sábado."',
          before: 'Grem v kino v',
          after: '.',
          options: ['sobota', 'soboto', 'soboti'],
          answer: 1,
          explain: 'Día femenino: -a → -o.',
        },
        { kind: 'fill', prompt: 'Completá: "Son las dos."', before: 'Ura je', after: '.', options: ['dva', 'dve', 'dvema'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "jutri"?', options: ['ayer', 'hoy', 'mañana'], answer: 2 },
        { kind: 'order', prompt: 'Armá: "Hoy es viernes."', words: ['Danes', 'je', 'petek.'] },
        { kind: 'choice', prompt: '¿Qué significa "Koliko je ura?"', options: ['¿Qué hora es?', '¿Qué día es?', '¿Cuánto cuesta?'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'Planes para el fin de semana',
      lines: [
        { speaker: 'Luka', sl: 'Nina, kaj delaš v soboto?', es: 'Nina, ¿qué hacés el sábado?' },
        { speaker: 'Nina', sl: 'V soboto grem k babici. Zakaj?', es: 'El sábado voy a lo de mi abuela. ¿Por qué?' },
        { speaker: 'Luka', sl: 'Imamo zabavo v nedeljo.', es: 'Hacemos una fiesta el domingo.' },
        { speaker: 'Nina', sl: 'Ob kateri uri?', es: '¿A qué hora?' },
        { speaker: 'Luka', sl: 'Ob petih.', es: 'A las cinco.' },
        { speaker: 'Nina', sl: 'Super, pridem!', es: '¡Genial, voy!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué hace Nina el sábado?', options: ['Va al cine', 'Va a lo de la abuela', 'Va a la escuela'], answer: 1 },
        { kind: 'choice', prompt: '¿Cuándo es la fiesta?', options: ['El sábado', 'El domingo', 'El viernes'], answer: 1 },
        { kind: 'choice', prompt: '¿A qué hora es?', options: ['A las cinco', 'A las tres', 'A las diez'], answer: 0 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'v ponedeljek', options: ['el lunes', 'el martes', 'el domingo'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué día viene después de "torek"?', options: ['ponedeljek', 'sreda', 'četrtek'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "Hoy es viernes, mañana es sábado."', before: 'Danes je', after: ', jutri je sobota.', options: ['četrtek', 'petek', 'nedelja'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Mañana voy a la escuela."', words: ['Jutri', 'grem', 'v', 'šolo.'] },
        { kind: 'choice', prompt: '¿Qué significa "včeraj"?', options: ['ayer', 'mañana', 'hoy'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Nos vemos el domingo."', before: 'Se vidimo v', after: '.', options: ['nedelja', 'nedeljo', 'nedelji'], answer: 1 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "domingo"?', options: ['sobota', 'nedelja', 'petek'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "el miércoles"', before: 'v', after: '', options: ['sreda', 'sredo', 'sredi'], answer: 1 },
        { kind: 'listen', sl: 'Ura je tri.', options: ['Son las tres.', 'Son las dos.', 'Es martes.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Hoy es lunes."', words: ['Danes', 'je', 'ponedeljek.'], distractors: ['jutri'] },
        { kind: 'choice', prompt: '¿Qué significa "ob petih"?', options: ['el viernes', 'a las cinco', 'cinco días'], answer: 1 },
      ],
    },
  ],
}
