const express = require('express')
const {ApolloServer} = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
const app = express();
const axios = require('axios')
const {typeDefs} = require('./schema/typeDefs')
const {resolvers} = require('./schema/resolvers')


const startServer = async()=>{

    const server = new ApolloServer({typeDefs,resolvers,context: ({ req }) => {
        return { req };
      },});

    app.use(cors()); 
    app.use(express.json())
    app.use(express.urlencoded({ limit: "30mb", extended: true }));

    await server.start()
    app.use('/graphql',expressMiddleware(server))

    app.listen(8080 ,()=> console.log('server started'));
}

startServer()