const { required } = require('joi');
const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const BookingSchema = new Schema ({
    name: {
        type: String

    },

    email: {
        type: String,
        required: true
     },

    phone: {
        type: String,
        required: true

    },
    child:{
        type: String,
        required: true
    },
    session:{
        type: String,
        required: true
    }
  
})

module.exports = mongoose.model('Booking', BookingSchema); 

