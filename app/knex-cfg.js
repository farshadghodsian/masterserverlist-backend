//-------------------------------------------------------------------
//  Config file for KNEX.JS connection including database credentials
//-------------------------------------------------------------------
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