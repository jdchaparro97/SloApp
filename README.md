# SloApp

App (PWA) para aprender lo básico de esloveno en español. Diseño y decisiones: [docs/diseno.md](docs/diseno.md).

## Cómo usarla

Requiere Node 22 o superior.

```bash
npm install      # instalar dependencias (una sola vez)
npm run dev      # abrir en modo desarrollo (http://localhost:5173)
npm test         # correr las pruebas automáticas
npm run build    # generar la versión final en dist/
npm run preview  # probar la versión final (incluye modo offline)
```

## Dónde está cada cosa

| Carpeta / archivo | Qué hay |
|---|---|
| `src/styles/tokens.css` | **Toda la estética**: colores, tipografías, bordes, espacios. Cambiando este archivo se rediseña la app. |
| `src/styles/base.css` | Estructura de los componentes (usa solo las variables de `tokens.css`). |
| `src/data/` | Contenido: unidades, frases de viaje, palabras de géneros. Se puede revisar y corregir sin tocar código. |
| `src/lib/numbers.ts` | Lógica de los números en esloveno (calculadora). |
| `src/lib/progress.ts` | Progreso, desbloqueo de unidades, racha y favoritas (guardado en el dispositivo). |
| `src/screens/` | Pantallas: Ruta, Unidad, Sección, Ayudas, Calculadora, Géneros, Viaje. |
| `src/components/` | Piezas reutilizables: ejercicios, tarjeta de regla, botón de audio. |

## Estado

- Las 10 unidades completas, cada una con su regla nueva y sus 5 secciones (Descubrí, Frases, Diálogo, Práctica, Desafío).
- Las opciones de los ejercicios se mezclan para que no se memoricen por posición.
- Ayudas: calculadora de números, práctica de géneros y dual, pronunciación, tips de género, dual y casos.
- Modo viaje con favoritas, disponible sin internet.
- El audio usa la voz del dispositivo; si no tiene voz en esloveno, se muestra el texto.
- **El contenido en esloveno está pendiente de revisión por un hablante nativo.**
