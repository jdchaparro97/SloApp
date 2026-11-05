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
    id: 'camino',
    title: 'Preguntar el camino',
    phrases: [
      { id: 'kako-pridem', sl: 'Oprostite, kako pridem do centra?', es: 'Disculpe, ¿cómo llego al centro?' },
      { id: 'je-dalec', sl: 'Je daleč?', es: '¿Es lejos?' },
      { id: 'naravnost', sl: 'Pojdite naravnost do križišča.', es: 'Siga derecho hasta el cruce.' },
      { id: 'zavijte', sl: 'Zavijte levo. / Zavijte desno.', es: 'Doble a la izquierda. / Doble a la derecha.' },
      { id: 'nisem-od-tu', sl: 'Ne vem, nisem od tu.', es: 'No sé, no soy de acá.' },
    ],
  },
  {
    id: 'ropa',
    title: 'En una tienda de ropa',
    phrases: [
      { id: 'samo-gledam', sl: 'Samo gledam, hvala.', es: 'Solo estoy mirando, gracias.' },
      { id: 'pomerim', sl: 'Ali lahko to pomerim?', es: '¿Me lo puedo probar?' },
      { id: 'manjso', sl: 'Imate manjšo velikost?', es: '¿Tienen un talle más chico?' },
      { id: 'vzamem', sl: 'Vzamem to.', es: 'Me lo llevo.' },
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
