/**
 * Load dependancies
 */
var BaseOutput		= require("../base/output.js"),
	debug 			= require("debug")("notifications:output:console"),
	util 			= require("util");

/**
 * ConsoleOutput class
 * @param {Object} options Console Output Options
 */
function ConsoleOutput(options) {
	/**
	 * Call the parent constructor
	 */
	BaseOutput.call(this);
};

/**
 * Inherit the {BaseOutput}
 */
util.inherits(ConsoleOutput, BaseOutput);

/**
 * Dispatch the notificaiton to the console
 * @param  {Notification} notification Notificaiton Object
 */
ConsoleOutput.prototype.dispatch = function(notification) {
	debug("Notification: %s ", JSON.stringify(notification));
};

/**
 * Export thje ConsoleOutput
 * @type {ConsolePOutput}
 */
module.exports = ConsoleOutput;