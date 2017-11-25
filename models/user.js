const mongoose = require('mongoose');
const config = require('../config/database');



// user schema
const UserSchema= mongoose.Schema({
	name:
	{
		type : String,
	},
	email:
	{
		type : String,
		required : true
	},
/*	username:
	{
		type : String,
		required : true
	},
	password:
	{
		type : String,
		required : true
	}*/
});

const User = module.exports = mongoose.model('User',UserSchema);


// call an user by username or userid
module.exports.getUserById  = function(id,callback){
	User.findById(id,callback);
}


// call an user by username or userid
module.exports.getUserByName  = function(username,callback){
	
	const query = {username:username}
	User.findOne(query,callback);
}


module.exports.addUser = function(newUser,callback)
{
	newUser.save(callback);
}
