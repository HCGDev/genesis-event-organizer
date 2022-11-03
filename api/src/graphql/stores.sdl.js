export const schema = gql`
  type Store {
    id: String!
    name: String!
    tournaments: [Tournament]!
    distance: Float
    website: String
    owner: User
    ownerId: String
    email: String
    phone: String
    lat: Float
    lng: Float
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    placeId: String
    distributor: String
    hidden: Boolean
    approved: Boolean
    approvedBy: User
    approverId: String
    approvedOn: DateTime
  }

  input SearchStoresInput {
    searchTerm: String
    take: Int
    skip: Int
    lat: Float
    lng: Float
    includeOnline: Boolean
    distance: Int
  }

  type PaginatedStores {
    more: Boolean
    totalCount: Int
    stores: [Store!]!
  }
  type Query {
    stores(searchTerm: String): [Store!]! @adminOnly
    storeLocator(input: SearchStoresInput!): PaginatedStores! @skipAuth
    activeStores(searchTerm: String): [Store!]! @skipAuth
    store(id: String!): Store @adminOnly
    activeStore(id: String!): Store! @skipAuth
  }

  input CreateStoreInput {
    name: String!
    ownerId: String!
    email: String!
    phone: String!
    lat: Float
    lng: Float
    street1: String!
    street2: String
    city: String!
    country: String!
    state: String!
    zip: String!
    placeId: String
    hidden: Boolean
    distributor: String!
    approved: Boolean
    approvedOn: DateTime
  }

  input UpdateStoreInput {
    name: String
    ownerId: String
    email: String
    phone: String
    lat: Float
    lng: Float
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    distributor: String
    placeId: String
    hidden: Boolean
    approved: Boolean
    approvedOn: DateTime
  }

  type Mutation {
    createStore(input: CreateStoreInput!): Store! @adminOnly
    updateStore(id: String!, input: UpdateStoreInput!): Store! @adminOnly
    deleteStore(id: String!): Store! @adminOnly
  }
`
