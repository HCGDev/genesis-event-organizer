import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const PlayerTournamentScoresLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.playerTournamentScores()} className="rw-link">
            PlayerTournamentScores
          </Link>
        </h1>
        <Link
          to={routes.newPlayerTournamentScore()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New PlayerTournamentScore
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default PlayerTournamentScoresLayout
