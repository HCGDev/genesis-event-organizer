import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const UserPicturesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.userPictures()} className="rw-link">
            UserPictures
          </Link>
        </h1>
        <Link
          to={routes.newUserPicture()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New UserPicture
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default UserPicturesLayout
