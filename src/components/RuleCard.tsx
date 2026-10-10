import type { Rule } from '../data/types'
import { SpeakButton } from './SpeakButton'

export function RuleCard({ rule }: { rule: Rule }) {
  return (
    <section className="card" aria-label={rule.title}>
      <h2>{rule.title}</h2>
      {rule.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {rule.table && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{rule.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rule.table.rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {rule.examples?.map((ex) => (
        <div key={ex.sl} className="spread">
          <div>
            <p className="sl">{ex.sl}</p>
            <p className="muted small">{ex.es}</p>
          </div>
          <SpeakButton text={ex.sl} />
        </div>
      ))}
    </section>
  )
}
