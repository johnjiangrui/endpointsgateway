const express = require('express'),
	  app = express()
	  PORT = 5857,
	  SSLPORT = 443

const urlencoded = express.urlencoded({extended: true}),
	  jsonParser = express.json()

const bodyParser = require('body-parser')

const http = require('http')
const url = require('url')

process.APPDIR = __dirname

const mapping = require('./midware/mapping')



app.use(urlencoded)
app.use(jsonParser)
app.use(bodyParser.text({ type: 'text/xml' }))

app.use(mapping.services)

if(process.env.NODE_ENV==='dev'){
	app.listen(PORT, function(){
		console.log("Running in development enviroment. \nApp listening at port " + PORT)
	})
}else{
	const fs = require('fs')
	const https = require('https')
	const privateKey = fs.readFileSync('./configs/CertsNginx/yourkey.key', 'utf8')
	const certificate= fs.readFileSync('./configs/CertsNginx/yourkey.crt', 'utf8')
	const httpsServer = https.createServer({key: privateKey, cert: certificate}, app)
	// use https server for production enviroment
    httpsServer.listen(PORT, function(){
	    console.log('HTTPS server is listening at port '+PORT)
    })
}
