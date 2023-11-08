  // const jwt = require('jsonwebtoken');

  // const SECRET_KEY = 'SECRETKEY';

  // const authenticateToken = ({req}) => {
    
    
  //   console.log('middleware triggered');


  //   const authHeader = req.headers['authorization'];
  //   const token = authHeader && authHeader.split(' ')[1];

  //   if (token) {
  //     try{
  //       const decoded = jwt.verify(token,SECRET_KEY); 
  //       req.user = decoded.user.userName;       
  //     }catch(error){
  //       console.log(error);
  //     }    
  //     }; 
  //     return req
  //   }

  

  // module.exports = { authenticateToken };
  const jwt = require('jsonwebtoken');

  const SECRET_KEY = 'SECRETKEY';

  const authenticateToken = (req, res, next) => {
    
    
    console.log('middleware triggered');


    const authHeader = req.headers['authorization'];
    console.log(authHeader,'token');
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token, '2nd');

    if (token === null|| token === '') {
      return { user: null };
    }

    try {
      const user = jwt.verify(token, SECRET_KEY);
      return { user };
    } catch (error) {
      return { user: null };
    }
  };

  module.exports = { authenticateToken };

//   const jwt = require('jsonwebtoken');

//     const SECRET_KEY = 'SECRETKEY';


//   const authenticateToken = ({ req }) => {
//     let token =req.headers.authorization|| req.body.token || req.query.token ;

//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (token) {
//       console.log(token);
//       try {
//         const decoded = jwt.verify(token, SECRET_KEY); 
//         req.user = decoded.user.userName; 
//       } catch (error) {
//         console.log('Invalid token');
//       }
//     }


//     return req;
//   };

// module.exports = {authenticateToken}