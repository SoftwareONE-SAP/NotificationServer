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

BaseOutput.prototype.dispatch = function(notification) {
	throw new Error(this.constructor.name + "::dispatch method not present");
};

/**
 * Export the Module
 * @type {BaseOutput}
 */
module.exports = BaseOutput;