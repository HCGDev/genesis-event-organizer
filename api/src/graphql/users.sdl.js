export const schema = gql`
  type User {
    id: String!
    firstname: String
    lastname: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    createdAt: DateTime!
    updatedAt: DateTime!
    howHeard: String
    flags: Int!
    adminComments: String
    disabled: Boolean!
    disabledOn: DateTime
    nickname: String!
    userPictureId: Int
    disabledBy: String
    email: String!
    dob: String
    active: Boolean!
    photo: UserPicture
    Contact: [Contact]!
    matches: [PlayerMatchScore]!
    tournamentsPlayed: [PlayerTournamentScore]!
    providers: [Provider]!
    Store: [Store]!
    tournamentsOwned: [Tournament]!
    Tournament: [Tournament]!
    UserUserRole: [UserUserRole]!
  }

  type UserRole {
    id: Int!
    name: String!
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Provider {
    id: Int!
    uuid: String!
    type: String!
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users(searchTerm: String): [User!]! @adminOnly
    user(id: String!): User @adminOnly
    checkNickname(nickname: String): Boolean! @skipAuth
  }

  input CreateUserInput {
    firstname: String
    lastname: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    howHeard: String
    flags: Int
    adminComments: String
    disabled: Boolean
    disabledOn: DateTime
    nickname: String!
    userPictureId: Int
    disabledBy: String
    email: String!
    dob: String
    active: Boolean
    role: Role
    imageId: Int
  }

  enum Role {
    PLAYER
    EO
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    howHeard: String
    flags: Int
    adminComments: String
    disabled: Boolean
    disabledOn: DateTime
    nickname: String
    userPictureId: Int
    disabledBy: String
    email: String
    dob: String
    active: Boolean
    imageId: Int
  }
  input CreateUserStoreInput {
    name: String!
    email: String!
    phone: String!
    lat: Float!
    lng: Float!
    street1: String!
    city: String!
    country: String!
    state: String!
    zip: String!
    distributor: String!
  }

  type Mutation {
    createUser(
      input: CreateUserInput!
      storeInput: CreateUserStoreInput
    ): User! @skipAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @adminOnly
  }
`
