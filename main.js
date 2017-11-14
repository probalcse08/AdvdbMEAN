var express = require('express');
var app = express();
var http = require('http').Server(app).listen(8080);
var upload = require('express-fileupload');
var mongoose = require('mongoose');



var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var dbname = 'mydb';
var collection_name = 'my_collection';
var url = 'mongodb://localhost:27017/'+dbname;
var filename = 'weather.csv';

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









/*

app.use(upload());

// starting the server
console.log('Server Started !');

// create a get request and send a response
app.get("/",function(req,res){
	res.sendFile(__dirname+"/demofile.html");
});

// create a post request
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
		})


	}

	console.log('file uploaded');

});

*/
var printLine = 1000

jsonObj = {}
/*
mongoClient.connect(url,function(err,db){

	if(err)
	{
		console.error('Problem connecting to the database!');
	}
	else
	{																	
		console.log('Connected correctly to the server');

		var collection = db.collection(collection_name);
*/
const csvFilePath='weather.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
    console.log(jsonObj);
  //  collection.insert(jsonObj,function(insertErr,insertObj){
    	

    //	if(insertErr) console.error(insertErr);
    //	else console.log('Done!');

    //})

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







// finding records where play is yes

weather.find({play:'no'},function(err,result)
{
	if(err) throw err;
	else console.log(result);
})






















//}
//})


//console.log(jsonObj.play);

/*
mongoClient.connect(url,function(err,db){

	if(err)
	{
		console.error('Problem connecting to the database!');
	}
	else
	{																	
		console.log('Connected correctly to the server');

		var collection = db.collection(collection_name);
		var fs = require('fs');
		var readline = require('readline');
		var stream = require('stream');
		var instream = fs.createReadStream(filename);
		var outstream = new stream;
		var r1 = readline.createInterface(instream,outstream);

		var lineNum =-1;
		var headers = [];
		var lineReader = require('line-reader');

		/*r1.on('line',function(line){
			try{
				var arr = line.split('\t');
				var object = {};

				object['ID'] = arr[0];
				object['NAME'] = arr[1];

				var res = collection.insert(object);
			}
			catch(err)
			{
				console.log(err);
			}
		});
*/
/*		lineReader.eachLine(filename,function(line,last,cb){
	//	fs.readFile(__dirname+'/weather.csv','utf8',(err,data)=>{
	//		if (err) {console.log(err);}
			console.log('check');
		//	data = data.split("\n");
		//	console.log(data);

		//	for (line in data){
			
			lineNum++;
			console.log(line);
			try{
				 var split = line.split(',');
				 var object = {};

				 if(lineNum > 0)
				 {
				 	for(var i=0;i<split.length;i++)
				 	{
				 		object[headers[i]] = split[i];
				 	}

                    console.log('before insertion');
				 	collection.insert(object,function(insertErr,insertObj){
				 		console.log('inserted 1');
				 		if(insertErr) console.error(insertErr);
				 		console.log('inserted 2');
				 		if(lineNum%printLine === 0) console.log('Line' + lineNum);
				 		console.log('inserted 3');
				 		if(last)
				 		{
				 			console.log('Done');
				 			process.exit(0);
				 		}
				 	})
				 }else
				 		{
				 			headers = line.split(',');
				 			cb();
				 		}
			}catch(lineError)
			{
				console.error(lineError);
			}
			console.log('ext');
		
		})

	}



});


*/