import BannersLayout from 'src/layouts/BannersLayout'
import EditBannerCell from 'src/components/EditBannerCell'

const EditBannerPage = ({ id }) => {
  return (
    <BannersLayout>
      <EditBannerCell id={id} />
    </BannersLayout>
  )
}

export default EditBannerPage
