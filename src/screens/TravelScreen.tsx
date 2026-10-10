import { useState } from 'react'
import { SpeakButton } from '../components/SpeakButton'
import { TRAVEL_GROUPS } from '../data/travel'
import { toggleFavorite, type Progress } from '../lib/progress'

export function TravelScreen({ progress, update }: { progress: Progress; update: (fn: (p: Progress) => Progress) => void }) {
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const groups = TRAVEL_GROUPS
    .map((g) => ({ ...g, phrases: g.phrases.filter((p) => !onlyFavorites || progress.favorites.includes(p.id)) }))
    .filter((g) => g.phrases.length > 0)

  return (
    <main className="screen">
      <h1>Modo viaje</h1>
      <p className="muted">Frases útiles. Funcionan sin internet.</p>
      <label className="row">
        <input type="checkbox" checked={onlyFavorites} onChange={(e) => setOnlyFavorites(e.target.checked)} />
        Solo favoritas
      </label>
      {groups.length === 0 && <p className="notice">Todavía no marcaste favoritas. Tocá la estrella de una frase.</p>}
      {groups.map((group) => (
        <section key={group.id} className="stack">
          <h2>{group.title}</h2>
          <ul className="list">
            {group.phrases.map((phrase) => {
              const fav = progress.favorites.includes(phrase.id)
              return (
                <li key={phrase.id} className="card">
                  <div className="spread">
                    <div>
                      <p className="sl">{phrase.sl}</p>
                      <p className="small muted">{phrase.es}</p>
                    </div>
                    <div className="row">
                      <SpeakButton text={phrase.sl} />
                      <button
                        type="button"
                        className="btn btn-icon"
                        aria-pressed={fav}
                        aria-label={fav ? `Quitar de favoritas: ${phrase.sl}` : `Agregar a favoritas: ${phrase.sl}`}
                        onClick={() => update((p) => toggleFavorite(p, phrase.id))}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}
