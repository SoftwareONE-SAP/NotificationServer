/**
 * Load the system up
 */
var Notifications = require("../../");

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

/**
 * Register the console output handler
 */
notifications.registerOutput(new Notifications.outputs.console());

/**
 * Start the notifications system
 */
notifications.start();