(function() {
	"use strict";

	const envConfig = require("/secrets/pa_webhooks/envConfig");
	const env = envConfig.environment;
	process.env.NODE_ENV = env || "local";
	process.env.PORT = process.env.PORT || 3008;
	process.env.HOST = `${envConfig.PA_service.admin[env].host}` || "127.0.0.1";

	let config = {
		web_server: {
			host: `${envConfig.PA_service.admin[env].host}` || "127.0.0.1",
			port: `${envConfig.PA_service.admin[env].port}`
		},
		database: {
			connect_uri: `${envConfig.PA_service.admin[env].mongo}`
		},
		jwt_secret: envConfig.PA_service.admin[env].jwt_secret
	};

	if (process.env.NODE_ENV === "production") {
		config = {
			web_server: {
				host: `${envConfig.PA_service.admin[env].host}` || "127.0.0.1",
				port: `${envConfig.PA_service.admin[env].port}`
			},
			database: {
				connect_uri: `${envConfig.PA_service.admin[env].mongo}`
			},
			jwt_secret: envConfig.PA_service.admin[env].jwt_secret
		};
	}

	config.web_server.url =
		"http://" + config.web_server.host + ":" + config.web_server.port + "/";

	console.log("Config Environment : " + process.env.NODE_ENV);
	console.log("Config Host : " + process.env.HOST);

	module.exports = config;
})();
