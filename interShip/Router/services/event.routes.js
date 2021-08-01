var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Event = require('../../models/Event');




router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



const verifyToken = require('../../middleware/verify.token')
const checkRole = require('../../middleware/verify.role')


var functions = {

  getEvent:async function (req, res){
    try {
      var events = await Event.find({})
      res.send(events);
 }

 catch (err) {
      res.status(500).send();
  }
  },

  getEventById:async function (req, res, next){
    Event.findById(req.params.id)
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
  },

  addEvent:async function (req, res){
    const event = new Event({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      images: req.body.images,

    });
  try {
      const savedEvent = await event.save();
      console.log('here')
      console.log(savedEvent)
      res.send(savedEvent);
    }
  catch (err) {
      res.status(500).send();
  }
  },

  updateEvent:async function (req, res){
    Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Event was updated !");
          res.send(req.body);
        }
      }
    );
  },


  putEvent: async function (req, res, next) {
    Event.findOneAndUpdate(
      
        {title: req.params.title},
      
      { $set: {title: req.body.title,
              date: req.body.date,
              description: req.body.description,
              
              },},
      
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Event was updated !!");
          console
          res.send(req.body);
        }
      }
    );
    
  },

  deleteEvent:async function (req, res){
    Event.findByIdAndRemove(req.params.id, (err) => {
      if (!err) { 
         res.send('event removed');
      }
      else { 
         console.log('Failed to Delete event Details: ' + err); }
      });
  },
  deleteEventByTitle: async function (req, res) {
    Event.findOneAndDelete(
      {
        title: req.params.title
      },
     
      (err, result)=>{
        if(err) {return res.status(500).json({msg:err});}
        
        
        const msg  ={
          msg: "event deleted",
        };
        console.log('event deleted');
        return res.json(msg);
       
        
      }
      
    );
    
  }
}

module.exports = functions;