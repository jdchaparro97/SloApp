import type { Unit } from './types'

// Contenido de prueba de la Unidad 1. Pendiente de revisión por un hablante nativo.
export const unit1: Unit = {
  id: 1,
  title: 'Saludos',
  topic: 'Pronunciación y ti / vi',
  rule: {
    title: 'Regla nueva: ti y vi',
    body: [
      'Como en español con "vos" y "usted", en esloveno hay una forma de confianza y una formal.',
      'Ti es para amigos, familia y chicos. Vi es para gente que no conocés o mayores.',
      'Por eso hay dos formas de preguntar "¿cómo estás?".',
    ],
    table: {
      head: ['', 'Informal (ti)', 'Formal (vi)'],
      rows: [
        ['¿Cómo estás?', 'Kako si?', 'Kako ste?'],
        ['Hola / Buen día', 'Živjo!', 'Dober dan!'],
        ['Chau / Adiós', 'Adijo!', 'Nasvidenje!'],
      ],
    },
    examples: [
      { sl: 'Živjo, Ana! Kako si?', es: '¡Hola, Ana! ¿Cómo estás?' },
      { sl: 'Dober dan! Kako ste?', es: '¡Buen día! ¿Cómo está usted?' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'Živjo!', es: '¡Hola!', note: 'Informal. La ž suena como la "y" fuerte de "yo" en Argentina.' },
        { sl: 'Dober dan!', es: '¡Buen día!', note: 'Sirve para todo el día y es formal.' },
        { sl: 'Dobro jutro!', es: '¡Buenos días!', note: 'Solo a la mañana temprano. La j suena como "i".' },
        { sl: 'Dober večer!', es: '¡Buenas noches!', note: 'Para saludar a la noche. La č suena como "ch".' },
        { sl: 'Hvala', es: 'Gracias', note: 'La h suena como una "j" suave.' },
        { sl: 'Prosim', es: 'Por favor / De nada' },
        { sl: 'Adijo!', es: '¡Chau!', note: 'Informal.' },
        { sl: 'Nasvidenje!', es: '¡Adiós! / ¡Hasta luego!', note: 'Formal.' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "gracias"?', options: ['Prosim', 'Hvala', 'Živjo'], answer: 1 },
        {
          kind: 'order',
          prompt: 'Armá: "¿Cómo estás?" (informal)',
          words: ['Kako', 'si?'],
          distractors: ['ste?'],
          explain: '"Kako si?" es con ti (informal). "Kako ste?" es con vi (formal).',
        },
        {
          kind: 'order',
          prompt: 'Armá: "Me llamo Ana."',
          words: ['Ime', 'mi', 'je', 'Ana.'],
          explain: 'Literalmente: "el nombre me es Ana".',
        },
        {
          kind: 'fill',
          prompt: 'Completá: "Bien, gracias."',
          before: 'Dobro,',
          after: '.',
          options: ['prosim', 'hvala', 'adijo'],
          answer: 1,
        },
        {
          kind: 'choice',
          prompt: 'Saludás a una señora que no conocés. ¿Qué decís?',
          options: ['Živjo!', 'Dober dan!', 'Adijo!'],
          answer: 1,
          explain: 'Con desconocidos se usa la forma formal: Dober dan.',
        },
        {
          kind: 'order',
          prompt: 'Armá: "¿Cómo te llamás?"',
          words: ['Kako', 'ti', 'je', 'ime?'],
          explain: 'Literalmente: "¿cómo te es el nombre?".',
        },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En la plaza',
      lines: [
        { speaker: 'Luka', sl: 'Živjo!', es: '¡Hola!' },
        { speaker: 'Ana', sl: 'Živjo! Kako si?', es: '¡Hola! ¿Cómo estás?' },
        { speaker: 'Luka', sl: 'Dobro, hvala. In ti?', es: 'Bien, gracias. ¿Y vos?' },
        { speaker: 'Ana', sl: 'Tudi dobro. Kako ti je ime?', es: 'También bien. ¿Cómo te llamás?' },
        { speaker: 'Luka', sl: 'Ime mi je Luka. In tebi?', es: 'Me llamo Luka. ¿Y vos?' },
        { speaker: 'Ana', sl: 'Ime mi je Ana.', es: 'Me llamo Ana.' },
        { speaker: 'Luka', sl: 'Me veseli, Ana!', es: '¡Encantado, Ana!' },
        { speaker: 'Ana', sl: 'Mene tudi. Adijo!', es: 'Igualmente. ¡Chau!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se llama el chico?', options: ['Ana', 'Luka', 'Marko'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "Tudi dobro"?', options: ['Muy mal', 'También bien', 'Hasta luego'], answer: 1 },
        {
          kind: 'choice',
          prompt: '¿Usan ti o vi entre ellos?',
          options: ['Ti (informal)', 'Vi (formal)'],
          answer: 0,
          explain: 'Dicen "Živjo" y "Kako si?": son formas informales.',
        },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'Dobro jutro!', options: ['¡Buenos días!', '¡Buenas noches!', '¡Chau!'], answer: 0 },
        { kind: 'listen', sl: 'Hvala', options: ['Por favor', 'Gracias', 'Hola'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "Nasvidenje"?', options: ['¡Hola!', '¡Adiós!', 'Gracias'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "¿Cómo está usted?"', before: 'Kako', after: '?', options: ['si', 'ste', 'je'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Buenas noches, ¿cómo está usted?"', words: ['Dober', 'večer,', 'kako', 'ste?'], distractors: ['si?'] },
        {
          kind: 'choice',
          prompt: 'Alguien te dice "Hvala". ¿Qué respondés?',
          options: ['Prosim', 'Živjo', 'Dober dan'],
          answer: 0,
          explain: '"Prosim" significa "por favor" y también "de nada".',
        },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "¡Hola!" a un amigo?', options: ['Dober dan!', 'Živjo!', 'Nasvidenje!'], answer: 1 },
        { kind: 'listen', sl: 'Me veseli!', options: ['¡Encantado!', '¡Chau!', 'También bien'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Me llamo Luka."', words: ['Ime', 'mi', 'je', 'Luka.'], distractors: ['ti'] },
        { kind: 'fill', prompt: 'Completá: "¿Cómo estás?" (informal)', before: 'Kako', after: '?', options: ['ste', 'si', 'ime'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "Dober večer"?', options: ['¡Buen día!', '¡Buenas noches!', '¡Buenos días!'], answer: 1 },
      ],
    },
  ],
}
