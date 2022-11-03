import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const MatchesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.matches()} className="rw-link">
            Matches
          </Link>
        </h1>
        <Link to={routes.newMatch()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Match
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default MatchesLayout
