import type { Unit } from './types'

// Temas inspirados en el apartado "De compras" del diccionario del usuario; frases propias.
// Pendiente de revisión por un hablante nativo.
export const unit14: Unit = {
  id: 14,
  title: 'Ropa y colores',
  topic: 'Colores con género y pre- (demasiado)',
  rule: {
    title: 'Regla nueva: colores y "demasiado"',
    short: 'Los colores cambian con el género: rdeč plašč, rdeča majica, rdeče krilo. pre- = demasiado: predrag, premajhen.',
    body: [
      'Los colores son adjetivos: cambian con el género de la prenda. Masculino sin terminación, femenino -a, neutro -o / -e.',
      'Ojo: el género puede ser distinto que en español. Obleka (vestido) es femenino: črna obleka.',
      'Para decir "demasiado" se agrega pre- adelante: drag (caro) → predrag, majhen (chico) → premajhen.',
      'Para probarse algo: Ali lahko to pomerim? (¿Me lo puedo probar?).',
    ],
    table: {
      head: ['Prenda', 'Género', 'Roja / rojo'],
      rows: [
        ['plašč (abrigo)', 'masculino', 'rdeč plašč'],
        ['majica (remera)', 'femenino', 'rdeča majica'],
        ['krilo (pollera)', 'neutro', 'rdeče krilo'],
        ['hlače (pantalón, plural)', 'femenino', 'rdeče hlače'],
        ['čevlji (zapatos, plural)', 'masculino', 'rdeči čevlji'],
      ],
    },
    examples: [
      { sl: 'Ta majica je premajhna.', es: 'Esta remera es demasiado chica.' },
      { sl: 'Ali lahko to pomerim?', es: '¿Me lo puedo probar?' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'plašč', es: 'abrigo', note: 'Masculino.' },
        { sl: 'majica', es: 'remera', note: 'Femenino.' },
        { sl: 'hlače', es: 'pantalón', note: 'Se usa en plural, como "los pantalones".' },
        { sl: 'krilo', es: 'pollera', note: 'Neutro.' },
        { sl: 'obleka', es: 'vestido', note: 'Femenino, aunque en español es masculino.' },
        { sl: 'rdeč', es: 'rojo', note: 'Fem. rdeča, neutro rdeče.' },
        { sl: 'moder', es: 'azul', note: 'Fem. modra, neutro modro.' },
        { sl: 'črn', es: 'negro', note: 'Fem. črna, neutro črno.' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'choice',
          prompt: '¿Cómo se dice "una remera roja"?',
          options: ['rdeč majica', 'rdeča majica', 'rdeče majica'],
          answer: 1,
          explain: 'Majica es femenino: rdeča.',
        },
        { kind: 'fill', prompt: 'Completá: "Este abrigo es demasiado caro."', before: 'Ta plašč je', after: '.', options: ['predrag', 'drag', 'predraga'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "¿Me lo puedo probar?"', words: ['Ali', 'lahko', 'to', 'pomerim?'], distractors: ['kupim'] },
        { kind: 'choice', prompt: '¿Qué significa "črne hlače"?', options: ['pantalón negro', 'pollera negra', 'zapatos negros'], answer: 0 },
        {
          kind: 'fill',
          prompt: 'Completá: "una pollera azul"',
          before: '',
          after: ' krilo',
          options: ['modro', 'moder', 'modra'],
          answer: 0,
          explain: 'Krilo es neutro: modro.',
        },
        { kind: 'choice', prompt: '¿Qué significa "premajhen"?', options: ['demasiado chico', 'muy lindo', 'demasiado caro'], answer: 0 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En la tienda de ropa',
      lines: [
        { speaker: 'Vendedora', sl: 'Dober dan! Vam lahko pomagam?', es: '¡Buen día! ¿La puedo ayudar?' },
        { speaker: 'Sofía', sl: 'Iščem modro obleko.', es: 'Busco un vestido azul.' },
        { speaker: 'Vendedora', sl: 'Kakšno velikost potrebujete?', es: '¿Qué talle necesita?' },
        { speaker: 'Sofía', sl: 'Velikost 38.', es: 'Talle 38.' },
        { speaker: 'Vendedora', sl: 'Izvolite. Kabina je tam.', es: 'Aquí tiene. El probador está allá.' },
        { speaker: 'Sofía', sl: 'Hm, premajhna je. Imate večjo?', es: 'Mmm, es demasiado chico. ¿Tienen uno más grande?' },
        { speaker: 'Vendedora', sl: 'Seveda. Ta je velikost 40.', es: 'Por supuesto. Este es talle 40.' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué busca Sofía?', options: ['Un vestido azul', 'Un abrigo negro', 'Zapatos rojos'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué talle pide primero?', options: ['38', '40', '42'], answer: 0 },
        {
          kind: 'choice',
          prompt: '¿Qué problema tiene el vestido?',
          options: ['Es demasiado chico', 'Es demasiado caro', 'Es demasiado largo'],
          answer: 0,
          explain: 'Dice premajhna: femenino porque obleka es femenino.',
        },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Qué significa "zelen"?', options: ['verde', 'amarillo', 'blanco'], answer: 0 },
        {
          kind: 'fill',
          prompt: 'Completá: "un vestido negro"',
          before: '',
          after: ' obleka',
          options: ['črn', 'črna', 'črno'],
          answer: 1,
          explain: 'Obleka es femenino en esloveno: črna.',
        },
        { kind: 'choice', prompt: '¿Cómo se dice "zapatos"?', options: ['čevlji', 'hlače', 'nogavice'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Esta remera es demasiado grande."', words: ['Ta', 'majica', 'je', 'prevelika.'], distractors: ['prevelik'] },
        { kind: 'choice', prompt: '¿Qué significa "Kje je kabina?"', options: ['¿Dónde está el probador?', '¿Dónde está la caja?', '¿Cuánto cuesta?'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "¿Tienen esto en rojo?"', before: 'Imate to v', after: ' barvi?', options: ['rdeči', 'rdeča', 'rdeč'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: '¿Cómo se dice "pollera"?', options: ['krilo', 'plašč', 'majica'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "un abrigo rojo"', before: '', after: ' plašč', options: ['rdeč', 'rdeča', 'rdeče'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Busco un vestido azul."', words: ['Iščem', 'modro', 'obleko.'], distractors: ['moder'] },
        { kind: 'choice', prompt: '¿Qué significa "predrago"?', options: ['demasiado caro', 'muy barato', 'gratis'], answer: 0 },
        { kind: 'choice', prompt: '¿Qué significa "Imate večjo?"', options: ['¿Tienen uno más grande?', '¿Tienen uno más chico?', '¿Cuánto cuesta?'], answer: 0 },
      ],
    },
  ],
}
