/**
 * Require Dependancies
 */
var BaseProcessor 	= require("../base/processor.js"),
	util 		= require("util");

/**
 * base input class
 */
function TimestampProcessor() {
	/**
	 * Call the parent constructor
	 */
	BaseProcessor.call(this, "timestamp");

}
util.inherits(TimestampProcessor, BaseProcessor);

/**
 * Process function
 * @param  {Notification}   notification Notification Object
 * @param  {Function} callback     Callback once processing is complete
 */
TimestampProcessor.prototype.process = function(notification, callback) {
	/**
	 * Assign the timestamp
	 */
	notification.addProperty("received", (new Date()).getTime());

	/**
	 * Complete the process
	 */
	callback();
};

/**
 * Export the Module
 * @type {BaseOutput}
 */
module.exports = TimestampProcessor;