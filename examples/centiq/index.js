/**
 * Load the system up
 */
var Notifications 		= require("../../"),
	SirportlyOutput 	= require("./outputs/sirportly.js"),
	AccountProcessor 	= require("./processors/account.js");

/**
 * Create a new Notification Handler
 */
var notifications = new Notifications();

/**
 * Register a http interface listening on a specific port
 */
notifications.registerInput(new Notifications.inputs.http({
	port : 8090
}));

/**
 * Add the socket input endpoint for local json payloads
 */
notifications.registerInput(new Notifications.inputs.socket({
	port : 8091
}));

/**
 * Register the processors
 */
notifications.registerProcessor(new Notifications.processors.timestamp());
notifications.registerProcessor(new Notifications.processors.sanitize());
notifications.registerProcessor(new AccountProcessor());

/**
 * Register the console output handler
 */
notifications.registerOutput(new SirportlyOutput({
	uri 	: "http://dev-support.centiq.co.uk:8090",
	token  	: "e07ea360-5d45-ec98-e336-180496bd7b88",
	secret 	: "jw4yy5nehr6onzv2amqerv50f3qcy1v9rvox2smsdzcjjd2udd"
}));

/**
 * Register the console output handler
 */
notifications.registerOutput(new Notifications.outputs.console());

/**
 * Start the notifications system
 */
notifications.start();