import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const PlayerMatchScoresLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.playerMatchScores()} className="rw-link">
            PlayerMatchScores
          </Link>
        </h1>
        <Link
          to={routes.newPlayerMatchScore()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New PlayerMatchScore
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default PlayerMatchScoresLayout
