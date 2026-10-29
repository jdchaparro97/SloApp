import type { Unit } from './types'

// Pendiente de revisión por un hablante nativo.
export const unit10: Unit = {
  id: 10,
  title: 'Ayuda y repaso final',
  topic: 'Dativo',
  rule: {
    title: 'Regla nueva: el dativo ("a" o "hacia" alguien)',
    short: 'Hacia alguien: k / h + -u (masc.) o -i (fem.): k zdravniku, k mami. Me duele = boli me.',
    body: [
      'Para ir hacia una persona se usa k + dativo: grem k zdravniku (voy al médico). Antes de g o k se dice h: h kolegu.',
      'También se usa para dar algo a alguien: Dam bratu knjigo (Le doy el libro a mi hermano).',
      'Femeninos: -a → -i (mama → k mami). Masculinos: + -u (brat → k bratu).',
      'Para el dolor: Boli me glava (me duele la cabeza). Para sentirse mal: Slabo mi je.',
    ],
    table: {
      head: ['Palabra', 'Dativo', 'Ejemplo'],
      rows: [
        ['zdravnik', 'zdravniku', 'Grem k zdravniku.'],
        ['babica', 'babici', 'Grem k babici.'],
        ['brat', 'bratu', 'Dam bratu knjigo.'],
        ['kolega', 'kolegu', 'Grem h kolegu.'],
      ],
    },
    examples: [
      { sl: 'Boli me glava.', es: 'Me duele la cabeza.' },
      { sl: 'Na pomoč!', es: '¡Ayuda!' },
    ],
  },
  sections: [
    {
      id: 'descubri',
      kind: 'discover',
      items: [
        { sl: 'pomoč', es: 'ayuda', note: 'Femenino aunque termina en consonante.' },
        { sl: 'zdravnik', es: 'médico' },
        { sl: 'lekarna', es: 'farmacia' },
        { sl: 'bolnišnica', es: 'hospital' },
        { sl: 'policija', es: 'policía' },
        { sl: 'glava', es: 'cabeza' },
        { sl: 'Boli me…', es: 'Me duele…' },
        { sl: 'Slabo mi je.', es: 'Me siento mal.' },
      ],
    },
    {
      id: 'frases',
      kind: 'exercises',
      exercises: [
        {
          kind: 'fill',
          prompt: 'Completá: "Voy al médico."',
          before: 'Grem k',
          after: '.',
          options: ['zdravnik', 'zdravniku', 'zdravnika'],
          answer: 1,
          explain: 'Después de k va dativo. Masculino: + -u.',
        },
        { kind: 'fill', prompt: 'Completá: "Voy a lo de la abuela."', before: 'Grem k', after: '.', options: ['babica', 'babico', 'babici'], answer: 2 },
        { kind: 'choice', prompt: '¿Cómo se dice "farmacia"?', options: ['lekarna', 'bolnišnica', 'pošta'], answer: 0 },
        { kind: 'order', prompt: 'Armá: "Me duele la cabeza."', words: ['Boli', 'me', 'glava.'] },
        { kind: 'choice', prompt: '¿Qué significa "Pokličite policijo!"?', options: ['¡Llame a la policía!', '¡Vaya al médico!', '¡Ayuda!'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Le doy el libro a mi hermano."', before: 'Dam', after: ' knjigo.', options: ['brat', 'brata', 'bratu'], answer: 2 },
      ],
    },
    {
      id: 'dialogo',
      kind: 'dialogue',
      title: 'En la farmacia',
      lines: [
        { speaker: 'Farmacéutica', sl: 'Dober dan, kako vam lahko pomagam?', es: 'Buen día, ¿en qué lo puedo ayudar?' },
        { speaker: 'Luka', sl: 'Slabo mi je. Boli me glava.', es: 'Me siento mal. Me duele la cabeza.' },
        { speaker: 'Farmacéutica', sl: 'Imate vročino?', es: '¿Tiene fiebre?' },
        { speaker: 'Luka', sl: 'Ne, nimam.', es: 'No, no tengo.' },
        { speaker: 'Farmacéutica', sl: 'Vzemite to tableto. Če ne bo bolje, pojdite k zdravniku.', es: 'Tome esta pastilla. Si no mejora, vaya al médico.' },
        { speaker: 'Luka', sl: 'Hvala lepa!', es: '¡Muchas gracias!' },
      ],
      exercises: [
        { kind: 'choice', prompt: '¿Qué le duele a Luka?', options: ['La panza', 'La cabeza', 'Un pie'], answer: 1 },
        { kind: 'choice', prompt: '¿Tiene fiebre?', options: ['Sí', 'No'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué tiene que hacer si no mejora?', options: ['Ir al médico', 'Llamar a la policía', 'Dormir'], answer: 0 },
      ],
    },
    {
      id: 'practica',
      kind: 'exercises',
      exercises: [
        { kind: 'listen', sl: 'Na pomoč!', options: ['¡Ayuda!', '¡Gracias!', '¡Chau!'], answer: 0 },
        { kind: 'fill', prompt: 'Completá: "Le escribo a mamá."', before: 'Pišem', after: '.', options: ['mama', 'mami', 'mamo'], answer: 1 },
        { kind: 'choice', prompt: '¿Qué significa "bolnišnica"?', options: ['farmacia', 'hospital', 'escuela'], answer: 1 },
        { kind: 'order', prompt: 'Armá: "Voy al médico."', words: ['Grem', 'k', 'zdravniku.'], distractors: ['zdravnik.'] },
        {
          kind: 'choice',
          prompt: '¿K o h? "___ kolegu" (hacia el compañero)',
          options: ['k', 'h'],
          answer: 1,
          explain: 'Antes de g o k se usa h.',
        },
        { kind: 'fill', prompt: 'Completá: "Me duele la cabeza."', before: 'Boli me', after: '.', options: ['glava', 'glavo', 'glavi'], answer: 0 },
      ],
    },
    {
      id: 'desafio',
      kind: 'exercises',
      exercises: [
        { kind: 'choice', prompt: 'Repaso: ¿qué significa "Kako si?"', options: ['¿Cómo estás?', '¿Dónde estás?', '¿Quién sos?'], answer: 0 },
        { kind: 'fill', prompt: 'Repaso: "dos casas"', before: 'dve', after: '', options: ['hiša', 'hiši', 'hiše'], answer: 1 },
        { kind: 'fill', prompt: 'Repaso: "Estoy en Ljubljana."', before: 'Sem v', after: '.', options: ['Ljubljani', 'Ljubljana', 'Ljubljano'], answer: 0 },
        { kind: 'order', prompt: 'Repaso: "Voy en tren a lo de la abuela."', words: ['Grem', 'z', 'vlakom', 'k', 'babici.'] },
        { kind: 'choice', prompt: 'Repaso: ¿qué significa "Ni kruha"?', options: ['No hay pan.', 'Quiero pan.', 'El pan es caro.'], answer: 0 },
      ],
    },
  ],
}
