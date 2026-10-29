import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit4: Unit = {
  id: 4,
  title: 'Comida y bebida',
  topic: 'Acusativo',
  rule: {
    title: 'Regla nueva: el acusativo ("quiero algo")',
    short: 'Lo que querés o tomás: femenino -a → -o (kava → kavo). Masculino y neutro no cambian.',
    body: [
      'Cuando una cosa recibe la acción (la tomo, la como, la quiero), se usa el acusativo.',
      'Femeninos: -a → -o. Kava → Pijem kavo.',
      'Masculinos (cosas) y neutros no cambian: Jem kruh. Pijem mleko.',
    ],
    table: {
      head: ['Género', 'Palabra', 'Acusativo'],
      rows: [
        ['Femenino', 'kava, voda', 'kavo, vodo'],
        ['Masculino', 'kruh, čaj', 'kruh, čaj'],
        ['Neutro', 'mleko, pivo', 'mleko, pivo'],
      ],
    },
    examples: [
      { sl: 'Eno kavo, prosim.', es: 'Un café, por favor.' },
      { sl: 'Rad imam čaj.', es: 'Me gusta el té. (dicho por un varón)' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'kava', es: 'café', note: 'Femenino.' },
        { sl: 'čaj', es: 'té', note: 'Masculino.' },
        { sl: 'voda', es: 'agua', note: 'Femenino.' },
        { sl: 'kruh', es: 'pan', note: 'Masculino.' },
        { sl: 'sir', es: 'queso', note: 'Masculino.' },
        { sl: 'mleko', es: 'leche', note: 'Neutro.' },
        { sl: 'juha', es: 'sopa', note: 'Femenino.' },
        { sl: 'potica', es: 'potica', note: 'Torta enrollada típica eslovena, con nueces.' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'fill',
          prompt: 'Completá: "Tomo café."',
          before: 'Pijem',
          after: '.',
          options: ['kava', 'kavo', 'kave'],
          answer: 1,
          explain: 'Kava es femenino: en acusativo -a → -o.',
        },
        { kind: 'order', prompt: 'Armá: "Un café, por favor."', words: ['Eno', 'kavo,', 'prosim.'], distractors: ['kava,'] },
        {
          kind: 'choice',
          prompt: '¿Qué significa "Rada imam čaj"?',
          options: ['Quiero un café', 'Me gusta el té (dicho por una mujer)', 'Tomo agua'],
          answer: 1,
          explain: 'Un varón dice "rad imam", una mujer "rada imam".',
        },
        {
          kind: 'fill',
          prompt: 'Completá: "Como pan."',
          before: 'Jem',
          after: '.',
          options: ['kruh', 'kruho', 'kruhi'],
          answer: 0,
          explain: 'Kruh es masculino: en acusativo no cambia.',
        },
        { kind: 'order', prompt: 'Armá: "¿Tienen sopa?"', words: ['Imate', 'juho?'], distractors: ['juha?'] },
        { kind: 'choice', prompt: '¿Cómo queda "voda" en acusativo?', options: ['voda', 'vodo', 'vodi'], answer: 1 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En el café',
      lines: [
        { speaker: 'Mozo', sl: 'Dober dan! Kaj boste?', es: '¡Buen día! ¿Qué va a tomar?' },
        { speaker: 'Luka', sl: 'Eno kavo z mlekom, prosim.', es: 'Un café con leche, por favor.' },
        { speaker: 'Mozo', sl: 'Še kaj?', es: '¿Algo más?' },
        { speaker: 'Luka', sl: 'Ja, kos potice.', es: 'Sí, un pedazo de potica.' },
        { speaker: 'Mozo', sl: 'Takoj.', es: 'Enseguida.' },
        { speaker: 'Luka', sl: 'Račun, prosim.', es: 'La cuenta, por favor.' },
        { speaker: 'Mozo', sl: 'Štiri evre, prosim.', es: 'Cuatro euros, por favor.' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué toma Luka?', options: ['Té', 'Café con leche', 'Agua'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué come?', options: ['Pan con queso', 'Sopa', 'Un pedazo de potica'], answer: 2 },
        { kind: 'choice', prompt: '¿Cuánto paga?', options: ['Cuatro euros', 'Cinco euros', 'Dos euros'], answer: 0 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'Rad imam sir.', options: ['Me gusta el queso.', 'Quiero pan.', 'Tomo leche.'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Quiero agua."', before: 'Želim', after: '.', options: ['voda', 'vodi', 'vodo'], answer: 2 },
        {
          kind: 'choice',
          prompt: '¿Cómo queda "mleko" en acusativo?',
          options: ['mleka', 'mleko', 'mleku'],
          answer: 1,
          explain: 'Los neutros no cambian en acusativo.',
        },
        { kind: 'order', prompt: 'Armá: "Tomo té sin azúcar."', words: ['Pijem', 'čaj', 'brez', 'sladkorja.'] },
        { kind: 'choice', prompt: '¿Qué es la potica?', options: ['Una sopa', 'Una torta típica', 'Un queso'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "¿Tienen sopa?"', before: 'Imate', after: '?', options: ['juho', 'juha', 'juhe'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "agua"?', options: ['voda', 'vino', 'mleko'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Tomo café."', before: 'Pijem', after: '.', options: ['kavo', 'kava', 'kavi'], answer: 0 },
        { kind: 'listen', sl: 'Račun, prosim.', options: ['La cuenta, por favor.', 'Un café, por favor.', 'Agua, por favor.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Me gusta el pan y el queso." (mujer)', words: ['Rada', 'imam', 'kruh', 'in', 'sir.'], distractors: ['Rad'] },
        { kind: 'choice', prompt: '¿Qué significa "Kaj boste?"', options: ['¿Qué va a tomar?', '¿Dónde está?', '¿Cuánto cuesta?'], answer: 0 },
      ],
    },
  ],
}
