const express = require('express');
const router = express.Router();
const Child = require('../../models/Child');
var bodyParser = require('body-parser');
const verify = require('../../middleware/verify.token')
const checkRole = require('../../middleware/verify.role');




var functions = {
  getChild: async function (req, res) {
    try {
      var child = await Child.find({})
      res.send(child);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  getChildById: async function (req, res, next) {
    Child.findById(req.params.id)
    .then((child) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(child);
    }, (err) => next(err))
    .catch((err) => next(err));
  },

  getChildByName: async function (req, res, next) {
    Child.findOne(
      {
        username: req.params.username
      },
      (err , child) =>{ 
        if(err){
          res.send('failed to get child')
          console.log('get err:', err)
        }
        else {
          console.log(child);
          res.send(child)
        }
      } 
      
    )
    
  },

  addChild: async function (req, res) {
    const child = new Child({
      childName: req.body.childName,
      dateOfBirth: req.body.dateOfBirth,
      parent: req.body.parent,
      state: req.body.state
      

    });

    try {
      const savedChild = await child.save();
      console.log('here')

      console.log(savedChild)
      res.send(savedChild);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  putChild: async function (req, res, next) {
    Child.findOneAndUpdate(
      
        {childName: req.params.childName},
      
      { $set: {childName: req.body.childName,
              dateOfBirth: req.body.dateOfBirth,
              parent: req.body.parent,
              state: req.body.state,
              },},
      
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Child was updated !!");
          console
          res.send(req.body);
        }
      }
    );
    
  },

  updateChild: async function (req, res, next) {
    Child.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Child was updated !!");
          console.log(req.body)
          res.send(req.body);
        }
      }
    );
  },

  deleteChild: async function (req, res) {
    Child.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.send('Child Removed');
      }
    else { console.log('Failed to Delete child Details: ' + err); }
      });
  },


 

  deleteChildByName: async function (req, res) {
    Child.findOneAndDelete(
      {
        childName: req.params.childName
      },
     
      (err, result)=>{
        if(err) {return res.status(500).json({msg:err});}
        
        
        const msg  ={
          msg: "child deleted",
        
          username: req.params.username,
        };
        console.log('child deleted');
        return res.json(msg);
       
        
      }
      
    );
    
  }
  


  

}

module.exports = functions;
