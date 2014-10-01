/**
 * Notificaitions
 */
var EventEmitter 	= require('events').EventEmitter,
	util 			= require('util');


/**
 * base input class
 */
function BaseOutput() {
	/**
	 * Call the parent constructor
	 */
	EventEmitter.call(this)
}
util.inherits(BaseOutput, EventEmitter);

/**
 * Export the Module
 * @type {BaseOutput}
 */
module.exports = BaseOutput;