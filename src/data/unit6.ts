import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit6: Unit = {
  id: 6,
  title: 'Transporte',
  topic: 'Instrumental',
  rule: {
    title: 'Regla nueva: el instrumental ("en / con")',
    body: [
      'Para decir en qué viajás se usa z o s + instrumental: "voy con el tren".',
      'Masculinos y neutros: + -om (vlak → z vlakom). Femeninos: -a → -o (ladja → z ladjo).',
      'Se usa s antes de p, t, k, c, č, f, h, s, š (sonidos "sordos"): s taksijem, s kolesom. En los demás casos, z.',
    ],
    table: {
      head: ['Palabra', 'Instrumental', 'Significa'],
      rows: [
        ['vlak', 'z vlakom', 'en tren'],
        ['avtobus', 'z avtobusom', 'en colectivo'],
        ['letalo', 'z letalom', 'en avión'],
        ['kolo', 's kolesom', 'en bicicleta (irregular)'],
        ['taksi', 's taksijem', 'en taxi'],
      ],
    },
    examples: [
      { sl: 'Grem v šolo z avtobusom.', es: 'Voy a la escuela en colectivo.' },
      { sl: 'Grem peš.', es: 'Voy a pie.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'avtobus', es: 'colectivo / autobús' },
        { sl: 'vlak', es: 'tren' },
        { sl: 'kolo', es: 'bicicleta', note: 'Neutro. Instrumental irregular: s kolesom.' },
        { sl: 'letalo', es: 'avión' },
        { sl: 'taksi', es: 'taxi' },
        { sl: 'postaja', es: 'parada / estación' },
        { sl: 'vozovnica', es: 'boleto / pasaje' },
        { sl: 'peš', es: 'a pie' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'fill', prompt: 'Completá: "Voy en tren."', before: 'Grem z', after: '.', options: ['vlak', 'vlakom', 'vlaku'], answer: 1 },
        {
          kind: 'choice',
          prompt: '¿Z o s? "___ taksijem"',
          options: ['z', 's'],
          answer: 1,
          explain: 'Antes de t (sonido sordo) se usa s.',
        },
        { kind: 'order', prompt: 'Armá: "Voy a la escuela en colectivo."', words: ['Grem', 'v', 'šolo', 'z', 'avtobusom.'] },
        { kind: 'choice', prompt: '¿Cómo se dice "a pie"?', options: ['peš', 'vlak', 'kolo'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Viajo en avión."', before: 'Potujem z', after: '.', options: ['letalo', 'letalom', 'letala'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "Kje je postaja?"', options: ['¿Dónde está la parada?', '¿Cuándo sale el tren?', '¿Cuánto cuesta?'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En la estación',
      lines: [
        { speaker: 'Pasajera', sl: 'Dober dan! Eno vozovnico do Bleda, prosim.', es: '¡Buen día! Un pasaje a Bled, por favor.' },
        { speaker: 'Boletero', sl: 'Z vlakom ali z avtobusom?', es: '¿En tren o en colectivo?' },
        { speaker: 'Pasajera', sl: 'Z avtobusom.', es: 'En colectivo.' },
        { speaker: 'Boletero', sl: 'To je šest evrov.', es: 'Son seis euros.' },
        { speaker: 'Pasajera', sl: 'Kdaj gre avtobus?', es: '¿Cuándo sale el colectivo?' },
        { speaker: 'Boletero', sl: 'Ob desetih.', es: 'A las diez.' },
        { speaker: 'Pasajera', sl: 'Hvala!', es: '¡Gracias!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿A dónde viaja?', options: ['A Ljubljana', 'A Bled', 'A Maribor'], answer: 1 },
        { kind: 'choice', prompt: '¿En qué viaja?', options: ['En tren', 'En colectivo', 'En taxi'], answer: 1 },
        { kind: 'choice', prompt: '¿A qué hora sale?', options: ['A las dos', 'A las seis', 'A las diez'], answer: 2 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'z vlakom', options: ['en tren', 'en avión', 'a pie'], answer: 0 },
        {
          kind: 'fill',
          prompt: 'Completá: "Voy en bicicleta."',
          before: 'Grem s',
          after: '.',
          options: ['kolom', 'kolesom', 'kolo'],
          answer: 1,
          explain: 'Kolo es irregular: s kolesom.',
        },
        { kind: 'choice', prompt: '¿Qué significa "letalo"?', options: ['tren', 'avión', 'barco'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Ana va a pie."', words: ['Ana', 'gre', 'peš.'] },
        { kind: 'choice', prompt: '¿Cuál es correcto?', options: ['s avtobusom', 'z avtobusom', 'z avtobus'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "Llego en taxi."', before: 'Pridem s', after: '.', options: ['taksi', 'taksijem', 'taksom'], answer: 1 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "tren"?', options: ['vlak', 'kolo', 'avto'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Voy en auto."', before: 'Grem z', after: '.', options: ['avto', 'avtom', 'avta'], answer: 1 },
        { kind: 'listen', sl: 'Kdaj gre vlak?', options: ['¿Cuándo sale el tren?', '¿Dónde está el tren?', '¿Cuánto cuesta el tren?'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Un pasaje, por favor."', words: ['Eno', 'vozovnico,', 'prosim.'], distractors: ['vozovnica,'] },
        { kind: 'choice', prompt: '¿Qué significa "peš"?', options: ['en tren', 'a pie', 'en bici'], answer: 1 },
      ],
    },
  ],
}
