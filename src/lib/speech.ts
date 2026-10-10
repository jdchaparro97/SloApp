import { useEffect, useState } from 'react'

// Audio con la voz del dispositivo (Web Speech API). Más adelante se reemplaza por grabaciones nativas.

function findSloveneVoice(): SpeechSynthesisVoice | undefined {
  if (typeof speechSynthesis === 'undefined') return undefined
  return speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith('sl'))
}

/** Si el dispositivo tiene una voz en esloveno. Las voces cargan de forma asíncrona. */
export function useSloveneVoice(): boolean {
  const [available, setAvailable] = useState(() => Boolean(findSloveneVoice()))
  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') return
    const onChange = () => setAvailable(Boolean(findSloveneVoice()))
    speechSynthesis.addEventListener('voiceschanged', onChange)
    onChange()
    return () => speechSynthesis.removeEventListener('voiceschanged', onChange)
  }, [])
  return available
}

export function speak(text: string) {
  const voice = findSloveneVoice()
  if (!voice) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.voice = voice
  utterance.lang = voice.lang
  utterance.rate = 0.85
  speechSynthesis.speak(utterance)
}
