// upsert-users.js creates (unverified, email-less) user objects from the list

// Because of require('dotenv'), this should be run from the root
// directory of node project

'use strict';

var fs                = require('fs');
var path              = require('path');
var process           = require('process');
var config            = require('../config/config');
var mongoose          = require('mongoose');
var colors            = require('colors');
var async             = require('async');
var spawn             = require('child_process').spawn;
    
mongoose.connect(config.mongodb.url, {user: config.mongodb.user, pass: config.mongodb.password});
var db = mongoose.connection;

var User = require('../models/User.js');

////////////////////////////////////////////////////////////////
db.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure MongoDB is running.'.red.bold);
  process.exit(0);
});

////////////////////////////////////////////////////////////////
db.on('open', function () {
    console.log('Mongodb ' + 'connected!'.green.bold);

    var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('scripts/codes.txt')
    });

    var users = [];
    
    lineReader.on('line', function (line) {
	var username = line.split(" ")[0];
	var password = line.split(" ")[1];
	var type = line.split(" ")[2];

	var user = {
	    username: username,
	    password: password,
	    type: type
	};

	users.push( user );
    });
	
    lineReader.on('close', function() {
	async.each( users,
		    function(data, callback) {
			User.findOne({username: data.username}, function(err, user){
			    if ((err) || (!user)) {
				var user = new User({
				    username:       data.username,
				    password:       data.password,
				    type:           data.type,
				    verified:       false
				});
				console.log( "Adding " + data.username + "..." );
				user.save( callback );
			    } else {
				callback(null);
			    }
			});
		    },
		    function(err) {
			if (err)
			    console.log( err );
			else
			    console.log( "Done." );
			
			process.exit(0);		
		    });
    });

});
