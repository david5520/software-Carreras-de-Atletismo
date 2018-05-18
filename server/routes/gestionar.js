'use strict'

var conexion = require('../conexion'),
 	express = require('express'),
	router = express.Router()

router
	.use(conexion)
	
	///CRUD CATEGORIAS
	//list
	.get('/gestionar/categoria', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('SELECT categoria.nombre , categoria.descripcion , categoria.edad_min , categoria.edad_max FROM categoria' , (err , rows) =>{
					(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('gestionar/categoria/listar', {listCategorias: rows})
				})
			}
		})
	})
	.get('/gestionar/categoria/modificar', (req, res , next) => {
		res.redirect('/gestionar/categoria')
	})
	//add
	.get('/gestionar/categoria/crear', (req, res , next) => {
		res.render('gestionar/categoria/crear')
	})
	.post('/gestionar/categoria/crear' , (req, res , next) => {
		let categoria = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
			edad_min : req.body.edad_min,
			edad_max : req.body.edad_max
		}
		if (req.body.edad_min > req.body.edad_max){
			res.status(404)
			res.send({mensaje : 'los rangos son invalidos' , code : 404})
		}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT * FROM categoria WHERE categoria.nombre='${categoria.nombre}'`, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							if(rows.length > 0){
								reject({err : new Error('Categoria repetida') ,flag : true})
							}
							else{
								resolve()
							}
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query(`SELECT categoria.nombre FROM categoria WHERE (${categoria.edad_min} BETWEEN categoria.edad_min AND categoria.edad_max) OR (${categoria.edad_max} BETWEEN categoria.edad_min AND categoria.edad_max)`, (err , rows) =>{
								if (err){
									reject({err : new Error('Error al consultar la base de datos') , flag : false})
								}
								else{
									if(rows.length > 0){
										reject({err : new Error('El rango de edades ya pertenece a otra categoria') ,flag : true})
									}
									else{
										resolve()
									}
								}
							})
						})
					})
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query('INSERT INTO categoria SET ?' , categoria, (err , rows) =>{
								(err) ? reject({err : new Error('Error al guardar la data en la base de datos') , flag : false}) : resolve()
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
	//delete
	.post('/gestionar/categoria/eliminar/:categoria_nombre', (req, res , next) => {
		let categoria_nombre = req.params.categoria_nombre
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('DELETE FROM categoria where nombre = ?' , categoria_nombre , (err , rows) =>{
					if (err){
						res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404})
					} 
					else{
						res.status(200)
						res.send({mensaje : 'acept' , code : 200})
					}
				})
			}
		})
	})
	//edit
	.get('/gestionar/categoria/modificar/:categoria_nombre', (req, res , next) => {
		let categoria_nombre = req.params.categoria_nombre
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
	        	conexion.query('SELECT * FROM categoria WHERE nombre = ?' , categoria_nombre , (err, rows) =>{
	        		if (err){
						res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
					}
	            	res.render('gestionar/categoria/modificar', {
	                	title: 'Editar Categoría', 
	                	id: rows[0].id,
	                	nombre: rows[0].nombre,
	                	descripcion: rows[0].descripcion,
	                	edad_min: rows[0].edad_min,
	                	edad_max: rows[0].edad_max                   
	            	})
	        	})
			}
	    })
	})
	.post('/gestionar/categoria/modificar', (req, res , next) => {
		let cat_nombre = req.body.cat_nombre
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
	        	conexion.query('SELECT * FROM categoria WHERE nombre = ?' , cat_nombre , (err, rows) =>{
	        		if (err){
						res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
					}
					else{
						res.status(200)
						res.send({data : rows[0] , code : 200})
					}
	        	})
			}
	    })
	})
	.post('/gestionar/categoria/modificar/:categoria_nombre', (req, res , next) => {
		let categoria = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
			edad_min : req.body.edad_min,
			edad_max : req.body.edad_max
		}
		if (req.body.edad_min > req.body.edad_max){
			res.status(404)
			res.send({mensaje : 'los rangos son invalidos' , code : 404})
		}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT * FROM categoria WHERE categoria.nombre='${categoria.nombre}' AND categoria.nombre != '${req.params.categoria_nombre}'`, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							if(rows.length > 0){
								reject({err : new Error('Categoria repetida') ,flag : true})
							}
							else{
								resolve()
							}
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query(`SELECT categoria.nombre FROM categoria WHERE ((${categoria.edad_min} BETWEEN categoria.edad_min AND categoria.edad_max) OR (${categoria.edad_max} BETWEEN categoria.edad_min AND categoria.edad_max)) AND categoria.nombre != '${req.params.categoria_nombre}'`, (err , rows) =>{
								if (err){
									reject({err : new Error('Error al consultar la base de datos') , flag : false})
								}
								else{
									if(rows.length > 0){
										reject({err : new Error('El rango de edades ya pertenece a otra categoria') ,flag : true})
									}
									else{
										resolve()
									}
								}
							})
						})
					})
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query(`UPDATE categoria SET ? WHERE nombre = '${req.params.categoria_nombre}'`,categoria, (err2, result2) =>{ 
								(err2) ? reject({err : new Error('Error al guardar la data en la base de datos') , flag : false}) : resolve()           
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




	///crud de club
	//list
	.get('/gestionar/club', (req, res , next) => {
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('SELECT * FROM  club' , (err , rows) =>{
					(err) ? res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404}) : res.render('gestionar/club/listar', {listClub: rows})
				})
			}
		})
	})
	.get('/gestionar/club/modificar', (req, res , next) => {
		res.redirect('/gestionar/club')
	})
	//add
	.get('/gestionar/club/crear', (req, res , next) => {
		res.render('gestionar/club/crear')
	})
	.post('/gestionar/club/crear' , (req, res , next) => {
		let club = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion
		}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT * FROM club WHERE club.nombre='${club.nombre}'`, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							if(rows.length > 0){
								reject({err : new Error('Club repetido') , flag : true})
							}
							else{
								resolve()
							}
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query('INSERT INTO club SET ?' , club, (err, result) =>{              
								(err) ? reject({err : new Error('Error al guardar la data en la base de datos') , flag : false}) : resolve() 
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
	//delete
	.post('/gestionar/club/eliminar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('DELETE FROM club WHERE id = ?' , club_id , (err , rows) =>{
					if (err){
						res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404})
					} 
					else{
						res.status(200)
						res.send({mensaje : 'acept' , code : 200})
					}
				})
			}
		})
	})
	//edit
	.post('/gestionar/club/modificar', (req, res , next) => {
		let club_id = req.body.club_id
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('SELECT * FROM club WHERE id = ?' , club_id , (err, rows) =>{
	            	if (err){
						res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
					}
	            	else{
						res.status(200)
						res.send({data : rows[0] , code : 200})
					}
	        	})
			}
	        
	    })
	})
	.post('/gestionar/club/modificar/:club_id', (req, res , next) => {
		let club_id = req.params.club_id
		let club = {
			nombre: req.body.nombre, 
			descripcion: req.body.descripcion
		}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT * FROM club WHERE club.nombre='${club.nombre}' AND id !=${club_id}`, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							if(rows.length > 0){
								reject({err : new Error('Club repetido') , flag : true})
							}
							else{
								resolve()
							}
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query('UPDATE club SET ? WHERE id = ' + club_id, club, (err, result) =>{              
								(err) ? reject({err : new Error('Error al guardar la data en la base de datos') , flag : false}) : resolve() 
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


	//CRUD ATLETAS
	.get('/gestionar/atleta', (req, res , next) => {
   		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query('SELECT * FROM club', (err , rows) =>{
						(err) ? reject(new Error('Error al consultar la base de datos')) : resolve({dataClubs : rows})
					})
				})
				promesa
					.then((data) => {
						return new Promise((resolve , reject) => {
							conexion.query('SELECT atleta.* , club.nombre nombre_club FROM atleta LEFT JOIN club ON atleta.id_club=club.id', (err, rows) =>{ 
								(err) ? reject(new Error('Error al consultar la base de datos')) : resolve({dataClubs : data.dataClubs , dataAtletas : rows})           
							})
						})
					})
					.then((data) => {
						res.render('gestionar/atleta/listar' , data)
					})
					.catch((err) =>{
						res.render('error', {mensaje : err.message , code : 404})
					})
			}
		})
	})
	.post('/gestionar/atleta/modificar', (req, res , next) => {
		let atleta_id = req.body.atleta_id
		console.log(req.body)
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query(`SELECT  atleta.cedula , atleta.primer_apellido , atleta.primer_nombre , atleta.segundo_apellido , atleta.segundo_nombre, DATE_FORMAT(atleta.fecha_nacimiento,'%Y-%m-%d') fecha, atleta.sexo , club.nombre nombre_club , club.id FROM atleta LEFT JOIN club ON atleta.id_club=club.id  WHERE atleta.id = ${atleta_id}`, (err, rows) =>{
	            	if (err){
						res.render('error', {mensaje : 'Error al consultar la base de datos' , code : 404})
					}
	            	else{
	            		res.status(200)
						res.send({data : rows[0] , code : 200})
					}
	        	})
			}
	        
	    })
	})
	.post('/gestionar/atleta/modificar/:atleta_id', (req, res , next) => {
		let atleta_id = req.params.atleta_id
		let atleta = {
      		primer_nombre : req.body.primer_nombre,
      		segundo_nombre : req.body.segundo_nombre,
      		primer_apellido : req.body.primer_apellido,
      		segundo_apellido : req.body.segundo_apellido,
      		cedula : req.body.cedula,
      		fecha_nacimiento : req.body.fecha_nacimiento,
      		id_club : req.body.id_club,
      		sexo : req.body.sexo
    	}
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT * FROM atleta WHERE atleta.cedula=${atleta.cedula} AND atleta.id != ${atleta_id}`, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							if(rows.length > 0){
								reject({err : new Error('atleta con cedula repetida') , flag : true})
							}
							else{
								resolve()
							}
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query('UPDATE atleta SET ? WHERE id = ' + atleta_id, atleta, (err, result) =>{              
								(err) ? reject({err : new Error('Error al guardar la data en la base de datos') , flag : false}) : resolve() 
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
	.post('/gestionar/atleta/crear' , (req, res , next) => {
    	let atleta = {
      		primer_nombre : req.body.primer_nombre,
      		segundo_nombre : req.body.segundo_nombre,
      		primer_apellido : req.body.primer_apellido,
      		segundo_apellido : req.body.segundo_apellido,
      		cedula : req.body.cedula,
      		fecha_nacimiento : req.body.fecha_nacimiento,
      		id_club : req.body.id_club,
      		sexo : req.body.sexo
    	}		
    	req.getConnection((err , conexion) => {
      		if (err){
        		res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
      		}
      		else{
      			let promesa = new Promise((resolve , reject) => {
					conexion.query(`SELECT * FROM atleta WHERE atleta.cedula='${atleta.cedula}'`, (err , rows) =>{
						if (err){
							reject({err : new Error('Error al consultar la base de datos') , flag : false})
						}
						else{
							if(rows.length > 0){
								reject({err : new Error('atleta con cedula repetida') , flag : true})
							}
							else{
								resolve()
							}
						}
					})
				})
				promesa
					.then(() => {
						return new Promise((resolve , reject) => {
							conexion.query('INSERT INTO atleta SET ?' , atleta, (err, result) =>{              
								(err) ? reject({err : new Error('Error al guardar la data en la base de datos') , flag : false}) : resolve() 
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
	.post('/gestionar/atleta/eliminar/:atleta_cedula', (req, res , next) => {
		let atleta_cedula = req.params.atleta_cedula
		req.getConnection((err , conexion) => {
			if (err){
				res.render('error', {mensaje : 'Error al conectarse a la base de datos' , code : 404})
			}
			else{
				conexion.query('DELETE FROM atleta where cedula = ?' , atleta_cedula , (err , rows) =>{
					if (err){
						res.render('error', {mensaje : 'Error al eliminar registro de la base de datos' , code : 404})
					} 
					else{
						res.status(200)
						res.send({mensaje : 'acept' , code : 200})
					}
				})
			}
		})
	})

module.exports = router