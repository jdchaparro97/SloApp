import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit2: Unit = {
  id: 2,
  title: 'Presentarme y mi familia',
  topic: 'Verbo biti y los 3 géneros',
  rule: {
    title: 'Regla nueva: el verbo biti y los géneros',
    short: 'Biti = ser/estar (sem, si, je…). Consonante → masculino, -a → femenino, -o/-e → neutro.',
    body: [
      'Biti significa "ser" y "estar" a la vez. Es el verbo más usado.',
      'Cada sustantivo tiene género: masculino, femenino o neutro. Casi siempre se reconoce por la terminación: consonante → masculino, -a → femenino, -o / -e → neutro.',
      'Las palabras que acompañan cambian con el género: moj brat (mi hermano), moja sestra (mi hermana), moje mesto (mi ciudad).',
    ],
    table: {
      head: ['Persona', 'biti', 'Ejemplo'],
      rows: [
        ['jaz (yo)', 'sem', 'Jaz sem Ana.'],
        ['ti (vos)', 'si', 'Ti si Luka.'],
        ['on / ona (él / ella)', 'je', 'Ona je moja sestra.'],
        ['midva (nosotros dos)', 'sva', 'Midva sva brata.'],
        ['mi (nosotros)', 'smo', 'Mi smo družina.'],
        ['vi (ustedes / usted)', 'ste', 'Vi ste iz Argentine?'],
        ['oni (ellos)', 'so', 'Oni so v šoli.'],
      ],
    },
    examples: [
      { sl: 'To je moj brat.', es: 'Este es mi hermano.' },
      { sl: 'To je moja mama.', es: 'Esta es mi mamá.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'družina', es: 'familia', note: 'Femenino: termina en -a.' },
        { sl: 'mama', es: 'mamá', note: 'Femenino.' },
        { sl: 'oče', es: 'papá', note: 'Excepción: termina en -e pero es masculino.' },
        { sl: 'brat', es: 'hermano', note: 'Masculino: termina en consonante.' },
        { sl: 'sestra', es: 'hermana', note: 'Femenino.' },
        { sl: 'babica', es: 'abuela', note: 'Femenino: termina en -ica.' },
        { sl: 'dedek', es: 'abuelo', note: 'Masculino.' },
        { sl: 'otrok', es: 'niño / hijo', note: 'Masculino.' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "hermana"?', options: ['brat', 'sestra', 'babica'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Soy de Argentina."', words: ['Sem', 'iz', 'Argentine.'] },
        { kind: 'fill', prompt: 'Completá: "Ella es mi hermana."', before: 'Ona', after: ' moja sestra.', options: ['sem', 'je', 'si'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "Nosotros somos una familia."', before: 'Mi', after: ' družina.', options: ['smo', 'so', 'ste'], answer: 0 },
        {
          kind: 'choice',
          prompt: '¿Cuál es correcto?',
          options: ['moja brat', 'moj brat', 'moje brat'],
          answer: 1,
          explain: 'Brat es masculino, por eso va con moj.',
        },
        { kind: 'order', prompt: 'Armá: "Esta es mi familia."', words: ['To', 'je', 'moja', 'družina.'], distractors: ['moj'] },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En la escuela eslovena',
      lines: [
        { speaker: 'Marko', sl: 'Živjo! Jaz sem Marko.', es: '¡Hola! Yo soy Marko.' },
        { speaker: 'Eva', sl: 'Živjo, Marko! Jaz sem Eva.', es: '¡Hola, Marko! Yo soy Eva.' },
        { speaker: 'Marko', sl: 'Od kod si?', es: '¿De dónde sos?' },
        { speaker: 'Eva', sl: 'Sem iz Argentine, iz Buenos Airesa.', es: 'Soy de Argentina, de Buenos Aires.' },
        { speaker: 'Marko', sl: 'Jaz tudi! To je moja sestra Nina.', es: '¡Yo también! Esta es mi hermana Nina.' },
        { speaker: 'Nina', sl: 'Me veseli! Imaš brata ali sestro?', es: '¡Encantada! ¿Tenés hermano o hermana?' },
        { speaker: 'Eva', sl: 'Imam brata. On je v šoli.', es: 'Tengo un hermano. Él está en la escuela.' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿De dónde es Eva?', options: ['De Eslovenia', 'De Argentina', 'De Italia'], answer: 1 },
        { kind: 'choice', prompt: '¿Quién es Nina?', options: ['La mamá de Marko', 'La hermana de Marko', 'La abuela de Eva'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué tiene Eva?', options: ['Un hermano', 'Una hermana', 'Un abuelo'], answer: 0 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'moja mama', options: ['mi mamá', 'mi abuela', 'mi hermana'], answer: 0 },
        { kind: 'listen', sl: 'dedek', options: ['papá', 'abuelo', 'niño'], answer: 1 },
        {
          kind: 'choice',
          prompt: '¿Qué género tiene "oče" (papá)?',
          options: ['Masculino', 'Femenino', 'Neutro'],
          answer: 0,
          explain: 'Es una excepción: termina en -e pero es masculino.',
        },
        { kind: 'fill', prompt: 'Completá: "¿Ustedes son de Argentina?"', before: 'Vi', after: ' iz Argentine?', options: ['smo', 'ste', 'so'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Este es mi papá."', words: ['To', 'je', 'moj', 'oče.'], distractors: ['moja'] },
        {
          kind: 'fill',
          prompt: 'Completá: "Nosotros dos somos hermanos."',
          before: 'Midva',
          after: ' brata.',
          options: ['smo', 'sva', 'sta'],
          answer: 1,
          explain: 'Son exactamente dos: se usa el dual, sva.',
        },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Qué significa "babica"?', options: ['abuela', 'hermana', 'mamá'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Yo soy Luka."', before: 'Jaz', after: ' Luka.', options: ['si', 'je', 'sem'], answer: 2 },
        { kind: 'order', prompt: 'Armá: "Tengo una hermana."', words: ['Imam', 'sestro.'], distractors: ['sestra'] },
        { kind: 'listen', sl: 'Od kod si?', options: ['¿De dónde sos?', '¿Cómo te llamás?', '¿Cómo estás?'], answer: 0 },
        { kind: 'choice', prompt: '¿Cuál es correcto?', options: ['moj sestra', 'moja sestra', 'moje sestra'], answer: 1 },
      ],
    },
  ],
}
