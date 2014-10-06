/**
 * Load the system up
 */
var Notifications = require("../../");

/**
 * Create a new Notification Handler
 */
var core = new Notifications();

/**
 * Register the input handlers
 */
core.registerInput(new Notifications.inputs.http());

/**
 * Register the processors
 */
core.registerProcessor(new Notifications.processors.timestamp());

/**
 * Register the output handlers
 */
core.registerOutput(new Notifications.outputs.console());

/**
 * Start the core tasks
 */
core.start();