'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	.get('/historial/detalle-competencia/:id', (req, res , next) => {
		let competencia_id = req.params.id 
		let dataView
		req.getConnection((err , conexion) => {
			if (err){
				reject(new Error('Error al conectarse a la base de datos'))
			}
			let promesa = new Promise((resolve , reject) => {
				conexion.query(`SELECT com.nombre as 'nombreCompetencia' , DATE_FORMAT(com.fecha,'%d/%m/%Y') as 'fecha' , TIME(com.hora) as 'hora' , com.lugar as 'lugar' FROM competencia com where finalizado = 1 AND com.id = ?` , competencia_id, (err , rows) =>{
					(err) ? reject(new Error('Error al consultar la base de datos')) : resolve(rows[0])
				})
			})
			promesa
				.then((dataCompetencia) => {
					return new Promise((resolve , reject) => {
						conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) as 'competidor', com_at.numero_atleta as 'numero' , SEC_TO_TIME(com_at.tiempo) as 'tiempo' FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id WHERE com_at.id_competencia=${competencia_id} AND tiempo != 9999999 ORDER BY tiempo ASC`, (err , rows) =>{
							(err) ? reject(new Error('Error al consultar la base de datos')) : resolve({dataCompetencia : dataCompetencia , dataCompetidores : rows})
						})
					})
				})
				.then((data) => {
					dataView = data
					return new Promise((resolve , reject) => {
						conexion.query(`SELECT * FROM categoria`, (err , rows) =>{
							(err) ? reject(new Error('Error al consultar la base de datos')) : resolve(rows)
						})
					})
					res.render('historial/detalle-competencia', data)
				})
				.then((categorias) => {
					let premios = {}
					categorias.push({nombre : 'libre'})
					return new Promise((resolve , reject) => {
						categorias.forEach( (element, index) => {
							let promesa2 = new Promise((resolve2 , reject2) => {
								conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) competidor , atl.sexo , cl.nombre, com_at.numero_atleta numero , SEC_TO_TIME(com_at.tiempo) tiempo FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id LEFT JOIN club cl ON atl.id_club=cl.id LEFT JOIN competencia com ON com_at.id_competencia = com.id WHERE com.id = ${competencia_id} and atl.sexo = 'Femenino' HAVING IFNULL((SELECT categoria.nombre FROM categoria WHERE (TIMESTAMPDIFF(YEAR,atl.fecha_nacimiento,CURDATE()) BETWEEN categoria.edad_min AND categoria.edad_max)) , 'libre') = '${element.nombre}' AND tiempo != 9999999 ORDER BY tiempo LIMIT 5`, (err , rows) =>{
									if (err){
										reject(new Error('Error al consultar la base de datos'))
									}
									else{
										premios[element.nombre+'-Femenino'] = rows
										resolve2()
									}
								})
							})
							promesa2
								.then(() => {
									conexion.query(`SELECT CONCAT(atl.primer_nombre , ' ' , atl.primer_apellido) competidor , atl.sexo , cl.nombre, com_at.numero_atleta numero , SEC_TO_TIME(com_at.tiempo) tiempo FROM competencia_atleta com_at LEFT JOIN atleta atl ON com_at.id_atleta=atl.id LEFT JOIN club cl ON atl.id_club=cl.id LEFT JOIN competencia com ON com_at.id_competencia = com.id WHERE com.id = ${competencia_id} and atl.sexo = 'Masculino' HAVING IFNULL((SELECT categoria.nombre FROM categoria WHERE (TIMESTAMPDIFF(YEAR,atl.fecha_nacimiento,CURDATE()) BETWEEN categoria.edad_min AND categoria.edad_max)) , 'libre') = '${element.nombre}' AND tiempo != 9999999 ORDER BY tiempo LIMIT 5`, (err , rows) =>{
										if (err){
											reject(new Error('Error al consultar la base de datos'))
										}
										else{
											premios[element.nombre+'-Masculino'] = rows
											if(index == categorias.length - 1){
												resolve(premios)
											}
										}
									})
								})
								.catch((err) =>{
									reject(err)
								})
						})
					})
				})
				.then((data) => {
                    var lodash = require('lodash')
					res.render('historial/detalle-competencia', {dataDetalle : dataView , dataPremiacion : data, _ : lodash })
				})
				.catch((err) =>{
					res.render('error', {mensaje : err.message , code : 404})
				})
		})
	})
	.get('/historial/detalle-competencia', (req, res , next) => {
		res.redirect('/historial')
	})
	
module.exports = router