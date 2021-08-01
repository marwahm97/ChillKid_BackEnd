const router = require('express').Router();
const User = require('../../models/User');
var bodyParser = require('body-parser');
const {registerValidation, loginValidation} = require('../../controllers/verifyAttribute');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken')


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var functions = {
signup: async function (req,res) {
    
        
//validate data before create user
    const {error} = registerValidation(req.body);
        if(error)    
            return res.status(400).send(error.details[0].message);
// checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
         if (emailExist)
             return res.status(400).send('Email already exists');
// Hash passwords
     const salt =  await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
// Create a new user
     const user= new User ({
         username: req.body.username,
         email: req.body.email,
         phone: req.body.phone,
         role: req.body.role,
         password: hashedPassword,
    });
    try{
        const savedUser = await user.save(); 
        res.send(savedUser);
       }
        
    catch (err){
        res.status(400).send(err);
    }
  
   

    },

login: async function (req, res){
        //validate data before create user
    const {error} = loginValidation(req.body);
        if(error) 
            return res.status(400).send(error.details[0].message);


    // checking if the email exists
    const user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(400).send("Email is not found"); 
   
            //Password is correct
         
            validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass){ 
         
                return res.status(400).send("password is incorrect")} 
         
                     // Sign in the token and issue it to the user
      // create token
    const token = jwt.sign({
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        id: user._id
    }, process.env.Token_Secret,
    { algorithm: 'HS256', expiresIn: "1h" })
    
    res.header('auth-token', token).json({
        //error: null,
        //data: {token}
        token
    })
    
    },

getUsername:  function (req , res) {

        if(req.header('auth-token') ){
            var token  = req.header('auth-token')
            var decodetoken = jwt.decode(token, process.env.Token_Secret)
             return res.send(decodetoken.username)
           
        }
        else {
            return res.json({success: false, msg: 'No headers'})
        }
      
      
},

getEmail:  function (req , res) {

    if(req.header('auth-token') ){
        var token  = req.header('auth-token')
        var decodetoken = jwt.decode(token, process.env.Token_Secret)
         return res.send(decodetoken.email)
       
    }
    else {
        return res.json({success: false, msg: 'No headers'})
    }
  
  
},

getPhone:  function (req , res) {

    if(req.header('auth-token') ){
        var token  = req.header('auth-token')
        var decodetoken = jwt.decode(token, process.env.Token_Secret)
         return res.send(decodetoken.phone)
       
    }
    else {
        return res.json({success: false, msg: 'No headers'})
    }
  
  
},

getRole:  function (req , res) {

    if(req.header('auth-token') ){
        var token  = req.header('auth-token')
        var decodetoken = jwt.decode(token, process.env.Token_Secret)
         return res.send(decodetoken.role)
       
    }
    else {
        return res.json({success: false, msg: 'No headers'})
    }
  
  
},



logout: async function (req, res){
    res.status(200).send({auth: false , token: null})
    
    }
}

module.exports = functions;

