import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit3: Unit = {
  id: 3,
  title: 'Números',
  topic: 'Regla 1 / 2 / 3–4 / 5+ y el dual',
  rule: {
    title: 'Regla nueva: los números cambian la palabra',
    body: [
      'Según la cantidad, el sustantivo cambia. Se mira el final del número.',
      'Con 2 se usa el dual: dva (masculino) o dve (femenino y neutro). Truco: masculino → -a; femenino y neutro → -i.',
      'Con 5 o más se dice como "cinco de libros", igual que "una docena de huevos".',
    ],
    table: {
      head: ['Cantidad', 'knjiga (libro)', 'stol (silla)'],
      rows: [
        ['1', 'ena knjiga', 'en stol'],
        ['2 (dual)', 'dve knjigi', 'dva stola'],
        ['3–4', 'tri knjige', 'trije stoli'],
        ['5 o más', 'pet knjig', 'pet stolov'],
      ],
    },
    examples: [
      { sl: 'Imam dva brata.', es: 'Tengo dos hermanos.' },
      { sl: 'Pet jajc, prosim.', es: 'Cinco huevos, por favor.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'ena', es: 'uno', note: 'Con masculinos se dice "en": en brat.' },
        { sl: 'dva / dve', es: 'dos', note: 'Dva para masculinos, dve para femeninos y neutros.' },
        { sl: 'tri', es: 'tres' },
        { sl: 'štiri', es: 'cuatro' },
        { sl: 'pet', es: 'cinco' },
        { sl: 'deset', es: 'diez' },
        { sl: 'dvajset', es: 'veinte' },
        { sl: 'sto', es: 'cien' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice 7?', options: ['šest', 'sedem', 'osem'], answer: 1 },
        {
          kind: 'fill',
          prompt: 'Completá: "dos libros"',
          before: 'dve',
          after: '',
          options: ['knjiga', 'knjigi', 'knjig'],
          answer: 1,
          explain: 'Con 2, femenino → -i (dual).',
        },
        { kind: 'order', prompt: 'Armá: "Tengo dos hermanos."', words: ['Imam', 'dva', 'brata.'], distractors: ['dve'] },
        {
          kind: 'choice',
          prompt: '¿Cuál es correcto con 5?',
          options: ['pet stol', 'pet stola', 'pet stolov'],
          answer: 2,
          explain: 'Con 5 o más se usa "cinco de sillas": stolov.',
        },
        {
          kind: 'choice',
          prompt: '¿Cómo se dice 21?',
          options: ['dvajset ena', 'enaindvajset', 'dvaindvajset'],
          answer: 1,
          explain: 'Al revés que en español: "uno y veinte", todo junto.',
        },
        { kind: 'fill', prompt: 'Completá: "tres casas"', before: 'tri', after: '', options: ['hiša', 'hiši', 'hiše'], answer: 2 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En el mercado',
      lines: [
        { speaker: 'Ana', sl: 'Dober dan!', es: '¡Buen día!' },
        { speaker: 'Vendedora', sl: 'Dober dan! Izvolite.', es: '¡Buen día! Dígame.' },
        { speaker: 'Ana', sl: 'Dve jabolki, prosim.', es: 'Dos manzanas, por favor.' },
        { speaker: 'Vendedora', sl: 'Še kaj?', es: '¿Algo más?' },
        { speaker: 'Ana', sl: 'Ja, pet jajc.', es: 'Sí, cinco huevos.' },
        { speaker: 'Vendedora', sl: 'Skupaj je pet evrov.', es: 'En total son cinco euros.' },
        { speaker: 'Ana', sl: 'Izvolite. Hvala!', es: 'Aquí tiene. ¡Gracias!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Cuántas manzanas compra Ana?', options: ['Una', 'Dos', 'Cinco'], answer: 1 },
        { kind: 'choice', prompt: '¿Cuántos huevos compra?', options: ['Dos', 'Cuatro', 'Cinco'], answer: 2 },
        { kind: 'choice', prompt: '¿Cuánto paga en total?', options: ['Dos euros', 'Cinco euros', 'Diez euros'], answer: 1 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'štiri', options: ['3', '4', '14'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "dve hiši"?', options: ['una casa', 'dos casas', 'muchas casas'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "cinco libros"', before: 'pet', after: '', options: ['knjige', 'knjigi', 'knjig'], answer: 2 },
        { kind: 'order', prompt: 'Armá: "Tengo tres hermanas."', words: ['Imam', 'tri', 'sestre.'], distractors: ['sestri'] },
        {
          kind: 'fill',
          prompt: 'Completá: "dos chicos"',
          before: 'dva',
          after: '',
          options: ['fanta', 'fanti', 'fantov'],
          answer: 0,
          explain: 'Con 2, masculino → -a (dual).',
        },
        { kind: 'choice', prompt: '¿Cuál es el dual de "okno" (ventana)?', options: ['dva okna', 'dve okni', 'dve okne'], answer: 1 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice 10?', options: ['deset', 'dvajset', 'sto'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "dos sillas"', before: 'dva', after: '', options: ['stoli', 'stola', 'stolov'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "šest jabolk"?', options: ['seis manzanas', 'siete manzanas', 'seis huevos'], answer: 0 },
        { kind: 'listen', sl: 'dvajset', options: ['12', '20', '200'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Cinco huevos, por favor."', words: ['Pet', 'jajc,', 'prosim.'] },
      ],
    },
  ],
}
