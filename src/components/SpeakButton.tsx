import { speak, useSloveneVoice } from '../lib/speech'

/** Botón para escuchar un texto en esloveno. No se muestra si el dispositivo no tiene voz en esloveno. */
export function SpeakButton({ text }: { text: string }) {
  const hasVoice = useSloveneVoice()
  if (!hasVoice) return null
  return (
    <button type="button" className="btn btn-icon" onClick={() => speak(text)} aria-label={`Escuchar: ${text}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  )
}
