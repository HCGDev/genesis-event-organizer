import Banner from 'src/components/Banner'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Banner not found</div>

export const Success = ({ banner }) => {
  return <Banner banner={banner} />
}
