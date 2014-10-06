/**
 * 
 */

var BaseInput 		= require("./base/input.js"),
	BaseOutput 		= require("./base/output.js"),
	BaseProcessor 	= require("./base/processor.js"),
	Toposort 		= require('toposort-class'),
	async 			= require("async"),
	debug 			= require("debug")("notifications:core");

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
	 * Create a scoped list of tasks to be perform async'ly
	 * @type {Array}
	 */
	var _tasks = [];

	/**
	 * Map the notification against each process in the tree and return the scope to
	 * async manager.
	 */
	for (var process in this._processors_tree) {
		_tasks.push(
			this._createProcessCallback(this._processors_tree[process], notification)
		);
	}

	/**
	 * Process the notification against all the 
	 * @return {[type]} [description]
	 */
	async.series(_tasks, function(){
		/**
		 * All tasks are processed, we can map the notification to the output handlers
		 * now, using async flow
		 *
		 * @todo Error handling from processors.
		 * @todo Error handling for output handlers.
		 * @todo State management.
		 */
		for (var i = this.outputs.length - 1; i >= 0; i--) {
			this.outputs[i].dispatch(notification);
		};
	}.bind(this));
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
Core.prototype._sortProcessors = function() {
	var t = new Toposort();

	/**
	 * Add all the processors
	 */
	for (var i = this.processors.length - 1; i >= 0; i--) {
		t.add(this.processors[i].getIdentifier(), this.processors[i].getDependancies());
	};

	/**
	 * Store a list of processors in their sorted order
	 * @type {[type]}
	 */
	var sorted = t.sort();

	/**
	 * Loop over hte elements and create a callback object for the tree
	 */
	for (var i = sorted.length - 1; i >= 0; i--) {
		var _current 	= sorted[i],
			_found 		= false;

		for (var e = this.processors.length - 1; e >= 0; e--) {
			if(_current == this.processors[e].getIdentifier())
				_found = this.processors[e];
		};

		if(_found === false)
			throw new Error(_current + " is a dependant of another processor but isnt loaded.!");

		this._processors_tree[_current] = _found;
	};
};

/**
 * Create a callback scope for a notifcation processor
 * @param  {BaseProcessor} 	processor    	Processor
 * @param  {Notification} 	notification 	Notification Object
 * @return {Function} 						Call function for async
 */
Core.prototype._createProcessCallback = function(processor, notification) {
	return function(callback){
		processor.process(notification, callback);
	}
};

/**
 * Start the core management class
 */
Core.prototype.start = function() {
	if(this._state !== Core.States.stopped) {
		throw new Error("Core is currently started.");
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