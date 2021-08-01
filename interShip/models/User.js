const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const Schema = mongoose.Schema;
const userSchema = new Schema({

    
    username: {
      type:String,
      default:"",
      required:true 
    },

   

    email: {
      type:String,
      default:"",
      required:true },

    

    

    phone: {
      type: String,
      default : "",
  
    },
      
    role: {
      type: String,
      default: "member",
      enum: ["admin", "superAdmin", "member", "coach"]
    },
    
    password: {
      type:String,
      default:"",
      required:true },

   /* children:{
      
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child'
    },
*/
    resetLink: {
        data: String,
        default:"",
    },

     profileImage: {
        type: String,
        required: false,
        max: 255
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
    
  },
  {timestamps: true}
);




module.exports = mongoose.model('Users', userSchema);