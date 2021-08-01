const { boolean } = require('joi');
const mongoose = require('mongoose');
const Child = mongoose.model ( 'Child', new mongoose.Schema ({
    childName:{ 
        type: String,
        required: true
    },
    
  
    dateOfBirth: {
        type: String,
        
    },

    parent:{
        type: String
    },
    state:{
        type: String,
        default: false
    },

   
}))

module.exports = Child;