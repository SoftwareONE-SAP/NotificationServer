/**
 * Load dependancies
 */
var BaseOutput		= require("../base/output.js"),
	util 			= require("util");

/**
 * ConsoleOutput class
 * @param {Object} options Console Output Options
 */
function ConsoleOutput(options) {
	BaseOutput.call(this);
};
util.inherits(ConsoleOutput, BaseOutput);

ConsoleOutput.prototype.dispatch = function(notification) {
	console.log("Notification: " + notification.subject);
};

module.exports = ConsoleOutput;