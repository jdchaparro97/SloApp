import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit8: Unit = {
  id: 8,
  title: 'Compras',
  topic: 'Genitivo',
  rule: {
    title: 'Regla nueva: el genitivo ("no hay" y cantidades)',
    body: [
      'El genitivo se usa para lo que falta (ni = no hay, nimam = no tengo), para cantidades (un litro de…, un poco de…) y después de 5 o más.',
      'Femeninos: -a → -e (kava → ni kave). Masculinos: + -a (kruh → ni kruha). Neutros: -o → -a (mleko → ni mleka).',
    ],
    table: {
      head: ['Palabra', 'Genitivo', 'Ejemplo'],
      rows: [
        ['kava', 'kave', 'Ni kave. (No hay café.)'],
        ['kruh', 'kruha', 'Ni kruha. (No hay pan.)'],
        ['mleko', 'mleka', 'Liter mleka. (Un litro de leche.)'],
        ['denar', 'denarja', 'Nimam denarja. (No tengo dinero.)'],
      ],
    },
    examples: [
      { sl: 'Koliko stane?', es: '¿Cuánto cuesta?' },
      { sl: 'Kilogram jabolk, prosim.', es: 'Un kilo de manzanas, por favor.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'trgovina', es: 'negocio / tienda' },
        { sl: 'cena', es: 'precio', note: 'Ojo: no es "cena" de comer.' },
        { sl: 'drago', es: 'caro' },
        { sl: 'poceni', es: 'barato' },
        { sl: 'denar', es: 'dinero' },
        { sl: 'vrečka', es: 'bolsa' },
        { sl: 'kilogram', es: 'kilo' },
        { sl: 'liter', es: 'litro' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'fill',
          prompt: 'Completá: "No hay pan."',
          before: 'Ni',
          after: '.',
          options: ['kruh', 'kruha', 'kruhu'],
          answer: 1,
          explain: 'Después de ni ("no hay") va genitivo. Masculino: + -a.',
        },
        { kind: 'fill', prompt: 'Completá: "No tengo dinero."', before: 'Nimam', after: '.', options: ['denar', 'denarja', 'denarju'], answer: 1 },
        { kind: 'choice', prompt: '¿Cómo se pregunta "¿Cuánto cuesta?"', options: ['Koliko stane?', 'Kje je?', 'Kaj je to?'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Un kilo de manzanas, por favor."', words: ['Kilogram', 'jabolk,', 'prosim.'] },
        { kind: 'fill', prompt: 'Completá: "Un litro de leche, por favor."', before: 'Liter', after: ', prosim.', options: ['mleko', 'mleka', 'mleku'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "poceni"?', options: ['caro', 'barato', 'precio'], answer: 1 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En el supermercado',
      lines: [
        { speaker: 'Cliente', sl: 'Oprostite, imate kruh?', es: 'Disculpe, ¿tienen pan?' },
        { speaker: 'Vendedor', sl: 'Žal ni več kruha.', es: 'Lamentablemente ya no hay pan.' },
        { speaker: 'Cliente', sl: 'Škoda. Koliko stane sir?', es: 'Qué pena. ¿Cuánto cuesta el queso?' },
        { speaker: 'Vendedor', sl: 'Dva evra.', es: 'Dos euros.' },
        { speaker: 'Cliente', sl: 'Liter mleka, prosim.', es: 'Un litro de leche, por favor.' },
        { speaker: 'Vendedor', sl: 'Potrebujete vrečko?', es: '¿Necesita bolsa?' },
        { speaker: 'Cliente', sl: 'Ne, hvala.', es: 'No, gracias.' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Hay pan?', options: ['Sí', 'No'], answer: 1 },
        { kind: 'choice', prompt: '¿Cuánto cuesta el queso?', options: ['Un euro', 'Dos euros', 'Cinco euros'], answer: 1 },
        { kind: 'choice', prompt: '¿Quiere bolsa el cliente?', options: ['Sí', 'No'], answer: 1 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'Ni mleka.', options: ['No hay leche.', 'Quiero leche.', 'La leche es cara.'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "No tengo hermana."', before: 'Nimam', after: '.', options: ['sestra', 'sestre', 'sestro'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "drago"?', options: ['caro', 'barato', 'gratis'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "¿Cuánto cuesta el café?"', words: ['Koliko', 'stane', 'kava?'], distractors: ['kave?'] },
        { kind: 'fill', prompt: 'Completá: "Un poco de agua, por favor."', before: 'Malo', after: ', prosim.', options: ['voda', 'vodo', 'vode'], answer: 2 },
        {
          kind: 'fill',
          prompt: 'Completá: "cinco euros"',
          before: 'pet',
          after: '',
          options: ['evri', 'evra', 'evrov'],
          answer: 2,
          explain: 'Con 5 o más va el genitivo plural.',
        },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "dinero"?', options: ['denar', 'cena', 'vrečka'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "No hay café."', before: 'Ni', after: '.', options: ['kava', 'kave', 'kavo'], answer: 1 },
        { kind: 'listen', sl: 'Koliko stane?', options: ['¿Cuánto cuesta?', '¿Dónde está?', '¿Qué hora es?'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Un litro de agua, por favor."', words: ['Liter', 'vode,', 'prosim.'], distractors: ['voda,'] },
        { kind: 'choice', prompt: '¿Cómo se dice "No hay pan"?', options: ['Ni kruh.', 'Ni kruha.', 'Je kruh.'], answer: 1 },
      ],
    },
  ],
}
