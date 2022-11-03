import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const RoundsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.rounds()} className="rw-link">
            Rounds
          </Link>
        </h1>
        <Link to={routes.newRound()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Round
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default RoundsLayout
