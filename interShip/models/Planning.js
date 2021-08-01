const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const planningSchema = new Schema ({
    session: {
        type: String

    },

    coach:{
        type: String
    },
    
    date: {
        type: String
    },

    time: {
        type: String
    },


   

})

module.exports = mongoose.model('Planning', planningSchema); 

