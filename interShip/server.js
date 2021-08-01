const express = require('express');
const mongoose  = require('mongoose');
require('dotenv/config');
var bodyParser = require('body-parser');
const app = express(); 
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./Router/index')
const sendMail = require('./sendMail');
const passwordReset = require("./Router/resetPassword/forget-password.js");






app.use(cors());
/*app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-Type, Accept")
})*/

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

 
//Connect to DB
mongoose
  .connect(process.env.DB_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Database connected successfully !");
    },
    (error) => {
      console.log("Database could not be connected : " + error);
    }
  );

 
app.get('/', (req, res)=>{
  res.send('hello world')
})
app.use(routes);
app.use('/sendMail', sendMail)
app.use("/api/password-reset", passwordReset);



server.listen(PORT, () => console.log ('Server up and running'));