const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
var upload = require('express-fileupload');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

 //On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);



// uploading a file

app.use(upload());

// starting the server
//console.log('Server Started !');

// create a get request and send a response
app.get("/upload",function(req,res){
  res.sendFile(__dirname+"/demofile.html");
});

// create a post request (reloads the page)
app.post("/",function(req,res){
  if(req.files){
    //console.log(req.files);
    var file = req.files.filename;
      filename = file.name;
    file.mv('./upload/'+filename,function(err){
      if(err)
      {
        console.log(err);
        res.send("Error occured!");
      }

      // feed the data into the database

      var mongoose = require('mongoose');
      var mongodb = require('mongodb');
      var mongoClient = mongodb.MongoClient;
      var dbname = 'mydb';
      var collection_name = 'my_collection';
      var url = 'mongodb://localhost:27017/'+dbname;
      // connect for the mongoose
      mongoose.connect(url,{useMongoClient:true});
      mongoose.Promise = global.Promise;

      var weather = mongoose.model('weather',
      {
        outlook: String,
        temperature : Number,
        humidity : Number,
        windy : Boolean,
        play : String
      });


      jsonObj = {}

      const csvFilePath='./upload/'+filename;
      const csv=require('csvtojson')
      csv()
      .fromFile(csvFilePath)
      .on('json',(jsonObj)=>{
      // combine csv header row and csv line to a json object
      // jsonObj.a ==> 1 or 4
      console.log(jsonObj);
 
      var item = new weather(jsonObj);
      item.save(function(err){
      if(err)
      console.log(err);
      else
      console.log('inserted !');
  })
  





})
.on('done',(error)=>{
    console.log('end')
   // console.log(jsonObj.outlook);
})

 })

  }

  console.log('File uploaded and fed into database');

});










// Index Route
app.get('/', (req, res) => {  
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
