/**
 * Http based input
 */

/**
 * Load dependancies
 */
var BaseInput		= require("../base/input.js"),
	Notification	= require("../notification.js"),
	util 			= require("util"),
	express			= require("express"),
	merge 			= require("merge"),
	debug 			= require("debug")("notifications:input:http"),
	bodyParser 		= require("body-parser");

/**
 * HttpInput class
 * @param {Object} options HttpInput Options
 */
function HttpInput(options) {
	/**
	 * Call the parent coonstructor
	 */
	BaseInput.call(this);

	/**
	 * Set the options
	 */
	this.options = merge.recursive({

		// Default Options
		port : 8090

	}, options);

	/**
	 * Create a new express app server
	 */
	this.server = express();

	/**
	 * Configure middleware utilites
	 */
	this.server.use(bodyParser.urlencoded({ extended: false }));
	this.server.use(bodyParser.json());	// to support JSON-encoded bodies

	/**
	 * Configure routes
	 */
	this.server.get("/", function(req, res){ res.json({message: "Notification HTTP Input server running"}); });

	/**
	 * Retrive a notificaion
	 */
	this.server.post("/notification", this.onNotification.bind(this));
};
util.inherits(HttpInput, BaseInput);

/**
 * Initialization
 */
HttpInput.prototype.initialize = function() {
	debug("initializing http server on port %d", this.options.port);

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
HttpInput.prototype.onNotification = function(req, res) {
	debug("Receiving notification.");

	/**
	 * Check for a notification object
	 */
	if(!req.body || Object.keys(req.body).length === 0) {
		debug("Notificaiton Error, invalid object received");
		res.json({message: "Notification required, please post a JSON object as the body!."});
		return;
	}

	/**
	 * Validate the notification object
	 */
	try
	{
		var notification = new Notification(req.body);
	} catch(e) {
		res.json({debug: e.message});
		debug(e.message);
		return;
	}

	/**
	 * Add the source
	 */
	notification.addProperty("source", "http");

	/**
	 * emit the notification to the core
	 */
	this.emit("notification", notification, this);
	res.json({success: true});
};

/**
 * Server ready handler
 */
HttpInput.prototype.onServerReady = function() {
	debug("Server listing on: %s", this.options.port)
};

/**
 * Export the object
 */
module.exports = HttpInput;