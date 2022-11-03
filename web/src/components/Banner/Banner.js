import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/BannersCell'
import SingleBanner from '../SingleBanner/SingleBanner'

const DELETE_BANNER_MUTATION = gql`
  mutation DeleteBannerMutation($id: Int!) {
    deleteBanner(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Banner = ({ banner }) => {
  const [deleteBanner] = useMutation(DELETE_BANNER_MUTATION, {
    onCompleted: () => {
      toast.success('Banner deleted')
      navigate(routes.banners())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete banner ' + id + '?')) {
      deleteBanner({ variables: { id } })
    }
  }

  return (
    <>
      <SingleBanner banner={banner} />
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Banner {banner.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{banner.id}</td>
            </tr>
            <tr>
              <th>Background url</th>
              <td>{banner.backgroundUrl}</td>
            </tr>
            <tr>
              <th>Main text</th>
              <td>{banner.mainText}</td>
            </tr>
            <tr>
              <th>Main text color</th>
              <td>{banner.mainTextColor}</td>
            </tr>
            <tr>
              <th>Main text font size</th>
              <td>{banner.mainTextFontSize}</td>
            </tr>
            <tr>
              <th>Sub text</th>
              <td>{banner.subText}</td>
            </tr>
            <tr>
              <th>Sub text color</th>
              <td>{banner.subTextColor}</td>
            </tr>
            <tr>
              <th>Sub text font size</th>
              <td>{banner.subTextFontSize}</td>
            </tr>
            <tr>
              <th>Text placement</th>
              <td>{banner.textPlacement}</td>
            </tr>
            <tr>
              <th>Button1 link</th>
              <td>{banner.button1Link}</td>
            </tr>
            <tr>
              <th>Button1 text</th>
              <td>{banner.button1Text}</td>
            </tr>
            <tr>
              <th>Button1 background color</th>
              <td>{banner.button1BackgroundColor}</td>
            </tr>
            <tr>
              <th>Button1 text color</th>
              <td>{banner.button1TextColor}</td>
            </tr>
            <tr>
              <th>Button2 link</th>
              <td>{banner.button2Link}</td>
            </tr>
            <tr>
              <th>Button2 text</th>
              <td>{banner.button2Text}</td>
            </tr>
            <tr>
              <th>Button2 background color</th>
              <td>{banner.button2BackgroundColor}</td>
            </tr>
            <tr>
              <th>Button2 text color</th>
              <td>{banner.button2TextColor}</td>
            </tr>
            <tr>
              <th>Buttons font size</th>
              <td>{banner.buttonsFontSize}</td>
            </tr>
            <tr>
              <th>Buttons vertical placement</th>
              <td>{banner.buttonsVerticalPlacement}</td>
            </tr>
            <tr>
              <th>Buttons horizontal placement</th>
              <td>{banner.buttonsHorizontalPlacement}</td>
            </tr>
            <tr>
              <th>Condition</th>
              <td>{banner.condition}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(banner.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(banner.updatedAt)}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(banner.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBanner({ id: banner.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(banner.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Banner
