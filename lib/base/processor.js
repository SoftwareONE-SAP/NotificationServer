/**
 * Notificaitions
 */
var EventEmitter 	= require('events').EventEmitter,
	util 			= require('util');

/**
 * base input class
 */
function BaseProcessor() {
	/**
	 * Call the parent constructor
	 */
	EventEmitter.call(this)
}
util.inherits(BaseProcessor, EventEmitter);

/**
 * Export the Module
 * @type {BaseProcessor}
 */
module.exports = BaseProcessor;