const jwt = require('jsonwebtoken');


//secret key for jwt auth
const secretKey = 'Quadrafort Technologies';

function generateToken(user){
  const payload={user};
  const token = jwt.sign(payload, secretKey);
  return token;
}

function decodeToken(token){
  const decoded = jwt.verify(token, secretKey);
  return decoded;
}


module.exports = {generateToken,decodeToken};