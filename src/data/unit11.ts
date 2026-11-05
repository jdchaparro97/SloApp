import type { Unit } from './types'

// Temas inspirados en el apartado "Conocerse" del diccionario del usuario; frases propias.
// Pendiente de revisión por un hablante nativo.
export const unit11: Unit = {
  id: 11,
  title: 'Conocerse más',
  topic: 'Adjetivos que cambian con el género',
  rule: {
    title: 'Regla nueva: cómo estás (varón o mujer)',
    short: 'Los adjetivos cambian: un varón dice utrujen, una mujer utrujena (+a). De dónde sos: iz + genitivo (iz Argentine).',
    body: [
      'Para decir cómo estás se usa sem + un adjetivo. El adjetivo cambia según quién habla: un varón dice utrujen, una mujer utrujena (se agrega -a).',
      'Para decir de dónde sos: Sem iz + el lugar con terminación de genitivo: iz Argentine, iz Slovenije, iz Urugvaja.',
      'Para preguntar a qué se dedica alguien: Kaj si po poklicu? (vos) / Kaj ste po poklicu? (usted).',
    ],
    table: {
      head: ['Español', 'Varón', 'Mujer'],
      rows: [
        ['cansado/a', 'utrujen', 'utrujena'],
        ['feliz', 'srečen', 'srečna'],
        ['alegre', 'vesel', 'vesela'],
        ['triste', 'žalosten', 'žalostna'],
        ['con hambre', 'lačen', 'lačna'],
      ],
    },
    examples: [
      { sl: 'Utrujena sem.', es: 'Estoy cansada.' },
      { sl: 'Od kod ste?', es: '¿De dónde es usted?' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'Od kod si?', es: '¿De dónde sos?', note: 'Formal: Od kod ste?' },
        { sl: 'Kje živiš?', es: '¿Dónde vivís?', note: 'Formal: Kje živite?' },
        { sl: 'Kaj si po poklicu?', es: '¿A qué te dedicás?', note: 'Literalmente: "¿qué sos de profesión?".' },
        { sl: 'Še študiram.', es: 'Todavía estudio.' },
        { sl: 'Še hodim v šolo.', es: 'Todavía voy a la escuela.' },
        { sl: 'utrujen / utrujena', es: 'cansado / cansada' },
        { sl: 'srečen / srečna', es: 'feliz', note: 'Varón: srečen. Mujer: srečna.' },
        { sl: 'Lepo, da si tu!', es: '¡Qué bueno que estés acá!' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'choice',
          prompt: '¿Cómo dice una mujer "Estoy cansada"?',
          options: ['Utrujen sem.', 'Utrujena sem.', 'Utrujeno sem.'],
          answer: 1,
          explain: 'Una mujer agrega -a: utrujena.',
        },
        { kind: 'order', prompt: 'Armá: "Vivo en Mendoza."', words: ['Živim', 'v', 'Mendozi.'], distractors: ['Mendoza.'] },
        { kind: 'fill', prompt: 'Completá: "¿A qué te dedicás?"', before: 'Kaj si po', after: '?', options: ['poklicu', 'poklic', 'poklica'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "Še študiram"?', options: ['Todavía estudio.', 'Ya trabajo.', 'Estudio mucho.'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Somos de Argentina."', words: ['Mi', 'smo', 'iz', 'Argentine.'], distractors: ['Argentina.'] },
        { kind: 'fill', prompt: 'Completá: "Estoy feliz." (varón)', before: '', after: ' sem.', options: ['Srečen', 'Srečna', 'Srečno'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En una fiesta de la comunidad',
      lines: [
        { speaker: 'Tomaž', sl: 'Živjo! Si ti nova tukaj?', es: '¡Hola! ¿Sos nueva acá?' },
        { speaker: 'Lucía', sl: 'Ja, prvič sem tukaj.', es: 'Sí, es la primera vez que vengo.' },
        { speaker: 'Tomaž', sl: 'Od kod si?', es: '¿De dónde sos?' },
        { speaker: 'Lucía', sl: 'Iz Córdobe. Kaj si ti po poklicu?', es: 'De Córdoba. ¿Vos a qué te dedicás?' },
        { speaker: 'Tomaž', sl: 'Jaz sem učitelj. In ti?', es: 'Yo soy maestro. ¿Y vos?' },
        { speaker: 'Lucía', sl: 'Še študiram.', es: 'Todavía estudio.' },
        { speaker: 'Tomaž', sl: 'Kako se počutiš?', es: '¿Cómo te sentís?' },
        { speaker: 'Lucía', sl: 'Malo sem utrujena, ampak zelo srečna, da sem tu.', es: 'Estoy un poco cansada, pero muy contenta de estar acá.' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿De dónde es Lucía?', options: ['De Córdoba', 'De Ljubljana', 'De Mendoza'], answer: 0 },
        { kind: 'choice', prompt: '¿A qué se dedica Tomaž?', options: ['Es maestro', 'Es médico', 'Todavía estudia'], answer: 0 },
        {
          kind: 'choice',
          prompt: '¿Cómo se siente Lucía?',
          options: ['Cansada pero contenta', 'Triste', 'Con hambre'],
          answer: 0,
          explain: 'Dice utrujena y srečna: termina en -a porque es mujer.',
        },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Qué significa "Kje živiš?"', options: ['¿Dónde vivís?', '¿De dónde sos?', '¿Cómo te llamás?'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "¿De dónde es usted?"', before: 'Od kod', after: '?', options: ['si', 'ste', 'sem'], answer: 1 },
        {
          kind: 'choice',
          prompt: '"Žejna sem" lo dice…',
          options: ['un varón', 'una mujer'],
          answer: 1,
          explain: 'Termina en -a: lo dice una mujer.',
        },
        { kind: 'order', prompt: 'Armá: "Todavía voy a la escuela."', words: ['Še', 'hodim', 'v', 'šolo.'], distractors: ['šoli.'] },
        { kind: 'choice', prompt: '¿Cómo se dice "maestra"?', options: ['učitelj', 'učiteljica', 'učenec'], answer: 1 },
        { kind: 'fill', prompt: 'Completá: "Soy de Eslovenia."', before: 'Sem iz', after: '.', options: ['Slovenija', 'Slovenije', 'Sloveniji'], answer: 1 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se pregunta "¿A qué se dedica usted?"', options: ['Kaj ste po poklicu?', 'Kje ste?', 'Kako ste?'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Estoy cansado." (varón)', before: '', after: ' sem.', options: ['Utrujen', 'Utrujena'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Vivimos en Argentina."', words: ['Živimo', 'v', 'Argentini.'], distractors: ['Živim'] },
        { kind: 'choice', prompt: '¿Qué significa "Prvič sem tukaj"?', options: ['Es la primera vez que estoy acá.', 'Vivo acá.', 'Me voy de acá.'], answer: 0 },
        { kind: 'choice', prompt: '¿Cómo dice una mujer "Estoy triste"?', options: ['Žalosten sem.', 'Žalostna sem.'], answer: 1 },
      ],
    },
  ],
}
