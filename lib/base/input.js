/**
 * Notificaitions
 */
var EventEmitter 	= require('events').EventEmitter,
	util 			= require('util');

/**
 * base input class
 */
function BaseInput() {
	/**
	 * Call the parent constructor
	 */
	EventEmitter.call(this);
}
util.inherits(BaseInput, EventEmitter);

/**
 * Export the Module
 * @type {BaseInput}
 */
module.exports = BaseInput;