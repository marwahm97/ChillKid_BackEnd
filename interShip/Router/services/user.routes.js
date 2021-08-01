const express = require('express');
const router = express.Router();
const User = require('../../models/User');
var bodyParser = require('body-parser');
const verify = require('../../middleware/verify.token')
const checkRole = require('../../middleware/verify.role');
const { result, isNull } = require('lodash');



var functions = {
  getUser: async function (req, res) {
    try {
      var user = await User.find({})
      res.send(user);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  getUserById: async function (req, res, next) {
    User.findById(req.params.id)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
  },
  getUserByMail: async function (req, res, next) {
    User.findOne(
      {
        email: req.params.email
      },
      (err , user) =>{ 
        if(err){
          res.send('failed to get user')
          console.log('get err:', err)
        }
        else {
          console.log("this is ", user);
          res.send(user)
        }
      } 
      
    )
    
  },

  getUserByName: async function (req, res, next) {
    User.findOne(
      {
        username: req.params.username
      },
      (err , user) =>{ 
        if(err){
          res.send('failed to get user')
          console.log('get err:', err)
        }
        else {
          console.log(user);
          res.send(user)
        }
      } 
      
    )
    
  },

  getUserByRole: async function (req, res, next) {
    User.find(
      {
        role: req.params.role
      },
      (err , user) =>{ 
        if(err){
          res.send('failed to get user')
          console.log('get err:', err)
        }
        else {
          console.log(user);
          res.send(user)
        }
      } 
      
    )
    
  },

  addUser: async function (req, res) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      phone: req.body.phone,
      role: req.body.role,
      children: req.body.children,
      profileImage: req.body.profileImage,

    });

    try {
      const savedUser = await user.save();
      console.log('here')

      console.log(savedUser)
      res.send(savedUser);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  putUser: async function (req, res, next) {
    User.findOneAndUpdate(
      
        {username: req.params.username},
      
      { $set: {username: req.body.username,
              email: req.body.email,
              phone: req.body.phone,
              role: req.body.role,
              },},
      
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("User was updated !!");
          console
          res.send(req.body);
        }
      }
    );
    
  },

  updateUser: async function (req, res, next) {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("User was updated !!");
          console.log(req.body)
          res.send(req.body);
        }
      }
    );
  },

  deleteUser: async function (req, res) {
    User.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.send('User Removed');
      }
    else { console.log('Failed to Delete user Details: ' + err); }
      });
  },


 

  deleteUserByName: async function (req, res) {
    User.findOneAndDelete(
      {
        username: req.params.username
      },
     
      (err, result)=>{
        if(err) {return res.status(500).json({msg:err});}
        
        
        const msg  ={
          msg: "user deleted",
        
          username: req.params.username,
        };
        console.log('user deleted');
        return res.json(msg);
       
        
      }
      
    );
    
  },

 


  

}

module.exports = functions;
