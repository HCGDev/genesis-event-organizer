export const schema = gql`
  type Banner {
    id: Int!
    backgroundUrl: String!
    mainText: String
    mainTextColor: String
    mainTextFontSize: Int
    subText: String
    subTextColor: String
    subTextFontSize: Int
    textPlacement: Placement
    button1Link: String
    button1Text: String
    button1BackgroundColor: String
    button1TextColor: String
    button2Link: String
    button2Text: String
    button2BackgroundColor: String
    button2TextColor: String
    buttonsFontSize: Int
    buttonsVerticalPlacement: Placement
    buttonsHorizontalPlacement: Placement
    condition: BannerCondition
    createdAt: DateTime!
    updatedAt: DateTime!
    active: Boolean!
  }

  type Query {
    banners: [Banner!]! @skipAuth
    homeBanners: [Banner!]! @skipAuth
    banner(id: Int!): Banner @adminOnly
  }

  input CreateBannerInput {
    backgroundUrl: String!
    mainText: String
    mainTextColor: String
    mainTextFontSize: Int
    subText: String
    subTextColor: String
    subTextFontSize: Int
    textPlacement: Placement
    button1Link: String
    button1Text: String
    button1BackgroundColor: String
    button1TextColor: String
    button2Link: String
    button2Text: String
    button2BackgroundColor: String
    button2TextColor: String
    buttonsFontSize: Int
    buttonsVerticalPlacement: Placement
    buttonsHorizontalPlacement: Placement
    condition: BannerCondition
    active: Boolean!
  }

  input UpdateBannerInput {
    backgroundUrl: String
    mainText: String
    mainTextColor: String
    mainTextFontSize: Int
    subText: String
    subTextColor: String
    subTextFontSize: Int
    textPlacement: Placement
    button1Link: String
    button1Text: String
    button1BackgroundColor: String
    button1TextColor: String
    button2Link: String
    button2Text: String
    button2BackgroundColor: String
    button2TextColor: String
    buttonsFontSize: Int
    buttonsVerticalPlacement: Placement
    buttonsHorizontalPlacement: Placement
    condition: BannerCondition
    active: Boolean
  }

  type Mutation {
    createBanner(input: CreateBannerInput!): Banner! @adminOnly
    updateBanner(id: Int!, input: UpdateBannerInput!): Banner! @adminOnly
    deleteBanner(id: Int!): Banner! @adminOnly
  }

  enum Placement {
    center
    start
    end
  }

  enum BannerCondition {
    ALL
    GUEST
    LOGGEDIN
    EO
    PLAYER
  }
`
