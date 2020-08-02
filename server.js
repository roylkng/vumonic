try {
	const express = require("express");
	const cors = require("cors");
	const bodyParser = require('body-parser');
	const session = require('express-session');
	const cookieParser = require('cookie-parser');
	const routes = require("./routes");
	const jwt = require("./_helpers/jwt");
	const secretKey = require("./config/config").secretKey;
	const errorHandler = require("./_helpers/error-handler");


	const http = require('http');
	const app = express();

	app.set('port', process.env.PORT || 8000);
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cors());
	app.use(cookieParser(secretKey));
	app.use(session({
		secret: secretKey,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	  }));
	app.use((err, req, res, next) => {
		if (err) {
			console.log("request error occured");
			if (err instanceof SyntaxError) {
				console.log("Syntax error: ", err);
				return res.status(400).send({
					success: false,
					response: {
						message: "Incorrect request data"
					}
				});
			}
			console.log("Internal error occured", err);
			return res.status(500).send({
				success: false,
				response: {
					message: "Internal error occured"
				}
			});
		}
		return next();
	});
	

	// check if app is running
	app.get("/health", (req, res) => {
		console.log("success");
		res.end('Success');
	});

	// use JWT auth to secure the api
	app.use(jwt());

	// global error handler
	app.use(errorHandler);

	// api routes
	// console.log(routes.toString());
	routes(app);

	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express HTTPS server listening on port ' + app.get('port'));
	});
} catch (err) {
	console.log(err)
}