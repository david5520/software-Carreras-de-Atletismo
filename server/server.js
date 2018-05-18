'use strict'

var app = require('./app'),
	server = app.listen(app.get('port'), () => {
		console.log(`app started at port ${app.get('port')}`)
	})