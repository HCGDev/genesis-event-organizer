import UserPicturesLayout from 'src/layouts/UserPicturesLayout'
import UserPictureCell from 'src/components/UserPictureCell'

const UserPicturePage = ({ id }) => {
  return (
    <UserPicturesLayout>
      <UserPictureCell id={id} />
    </UserPicturesLayout>
  )
}

export default UserPicturePage
