/**
 * 
 */

var BaseInput 		= require("./base/input.js"),
	BaseOutput 		= require("./base/output.js"),
	BaseProcessor 	= require("./base/processor.js"),
	async 			= require("async"),
	debug 			= require("debug")("core");

/**
 * Core system
 */
function Core() {
	/**
	 * Started state
	 * @type {Number}
	 */
	this._state = Core.States.stopped;

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

	/**
	 * Process tree (topologically sorted)
	 * @type {Array}
	 */
	this._processors_tree = [];
}

/**
 * States for running state of Core
 * @type {Object}
 */
Core.States = {
	/**
	 * Stopped State
	 * @type {Number}
	 */
	stopped : 0,

	/**
	 * Starting State
	 * @type {Number}
	 */
	starting : 1,

	/**
	 * Started State
	 * @type {Number}
	 */
	started : 2
};

/**
 * Handles a notificaiton object from a {BaseInput} class
 * @param  {Notification} notification
 */
Core.prototype.handleInputNotification = function(notification) {
	/**
	 * Push them into the process tree
	 */
	for (var i = this.processors.length - 1; i >= 0; i--) {
		console.log(this.processors[i]._ident);
	};
};

/**
 * Register an input handler
 * @param  {BaseInput} input Input Handler
 */
Core.prototype.registerInput = function(input) {
	if(this._state !== Core.States.stopped)
		throw new Error("Unable to register input during runtime");

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

/**
 * Register an output handler
 * @param  {BaseOutput} output Output Handler
 */
Core.prototype.registerOutput = function(output) {
	if(this._state !== Core.States.stopped)
		throw new Error("Unable to register output during runtime");

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
	 * Register the output
	 */
	this.outputs.push(output);
};

/**
 * Register an output handler
 * @param  {BaseOutput} input output Handler
 */
Core.prototype.registerProcessor = function(processor) {
	if(this._state !== Core.States.stopped)
		throw new Error("Unable to register processor during runtime");

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
	this.processors.push(processor);
};

/**
 * Sort processors
 */
core.prototype._sortProcessors = function() {
};

/**
 * Start the core management class
 */
Core.prototype.start = function() {
	if(this._state !== Core.States.stopped) {
		throw new Error("Core is currently started, ");
	}

	/**
	 * Set the state to pending
	 */
	this._state = Core.States.starting;

	/**
	 * We need to topologically sort the processors for dependancy
	 * tree.
	 */
	this._sortProcessors();

	/**
	 * Initialize all the input handlers
	 */
	for (var i = this.inputs.length - 1; i >= 0; i--) {
		this.inputs[i].initialize();
	};
};

/**
 * Export the core module
 * @type {Core}
 */
module.exports = Core;