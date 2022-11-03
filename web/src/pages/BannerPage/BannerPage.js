import BannersLayout from 'src/layouts/BannersLayout'
import BannerCell from 'src/components/BannerCell'

const BannerPage = ({ id }) => {
  return (
    <BannersLayout>
      <BannerCell id={id} />
    </BannersLayout>
  )
}

export default BannerPage
