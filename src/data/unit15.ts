import type { Unit } from './types'

// Temas inspirados en "Opinar" y las expresiones temporales del diccionario del usuario; frases propias.
// Pendiente de revisión por un hablante nativo.
export const unit15: Unit = {
  id: 15,
  title: 'Opinar y conversar',
  topic: 'Mislim, da… y palabras de tiempo',
  rule: {
    title: 'Regla nueva: dar tu opinión',
    short: 'Mislim, da… (creo que…). Strinjam se (estoy de acuerdo). že ya · še todavía · spet otra vez · nikoli nunca · vedno siempre.',
    body: [
      'Para dar tu opinión: Mislim, da … (Creo que …). Después de "da" va la frase completa: Mislim, da je lepo.',
      'Para estar de acuerdo: Strinjam se. Para no estarlo: Ne strinjam se.',
      'Palabras de tiempo muy usadas: že (ya), še (todavía), spet (otra vez), nikoli (nunca), vedno (siempre), potem (después).',
      'Con nikoli el verbo también va en negativo, y lo que no hacés va en genitivo: Nikoli ne jem mesa. (Nunca como carne.)',
    ],
    table: {
      head: ['Esloveno', 'Español'],
      rows: [
        ['Mislim, da …', 'Creo que …'],
        ['Strinjam se.', 'Estoy de acuerdo.'],
        ['Ne strinjam se.', 'No estoy de acuerdo.'],
        ['Po mojem mnenju …', 'En mi opinión …'],
        ['Imaš prav.', 'Tenés razón.'],
        ['Mogoče.', 'Quizás.'],
      ],
    },
    examples: [
      { sl: 'Mislim, da je slovenščina lepa.', es: 'Creo que el esloveno es lindo.' },
      { sl: 'Nikoli ne pijem kave.', es: 'Nunca tomo café.' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'Mislim, da …', es: 'Creo que …' },
        { sl: 'Strinjam se.', es: 'Estoy de acuerdo.' },
        { sl: 'Imaš prav.', es: 'Tenés razón.', note: 'Formal: Imate prav.' },
        { sl: 'že', es: 'ya' },
        { sl: 'še', es: 'todavía' },
        { sl: 'spet', es: 'otra vez' },
        { sl: 'nikoli', es: 'nunca', note: 'El verbo va en negativo: Nikoli ne grem.' },
        { sl: 'vedno', es: 'siempre' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "Estoy de acuerdo"?', options: ['Strinjam se.', 'Imaš prav.', 'Ne vem.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Creo que es lindo."', words: ['Mislim,', 'da', 'je', 'lepo.'], distractors: ['ker'] },
        {
          kind: 'fill',
          prompt: 'Completá: "Nunca como carne."',
          before: 'Nikoli',
          after: ' jem mesa.',
          options: ['ne', 'ni', 'že'],
          answer: 0,
          explain: 'Con nikoli el verbo también va en negativo: nikoli ne.',
        },
        { kind: 'choice', prompt: '¿Qué significa "spet"?', options: ['otra vez', 'siempre', 'todavía'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Todavía estoy en casa."', before: 'Sem', after: ' doma.', options: ['še', 'že', 'spet'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "Imaš prav."?', options: ['Tenés razón.', 'Tenés tiempo.', 'Tenés hambre.'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: '¿Qué película vemos?',
      lines: [
        { speaker: 'Marko', sl: 'Kaj gledamo zvečer?', es: '¿Qué miramos a la noche?' },
        { speaker: 'Ana', sl: 'Mislim, da je ta film zelo dober.', es: 'Creo que esta película es muy buena.' },
        { speaker: 'Marko', sl: 'Ne strinjam se. Predolg je.', es: 'No estoy de acuerdo. Es demasiado larga.' },
        { speaker: 'Ana', sl: 'Ti vedno rečeš, da so filmi predolgi!', es: '¡Vos siempre decís que las películas son demasiado largas!' },
        { speaker: 'Marko', sl: 'Imaš prav. Pa ga glejva.', es: 'Tenés razón. Bueno, mirémosla.' },
        { speaker: 'Ana', sl: 'Super! Potem greva na sladoled.', es: '¡Genial! Después vamos por un helado.' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué opina Ana de la película?', options: ['Que es muy buena', 'Que es demasiado larga', 'Que es aburrida'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué dice Marko al principio?', options: ['Que no está de acuerdo', 'Que tiene hambre', 'Que no tiene tiempo'], answer: 0 },
        {
          kind: 'choice',
          prompt: '¿Por qué dicen "glejva" y "greva"?',
          options: ['Porque son dos (dual)', 'Porque es pasado', 'Porque es formal'],
          answer: 0,
          explain: 'Marko y Ana son dos personas: el verbo va en dual (-va).',
        },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Qué significa "vedno"?', options: ['siempre', 'nunca', 'a veces'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Ya estoy en casa."', before: 'Sem', after: ' doma.', options: ['že', 'še', 'nikoli'], answer: 0 },
        { kind: 'choice', prompt: '¿Cómo se dice "No estoy de acuerdo"?', options: ['Ne strinjam se.', 'Ne vem.', 'Nimam časa.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Otra vez llueve."', words: ['Spet', 'dežuje.'], distractors: ['Še'] },
        { kind: 'choice', prompt: '¿Qué significa "Po mojem mnenju"?', options: ['En mi opinión', 'Por mi culpa', 'En mi casa'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Creo que tenés razón."', before: 'Mislim,', after: ' imaš prav.', options: ['da', 'ker', 'kdo'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: 'Repaso: ¿qué significa "Kam greš?"', options: ['¿Adónde vas?', '¿Dónde estás?', '¿Cuándo vas?'], answer: 0 },
        { kind: 'fill', prompt: 'Repaso: "Estoy cansada."', before: '', after: ' sem.', options: ['Utrujena', 'Utrujen'], answer: 0 },
        { kind: 'fill', prompt: 'Repaso: "debajo de la mesa"', before: 'pod', after: '', options: ['mizo', 'mizi', 'miza'], answer: 0 },
        { kind: 'choice', prompt: 'Repaso: ¿cómo se dice "una remera roja"?', options: ['rdeča majica', 'rdeč majica'], answer: 0 },
        { kind: 'order', prompt: 'Repaso: "Nunca tomo café."', words: ['Nikoli', 'ne', 'pijem', 'kave.'], distractors: ['kavo'] },
      ],
    },
  ],
}
