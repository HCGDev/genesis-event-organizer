import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const StoresLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.stores()} className="rw-link">
            Stores
          </Link>
        </h1>
        <Link to={routes.newStore()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Store
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default StoresLayout
