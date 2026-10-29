import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit9: Unit = {
  id: 9,
  title: 'Mi casa y mi día',
  topic: 'Verbos en presente y dual en verbos',
  rule: {
    title: 'Regla nueva: los verbos en presente',
    short: 'Verbos: -m, -š, -, -mo, -te, -jo. Dos personas: midva -va, vidva / onadva -ta.',
    body: [
      'Los verbos cambian la terminación según quién hace la acción, como en español.',
      'El dual también aparece en los verbos: midva (nosotros dos) termina en -va, vidva y onadva (ustedes dos, ellos dos) en -ta.',
    ],
    table: {
      head: ['Persona', 'delati (hacer)', 'igrati (jugar)'],
      rows: [
        ['jaz', 'delam', 'igram'],
        ['ti', 'delaš', 'igraš'],
        ['on / ona', 'dela', 'igra'],
        ['midva (2)', 'delava', 'igrava'],
        ['vidva / onadva (2)', 'delata', 'igrata'],
        ['mi', 'delamo', 'igramo'],
        ['vi', 'delate', 'igrate'],
        ['oni', 'delajo', 'igrajo'],
      ],
    },
    examples: [
      { sl: 'Midva igrava nogomet.', es: 'Nosotros dos jugamos al fútbol.' },
      { sl: 'Mi igramo nogomet.', es: 'Nosotros (3 o más) jugamos al fútbol.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'soba', es: 'habitación' },
        { sl: 'kuhinja', es: 'cocina' },
        { sl: 'delam', es: 'hago / trabajo' },
        { sl: 'berem', es: 'leo' },
        { sl: 'pišem', es: 'escribo' },
        { sl: 'spim', es: 'duermo' },
        { sl: 'igram', es: 'juego' },
        { sl: 'zjutraj / zvečer', es: 'a la mañana / a la noche' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'fill', prompt: 'Completá: "Vos leés un libro."', before: 'Ti', after: ' knjigo.', options: ['berem', 'bereš', 'bere'], answer: 1 },
        {
          kind: 'fill',
          prompt: 'Completá: "Nosotros dos jugamos al fútbol."',
          before: 'Midva',
          after: ' nogomet.',
          options: ['igramo', 'igrava', 'igrata'],
          answer: 1,
          explain: 'Midva (nosotros dos) → -va.',
        },
        { kind: 'choice', prompt: '¿Qué significa "spim"?', options: ['duermo', 'escribo', 'como'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "A la mañana tomo café."', words: ['Zjutraj', 'pijem', 'kavo.'] },
        { kind: 'fill', prompt: 'Completá: "Ellos miran televisión."', before: 'Oni', after: ' televizijo.', options: ['gleda', 'gledajo', 'gledamo'], answer: 1 },
        { kind: 'choice', prompt: '¿Cómo se dice "cocina"?', options: ['soba', 'kuhinja', 'hiša'], answer: 1 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'Una tarde en casa',
      lines: [
        { speaker: 'Mamá', sl: 'Eva, kaj delaš?', es: 'Eva, ¿qué hacés?' },
        { speaker: 'Eva', sl: 'Berem knjigo.', es: 'Leo un libro.' },
        { speaker: 'Mamá', sl: 'In Luka?', es: '¿Y Luka?' },
        { speaker: 'Eva', sl: 'Luka in Marko igrata nogomet.', es: 'Luka y Marko juegan al fútbol.' },
        { speaker: 'Mamá', sl: 'Kje?', es: '¿Dónde?' },
        { speaker: 'Eva', sl: 'Na vrtu.', es: 'En el jardín.' },
        { speaker: 'Mamá', sl: 'Večerja je ob sedmih!', es: '¡La cena es a las siete!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué hace Eva?', options: ['Duerme', 'Lee un libro', 'Juega'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué hacen Luka y Marko?', options: ['Juegan al fútbol', 'Miran televisión', 'Comen'], answer: 0 },
        {
          kind: 'choice',
          prompt: '¿Por qué dice "igrata" y no "igrajo"?',
          options: ['Porque son dos (dual)', 'Porque es pasado', 'Porque es formal'],
          answer: 0,
          explain: 'Luka y Marko son exactamente dos: se usa el dual.',
        },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'Spim.', options: ['Duermo.', 'Juego.', 'Leo.'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Nosotros comemos en la cocina."', before: 'Mi', after: ' v kuhinji.', options: ['jem', 'jemo', 'jeste'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "pišem"?', options: ['escribo', 'leo', 'miro'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Nosotros dos vamos a la escuela."', words: ['Midva', 'greva', 'v', 'šolo.'], distractors: ['gremo'] },
        { kind: 'fill', prompt: 'Completá: "Ustedes dos están en la habitación."', before: 'Vidva', after: ' v sobi.', options: ['ste', 'sta', 'sva'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "gledam"?', options: ['miro', 'juego', 'duermo'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "habitación"?', options: ['soba', 'kuhinja', 'vrt'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Yo trabajo."', before: 'Jaz', after: '.', options: ['delam', 'delaš', 'dela'], answer: 0 },
        { kind: 'listen', sl: 'Igramo nogomet.', options: ['Jugamos al fútbol.', 'Miramos fútbol.', 'Juego al fútbol.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Nosotros dos leemos un libro."', words: ['Midva', 'bereva', 'knjigo.'], distractors: ['beremo'] },
        { kind: 'choice', prompt: '¿Qué significa "Onadva igrata"?', options: ['Ellos dos juegan', 'Ellos juegan', 'Yo juego'], answer: 0 },
      ],
    },
  ],
}
