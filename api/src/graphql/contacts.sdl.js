export const schema = gql`
  type Contact {
    id: Int!
    name: String!
    email: String!
    text: String!
    userId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    userContact: User
  }

  type Query {
    contacts: [Contact!]! @adminOnly
    contact(id: Int!): Contact @adminOnly
  }

  input CreateContactInput {
    name: String!
    email: String!
    text: String!
    userId: String
  }

  input UpdateContactInput {
    name: String
    email: String
    text: String
    userId: String
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
    updateContact(id: Int!, input: UpdateContactInput!): Contact! @adminOnly
    deleteContact(id: Int!): Contact! @adminOnly
  }
`
