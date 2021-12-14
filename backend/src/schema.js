import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';


const typeDefs = `
    type Query {
        product(code: ID): Product
        search(query: String): [Product]
    }

    type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(code: ID, input: ProductInput): Product
        deleteProduct(code: ID): Product
    }

    input ProductInput {
        code: ID!,
        position: Int!
        quantity: Int!
        image: String!
        price: Float!
        description: String!
    }

    type Product {
        code: ID
        position: Int
        quantity: Int
        image: String
        price: Float
        description: String
    }
`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
