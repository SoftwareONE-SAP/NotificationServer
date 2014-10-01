/**
 * 
 */

var BaseInput 		= require("./base/input.js"),
	BaseOutput 		= require("./base/output.js"),
	BaseProcessor 	= require("./base/processor.js"),
	debug 			= require("debug")("core");

/**
 * Core system
 */
function Core() {
	
	/**
	 * Input Handlers
	 * @type {Array}
	 */
	this.inputs = [];

	/**
	 * Outputs
	 * @type {Array}
	 */
	this.outputs = [];

	/**
	 * Processors
	 * @type {Array}
	 */
	this.processors = [];
}

/**
 * Register an input handler
 * @param  {BaseInput} input Input Handler
 */
Core.prototype.registerInput = function(input) {
	/**
	 * Detect the class name of hte object
	 * @type {String}
	 */
	var className = input.constructor.name;

	/**
	 * Validate it's a valid object
	 */
	if((input instanceof BaseInput) === false || className == "BaseInput") {
		throw new Error("Input must inherit BaseInput");
	}

	debug("Registering input: %s", className);

	/**
	 * Register events.
	 */
	input.on("notification", this.handleInputNotification.bind(this));

	/**
	 * Register the input
	 */
	this.inputs.push(input);
};

Core.prototype.handleInputNotification = function(notification) {
};

/**
 * Register an output handler
 * @param  {BaseOutput} input output Handler
 */
Core.prototype.registerOutput = function(output) {
	/**
	 * Detect the class name of hte object
	 * @type {[type]}
	 */
	var className = output.constructor.name;

	/**
	 * Validate it's a valid object
	 */
	if((output instanceof BaseOutput) === false || className == "BaseOutput") {
		throw new Error("Output must inherit BaseOutput");
	}

	debug("Registering output: %s", className);

	/**
	 * Register the input
	 */
	this.outputs.push(input);
};

/**
 * Register an output handler
 * @param  {BaseOutput} input output Handler
 */
Core.prototype.registerProcessor = function(processor) {
	/**
	 * Detect the class name of the object
	 * @type {[type]}
	 */
	var className = processor.constructor.name;

	/**
	 * Validate it's a valid object
	 */
	if((processor instanceof BaseProcessor) === false || className == "BaseProcessor") {
		throw new Error("Processor must inherit BaseProcessor");
	}

	debug("Registering processor: %s", className);

	/**
	 * Register the input
	 */
	this.processors.push(input);
};

/**
 * Export the core module
 * @type {Core}
 */
module.exports = Core;