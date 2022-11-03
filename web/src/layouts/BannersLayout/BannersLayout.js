import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const BannersLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.banners()} className="rw-link">
            Banners
          </Link>
        </h1>
        <Link to={routes.newBanner()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Banner
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default BannersLayout
