/*-------------------------------------------------------------------
Config file for KNEX.JS connection including database credentials
which are stored in a seperate secret.js file with the following format:

module.exports = 
{
    host: '[IP of Database Host]',
    user: '[DB Username]',
    database: '[DB Name]',
    password:  '[DB Password]'
};

This secret.js is added to the .gitignore file so that it is not checked
into source control.
-------------------------------------------------------------------*/

var secret = require('./secret');

module.exports = 
{
	mysql:
	{
		client: "mysql",
		connection: 
		{
			host    : secret.host,
			user    : secret.user,
			database: secret.database,
			password: secret.password,
		},
		debug: false
	}
};