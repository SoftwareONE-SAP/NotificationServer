/**
 * Http based input
 */

/**
 * Load dependancies
 */
var BaseInput		= require("../base/input.js"),
	Notification	= require("../notification.js"),
	util 			= require("util"),
	merge 			= require("merge"),
	net				= require("net"),
	debug 			= require("debug")("notifications:input:socket");

/**
 * SocketInput class
 * @param {Object} options SocketInput Options
 */
function SocketInput(options) {
	/**
	 * Call the parent coonstructor
	 */
	BaseInput.call(this);

	/**
	 * Set the options
	 */
	this.options = merge.recursive({
		/**
		 * Listen port, this can be a socket path as well
		 * @type {String}
		 */
		port : "/tmp/notificaitons.sock"
	}, options);

	/**
	 * Create a new server
	 */
	this.server = net.createServer(this.onConnection.bind(this));
};
util.inherits(SocketInput, BaseInput);

/**
 * Initialization
 */
SocketInput.prototype.initialize = function() {
	debug("initializing scoket server via %s", this.options.port);

	/**
	 * Extend the options
	 * @todo extend options witha base options object
	 */
	this.server.listen(this.options.port, this.onServerReady.bind(this));
};

/**
 * On notificaiton post
 * @param  {Request} req Request Object
 * @param  {Response} res Response Object
 */
SocketInput.prototype.onConnection = function(connection) {
	debug("Receiving connection.");

	/**
	 * Payload (outer scope)
	 */
	var data;

	connection.on("data", function(packet){
		data = packet;
	});

	/**
	 * Start listening for a json object
	 */
	connection.on("close", function(){
		debug("Processing notification");

		/**
		 * Decode the payload
		 */
		if(!data){
			return debug("No notification received!");
		}

		/**
		 * parse the JSON payload
		 * @type {Object}
		 */
		var payload = JSON.parse(data);

		/**
		 * Valdiate we have a JSON object
		 */
		if(!payload)
			return debug("Invalid JSON object received!");

		/**
		 * Create a new notifications object
		 */
		try
		{
			/**
			 * Create the notification object
			 * @type {Notification}
			 */
			var notification = new Notification(payload);

			/**
			 * Add the source
			 */
			notification.addProperty("source", "socket");

			/**
			 * Emit the notification object to the core
			 */
			this.emit("notification", notification);
		} catch(e) {
			return debug("Error: %s", e.message);
		}
	}.bind(this));

};

SocketInput.prototype.onServerReady = function() {
	debug("Server listening on: %s", this.options.port);
};
/**
 * Export the object
 */
module.exports = SocketInput;