
const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const PanierSchema = new Schema ({
    name: {
        type: String

    },

   

    price: {
        type: String,
        required: true

    },
    img:{
        type: String ,
        required: true
    }
    
  
})

module.exports = mongoose.model('Panier', PanierSchema); 