const User = require("../models/User");
const mongoose = require('mongoose')


const checkRole = (...roles) => async (req, res, next) => { 
  //const user = await User.findById(req.user.id);
  const user = await User.findOne({email: req.body.email})
  console.log(user.role)
  if (!roles.includes(user.role)){ 
    //if (user.role === superAdmin){
     res.status(401).json("Unauthorized")}
     return next();}
module.exports = checkRole;




 
/*const checkRole =  (...permittedRoles) =>{
  // return a middleware
  return (request, response, next) => {
    const { user } = request

    if (user /*&& permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({message: "Unauthorized"}); 
    }
  }
}
module.exports = checkRole;
*/



