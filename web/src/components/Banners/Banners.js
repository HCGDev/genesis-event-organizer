import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/BannersCell'

const DELETE_BANNER_MUTATION = gql`
  mutation DeleteBannerMutation($id: Int!) {
    deleteBanner(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const BannersList = ({ banners }) => {
  const [deleteBanner] = useMutation(DELETE_BANNER_MUTATION, {
    onCompleted: () => {
      toast.success('Banner deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete banner ' + id + '?')) {
      deleteBanner({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Background url</th>
            <th>Main text</th>
            <th>Main text color</th>
            <th>Main text font size</th>
            <th>Sub text</th>
            <th>Sub text color</th>
            <th>Sub text font size</th>
            <th>Text placement</th>
            <th>Button1 link</th>
            <th>Button1 text</th>
            <th>Button1 background color</th>
            <th>Button1 text color</th>
            <th>Button2 link</th>
            <th>Button2 text</th>
            <th>Button2 background color</th>
            <th>Button2 text color</th>
            <th>Buttons font size</th>
            <th>Buttons vertical placement</th>
            <th>Buttons horizontal placement</th>
            <th>Condition</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Active</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td>{truncate(banner.id)}</td>
              <td>{truncate(banner.backgroundUrl)}</td>
              <td>{truncate(banner.mainText)}</td>
              <td>{truncate(banner.mainTextColor)}</td>
              <td>{truncate(banner.mainTextFontSize)}</td>
              <td>{truncate(banner.subText)}</td>
              <td>{truncate(banner.subTextColor)}</td>
              <td>{truncate(banner.subTextFontSize)}</td>
              <td>{truncate(banner.textPlacement)}</td>
              <td>{truncate(banner.button1Link)}</td>
              <td>{truncate(banner.button1Text)}</td>
              <td>{truncate(banner.button1BackgroundColor)}</td>
              <td>{truncate(banner.button1TextColor)}</td>
              <td>{truncate(banner.button2Link)}</td>
              <td>{truncate(banner.button2Text)}</td>
              <td>{truncate(banner.button2BackgroundColor)}</td>
              <td>{truncate(banner.button2TextColor)}</td>
              <td>{truncate(banner.buttonsFontSize)}</td>
              <td>{truncate(banner.buttonsVerticalPlacement)}</td>
              <td>{truncate(banner.buttonsHorizontalPlacement)}</td>
              <td>{truncate(banner.condition)}</td>
              <td>{timeTag(banner.createdAt)}</td>
              <td>{timeTag(banner.updatedAt)}</td>
              <td>{checkboxInputTag(banner.active)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.banner({ id: banner.id })}
                    title={'Show banner ' + banner.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBanner({ id: banner.id })}
                    title={'Edit banner ' + banner.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete banner ' + banner.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(banner.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BannersList
