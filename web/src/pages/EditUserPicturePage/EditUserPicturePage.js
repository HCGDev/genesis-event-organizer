import UserPicturesLayout from 'src/layouts/UserPicturesLayout'
import EditUserPictureCell from 'src/components/EditUserPictureCell'

const EditUserPicturePage = ({ id }) => {
  return (
    <UserPicturesLayout>
      <EditUserPictureCell id={id} />
    </UserPicturesLayout>
  )
}

export default EditUserPicturePage
