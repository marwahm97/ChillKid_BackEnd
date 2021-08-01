const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const sessionSchema = new Schema ({
    title: {
        type: String

    },

    price: {
        type: String
     },

    description: {
        type: String

    },
  
    

    

   

})

module.exports = mongoose.model('Sessions', sessionSchema); 

