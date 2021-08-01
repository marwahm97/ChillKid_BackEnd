const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RatingSchema = new Schema({
  username: {
    type: String,
    default: "Member"},
  rate: String,
  comment: String,
    
})

const Rating = mongoose.model("Rating", RatingSchema)
module.exports = Rating
