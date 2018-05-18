'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
 	breadcrumb = require('express-url-breadcrumb'),
	router = express.Router()

router
	.use(conexion)
	.use(breadcrumb())
	//INDEX
	.get('/', (req, res , next) => {
		res.render('index')
	})
	//COMPETENCIA
	.get('/competencia', (req, res , next) => {
		res.render('competencia');
	})
	//GESTIONAR
	.get('/gestionar', (req, res , next) => {
		res.render('gestionar');
	})
	//HISTORIAL
	.get('/historial', (req, res , next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {
            	res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
            }else{
	            conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' FROM competencia com WHERE finalizado=1`, (err, rows) => {
	                (err) ? res.render('error', {error: err, mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('historial', { datosCompetencia: rows })
	            })          	
            }
        })
	})

module.exports = router