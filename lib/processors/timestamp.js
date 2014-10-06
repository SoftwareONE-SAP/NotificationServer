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
 * Export the Module
 * @type {BaseOutput}
 */
module.exports = TimestampProcessor;