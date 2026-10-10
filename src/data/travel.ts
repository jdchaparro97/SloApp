import type { Pair } from './types'

export interface TravelGroup {
  id: string
  title: string
  phrases: (Pair & { id: string })[]
}

// Frases del modo viaje. Pendiente de revisión por un hablante nativo.
export const TRAVEL_GROUPS: TravelGroup[] = [
  {
    id: 'basico',
    title: 'Lo básico',
    phrases: [
      { id: 'dober-dan', sl: 'Dober dan!', es: '¡Buen día!' },
      { id: 'hvala', sl: 'Hvala.', es: 'Gracias.' },
      { id: 'prosim', sl: 'Prosim.', es: 'Por favor. / De nada.' },
      { id: 'oprostite', sl: 'Oprostite.', es: 'Disculpe.' },
      { id: 'ne-razumem', sl: 'Ne razumem.', es: 'No entiendo.' },
      { id: 'spansko', sl: 'Govorite špansko?', es: '¿Habla español?' },
    ],
  },
  {
    id: 'comer',
    title: 'Comer y comprar',
    phrases: [
      { id: 'kava', sl: 'Eno kavo, prosim.', es: 'Un café, por favor.' },
      { id: 'voda', sl: 'Vodo, prosim.', es: 'Agua, por favor.' },
      { id: 'racun', sl: 'Račun, prosim.', es: 'La cuenta, por favor.' },
      { id: 'koliko', sl: 'Koliko stane?', es: '¿Cuánto cuesta?' },
    ],
  },
  {
    id: 'moverse',
    title: 'Moverse',
    phrases: [
      { id: 'postaja', sl: 'Kje je postaja?', es: '¿Dónde está la estación?' },
      { id: 'listek', sl: 'En listek do Ljubljane, prosim.', es: 'Un boleto a Ljubljana, por favor.' },
      { id: 'stranisce', sl: 'Kje je stranišče?', es: '¿Dónde está el baño?' },
    ],
  },
  {
    id: 'emergencia',
    title: 'Emergencias',
    phrases: [
      { id: 'pomoc', sl: 'Na pomoč!', es: '¡Ayuda!' },
      { id: 'zdravnik', sl: 'Pokličite zdravnika!', es: '¡Llame a un médico!' },
      { id: 'izgubil', sl: 'Izgubil sem se. / Izgubila sem se.', es: 'Me perdí. (dicho por varón / por mujer)' },
    ],
  },
]
