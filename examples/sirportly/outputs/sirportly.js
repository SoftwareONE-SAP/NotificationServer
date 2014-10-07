/**
 * Load dependancies
 */
var BaseOutput		= require("../../../lib/base/output.js"),
	debug 			= require("debug")("notifications:output:sirportly"),
	merge 			= require("merge"),
	request 		= require("request"),
	querystring 	= require('querystring'),
	util 			= require("util");

/**
 * SirportlyOutput class
 * @param {Object} options Console Output Options
 */
function SirportlyOutput(options) {
	/**
	 * Call the parent constructor
	 */
	BaseOutput.call(this);

	["uri", "token", "secret"].forEach(function(k){
		if(!(k in options))
			throw new Error("Sirportly configuration error, {" + k + "} required.");
	});

	/**
	 * Set the options
	 */
	this.options = merge.recursive({
		uri		: null,
		token 	: null,
		secret	: null
	}, options);
};

/**
 * Inherit the {BaseOutput}
 */
util.inherits(SirportlyOutput, BaseOutput);

/**
 * Dispatch the notificaiton to the console
 * @param  {Notification} notification Notificaiton Object
 */
SirportlyOutput.prototype.dispatch = function(notification) {

	request.post(this.options.uri + "/api/v2/tickets/submit", {
		headers : {
			"X-Auth-Token" 	: this.options.token,
			"X-Auth-Secret" : this.options.secret
		},
		form: {
			subject		: notification.subject,
			department 	: "Oauth",
			priority 	: "3 (Low)",
			status 		: "New",
			sla 		: "Working Hours",
			team		: "Development Team",
			brand 		: "Centiq",
			contact_method_type : "email",
			contact_method_data : "sample@centiq.co.uk",
			contact_name 		: "Sample"
		}
	}, function(error, incoming, body){
		if(incoming.statusCode != 201) {
			return console.error(body);
		}

		debug("Ticket created: %s", JSON.parse(body).reference);

		/**
		 * If we have along body we should post that as a update
		 * @type {}
		 */
	});
};

/**
 * Export thje SirportlyOutput
 * @type {ConsolePOutput}
 */
module.exports = SirportlyOutput;