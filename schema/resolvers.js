const {UserList} = require('../db')
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'SECRETKEY';
const REFRESH_SECRET_KEY = 'REFRESHSECRETKEY'; 

const resolvers = {
    Query: {
        users:()=>{
            return UserList;
        },
     },

    Mutation:{
        login: async(parent,args)=>{
            const { username } = args;
            console.log(username);   

            const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '15min' });
            const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY, { expiresIn: '15d' }); 

            const user = {
                username: username,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            return user;  
       }
    }
}

module.exports = {resolvers}