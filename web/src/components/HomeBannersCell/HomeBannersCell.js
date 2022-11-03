import SingleBanner from '../SingleBanner/SingleBanner'

export const QUERY = gql`
  query HomeBannersQuery {
    homeBanners {
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
      buttonsVerticalPlacement
      buttonsHorizontalPlacement
    }
  }
`

export const Loading = () => <div></div>

export const Empty = () => <div></div>

export const Failure = () => <div></div>

export const Success = ({ homeBanners }) => {
  if (homeBanners.length > 0) {
    const banner = homeBanners[0]

    return <SingleBanner banner={banner} />
  }

  return <div />
}
