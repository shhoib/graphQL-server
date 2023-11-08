const express = require('express')
const {ApolloServer} = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
const app = express();
const axios = require('axios')
const {typeDefs} = require('./schema/typeDefs')
const {resolvers} = require('./schema/resolvers')
const cookieParser = require('cookie-parser');
const {authenticateToken} = require('./middleware/authToken')


const startServer = async()=>{
  

  app.use(cors()); 
  app.use(express.json())
  app.use(cookieParser());
  app.use(express.urlencoded({ limit: "30mb", extended: true }));


  const SECRET_KEY = 'SECRETKEY';  

  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
     context: ({ req }) => {
      const context = authenticateToken(req);
      return context;
    },
    }
  );

    await server.start()

    app.use('/graphql',expressMiddleware(server))

    app.listen(8080 ,()=> console.log('server started'));
}

startServer()