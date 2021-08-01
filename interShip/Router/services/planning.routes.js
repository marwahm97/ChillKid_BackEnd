
var express = require('express');
var router = express.Router();
var Planning = require('../../Models/Planning');
var bodyParser = require('body-parser');
const { func } = require('joi');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var functions = {
  getPlannings : async function (req , res){
    try {
      var plannings = await Planning.find({})
      res.send(plannings);
 }

 catch (err) {
      res.status(500).send();
  }
  }, 
  
  getOnePlanning: async function (req, res, next){
    Planning.findById(req.params.id)
    .then((planning) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(planning);
    }, (err) => next(err))
    .catch((err) => next(err));

  },

  addPlanning: async function (req, res) {
    const planning = new Planning({
      session: req.body.session,
      coach: req.body.coach,
      date: req.body.date,
      time: req.body.time
    
      

  });

  try {

      const savedPlanning = await planning.save();
      console.log('here')

      console.log(savedPlanning)
      res.send(savedPlanning);
  }

  catch (err) {
      res.status(500).send();
  }
  },

  updatePlanning: async function (req, res, next) {
    Planning.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Planning was updated !");
          res.send(req.body);
        }
      }
    );
  },

  deletePlanning: async function (req, res){
      Planning.findByIdAndRemove(req.params.id, (err) => {
        if (!err) {
        res.send('Planning removed');
        }
        else { console.log('Failed to Delete planning Details: ' + err); }
        });
    },

    putPlanning: async function (req, res, next) {
      Planning.findOneAndUpdate(
        
          {session: req.params.session},
        
        { $set: {session: req.body.session,
                coach: req.body.coach,
                date: req.body.date,
                time: req.body.time
                
                },},
        
        (error, data) => {
          if (error) {
            return next(error);
          } else {
            console.log("Planning was updated !!");
            console
            res.send(req.body);
          }
        }
      );
      
    },

    deletePlanningBySession: async function (req, res) {
      Planning.findOneAndDelete(
        {
          session: req.params.session
        },
       
        (err, result)=>{
          if(err) {return res.status(500).json({msg:err});}
          
          
          const msg  ={
            msg: "planning deleted",
          };
          console.log('planning deleted');
          return res.json(msg);
         
          
        }
        
      );
      
    }


}





module.exports = functions;


