import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const UserUserRolesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.userUserRoles()} className="rw-link">
            UserUserRoles
          </Link>
        </h1>
        <Link
          to={routes.newUserUserRole()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New UserUserRole
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default UserUserRolesLayout
