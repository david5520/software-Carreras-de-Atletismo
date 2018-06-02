'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
 	breadcrumb = require('express-url-breadcrumb'),
	router = express.Router()

router
	.use(conexion)
	.use(breadcrumb())
	//INICIAR SESION
	.get('/', (req, res , next) => {
		console.log(req.session.success)
		res.render('iniciar_sesion',{dataUser : (req.session.success) ? ((req.session.success) == true ? req.session.userData : null) : null})
	})
	//INDEX
	.get('/index', (req, res , next) => {
		if(req.session.success){
			if (req.session.success = true){
				req.getConnection((err , conexion) => {
					if (err != null) {
            			res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
            		}
					conexion.query(`SELECT usu.nombre AS nombre, usu.apellido AS apellido, usu.email AS email, usu.sexo AS sexo, DATE_FORMAT(usu.fecha_nacimiento,'%Y-%m-%d') as fecha_nacimiento, usu.nombre_usuario AS nombre_usuario, usu.clave AS clave, usu.id AS id, usu.permisologia AS permisologia FROM usuario usu LEFT JOIN permisologia per ON per.id=usu.permisologia` , (err , usuarios) =>{
						(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('index',{dataUsuarios: usuarios})
					})
				})
			}
		}
		else{
			res.redirect('..')
		}
	})
	//COMPETENCIA
	.get('/index/competencia', (req, res , next) => {
		if(req.session.success){
			if (req.session.success = true){
				res.render('competencia')
			}
		}
		else{
			res.redirect('..')
		}
	})
	//GESTIONAR
	.get('/index/gestionar', (req, res , next) => {
		if(req.session.success){
			if (req.session.success = true){
				res.render('gestionar')
			}
		}
		res.redirect('/')
	})
	//HISTORIAL
	.get('/index/historial', (req, res , next) => {
		if(req.session.success){
			if (req.session.success = true){
        		req.getConnection((err, conexion) => {
        		    if (err != null) {
        		    	res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
        		    }else{
	    		        conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' FROM competencia com WHERE finalizado=1`, (err, rows) => {
	    		            (err) ? res.render('error', {error: err, mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('historial', { datosCompetencia: rows })
	    		        })          	
        		    }
        		})
			}
		}
		else{
			res.redirect('..')
		}
	})


//registro y login

	.get('/index/Usuarios', (req, res , next) => {
		if(req.session.success){
			if (req.session.success = true){
				req.getConnection((err , conexion) => {
					if (err != null) {
            			res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
            		}
					conexion.query(`SELECT usu.nombre AS nombre, usu.apellido AS apellido, usu.email AS email, usu.sexo AS sexo, DATE_FORMAT(usu.fecha_nacimiento,'%Y-%m-%d') as fecha_nacimiento, usu.nombre_usuario AS nombre_usuario, usu.clave AS clave, usu.id AS id, usu.permisologia AS permisologia FROM usuario usu LEFT JOIN permisologia per ON per.id=usu.permisologia` , (err , usuarios) =>{
						(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('Usuarios/listar',{dataUsuarios: usuarios})
					})
				})
			}
		}
		else{
			res.redirect('..')
		}
	})
	.post('/index/Usuarios/modificar', (req, res , next) => {
		let usuario_id = req.body.usuario_id
		req.getConnection((err , conexion) => {
			if (err != null) {
            	res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
            }
			conexion.query(`SELECT usu.nombre AS nombre, usu.apellido AS apellido, usu.email AS email, usu.sexo AS sexo, DATE_FORMAT(usu.fecha_nacimiento,'%Y-%m-%d') as fecha_nacimiento, usu.nombre_usuario AS nombre_usuario, usu.clave AS clave, usu.id AS id, usu.permisologia AS permisologia FROM usuario usu LEFT JOIN permisologia per ON per.id=usu.permisologia WHERE usu.id = ?` , usuario_id , (err , usuarios) =>{
				if (err){
					res.status(404)
					res.send({mensaje : 'Error al consultar la base de datos' , code : 404})
				}
				else if (usuarios.length == 0){
					res.status(404)
					res.send({mensaje : 'Usuario no existe' , code : 404})
				}
				else{
					res.status(200)
					res.send({mensaje : 'acept' , data : usuarios[0] , code : 200})
				}
			})
		})
	})
	.post('/index/Usuarios/crear', (req, res , next) => {
		req.check('clave' , 'contraseña invalida').isLength({min : 4}).equals(req.body.confirmPassword)
		var errors = req.validationErrors()
		if (errors) {
			req.session.errors = errors
			res.status(404)
			res.send({mensaje : errors[0].msg  , code : 404})
		}
		else{
			let usuario = {
				nombre : req.body.nombre,
				apellido : req.body.apellido,
				sexo : req.body.sexo,
				email : req.body.email,
				fecha_nacimiento : req.body.fecha_nacimiento,
				nombre_usuario : req.body.usuario,
				clave : req.body.clave,
				permisologia : 2
			}
			req.getConnection((err , conexion) => {
				if (err != null) {
					res.status(404)
					res.send({mensaje : err.message , code : 404})
        	    }
				conexion.query(`SELECT * FROM usuario WHERE usuario.email = "${usuario.email}" OR usuario.nombre_usuario = "${usuario.nombre_usuario}"`, (err , rows) =>{
					if (err){
						res.status(404)
						res.send({mensaje : err.message , code : 404})
					}
					else if (rows.length > 0){
						res.status(200)
						res.send({mensaje : 'email o username ya existente' , code : 200})
					}
					else{
						conexion.query('INSERT INTO usuario SET ?' , usuario, (err , rows) =>{
							if (err){
								res.status(404)
								res.send({mensaje : err.message , code : 404})
							}
							else{
								res.status(200)
								res.send({mensaje : 'acept' , code : 200})
							}
						})
					}
				})
			})
		}						
	})
	.post('/index/Usuarios/modificar/:usuario_id', (req, res , next) => {
		req.check('clave' , 'contraseña invalida').isLength({min : 4})
		var errors = req.validationErrors()
		if (errors) {
			req.session.errors = errors
			res.status(404)
			res.send({mensaje : errors[0].msg , code : 404})
		}
		else{
			let usuario = {
				nombre : req.body.nombre,
				apellido : req.body.apellido,
				sexo : req.body.sexo,
				email : req.body.email,
				fecha_nacimiento : req.body.fecha_nacimiento,
				nombre_usuario : req.body.usuario,
				clave : req.body.clave,
				permisologia : 2
			}
			req.getConnection((err , conexion) => {
				if (err != null) {
					res.status(404)
					res.send({mensaje : err.message , code : 404})
        	    }
				conexion.query(`SELECT * FROM usuario WHERE (usuario.email = "${usuario.email}" OR usuario.nombre_usuario = "${usuario.nombre_usuario}") && usuario.id != ${req.params.usuario_id}`, (err , rows) =>{
					if (err){
						res.status(404)
						res.send({mensaje : err.message , code : 404})
					}
					else if (rows.length > 0){
						res.status(200)
						res.send({mensaje : 'email o username ya existente' , code : 200})
					}
					else{
						conexion.query(`UPDATE usuario SET ? WHERE usuario.id = '${req.params.usuario_id}'` , usuario, (err , rows) =>{
							if (err){
								res.status(404)
								res.send({mensaje : err.message , code : 404})
							}
							else{
								res.status(200)
								res.send({mensaje : 'acept' , code : 200})
							}
						})
					}
				})
			})
		}						
	})
	.post('/index/Usuarios/eliminar/:usuario_id', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query(`DELETE FROM usuario where id = '${req.params.usuario_id}'`, (err , rows) =>{
				if (err){
					res.status(404)
					res.send({mensaje : err.message , code : 404})
				}
				else{
					res.status(200)
					res.send({mensaje : 'acept' , code : 200})
				}
			})	
		})			
	})
	.post('/Usuarios/login', (req, res , next) => {
		req.getConnection((err , conexion) => {
			conexion.query(`SELECT usu.nombre AS nombre, usu.apellido AS apellido, usu.email AS email, usu.sexo AS sexo, DATE_FORMAT(usu.fecha_nacimiento,'%Y-%m-%d') as fecha_nacimiento, usu.nombre_usuario AS nombre_usuario, usu.clave AS clave, usu.id AS id, usu.permisologia AS permisologia FROM usuario usu LEFT JOIN permisologia per ON per.id=usu.permisologia WHERE usu.nombre_usuario = '${req.body.nombre_usuario}' AND usu.clave = '${req.body.clave}'`, (err , rows) =>{
				if (err){
					res.status(200)
					res.send({mensaje : err.message , code : 404})
				}
				else if (rows.length == 0){
					res.status(200)
					res.send({mensaje : 'usuario no existe' , code : 404})
				}
				else{
					req.session.success = true
					req.session.userData = JSON.parse(JSON.stringify(rows[0]))
					res.status(200)
					res.send({mensaje : 'acept' , dataUser : req.session.userData, code : 200})
				}
			})	
		})			
	})
	.post('/Usuarios/logout', (req, res , next) => {
		req.session.success = false
		req.session.userData = null	
		res.redirect('..')
	})
module.exports = router