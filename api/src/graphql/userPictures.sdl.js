export const schema = gql`
  type UserPicture {
    id: Int!
    name: String
    url: String!
    smallUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: [User]!
    active: Boolean
  }

  type Query {
    userPictures: [UserPicture!]! @skipAuth
    userPicture(id: Int!): UserPicture @requireAuth
  }

  input CreateUserPictureInput {
    name: String
    url: String!
    smallUrl: String
    active: Boolean
  }

  input UpdateUserPictureInput {
    name: String
    url: String
    smallUrl: String
    active: Boolean
  }

  type Mutation {
    createUserPicture(input: CreateUserPictureInput!): UserPicture! @adminOnly
    updateUserPicture(id: Int!, input: UpdateUserPictureInput!): UserPicture!
      @adminOnly
    deleteUserPicture(id: Int!): UserPicture! @adminOnly
  }
`
