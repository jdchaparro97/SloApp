import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit5: Unit = {
  id: 5,
  title: 'En la ciudad',
  topic: 'Locativo con v / na',
  rule: {
    title: 'Regla nueva: el locativo ("estar en un lugar")',
    short: 'Estar en un lugar: v / na + -i (femenino) o -u (masc. y neutro): v šoli, v parku.',
    body: [
      'Para decir dónde estás se usa v o na + locativo.',
      'V es para lugares cerrados o ciudades y países (v šoli, v Ljubljani). Na es para lugares abiertos y algunos fijos (na trgu, na pošti, na postaji).',
      'Femeninos: -a → -i. Masculinos y neutros: + -u.',
    ],
    table: {
      head: ['Palabra', 'Locativo', 'Significa'],
      rows: [
        ['šola', 'v šoli', 'en la escuela'],
        ['Ljubljana', 'v Ljubljani', 'en Ljubljana'],
        ['park', 'v parku', 'en el parque'],
        ['mesto', 'v mestu', 'en la ciudad'],
        ['trg', 'na trgu', 'en la plaza'],
        ['pošta', 'na pošti', 'en el correo'],
      ],
    },
    examples: [
      { sl: 'Sem v parku.', es: 'Estoy en el parque.' },
      { sl: 'Živim v Argentini.', es: 'Vivo en Argentina.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'mesto', es: 'ciudad', note: 'Neutro.' },
        { sl: 'ulica', es: 'calle', note: 'Femenino.' },
        { sl: 'trg', es: 'plaza', note: 'Masculino. La r hace de vocal: "terg".' },
        { sl: 'park', es: 'parque', note: 'Masculino.' },
        { sl: 'šola', es: 'escuela', note: 'Femenino.' },
        { sl: 'trgovina', es: 'negocio / tienda', note: 'Femenino.' },
        { sl: 'pošta', es: 'correo', note: 'Femenino. Se dice "na pošti".' },
        { sl: 'Kje je…?', es: '¿Dónde está…?' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'fill',
          prompt: 'Completá: "Estoy en la escuela."',
          before: 'Sem v',
          after: '.',
          options: ['šola', 'šoli', 'šolo'],
          answer: 1,
          explain: 'Femenino: -a → -i.',
        },
        {
          kind: 'fill',
          prompt: 'Completá: "Estoy en la plaza."',
          before: 'Sem na',
          after: '.',
          options: ['trg', 'trgu', 'trga'],
          answer: 1,
          explain: 'Masculino: + -u.',
        },
        { kind: 'choice', prompt: '¿Cómo se dice "en el parque"?', options: ['v park', 'v parku', 'na parka'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "¿Dónde está el correo?"', words: ['Kje', 'je', 'pošta?'] },
        { kind: 'fill', prompt: 'Completá: "Vivo en Ljubljana."', before: 'Živim v', after: '.', options: ['Ljubljana', 'Ljubljano', 'Ljubljani'], answer: 2 },
        { kind: 'fill', prompt: 'Completá: "Ana está en el correo."', before: 'Ana je na', after: '.', options: ['pošti', 'pošta', 'pošto'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: '¿Dónde estás?',
      lines: [
        { speaker: 'Marko', sl: 'Halo, Eva? Kje si?', es: '¿Hola, Eva? ¿Dónde estás?' },
        { speaker: 'Eva', sl: 'Sem v mestu, na Prešernovem trgu.', es: 'Estoy en la ciudad, en la plaza Prešeren.' },
        { speaker: 'Marko', sl: 'Jaz sem v parku.', es: 'Yo estoy en el parque.' },
        { speaker: 'Eva', sl: 'Kje je park?', es: '¿Dónde está el parque?' },
        { speaker: 'Marko', sl: 'Blizu šole.', es: 'Cerca de la escuela.' },
        { speaker: 'Eva', sl: 'Dobro, pridem!', es: '¡Bueno, ya voy!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Dónde está Eva?', options: ['En la escuela', 'En una plaza', 'En el parque'], answer: 1 },
        { kind: 'choice', prompt: '¿Dónde está Marko?', options: ['En el parque', 'En el correo', 'En casa'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "pridem"?', options: ['Me voy', 'Ya voy', 'No puedo'], answer: 1 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'v trgovini', options: ['en el negocio', 'en la calle', 'en la escuela'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Los chicos están en el parque."', before: 'Otroci so v', after: '.', options: ['parku', 'park', 'parki'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "na postaji"?', options: ['en la estación', 'en el correo', 'en la plaza'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Vivo en Argentina."', words: ['Živim', 'v', 'Argentini.'], distractors: ['na'] },
        {
          kind: 'choice',
          prompt: '¿V o na? "___ pošti" (en el correo)',
          options: ['v', 'na'],
          answer: 1,
          explain: 'Con pošta se usa na: na pošti.',
        },
        { kind: 'fill', prompt: 'Completá: "Mi hermano está en la ciudad."', before: 'Moj brat je v', after: '.', options: ['mesto', 'mestu', 'mesta'], answer: 1 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "calle"?', options: ['ulica', 'mesto', 'trg'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Estoy en el parque."', before: 'Sem v', after: '.', options: ['parka', 'parku', 'park'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "¿Dónde está la escuela?"', words: ['Kje', 'je', 'šola?'], distractors: ['šoli?'] },
        { kind: 'choice', prompt: '¿Cómo se dice "en Ljubljana"?', options: ['na Ljubljana', 'v Ljubljani', 'v Ljubljano'], answer: 1 },
        { kind: 'listen', sl: 'Sem na trgu.', options: ['Estoy en la plaza.', 'Estoy en la calle.', 'Voy a la plaza.'], answer: 0 },
      ],
    },
  ],
}
