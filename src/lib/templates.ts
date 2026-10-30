// Frases con partes que cambian: "Na svidenje, {gospod|gospa}!" ↔ "¡Adiós, {señor|señora}!".
// El hueco número N del esloveno se corresponde con el hueco N del español, y cada opción con la de la misma posición.

const SLOT = /\{([^{}]*)\}/g

export interface TemplatePair {
  sl: string
  es: string
}

/** Las opciones de cada hueco, en orden. */
export function slotsOf(text: string): string[][] {
  return [...text.matchAll(SLOT)].map((m) => m[1].split('|'))
}

/** Reemplaza cada hueco por la opción elegida. Con `blank`, ese hueco queda marcado como "\u0000". */
export function render(text: string, choices: number[], blank?: number): string {
  let i = 0
  return text.replace(SLOT, (_, inner: string) => {
    const k = i++
    return k === blank ? '\u0000' : inner.split('|')[choices[k] ?? 0]
  })
}

export function randomChoices(text: string, random: () => number): number[] {
  return slotsOf(text).map((alts) => Math.floor(random() * alts.length))
}

/** Problemas de una plantilla: huecos que no coinciden entre los dos idiomas u opciones repetidas. */
export function templateProblems(pair: TemplatePair): string[] {
  const sl = slotsOf(pair.sl)
  const es = slotsOf(pair.es)
  const problems: string[] = []
  if (sl.length !== es.length) problems.push(`"${pair.sl}": ${sl.length} huecos en esloveno y ${es.length} en español`)
  sl.forEach((alts, k) => {
    if (es[k] && es[k].length !== alts.length) problems.push(`"${pair.sl}": el hueco ${k + 1} tiene distinta cantidad de opciones`)
    if (new Set(alts).size !== alts.length) problems.push(`"${pair.sl}": opciones repetidas en esloveno`)
    if (es[k] && new Set(es[k]).size !== es[k].length) problems.push(`"${pair.sl}": opciones repetidas en español`)
  })
  return problems
}

/** Un hueco es "solo nombres" si cada opción es igual en los dos idiomas (Ana ↔ Ana): no sirve para practicar. */
export function isNameSlot(pair: TemplatePair, k: number): boolean {
  const sl = slotsOf(pair.sl)[k] ?? []
  const es = slotsOf(pair.es)[k] ?? []
  return sl.every((alt, i) => alt === es[i])
}
