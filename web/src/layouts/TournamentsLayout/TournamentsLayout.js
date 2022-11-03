import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const TournamentsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.tournaments()} className="rw-link">
            Tournaments
          </Link>
        </h1>
        <Link to={routes.newTournament()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Tournament
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default TournamentsLayout
