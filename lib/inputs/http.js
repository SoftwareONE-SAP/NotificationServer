/**
 * Http based input
 */

/**
 * Make sure we have express installed
 */
try{
	require.resolve("express");
}catch(e){ console.error("express module required for http input, please install."); process.exit(1); }

try{
	require.resolve("body-parser");
}catch(e){ console.error("express module body-parser required for http input, please install."); process.exit(1); }

/**
 * Load dependancies
 */
var BaseInput		= require("../base/input.js"),
	Notification	= require("../notification.js"),
	util 			= require("util"),
	express			= require("express"),
	debug 			= require("debug")("input:http"),
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
	debug("initializing http server");

	/**
	 * Extend the options
	 * @todo extend options witha base options object
	 */
	this.server.listen(8090);
};

/**
 * On notificaiton post
 * @param  {Request} req Request Object
 * @param  {Response} res Response Object
 */
HttpInput.prototype.onNotification = function(req, res) {

	/**
	 * Check for a notification object
	 */
	if(!req.body || Object.keys(req.body).length === 0) {
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
		res.json({error: e.message});
		return;
	}

	/**
	 * emit the notification to the core
	 */
	this.emit("notification", notification, this);
	res.json({success: true});
};

/**
 * Export the object
 */
module.exports = HttpInput;