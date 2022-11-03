import { Link, routes } from '@redwoodjs/router'

import Banners from 'src/components/Banners'

export const QUERY = gql`
  query BANNERS {
    banners {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No banners yet. '}
      <Link to={routes.newBanner()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ banners }) => {
  return <Banners banners={banners} />
}
