/**
 * Require Dependancies
 */
var BaseProcessor 	= require("../base/processor.js"),
	util 		= require("util");

/**
 * base input class
 */
function SanitizeProcessor() {
	/**
	 * Call the parent constructor
	 */
	BaseProcessor.call(this, "sanitize");
}
util.inherits(SanitizeProcessor, BaseProcessor);

/**
 * Process method
 * @param  {Notification}   notification Notification object
 * @param  {Function} callback     Callback when sanitization is complete
 */
SanitizeProcessor.prototype.process = function(notification, callback) {
	/**
	 * Clean short and long message
	 */
	notification.short_message = notification.short_message + " - [sanitized]";
	notification.long_message = notification.long_message + " - [sanitized]";

	/**
	 * Continue the tree
	 */
	callback();
};

/**
 * Export the Module
 * @type {BaseOutput}
 */
module.exports = SanitizeProcessor;