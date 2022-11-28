import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const DevelopmentLayout = () => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">Development</h1>
      </header>
      <main className="rw-main">
        <h2>Environment</h2>
        <p>{process.env.ENV}</p>
        <h2>Stats</h2>
        <p>N/A</p>
      </main>
    </div>
  )
}

export default DevelopmentLayout
