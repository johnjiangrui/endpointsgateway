const querystring = require('querystring')
const http = require('http')
const fs = require('fs')

fs.readFile(process.APPDIR + '/data/services.json', (err, data)=>{
	console.log('read data from file services.json : ', err||data)
	process.API_SERVICES = JSON.parse(data.toString())
	console.log('process.API_SERVICES:', process.API_SERVICES)
})

module.exports.services = (req, res, next)=>{

	console.log('METHOD : ', req.method)
	console.log('Content-Type: ',req.get('Content-Type'))
	console.log('req.body : ', req.body)

	let qroot = req.originalUrl.split('/')[1]
	let api = process.API_SERVICES[qroot]
	let content_type = req.get('Content-Type')
	let	options = {
				hostname: api.host,
				port: api.port,
				path: req.originalUrl,
				method: req.method
			}
	let postData = {}



	switch(content_type){
		case 'text/xml':
			postData = req.body
			break;
		case 'application/json':
			postData = JSON.stringify(req.body)
			break;
	}

	switch(req.method){

		case 'POST':
			options.headers = {
				'Content-Type': content_type,
				'Content-Length': postData.length
			}
			break;

		case 'GET':
			postData = querystring.stringify(req.body)
			// options = {
			// 	hostname: api.host,
			// 	port: api.port,
			// 	path: req.originalUrl,
			// 	method: req.method
			// }
			break;

		case 'PUT':
			options.headers = {
				'Content-Type': content_type,
				'Content-Length': postData.length
			}
			break;

		case 'DELETE':
			options.headers = {
				'Content-Type': content_type,
				'Content-Length': postData.length
			}
			break;

		default:
			break;
	}


	console.log('Requesting with options : ', options)

	let APIreq = http.request(options, (APIres)=>{
		APIres.on('data', (data_buffer)=>{
			res.write(data_buffer)
		})
		APIres.on('end', ()=>{res.end()})
	})

		APIreq.on('error', (e)=>{
			console.log('Error when request api services')
			return false
		})

		if(req.method!='GET'){
			console.log('request data: ', postData)
			APIreq.end(postData)
		}else{
			APIreq.end()
		}


}
