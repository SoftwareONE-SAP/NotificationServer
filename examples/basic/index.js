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

notifications.registerInput(new Notifications.inputs.socket({
	port : 8091
}));

/**
 * Register a timestamp processor
 */
notifications.registerProcessor(new Notifications.processors.timestamp());

/**
 * Register the sanitize processor
 */
notifications.registerProcessor(new Notifications.processors.sanitize());

/**
 * Register the console output handler
 */
notifications.registerOutput(new Notifications.outputs.console());

/**
 * Start the notifications system
 */
notifications.start();