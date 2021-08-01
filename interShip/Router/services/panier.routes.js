const express = require('express');
const Panier = require('../../models/Panier');
var bodyParser = require('body-parser');





var functions = {
  getPanier: async function (req, res) {
    try {
      var panier = await Panier.find({})
      res.send(panier);
    }

    catch (err) {
      res.status(500).send();
    }
  },

  
  getPanierByName: async function (req, res, next) {
    Booking.findOne(
      {
        name: req.params.name
      },
      (err , booking) =>{ 
        if(err){
          res.send('failed to get panier')
          console.log('get err:', err)
        }
        else {
          console.log(user);
          res.send(booking)
        }
      } 
      
    )
    
  },

  addPanier: async function (req, res) {
    const panier = new Panier({
      name: req.body.name,
      price: req.body.price,
      img: req.body.img
      
    
    });

    try {
      const savedPanier = await panier.save();
      console.log('here')

      console.log(savedPanier)
      res.send(savedPanier);
    }

    catch (err) {
      res.status(500).send();
    }
  },
  deletePanierByName: async function (req, res) {
    Panier.findOneAndDelete(
      {
        name: req.params.name
      },
     
      (err, result)=>{
        if(err) {return res.status(500).json({msg:err});}
        
        
        const msg  ={
          msg: "Panier deleted",
        };
        console.log('Panier deleted');
        return res.json(msg);
       
        
      }
      
    );
    
  },

}

module.exports = functions;