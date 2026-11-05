import type { Unit } from './types'

// Temas inspirados en los pronombres interrogativos del diccionario del usuario; frases propias.
// Pendiente de revisión por un hablante nativo.
export const unit12: Unit = {
  id: 12,
  title: 'Preguntas',
  topic: 'Palabras para preguntar (kdo, kaj, kje, kam…)',
  rule: {
    title: 'Regla nueva: las palabras para preguntar',
    short: 'kdo quién · kaj qué · kje dónde (estar) · kam adónde (ir) · kdaj cuándo · zakaj por qué · kako cómo · koliko cuánto.',
    body: [
      'Casi todas las preguntas empiezan con una de estas palabras.',
      'Ojo: "dónde" tiene dos formas. Kje es para dónde está algo (Kje si? ¿Dónde estás?). Kam es para adónde vas (Kam greš? ¿Adónde vas?).',
      'Para preguntas de sí o no se puede empezar con Ali: Ali govoriš špansko? (¿Hablás español?).',
      'Para responder a zakaj (por qué) se usa ker (porque).',
    ],
    table: {
      head: ['Esloveno', 'Español', 'Ejemplo'],
      rows: [
        ['kdo', 'quién', 'Kdo je to?'],
        ['kaj', 'qué', 'Kaj delaš?'],
        ['kje', 'dónde (estar)', 'Kje je pošta?'],
        ['kam', 'adónde (ir)', 'Kam greš?'],
        ['kdaj', 'cuándo', 'Kdaj pride vlak?'],
        ['zakaj', 'por qué', 'Zakaj si žalosten?'],
        ['kako', 'cómo', 'Kako si?'],
        ['koliko', 'cuánto', 'Koliko stane?'],
        ['čigav / čigava', 'de quién', 'Čigava je knjiga?'],
      ],
    },
    examples: [
      { sl: 'Kam greš? V šolo.', es: '¿Adónde vas? A la escuela.' },
      { sl: 'Zakaj ješ? Ker sem lačen.', es: '¿Por qué comés? Porque tengo hambre.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'kdo', es: 'quién' },
        { sl: 'kaj', es: 'qué' },
        { sl: 'kje', es: 'dónde (estar en un lugar)', note: 'Kje si? = ¿Dónde estás?' },
        { sl: 'kam', es: 'adónde (ir a un lugar)', note: 'Kam greš? = ¿Adónde vas?' },
        { sl: 'kdaj', es: 'cuándo' },
        { sl: 'zakaj', es: 'por qué' },
        { sl: 'ker', es: 'porque', note: 'Para responder a zakaj.' },
        { sl: 'ali', es: '(empieza preguntas de sí o no)', note: 'Ali si lačen? = ¿Tenés hambre?' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'choice',
          prompt: '¿Cómo se dice "¿Adónde vas?"',
          options: ['Kje si?', 'Kam greš?', 'Kdaj greš?'],
          answer: 1,
          explain: 'Kam es para ir hacia un lugar.',
        },
        { kind: 'fill', prompt: 'Completá: "¿Dónde está el correo?"', before: '', after: ' je pošta?', options: ['Kje', 'Kam', 'Kdo'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "¿Quién es?"', words: ['Kdo', 'je', 'to?'], distractors: ['Kaj'] },
        { kind: 'choice', prompt: '¿Qué significa "zakaj"?', options: ['cuándo', 'por qué', 'cómo'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "¿Cuándo sale el tren?"', words: ['Kdaj', 'gre', 'vlak?'], distractors: ['Kam'] },
        { kind: 'fill', prompt: 'Completá: "No voy porque estoy enfermo."', before: 'Ne pridem,', after: ' sem bolan.', options: ['ker', 'kdaj', 'kaj'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'Preguntas en la escuela',
      lines: [
        { speaker: 'Nina', sl: 'Kam greš, Eva?', es: '¿Adónde vas, Eva?' },
        { speaker: 'Eva', sl: 'V knjižnico.', es: 'A la biblioteca.' },
        { speaker: 'Nina', sl: 'Zakaj?', es: '¿Por qué?' },
        { speaker: 'Eva', sl: 'Ker imam jutri izpit.', es: 'Porque mañana tengo un examen.' },
        { speaker: 'Nina', sl: 'Kdaj se vrneš?', es: '¿Cuándo volvés?' },
        { speaker: 'Eva', sl: 'Ob šestih. Čigava je ta torba?', es: 'A las seis. ¿De quién es este bolso?' },
        { speaker: 'Nina', sl: 'Moja je. Hvala!', es: 'Es mío. ¡Gracias!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Adónde va Eva?', options: ['A la biblioteca', 'A su casa', 'Al parque'], answer: 0 },
        { kind: 'choice', prompt: '¿Por qué va?', options: ['Porque mañana tiene un examen', 'Porque tiene hambre', 'Porque es domingo'], answer: 0 },
        { kind: 'choice', prompt: '¿De quién es el bolso?', options: ['De Nina', 'De Eva', 'De la maestra'], answer: 0 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        {
          kind: 'choice',
          prompt: '¿Kje o kam? "___ živiš?" (¿Dónde vivís?)',
          options: ['Kje', 'Kam'],
          answer: 0,
          explain: 'Vivir es estar en un lugar: kje.',
        },
        {
          kind: 'choice',
          prompt: '¿Kje o kam? "___ gremo jutri?" (¿Adónde vamos mañana?)',
          options: ['Kje', 'Kam'],
          answer: 1,
          explain: 'Ir es moverse hacia un lugar: kam.',
        },
        { kind: 'fill', prompt: 'Completá: "¿Cuánto cuesta?"', before: '', after: ' stane?', options: ['Koliko', 'Kako', 'Kdo'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "Čigav je ta avto?"', options: ['¿De quién es este auto?', '¿Dónde está el auto?', '¿Cuánto cuesta el auto?'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "¿Hablás español?"', words: ['Ali', 'govoriš', 'špansko?'], distractors: ['Kaj'] },
        { kind: 'choice', prompt: '¿Cómo empieza la respuesta a "Zakaj?"', options: ['Ker…', 'Kdaj…', 'Kam…'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Qué significa "kdo"?', options: ['quién', 'qué', 'cuándo'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "¿Qué hacés?"', before: '', after: ' delaš?', options: ['Kaj', 'Kje', 'Kdo'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "¿Adónde vas?"', words: ['Kam', 'greš?'], distractors: ['Kje'] },
        { kind: 'choice', prompt: '¿Cuál es correcto? (¿Dónde estás?)', options: ['Kam si?', 'Kje si?'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "ker"?', options: ['porque', 'pero', 'por qué'], answer: 0 },
      ],
    },
  ],
}
