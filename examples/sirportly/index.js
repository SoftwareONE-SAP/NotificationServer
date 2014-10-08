/**
 * Load the system up
 */
var Notifications 	= require("../../"),
	SirportlyOutput = require("./outputs/sirportly.js");

/**
 * Create a new Notification Handler
 */
var notifications = new Notifications();

/**
 * Add the socket input endpoint for local json payloads
 */
notifications.registerInput(new Notifications.inputs.socket({
	port : 8091
}));

/**
 * Register the console output handler
 */
notifications.registerOutput(new SirportlyOutput({
	uri 	: "http://dev-support.centiq.co.uk:8090",
	token  	: "e07ea360-5d45-ec98-e336-180496bd7b88",
	secret 	: "jw4yy5nehr6onzv2amqerv50f3qcy1v9rvox2smsdzcjjd2udd"
}));

/**
 * basic console output
 */
//notifications.registerOutput(new Notifications.outputs.console());

/**
 * Start the notifications system
 */
notifications.start();