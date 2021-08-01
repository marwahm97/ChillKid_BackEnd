const express = require('express');
const Booking = require('../../models/Booking');
var bodyParser = require('body-parser');





var functions = {
  getBooking: async function (req, res) {
    try {
      var booking = await Booking.find({})
      res.send(booking);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  getBookingById: async function (req, res, next) {
    Booking.findById(req.params.id)
    .then((booking) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(booking);
    }, (err) => next(err))
    .catch((err) => next(err));
  },
  

  getBookingByName: async function (req, res, next) {
    Booking.findOne(
      {
        name: req.params.name
      },
      (err , booking) =>{ 
        if(err){
          res.send('failed to get booking')
          console.log('get err:', err)
        }
        else {
          console.log(user);
          res.send(booking)
        }
      } 
      
    )
    
  },

  

  addBooking: async function (req, res) {
    const booking = new Booking({
      bame: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      child: req.body.child,
      session: req.body.session,
      

    });

    try {
      const savedBooking = await booking.save();
      console.log('here')

      console.log(savedBooking)
      res.send(savedUser);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  putBooking: async function (req, res, next) {
    Booking.findOneAndUpdate(
      
        {name: req.params.name},
      
      { $set: {name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              child: req.body.child,
              session: session
              },},
      
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Booking was updated !!");
          console
          res.send(req.body);
        }
      }
    );
    
  },

  updateBooking: async function (req, res, next) {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log("Booking was updated !!");
          console.log(req.body)
          res.send(req.body);
        }
      }
    );
  },

  deleteBooking: async function (req, res) {
    User.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.send('Booking Removed');
      }
    else { console.log('Failed to Delete booking Details: ' + err); }
      });
  },


 

  deleteBookingByName: async function (req, res) {
    Booking.findOneAndDelete(
      {
        name: req.params.name
      },
     
      (err, result)=>{
        if(err) {return res.status(500).json({msg:err});}
        
        
        const msg  ={
          msg: "booking deleted",
        
          username: req.params.username,
        };
        console.log('booking deleted');
        return res.json(msg);
       
        
      }
      
    );
    
  },

 


  

}

module.exports = functions;