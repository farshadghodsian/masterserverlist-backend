//-------------------------------------------------------------------
//  REST API routes to perform READ Operations in MYSQL database
//-------------------------------------------------------------------

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cfg  = require("./knex-cfg").mysql; //specifying knex config file to use mysql client
var knex = require("knex")(cfg);


//the /getmysqltable route will return all results for masterserverlist table
router.get('/getservicenames', function(req, res) {
	knex('servicenames').select('tccservicename as text', 'tccservicename as value').orderBy("tccservicename", "asc").asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});


//the /getmysqltable route will return all results for masterserverlist table
router.get('/getmasterserverlist', function(req, res) {
	knex('masterserverlist').join("servicenames", "archservicename", "=", "service") //join archservicename in servicenames table I created with the service column in masterserverlist table
			.select('masterserverlist.masterserverlist_id as masterserverlist_id',
			'masterserverlist.prod_hostname','masterserverlist.mgt_hostname','masterserverlist.environment','masterserverlist.service as archservicename','servicenames.tccservicename','masterserverlist.active',
			'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.prod_ip','masterserverlist.mgt_ip','masterserverlist.ext_ip','masterserverlist.url','masterserverlist.notes').asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});

//the /getmysqltable route will return all active servers for masterserverlist table
router.get('/getmasterserverlistactive', function(req, res) {
  knex('masterserverlist').join("servicenames", "archservicename", "=", "service")
		.select('masterserverlist.masterserverlist_id as masterserverlist_id',
		'masterserverlist.prod_hostname','masterserverlist.mgt_hostname','masterserverlist.environment','masterserverlist.service as archservicename','servicenames.tccservicename','masterserverlist.active',
		'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.prod_ip','masterserverlist.mgt_ip','masterserverlist.ext_ip','masterserverlist.url','masterserverlist.notes')
		.where('active', '=', 'Y').asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});

//get server by service name and sort by environment and hostname
router.get('/getmasterserverlistbyservice', function(req, res) {
  knex('masterserverlist').join("servicenames", "archservicename", "=", "service")
	.select('masterserverlist.masterserverlist_id as masterserverlist_id',
	'masterserverlist.prod_hostname','masterserverlist.mgt_hostname','masterserverlist.environment','masterserverlist.service as archservicename','servicenames.tccservicename','masterserverlist.active',
	'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.prod_ip','masterserverlist.mgt_ip','masterserverlist.ext_ip','masterserverlist.url','masterserverlist.notes')
	.where({"service": req.query.service}).orderBy("environment", "asc").orderBy("prod_hostname", "asc").asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});

//get server by service name and sort by environment and hostname
router.get('/getmasterserverlistbyhostname', function(req, res) {
  knex('masterserverlist').join("servicenames", "archservicename", "=", "service")
	.select('masterserverlist.masterserverlist_id as masterserverlist_id',
	'masterserverlist.prod_hostname','masterserverlist.mgt_hostname','masterserverlist.environment','masterserverlist.service as archservicename','servicenames.tccservicename','masterserverlist.active',
	'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.prod_ip','masterserverlist.mgt_ip','masterserverlist.ext_ip','masterserverlist.url','masterserverlist.notes')
	.where('prod_hostname', 'like', req.query.hostname + '%').asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});

//get server by service name and sort by environment and hostname
router.get('/getmasterserverlistbyid', function(req, res) {
  knex('masterserverlist').join("servicenames", "archservicename", "=", "service")
	.select('masterserverlist.masterserverlist_id as masterserverlist_id',
	'masterserverlist.prod_hostname','masterserverlist.mgt_hostname','masterserverlist.environment','masterserverlist.service as archservicename','servicenames.tccservicename','masterserverlist.active',
	'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.prod_ip','masterserverlist.mgt_ip','masterserverlist.ext_ip','masterserverlist.url','masterserverlist.notes')
	.where({"masterserverlist_id": req.query.id}).asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});


//the /getsystemsserverlist route will return all results for systemsserverlist table
router.get('/getsystemsserverlist', function(req, res) {
  knex('systemsserverlist').select().asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});

//get server by service name and sort by environment and hostname
router.get('/getsystemsserverlistbyhostname', function(req, res) {
  knex('systemsserverlist').select().where('Host_Name', 'like', req.query.hostname + '%').asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.send(rows);	
	}
  });
});

//get Remote Desktop Manager XML datasource by service name and sort by environment and hostname
router.get('/getRDMXLdatasource.xml', function(req, res) {
  knex('masterserverlist').join("servicenames", "archservicename", "=", "service")
	.select('masterserverlist.prod_hostname as hostname','masterserverlist.environment','servicenames.tccservicename as service','masterserverlist.active',
	'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.mgt_ip','servicenames.costcentre')
	.where('active', '=', 'Y').andWhere({"servicenames.tccservicename": req.query.service}).asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.removeHeader('Access-Control-Allow-Origin');
		res.removeHeader('Connection');
		res.removeHeader('Date');
		res.removeHeader('ETag');
		res.removeHeader('Accept')
		res.removeHeader('X-Powered-By')  
		// res.setHeader('content-type', 'application/xml');
		res.type('application/xml');
		res.render('RDMXML', {
			xmlData: rows
		});	
	}
  });
});

//get Remote Desktop Manager XML datasource by service name and sort by environment and hostname
router.get('/getallRDMXLdatasource.xml', function(req, res) {
  knex('masterserverlist').join("servicenames", "archservicename", "=", "service")//.join("systemsserverlist", "Host_Name", "=", "prod_hostname")
	.select('masterserverlist.prod_hostname as hostname','masterserverlist.environment','servicenames.tccservicename as service','masterserverlist.active',
	'masterserverlist.host_type','masterserverlist.server_type','masterserverlist.mgt_ip', 'servicenames.costcentre')
	.where('active', '=', 'Y').asCallback(function(err, rows)
  {
  	if(err) { res.send(err); }
	else
	{
		res.removeHeader('Access-Control-Allow-Origin');
		res.removeHeader('Connection');
		res.removeHeader('Content-Length');
		res.removeHeader('Date');
		res.removeHeader('ETag');
		res.removeHeader('Accept');
		res.removeHeader('X-Powered-By');
		res.removeHeader('Refferer Policy');
		res.removeHeader('Accept');
		res.removeHeader('Pragma') 
		res.setHeader('content-type', 'application/xml');
		res.render('RDMXML', {
			xmlData: rows
		});	
	}
  });
});
////Below is the SQL test function to test out various queries. Remove before going to PROD
//router.get('/sqltest', function(req, res) {
//
////------------EXAMPLE SELECT STATEMENTS USING KNEX--------------
////knex.raw("SELECT * FROM thpsservicecatalog.servicedirectory where BusinessUnit = 'Consumer'").asCallback(function(err, rows) 	//Using RAW SQL Statment
////knex.select().from('servicedirectory').orderBy("ServiceName", "desc").asCallback(function(err, rows)							//order items by using orderBy
////knex.select().from('servicedirectory').where({"BusinessUnit": "Finance"}).asCallback(function(err, rows) 						//filter using WHERE
////knex.select().from('servicedirectory').where("idServiceDirectory", 99).asCallback(function(err, rows) 						//finding a single ID
////knex.select().from('servicedirectory').where("idServiceDirectory", ">", 99).asCallback(function(err, rows) 					//Greator than operator
//knex.select().from('servicedirectory').where("BusinessUnit", "<>", "Consumer").asCallback(function(err, rows) 					//Not equal operator
//{
//  	if(err) { res.send(err); }
//	else
//	{
//		res.send(rows);	
//	}
////	knex.destroy();
//  });
//});


module.exports = router;