
function http_server(IP_server, filepath, filename, port, AllowedAddress) {

	// create certificates for https config:
	// openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
	// Common Name (e.g. server FQDN or YOUR name) []:localhost
	// openssl rsa -in keytmp.pem -out key.pem


	// export NODE_TLS_REJECT_UNAUTHORIZED='0'

	express = require('express')
	const app = express()
	const https = require("https")
	const fs = require("fs")

	// if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 4) {
	// 	console.log("\nSYNTAX HELP")
	// 	console.log("\nUsage: node http_server.js IP(server) filename.ext\n")
	// 	return
	// }

	const PORT = port
	const HOST = IP_server

	app.get('/', function (req, res) {

		console.log("\nRequest by " + req.ip)

		if (AllowedAddress == req.ip) {
			const file = `${__dirname}/transfer_resources/` + filepath + filename;
			res.download(file); // Set disposition and send it.
			console.log("\nRequest done by partner node: " + req.ip + " Transfering requested file: " + filepath + filename)
		}
		else console.log("\nRequest done by a not partner node")
		// server.close()

	});

	app.get('/quit', function (req, res) {
		res.send("Closing channel\n")
		server.close();
	})

	console.log("\nListening to " + HOST + ":" + PORT + " and waiting to send " + filepath + filename + '\n')

	const key = fs.readFileSync('./key.pem');

	const cert = fs.readFileSync('./cert.pem');

	var server = https.createServer({ key: key, cert: cert }, app);

	server = server.listen(PORT, HOST)

	return 200

}

module.exports = { http_server }



