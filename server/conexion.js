'use strict'

var mysql = require('mysql'),
	expressMyconnection = require('express-myconnection'),
	dbOptions = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'software_atletismo'
    },
    db = expressMyconnection(mysql , dbOptions , 'request')

module.exports = db