import type { Unit } from './types'

// Temas inspirados en las expresiones espaciales del diccionario del usuario; frases propias.
// Pendiente de revisión por un hablante nativo.
export const unit13: Unit = {
  id: 13,
  title: '¿Dónde está?',
  topic: 'Ubicar cosas: pred, za, pod, nad, med',
  rule: {
    title: 'Regla nueva: dónde está algo',
    short: 'pred delante · za detrás · pod debajo · nad encima · med entre + -om (masc. y neutro) o -o (fem.): pod mizo.',
    body: [
      'Para decir dónde está algo respecto de otra cosa se usan estas palabras. Después de ellas, la palabra cambia como en el instrumental: masculino y neutro -om, femenino -o.',
      'Na (sobre) y v (dentro de) usan el locativo que ya viste: na mizi, v omari.',
      'Para "al lado de" se dice poleg, y para "enfrente de" nasproti. Las dos van con genitivo: poleg hiše, nasproti pošte.',
    ],
    table: {
      head: ['Palabra', 'Significa', 'Ejemplo'],
      rows: [
        ['pred', 'delante de', 'pred hišo'],
        ['za', 'detrás de', 'za hišo'],
        ['pod', 'debajo de', 'pod mizo'],
        ['nad', 'encima de', 'nad mizo'],
        ['med', 'entre', 'med mizo in oknom'],
        ['na', 'sobre', 'na mizi'],
        ['v', 'dentro de', 'v omari'],
        ['poleg', 'al lado de', 'poleg hiše'],
      ],
    },
    examples: [
      { sl: 'Mačka je pod mizo.', es: 'La gata está debajo de la mesa.' },
      { sl: 'Avto je pred hišo.', es: 'El auto está delante de la casa.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'pred', es: 'delante de' },
        { sl: 'za', es: 'detrás de' },
        { sl: 'pod', es: 'debajo de' },
        { sl: 'nad', es: 'encima de' },
        { sl: 'med', es: 'entre' },
        { sl: 'poleg', es: 'al lado de', note: 'Va con genitivo: poleg hiše.' },
        { sl: 'tukaj', es: 'acá' },
        { sl: 'tam', es: 'allá / ahí' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'fill',
          prompt: 'Completá: "La gata está debajo de la mesa."',
          before: 'Mačka je pod',
          after: '.',
          options: ['miza', 'mizo', 'mizi'],
          answer: 1,
          explain: 'Después de pod: femenino -a → -o.',
        },
        { kind: 'choice', prompt: '¿Qué significa "za hišo"?', options: ['detrás de la casa', 'delante de la casa', 'en la casa'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "El auto está delante de la casa."', words: ['Avto', 'je', 'pred', 'hišo.'], distractors: ['za'] },
        { kind: 'fill', prompt: 'Completá: "La lámpara está encima de la mesa."', before: 'Luč je nad', after: '.', options: ['mizo', 'mizi', 'miza'], answer: 0 },
        { kind: 'choice', prompt: '¿Cómo se dice "al lado de la escuela"?', options: ['poleg šole', 'pod šolo', 'v šoli'], answer: 0 },
        {
          kind: 'fill',
          prompt: 'Completá: "El libro está sobre la mesa."',
          before: 'Knjiga je na',
          after: '.',
          options: ['mizo', 'mizi', 'miza'],
          answer: 1,
          explain: 'Para "estar sobre" se usa el locativo: na mizi.',
        },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: '¿Dónde están mis llaves?',
      lines: [
        { speaker: 'Luka', sl: 'Mama, kje so moji ključi?', es: 'Mamá, ¿dónde están mis llaves?' },
        { speaker: 'Mamá', sl: 'Ali so na mizi?', es: '¿Están sobre la mesa?' },
        { speaker: 'Luka', sl: 'Ne, tam jih ni.', es: 'No, ahí no están.' },
        { speaker: 'Mamá', sl: 'Poglej pod posteljo.', es: 'Fijate debajo de la cama.' },
        { speaker: 'Luka', sl: 'Tudi tam jih ni.', es: 'Ahí tampoco están.' },
        { speaker: 'Mamá', sl: 'Mogoče so v tvoji torbi.', es: 'Quizás están en tu bolso.' },
        { speaker: 'Luka', sl: 'Ja, tukaj so! Hvala, mami!', es: '¡Sí, acá están! ¡Gracias, mamá!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué busca Luka?', options: ['Sus llaves', 'Su bolso', 'Su libro'], answer: 0 },
        { kind: 'choice', prompt: '¿Estaban debajo de la cama?', options: ['Sí', 'No'], answer: 1 },
        { kind: 'choice', prompt: '¿Dónde estaban?', options: ['En el bolso', 'Sobre la mesa', 'En el auto'], answer: 0 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Qué significa "pod"?', options: ['debajo de', 'encima de', 'detrás de'], answer: 0 },
        {
          kind: 'fill',
          prompt: 'Completá: "El perro está detrás del auto."',
          before: 'Pes je za',
          after: '.',
          options: ['avto', 'avtom', 'avtu'],
          answer: 1,
          explain: 'Masculino: + -om.',
        },
        { kind: 'choice', prompt: '¿Qué significa "Poglej tam."?', options: ['Mirá allá.', 'Mirá acá.', 'Vení acá.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "La silla está entre la mesa y la ventana."', words: ['Stol', 'je', 'med', 'mizo', 'in', 'oknom.'], distractors: ['mizi'] },
        { kind: 'fill', prompt: 'Completá: "Vivo al lado del parque."', before: 'Živim poleg', after: '.', options: ['parka', 'parku', 'parkom'], answer: 0 },
        { kind: 'choice', prompt: '¿Cuál es correcto? "Mamá está en la cocina."', options: ['Mama je v kuhinji.', 'Mama je v kuhinjo.'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "detrás de"?', options: ['za', 'pred', 'nad'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "debajo de la cama"', before: 'pod', after: '', options: ['postelja', 'posteljo', 'postelji'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "¡Acá están!"', words: ['Tukaj', 'so!'], distractors: ['Tam'] },
        { kind: 'choice', prompt: '¿Qué significa "nad mizo"?', options: ['encima de la mesa', 'debajo de la mesa', 'al lado de la mesa'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "poleg"?', options: ['al lado de', 'entre', 'detrás de'], answer: 0 },
      ],
    },
  ],
}
