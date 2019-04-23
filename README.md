# Endpoints Gateway

 Forward requests to registered endpoints. Forward responses to clients. Registered endpoints are stored in /data/service.json

 
Configure endpoints in the following format:
```json
{
	"endpoint1": { "host": "localhost", "port": "0000" },
	"endpoint2": { "host": "http://somedomain.com", "port": "1111" },
	"endpoint3" : { "host": "http://yourdomain.com", "port": "2222" },
	"endpoint4" : { "host": "localhost", "port": "3333" }
}
```
