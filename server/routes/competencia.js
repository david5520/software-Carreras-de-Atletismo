'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)

	//CREAR//
	.get('/competencia/crear', (req, res , next) => {
		res.render('competencia/crear-1')
	})
	.post('/competencia/crear' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err != null) {
            	res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
            }
			conexion.query(`SELECT at.*, cl.nombre club_nombre , TIMESTAMPDIFF(YEAR,at.fecha_nacimiento,CURDATE()) edad , Year(CURDATE()) - YEAR(at.fecha_nacimiento) edad_categoria , IFNULL((SELECT categoria.nombre FROM categoria WHERE (edad_categoria BETWEEN categoria.edad_min AND categoria.edad_max)) , 'libre') categoria FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id` , (err , atletas) =>{
				(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/crear-2',{datosCompetidores: atletas, datosCompetencia: req.body})
			})
		})
	})
	.post('/competencia/crear/finalizar' , (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}else{
				let competencia = {
					nombre : req.body.nombre,
					fecha : req.body.fecha,
					hora : req.body.hora,
					lugar : req.body.lugar,
					finalizado : 0
				}
				conexion.query('INSERT INTO competencia SET ?' , competencia, (err , rows) =>{				
					if (err){
						res.render('error', {mensaje : 'Error al guardar la data en la base de datos' , code : 404})
					}else{
						req.body.id_atleta.forEach( function(element, index) {
							let competencia_atleta = {
	                        	id_atleta: req.body.id_atleta[index],
	                        	id_competencia: rows.insertId,
	                        	numero_atleta : req.body.num_atleta[index]
	                        }
	                       	conexion.query('INSERT INTO competencia_atleta SET ?', competencia_atleta, (err, rows) => {
	                       		if (err) {
	                       			res.render('error', {mensaje : 'Error al guardar la data en la base de datos' , code : 404})
	                       		}
	                       		else{
	                     			if (index == req.body.id_atleta.length -1){
										res.status(200)
										res.send({mensaje : 'acept' , code : 200})
	                     			}
	                       		}
	                        })
						})
					}
				})
			}
		})
	})

    //LISTAR//
    .get('/competencia/listar', (req, res, next) => {
        req.getConnection((err, conexion) => {
            if (err != null) {
            	res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
            }else{
	            conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%Y-%m-%d') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' FROM competencia com WHERE finalizado=0`, (err, rows) => {
	                (err) ? res.render('error', {error: err, mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/listar', { datosCompetencia: rows })
	            })          	
            }
        })
    })
	.get('/competencia/modificar', (req, res , next) => {
		res.redirect('/competencia/listar')
	})

    //DELETE//
    .post('/competencia/eliminar/:competencia_id', (req, res, next) => {
        let competencia_id = req.params.competencia_id
        req.getConnection((err, conexion) => {
        	if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
            conexion.query('DELETE FROM competencia_atleta WHERE id_competencia = ?', competencia_id, (err, rows) => {
                if (err) {} else {
                    conexion.query('DELETE FROM competencia WHERE id = ?', competencia_id, (err, rows) => {
                            (err) ? res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404}) :  res.redirect('back')
                    })
                }
            })
        })
    })
    //EDIT//
    .get('/competencia/modificar/:competencia_id', (req, res, next) => {
        let competencia_id = req.params.competencia_id
		
        req.getConnection((err, conexion) => {
        	if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT com.nombre as 'nombre' , com.id as 'id' , DATE_FORMAT(com.fecha,'%Y-%m-%d') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' FROM competencia com  WHERE com.id = ?`, competencia_id , (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							resolve(rows)
						}
					})
				})
				promesa
					.then((competencia) => {
						return new Promise((resolve , reject) => {
							conexion.query(`SELECT at.*, cl.nombre club_nombre , TIMESTAMPDIFF(YEAR,at.fecha_nacimiento,CURDATE()) edad , Year(CURDATE()) - YEAR(at.fecha_nacimiento) edad_categoria , IFNULL((SELECT categoria.nombre FROM categoria WHERE (edad_categoria BETWEEN categoria.edad_min AND categoria.edad_max)) , 'libre') categoria FROM atleta at LEFT JOIN club cl ON at.id_club=cl.id` , (err , atletas) =>{
								(err) ? reject({err : new Error('Error al consultar la base de datos') , flag : false}) : resolve({dataCompetencia : competencia , dataAtletas : atletas})
							})
						})
					})
					.then((data) => {
						return new Promise((resolve , reject) => {
							conexion.query(`SELECT * FROM competencia_atleta WHERE id_competencia = ?`, competencia_id, (err, compe_atleta) =>{
								(err) ? reject({err : new Error('Error al consultar la base de datos') , flag : false}) : resolve({datosCompe : data.dataCompetencia , datosAtletas : data.dataAtletas , datosCompeAtleta : compe_atleta})
							})
						})
					})
					.then((data) => {
						res.render('competencia/modificar', data)
					})
					.catch((err) =>{
						if (err.flag){
							res.status(404)
							res.send({mensaje : err.err.message , code : 404})
						}
						else{
							res.render('error', {mensaje : err.err.message , code : 404})
						}
					})
			}
        })
    })
    .post('/competencia/modificar', (req, res, next) => {
    	let competencia_id = req.body.id
        let competencia = {
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            hora: req.body.hora,
            lugar: req.body.lugar,
            finalizado: 0
        }
        req.getConnection((err, conexion) => {
        	if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query('UPDATE competencia SET ? WHERE id = ' + competencia_id, competencia, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al guardar la data en la base de datos') , flag : false})
						}
						else{
							resolve(rows[0])
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query('DELETE FROM competencia_atleta WHERE competencia_atleta.id_competencia = ?',competencia_id, (err, rows) => {
								(err) ? res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404}) : resolve()
	                        })
						})
					})
					.then(() => {
						return new Promise((resolve , reject) => {
							req.body.id_atleta.forEach( function(element, index) {
								let competencia_atleta = {
	                        		id_atleta: element,
	                        		id_competencia: competencia_id,
	                        		numero_atleta : req.body.num_atleta[index]
	                            }
	                        	conexion.query('INSERT INTO competencia_atleta SET ?', competencia_atleta, (err, rows) => {
	                        		(err) ? res.render('error', {mensaje : 'Error al guardar la data en la base de datos' , code : 404}) : resolve()
	                          	})
							})
						})
					})
					.then(() => {
						res.status(200)
						res.send({mensaje : 'acept' , code : 200})
					})
					.catch((err) =>{
						if (err.flag){
							res.status(404)
							res.send({mensaje : err.err.message , code : 404})
						}
						else{
							res.render('error', {mensaje : err.err.message , code : 404})
						}
					})
			}
        })
    })
    .post('/competencia/agregar-tiempos', (req, res, next) => {
    	let count = 0
    	req.getConnection((err, conexion) => {
    		if (err){
				res.status(404)
				res.send({mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
    			req.body.tiempos.forEach( function(element, index) {
					conexion.query(`UPDATE competencia_atleta SET tiempo = ${element.tiempo} WHERE competencia_atleta.numero_atleta = ${element.numero_atleta} AND competencia_atleta.id_competencia = ${req.body.id_competencia}`, (err , rows) =>{
						if (err){
							res.status(404)
							res.send({mensaje : 'Error al guardar la data en la base de datos' , code : 404})
						}
						else{
							if(count == req.body.tiempos.length-1){
								conexion.query(`UPDATE competencia SET finalizado = 1 WHERE competencia.id = ${req.body.id_competencia}`, (err , rows) =>{
									if (err){
										res.status(404)
										res.send({mensaje : 'Error al guardar la data en la base de datos' , code : 404})
									}
									else{
										res.status(200)
										res.send({mensaje : 'acept' , code : 200})
										
									}
								})
							}
						}
						count++
					})
        		})	
			}    		
    	})
    })
    .post('/competencia/obtener-competidores-iniciar', (req, res, next) => {
    	let id_competencia = req.body.id_competencia

    	req.getConnection((err, conexion) => {
    		if (err){
				res.status(404)
				res.send({mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
    			conexion.query(`SELECT * FROM competencia_atleta WHERE competencia_atleta.id_competencia = ${id_competencia}`, (err , rows) =>{
					if (err){
						res.status(404)
						res.send({mensaje : 'Error al consultar la base de datos' , code : 404})
					}
					else{
						res.status(200)
						res.send({mensaje : rows , code : 200})
					}
				})
			}    		
    	})
    })


    //INICIAR//
    .get('/competencia/iniciar', (req, res, next) => {
        req.getConnection((err, conexion) => {
        	if (err){
	            res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
	        }
	        else{
            	conexion.query(`SELECT competencia.nombre , DATE_FORMAT(competencia.fecha,'%Y-%m-%d') fecha , TIME(competencia.hora) hora , competencia.lugar , competencia.id FROM competencia WHERE finalizado = 0`, (err, rows) => {
                	(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('competencia/iniciar', { datosCompetencia: rows })
            	})
	        }
        })
    })

module.exports = router