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
| `src/styles/tokens.css` | **Toda la estética** del diseño "Blanco y luz": colores, degradés, tipografía de sistema (SF Pro / Helvética), bordes, espacios. |
| `src/styles/base.css` | Estructura de los componentes (usa solo las variables de `tokens.css`). |
| `src/data/lexicon.ts` | Género de cada sustantivo (en todas sus formas) para los puntos de color: azul masculino, naranja femenino, verde neutro. |
| `src/data/` | Contenido: unidades (`unit1.ts`…`unit10.ts`), vocabulario y ejemplos extra (`vocabulary.ts`), frases de viaje, palabras de géneros. Se puede revisar y corregir sin tocar código. |
| `src/lib/numbers.ts` | Lógica de los números en esloveno (calculadora). |
| `src/lib/progress.ts` | Progreso, desbloqueo de unidades, racha y favoritas (guardado en el dispositivo). |
| `src/screens/` | Pantallas: Ruta, Unidad, Sección, Ayudas, Calculadora, Géneros, Viaje. |
| `src/components/` | Piezas reutilizables: ejercicios, tarjeta de regla, botón de audio. |

## Estado

- Las 10 unidades completas, cada una con su regla nueva y sus 5 secciones (Descubrí, Frases, Diálogo, Práctica, Desafío).
- Cada unidad tiene 20+ palabras y 10 frases de ejemplo (`src/data/vocabulary.ts`). Las frases tienen partes que cambian, escritas así: `Nasvidenje, {gospod|gospa}!` ↔ `¡Adiós, {señor|señora}!` (persona, género, señor/señora, nombres). Con ellas se generan preguntas nuevas en cada intento (`src/lib/generate.ts`): Frases ~16, Práctica ~35, Desafío 15.
- Armar frases: siempre sobran palabras (2 en las unidades 1–3, 3 desde la 4), sobre todo trampas parecidas (gospa/gospod, kava/kavo). La puntuación no aparece en los botones.
- En lugar de "escuchar": "¿Cómo se dice esta frase?" (elegir entre variantes parecidas) y "Completá" (elegir la forma correcta).
- Las opciones de los ejercicios se mezclan para que no se memoricen por posición.
- Ayudas en una sola página: herramientas arriba (calculadora, géneros y dual, cada una con su explicación antes) y las reglas en el orden de la ruta, con un resumen de una línea visible y la explicación completa al tocarla.
- Botón "?" en los ejercicios: muestra la regla de la unidad sin salir del ejercicio.
- Diseño "Blanco y luz": fondo blanco, luces de degradé solo en lo destacado (unidad actual, herramientas, barra inferior, palabras elegidas, progreso) y un guiño a la bandera junto al nombre.
- Modo viaje con favoritas, disponible sin internet.
- El audio usa la voz del dispositivo; si no tiene voz en esloveno, se muestra el texto.
- **El contenido en esloveno está pendiente de revisión por un hablante nativo.**
