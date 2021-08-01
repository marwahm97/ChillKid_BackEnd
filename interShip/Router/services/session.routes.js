var express = require('express');
var router = express.Router();
var Session = require('../../Models/Session');
const verify = require('../../middleware/verify.token')
var bodyParser = require('body-parser');
const { func } = require('joi');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var functions = {
  getSessions : async function (req , res){
    try {
      var sessions = await Session.find({})
      res.send(sessions);
 }

 catch (err) {
      res.status(500).send();
  }
  }, 
  
  getSessionById: async function (req, res, next){
    Session.findById(req.params.id)
    .then((session) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(session);
    }, (err) => next(err))
    .catch((err) => next(err));

  },

  addSession: async function (req, res) {
    const session = new Session({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
   

  });

  try {

      const savedSession = await session.save();
      console.log('here')

      console.log(savedSession)
      res.send(savedSession);
  }

  catch (err) {
      res.status(500).send();
  }
  },

  updateSession: async function (req, res, next) {
    Session.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Session was updated !");
          res.send(req.body);
        }
      }
    );
  },

  deleteSession: async function (req, res){
      Session.findByIdAndRemove(req.params.id, (err) => {
        if (!err) {
        res.send('Session removed');
        }
        else { console.log('Failed to Delete session Details: ' + err); }
        });
    },
  
    putSession: async function (req, res, next) {
      Session.findOneAndUpdate(
        
          {title: req.params.title},
        
        { $set: {title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                
                
                },},
        
        (error, data) => {
          if (error) {
            return next(error);
          } else {
            console.log("Session was updated !!");
            console
            res.send(req.body);
          }
        }
      );
      
    },

    deleteSessionByTitle: async function (req, res) {
      Session.findOneAndDelete(
        {
          title: req.params.title
        },
       
        (err, result)=>{
          if(err) {return res.status(500).json({msg:err});}
          
          
          const msg  ={
            msg: "session deleted",
          };
          console.log('session deleted');
          return res.json(msg);
         
          
        }
        
      );
      
    }



}

module.exports =functions;



module.exports = functions;