const {UserList} = require('../db')
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'SECRETKEY';
const REFRESH_SECRET_KEY = 'REFRESHSECRETKEY'; 

const resolvers = {
    Query: {
        users:(parent,args,context)=>{
            console.log(context,'query');
            if(!context.user){
                return null
            }
            return UserList;
        }, 
     },

    Mutation:{
        login: async(parent,args,context)=>{
            console.log(context,'in mutaion');
            const { username } = args;

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