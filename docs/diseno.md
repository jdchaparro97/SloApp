# SloApp — Documento de diseño

App para aprender lo básico de esloveno de forma fácil y visual, en español.
Una sola app para todas las edades (pensada también para niños y jóvenes de la comunidad eslovena en Argentina).

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Público | Una misma app para todos: visual, liviana, sin perfiles separados |
| Idiomas | Solo español ↔ esloveno (sin comparar con otras lenguas) |
| Plataforma | PWA (web app instalable, funciona offline) |
| Contenido | Generado con IA y revisado por un hablante nativo |
| IA conversacional | No por ahora; se deja prevista para más adelante |
| Monetización | Ninguna por ahora |
| Datos personales | No pedir datos (sin registro); progreso guardado en el dispositivo |

## Estructura de la app

```
Inicio
├── Ruta (10 unidades → 5 secciones cada una)
├── Ayudas (consulta libre, fuera de la ruta)
└── Modo viaje (frases útiles offline)
```

### Secciones de cada unidad

1. **Descubrí** — 6–8 palabras/frases nuevas con imagen y audio.
2. **Frases** — armar frases reales (ordenar, completar).
3. **Diálogo** — mini-diálogo de una situación real: escuchar y responder.
4. **Práctica** — ejercicios mezclados, ~5 minutos.
5. **Desafío** — repaso corto que desbloquea la unidad siguiente.

Cuando una unidad introduce un tema gramatical nuevo, aparece una **tarjeta "Regla nueva"** antes de los ejercicios: explicación corta, comparación con el español, una tabla mínima y 2–3 ejemplos. Si la regla ya apareció antes, se muestra un recordatorio **"¿Te acordás?"** con un enlace a Ayudas.

### Las 10 unidades

| # | Unidad | Regla nueva |
|---|---|---|
| 1 | Saludos | Pronunciación (č, š, ž); *ti* / *vi* (informal / formal) |
| 2 | Presentarme y mi familia | Verbo *biti* (ser/estar); **los 3 géneros** |
| 3 | Números | Números 0–100; **regla 1 / 2 / 3–4 / 5+**; **el dual** |
| 4 | Comida y bebida | Acusativo (*kava → kavo*: "quiero un café") |
| 5 | En la ciudad | Locativo con *v* / *na* ("en") |
| 6 | Transporte | Instrumental (*z avtobusom*: "en/con colectivo") |
| 7 | Días, horas y fechas | Días de la semana, la hora |
| 8 | Compras | Genitivo (*ni*, *koliko*, cantidades) |
| 9 | Mi casa y mi día | Verbos en presente; dual en verbos (*midva greva*) |
| 10 | Ayuda y repaso final | Dativo (*k zdravniku*: "al médico") |

## Explicaciones gramaticales (contenido base)

### Los 6 casos

En español usamos preposiciones ("a la casa", "en la casa"); en esloveno, además, **cambia la terminación** de la palabra. Ejemplo con *hiša* (casa):

| Caso | Para qué sirve | Ejemplo | Traducción |
|---|---|---|---|
| Nominativo | Sujeto | To je **hiša**. | Esta es una casa. |
| Genitivo | "de", ausencia, cantidad | Ni **hiše**. | No hay casa. |
| Dativo | "a / hacia" | Grem k **hiši**. | Voy hacia la casa. |
| Acusativo | Objeto directo | Vidim **hišo**. | Veo la casa. |
| Locativo | "en" (lugar) | V **hiši** sem. | Estoy en la casa. |
| Instrumental | "con" | Pred **hišo**. | Delante de la casa. |

Se enseñan de a uno, dentro de frases útiles (ver tabla de unidades), nunca la tabla completa de entrada.

### Los 3 géneros

Cada sustantivo es **masculino**, **femenino** o **neutro**. Casi siempre se reconoce por la terminación.

Colores fijos en toda la app: **masculino = azul**, **femenino = naranja**, **neutro = verde**.

| Género | Termina en… | Ejemplos |
|---|---|---|
| Masculino | consonante | *stol* (silla), *brat* (hermano), *kruh* (pan) |
| Femenino | **-a** | *hiša* (casa), *miza* (mesa), *mačka* (gata) |
| Neutro | **-o** / **-e** | *okno* (ventana), *mesto* (ciudad), *morje* (mar) |

### El dual según el género

El dual se usa para **exactamente 2**. El número "dos" también cambia: *dva* (masculino) / *dve* (femenino y neutro).

| Género | Singular | Dual | Regla |
|---|---|---|---|
| Masculino | stol | **dva** stol**a** | + **-a** |
| Femenino | hiša | **dve** hiš**i** | -a → **-i** |
| Neutro | okno | **dve** okn**i** | -o/-e → **-i** |

Truco para recordar: **masculino → -a; femenino y neutro → -i.**

Los adjetivos siguen la misma regla: *dva velika stola*, *dve veliki hiši*, *dve veliki okni*.

### Los números y la regla 1 / 2 / 3–4 / 5+

| Cantidad | Forma | Ejemplo (*knjiga*, libro) |
|---|---|---|
| 1 | singular | ena knjig**a** |
| 2 | dual | dve knjig**i** |
| 3–4 | plural | tri / štiri knjig**e** |
| 5 o más | genitivo plural ("de libros") | pet knjig |

¿Por qué con 5 o más? Antiguamente *pet* funcionaba como sustantivo, "un grupo de cinco": es como decir "una docena **de** huevos".

La regla mira las **dos últimas cifras**: 101 funciona como 1 (*sto ena knjiga*), 102 como 2, 103–104 como 3–4. En cambio 21, 22… usan la forma de 5+ (*enaindvajset knjig*).

### Reglas que se repiten

Estas reglas aparecen una y otra vez. La app las marca con un ícono de "patrón" cada vez que vuelven:

- **Género por terminación**: consonante → masculino, -a → femenino, -o/-e → neutro.
- **Dual**: masculino → -a; femenino y neutro → -i.
- **Números**: 1 / 2 / 3–4 / 5+ (mirando las dos últimas cifras).
- **Genitivo = "falta o cantidad"**: después de 5+, de *ni* ("no hay"), de *koliko* ("cuánto"), de *veliko* ("mucho").
- **Locativo con *v* / *na***: "estar en un lugar".
- **Números compuestos al revés**: 21 = *ena-in-dvajset* ("uno-y-veinte").

## Ejercicio especial: clasificar por género y formar el dual

Dos pasos con la misma lista de palabras (con imagen):

1. **Clasificar**: arrastrar cada palabra a una de 3 cajas (azul / naranja / verde).
2. **Duplicar**: cada palabra aparece "por dos" (dos imágenes) y hay que elegir la forma correcta (*dva stola* / *dve stoli*…). Al acertar, la terminación se ilumina con el color del género.

Lista inicial de palabras:

| Masculino | Femenino | Neutro |
|---|---|---|
| stol → dva stola | hiša → dve hiši | okno → dve okni |
| brat → dva brata | miza → dve mizi | mesto → dve mesti |
| kruh → dva kruha | mačka → dve mački | jabolko → dve jabolki |
| avto* → dva avta | knjiga → dve knjigi | morje → dve morji |
| | | jajce → dve jajci |

\* *avto* es una excepción: termina en -o pero es masculino (ver tips).

## Ayudas

Sección de consulta libre, accesible desde cualquier lugar (también desde un botón "?" en los ejercicios).

- **Pronunciación**: abecedario con audio, foco en č, š, ž, c, j.
- **Casos**: las 6 tablas, con ejemplos.
- **Dual**: tabla por género.
- **Tips para reconocer el género** (ver abajo).
- **Calculadora de números** (ver abajo).
- **Chuleta rápida**: frases de supervivencia.

### Tips para reconocer el género

- Termina en **consonante** → casi siempre masculino (*stol*, *brat*).
- Termina en **-a** → casi siempre femenino (*hiša*).
  - Excepción: nombres de varones (*Luka*, *Miha*).
- Termina en **-o / -e** → neutro (*okno*, *morje*).
  - Excepción: palabras extranjeras masculinas (*avto*, *radio*, *kino*).
- Termina en **-ost** → femenino, como "-dad" en español (*mladost*, "juventud").
- Termina en **-ica** → femenino (*ulica*, "calle"; *učiteljica*, "maestra").
- Termina en **-nik / -ec** → masculino (*zdravnik*, "médico"; *Slovenec*, "esloveno").
- Termina en **-išče** → neutro, lugar (*igrišče*, "patio de juegos").
- Algunas femeninas terminan en consonante: *noč* (noche), *stvar* (cosa), *pesem* (canción). Hay que aprenderlas de memoria.

### Calculadora de números

No suma: escribís un número y te muestra **cómo se dice y cómo se forma**.

- Entrada: teclado numérico (0–999.999 en la primera versión).
- Salida: el número en esloveno, dividido en **bloques de colores** (millares / centenas / decenas / unidades) con una explicación de cada bloque.
- Botón de audio (cuando haya audio disponible).
- Opción "con una palabra": eligiendo un objeto (p. ej. *knjiga*) muestra la concordancia: *tri knjige*, *pet knjig*.

Ejemplo — **1234**:

| Bloque | Esloveno | Explicación |
|---|---|---|
| 1000 | *tisoč* | mil |
| 200 | *dvesto* | dos + cien, en una palabra |
| 34 | *štiriintrideset* | al revés: cuatro **y** treinta |

Resultado: **tisoč dvesto štiriintrideset**.

Reglas que usa la calculadora:

| Rango | Formación | Ejemplos |
|---|---|---|
| 0–10 | se aprenden | nič, ena, dva, tri, štiri, pet, šest, sedem, osem, devet, deset |
| 11–19 | unidad + **-najst** | enajst, dvanajst, trinajst… devetnajst |
| Decenas | unidad + **-deset** (excepto 20) | dvajset, trideset, štirideset… devetdeset |
| 21–99 | unidad + **in** + decena (todo junto) | enaindvajset, štiriintrideset |
| Centenas | unidad + **sto** (todo junto) | sto, dvesto, tristo… devetsto |
| Miles | número + **tisoč** (separado) | tisoč, dva tisoč, deset tisoč |

## Modo viaje

Frases útiles agrupadas por situación (saludar, pedir, transporte, emergencia), con audio, disponibles **sin internet**. Se puede marcar frases como favoritas.

## Chat con IA (futuro, no se implementa ahora)

Queda previsto en el diseño:

- La app nunca tendrá la clave de la API: un servidor pequeño (Cloudflare Workers o Supabase) hace la llamada.
- Límite diario de mensajes por usuario para controlar costos.
- Modelo económico (Claude Haiku) primero; evaluar calidad del esloveno antes de lanzar.
- Al ser una app para todas las edades: tutor con reglas estrictas (solo temas del curso), sin datos personales.

## Técnica (PWA)

- **Vite + React + TypeScript**, con `vite-plugin-pwa` (instalable + offline).
- **Contenido en archivos JSON** (unidades, palabras, diálogos), separado del código para poder revisarlo y corregirlo fácil.
- **Progreso en el dispositivo** (`localStorage` / IndexedDB), sin cuentas.
- **Audio**: grabaciones o TTS revisado; carpeta `public/audio/`.
- Hosting gratuito (GitHub Pages, Netlify o Cloudflare Pages).

## Próximos pasos

1. Crear el proyecto PWA base.
2. Prototipo de la **Unidad 1** con las 5 secciones.
3. **Calculadora de números** (no depende de contenido generado: es pura lógica).
4. Ejercicio de **género + dual**.
5. Generar el contenido de las unidades 2–10 y pedir revisión a un hablante nativo.
