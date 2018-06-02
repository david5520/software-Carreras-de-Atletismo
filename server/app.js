'use strict'

var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	routes = require('./routes/index'),
	routes_competencia = require('./routes/competencia'),
	routes_gestionar = require('./routes/gestionar'),
	routes_historial = require('./routes/historial'),
	port = 8080


app
	.set('view engine' , 'ejs')
	.set('port' , port)
	.set('views' , path.join(__dirname , '../views'))

	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended : false}))
	.use(cookieParser())
	.use(expressValidator())
	.use(expressSession({secret : 'atletismo' , saveUninitialized : true , resave : true}))
	.use(express.static(path.join(__dirname , '../public')))
	.use('/index/Usuarios',express.static('public'))
	.use('/index/competencia',express.static('public'))
	.use('/index/competencia/modificar',express.static('public'))
	.use('/index/competencia/crear',express.static('public'))
	.use('/index/gestionar',express.static('public'))
	.use('/index/gestionar/atleta',express.static('public'))
	.use('/index/gestionar/categoria',express.static('public'))
	.use('/index/gestionar/categoria/modificar',express.static('public'))
	.use('/index/gestionar/club',express.static('public'))
	.use('/index/gestionar/club/modificar',express.static('public'))
	.use('/index/historial',express.static('public'))
	.use('/index/historial/detalle-competencia',express.static('public'))
	.use(routes)
	.use(routes_competencia)
	.use(routes_gestionar)
	.use(routes_historial)

module.exports = app

/*
	.use(express.static('public'))
	.use('/carreras',express.static('public'))
	.use('/carreras/modificar',express.static('public'))
*/