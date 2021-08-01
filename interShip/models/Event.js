const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    
    title: String,
    date : String,
    description: String,
    images: [String],
         
   
});

module.exports =mongoose.model('Event', eventsSchema);