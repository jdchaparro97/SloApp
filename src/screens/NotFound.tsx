export function NotFound({ message = 'No encontramos esta página.' }: { message?: string }) {
  return (
    <main className="screen">
      <p>{message}</p>
      <a href="#/ruta" className="btn">Volver a la ruta</a>
    </main>
  )
}
