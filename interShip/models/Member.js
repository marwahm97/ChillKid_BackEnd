const mongoose = require('mongoose');
//const childSchema = require('./child');
const Child = require('./Child').schema
const Schema = mongoose.Schema;


const memberSchema = new Schema({

   firstName:{
      type: String,
      required: true,
      default: "",
  },

  lastName:{
      type: String,
      required: true,
      default: ""
  },

  email:{
      type: String,
      required: true
  },

  password:{
      type: String,
      required: true
  },

  imgUrl:{
      type:  String,
      required: true
  },

  phone: {
      type: String,
      required: true
  },

  Children: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child"
  }

    
});

module.exports =mongoose.model('members', memberSchema);