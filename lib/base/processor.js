/**
 * Notificaitions
 */
var EventEmitter 	= require('events').EventEmitter,
	util 			= require('util');

/**
 * base input class
 */
function BaseProcessor(identifier, dependancies) {
	/**
	 * Call the parent constructor
	 */
	EventEmitter.call(this);

	/**
	 * Validate the identifer
	 */
	if(!identifier){
		throw new Error("Processor identifier required.!")
	}

	/**
	 * Set the identifier
	 */
	this._ident = identifier;

	/**
	 * set the dependancies
	 */
	this._deps = (dependancies || ["*"]);
}
util.inherits(BaseProcessor, EventEmitter);

/**
 * Process the notification
 * @param  {Notification}   notificaition Notificaition Object
 * @param  {Function} callback      Callback when done
 */
BaseProcessor.prototype.process = function(notificaition, callback) {
	throw new Error(this.constructor.name + "::process must be implemented.!");
};

/**
 * Export the Module
 * @type {BaseProcessor}
 */
module.exports = BaseProcessor;