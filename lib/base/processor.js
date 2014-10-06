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
	this._deps = (dependancies || []);
}
util.inherits(BaseProcessor, EventEmitter);

/**
 * Get the identifer
 * @return {String} Process Identifier.
 */
BaseProcessor.prototype.getIdentifier = function() {
	return this._ident;
};

/**
 * Return the dependancies
 * @return {Array} Array of dependancies
 */
BaseProcessor.prototype.getDependancies = function() {
	return this._deps;
};

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