module.exports = {
    apps : [{
	name        : "app",
	script      : "./app.js",
	instances   : "1",
	exec_mode   : "cluster",
	watch       : true,
	env: {
	    "NODE_ENV": "development",
	    "PORT": "7000"	
	},
	env_production : {
	    "NODE_ENV": "production",
	    "PORT": "7000"
	}
    }]
}
