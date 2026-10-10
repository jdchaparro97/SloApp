import { useEffect, useState } from 'react'

// Navegación por hash (#/ruta, #/unidad/1/frases…): funciona offline y en cualquier hosting estático.

export type Route =
  | { name: 'ruta' }
  | { name: 'unidad'; unitId: number }
  | { name: 'seccion'; unitId: number; section: string }
  | { name: 'ayudas'; page?: string }
  | { name: 'viaje' }

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const [first, second, third] = parts
  if (first === 'unidad' && second && /^\d+$/.test(second)) {
    const unitId = Number(second)
    return third ? { name: 'seccion', unitId, section: third } : { name: 'unidad', unitId }
  }
  if (first === 'ayudas') return { name: 'ayudas', page: second }
  if (first === 'viaje') return { name: 'viaje' }
  return { name: 'ruta' }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parseRoute(location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigate(path: string) {
  location.hash = path
}
