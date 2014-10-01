/**
 * Http based input
 */

/**
 * Make sure we have express installed
 */
try{
	console.log(require.resolve("express"));
}catch(e){ console.error("express module required for http input, please install."); process.exit(1); }

try{
	console.log(require.resolve("body-parser"));
}catch(e){ console.error("express module body-parser required for http input, please install."); process.exit(1); }

/**
 * Load dependancies
 */
var BaseInput	= require("../base/input.js"),
	util 		= require("util"),
	express		= require("express"),
	bodyParser 	= require("body-parser");

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
	this.server.use(bodyParser.json());	// to support JSON-encoded bodies

	/**
	 * Configure routes
	 */
	this.server.get("/", function(req, res){ res.json({message: "Notification HTTP Input server running"}); });

	/**
	 * Retrive a notificaion
	 */
	this.server.post("/notificaion", this.onNotification);

	/**
	 * Extend the options
	 * @todo extend options witha base options object
	 */
	this.server.listen(8090);
}
util.inherits(HttpInput, BaseInput);

HttpInput.prototype.onNotification = function(req, res) {

	/**
	 * Check for a notification object
	 */
	if(!req.body || Object.keys(req.body).length === 0) {
		res.json({message: "Notification required, please post a JSON object as the body!."});
	}

	/**
	 * Validate the notificaiton object
	 */
};

/**
 * Export the object
 */
module.exports = HttpInput;