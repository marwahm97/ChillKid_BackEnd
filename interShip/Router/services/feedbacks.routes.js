
var express = require('express');
var router = express.Router();
var Feedbacks = require('../../Models/Feedbacks');
const verify = require('../../middleware/verify.token')
var bodyParser = require('body-parser');
const { func } = require('joi');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var functions = {
  getFeedbacks : async function (req , res){
    try {
      var feedbacks = await Feedbacks.find({})
      res.send(feedbacks);
 }

 catch (err) {
      res.status(500).send();
  }
  }, 
  
  getOneFeedbacks: async function (req, res, next){
    Feedbacks.findById(req.params.id)
    .then((feedbacks) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(feedbacks);
    }, (err) => next(err))
    .catch((err) => next(err));

  },

  addFeedbacks: async function (req, res) {
    const feedbacks = new Feedbacks({
      username: req.body.username,
      rate: req.body.rate,
      comment: req.body.comment,
      
      

  });

  try {

      const savedFeedbacks = await feedbacks.save();
      console.log('here')

      console.log(savedFeedbacks)
      res.send(savedFeedbacks);
  }

  catch (err) {
      res.status(500).send();
  }
  },

  updateFeedbacks: async function (req, res, next) {
    Feedbacks.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Fedbacks was updated !");
          res.send(req.body);
        }
      }
    );
  },

  deleteFeedbacks: async function (req, res){
      Feedbacks.findByIdAndRemove(req.params.id, (err) => {
        if (!err) {
        res.send('Feedbacks removed');
        }
        else { console.log('Failed to Delete feedbacks Details: ' + err); }
        });
    }


}





module.exports = functions;