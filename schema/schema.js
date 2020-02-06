const graphql = require('graphql')
const _ = require('lodash')

const users = [
  { id: '23', firstName: 'Bill', age: 20},
  { id: '43', firstName: 'Jake', age: 33}
]

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // if you give me an ID I will return You user type
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
      } // resolve function return the data
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
