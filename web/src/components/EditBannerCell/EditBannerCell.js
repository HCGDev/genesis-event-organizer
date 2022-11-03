import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import BannerForm from 'src/components/BannerForm'

export const QUERY = gql`
  query FIND_BANNER_BY_ID($id: Int!) {
    banner: banner(id: $id) {
      id
      backgroundUrl
      mainText
      mainTextColor
      mainTextFontSize
      subText
      subTextColor
      subTextFontSize
      textPlacement
      button1Link
      button1Text
      button1BackgroundColor
      button1TextColor
      button2Link
      button2Text
      button2BackgroundColor
      button2TextColor
      buttonsFontSize
      buttonsVerticalPlacement
      buttonsHorizontalPlacement
      condition
      createdAt
      updatedAt
      active
    }
  }
`
const UPDATE_BANNER_MUTATION = gql`
  mutation UpdateBannerMutation($id: Int!, $input: UpdateBannerInput!) {
    updateBanner(id: $id, input: $input) {
      id
      backgroundUrl
      mainText
      mainTextColor
      mainTextFontSize
      subText
      subTextColor
      subTextFontSize
      textPlacement
      button1Link
      button1Text
      button1BackgroundColor
      button1TextColor
      button2Link
      button2Text
      button2BackgroundColor
      button2TextColor
      buttonsFontSize
      buttonsVerticalPlacement
      buttonsHorizontalPlacement
      condition
      createdAt
      updatedAt
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ banner }) => {
  const [updateBanner, { loading, error }] = useMutation(
    UPDATE_BANNER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Banner updated')
        navigate(routes.banners())
      },
    }
  )

  const onSave = (input, id) => {
    updateBanner({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Banner {banner.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BannerForm
          banner={banner}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
