

const typeDefs = `
type User{
    id:ID!
    name:String!
    age: Int!
    nationality : String
    username: String!
    accessToken : String!
    refreshToken : String!
}
    type Query {
        users : [User!]!
        user(id: ID!) : User!
    }
    type Mutation {
        login(username: String): User
    }
`

module.exports = {typeDefs} 