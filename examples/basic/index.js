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