const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');



// register
router.post('/register',(req,res,next)=>{
	let newUser = new User({
		name : req.body.name,
		email : req.body.email,
		username : req.body.username,
		password : req.body.password
	});

	User.addUser(newUser,(err,user) =>{
		if(err)
		{
			res.json({success:false,msg:'Failed to register user'});
		}
		else{
			res.json({success:true , msg:'User registered'});

		}
	})



});



 //authenticate
router.post('/authenticate',(req,res,next)=>{
	res.send('AUTHENTICATE');
});




//validate
router.get('/validate',(req,res,next)=>{
	res.send('VALIDATE');
});




module.exports = router;


