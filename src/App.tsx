import { useProgress } from './lib/progress'
import { useRoute, type Route } from './lib/router'
import { HelpScreen } from './screens/HelpScreen'
import { RouteScreen } from './screens/RouteScreen'
import { SectionScreen } from './screens/SectionScreen'
import { TravelScreen } from './screens/TravelScreen'
import { UnitScreen } from './screens/UnitScreen'

const TABS = [
  { href: '#/ruta', label: 'Ruta', match: (r: Route) => r.name === 'ruta' || r.name === 'unidad' || r.name === 'seccion' },
  { href: '#/ayudas', label: 'Ayudas', match: (r: Route) => r.name === 'ayudas' },
  { href: '#/viaje', label: 'Viaje', match: (r: Route) => r.name === 'viaje' },
]

export function App() {
  const route = useRoute()
  const { progress, update } = useProgress()

  let screen
  switch (route.name) {
    case 'unidad':
      screen = <UnitScreen unitId={route.unitId} progress={progress} />
      break
    case 'seccion':
      // `key` para empezar de cero al pasar de una sección a otra.
      screen = <SectionScreen key={`${route.unitId}/${route.section}`} unitId={route.unitId} sectionId={route.section} progress={progress} update={update} />
      break
    case 'ayudas':
      screen = <HelpScreen key={`${route.page}/${route.sub}`} page={route.page} sub={route.sub} />
      break
    case 'viaje':
      screen = <TravelScreen progress={progress} update={update} />
      break
    default:
      screen = <RouteScreen progress={progress} />
  }

  return (
    <div className="app">
      {screen}
      <nav className="tabbar" aria-label="Secciones principales">
        {TABS.map((tab) => (
          <a key={tab.href} href={tab.href} aria-current={tab.match(route) ? 'page' : undefined}>{tab.label}</a>
        ))}
      </nav>
    </div>
  )
}
