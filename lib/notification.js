/**
 * Require Dependnacies
 */
var merge = require("merge");

/**
 * Base notification object
 * @param {Object} notification Data to extrac the notification infomration from
 */
function Notification(notification) {
	/**
	 * Varify the notification has the minimum keys
	 */
	['subject', 'content'].forEach(function(k, i, d) {
		if(!(k in notification)) throw new Error("Notification error: vlaue of {" + k + "} required!");
	});

	/**
	 * List of recipients
	 * @type {Array}
	 */
	this.recipients = [];

	/**
	 * Subject (max 255 chars)
	 * @type {String}
	 */
	this.subject = notification.subject;

	/**
	 * Notification Content
	 * @type {String}
	 */
	this.content = notification.content;

	/**
	 * Notification Priority
	 * @type {String}
	 */
	this.priority = Notification.PRIORITIES.DEFAULT;

	/**
	 * Check for a priroty override
	 */
	if(('priority' in notification) && (notification.priority.toLowerCase() in Notification.PRIORITIES)) {
		this.priority = Notification.PRIORITIES[notification.priority.toLowerCase()];
	}

	/**
	 * Properties
	 * @type {Object}
	 */
	this.properties = merge({
		source : "Unknown"
	}, notification.properties);
};

/**
 * Priorities ENUM
 * @type {Object}
 */
Notification.PRIORITIES = {
	/**
	 * Highest priority, for your application's most important items that require
	 * the user's prompt attention or input.
	 * @type {String}
	 */
	MAX: 		"max",

	/**
	 * Higher priority, for more important notifications or alerts.
	 * @type {String}
	 */
	HIGH: 		"high",

	/**
	 * Default "normal" notification priority.
	 * @type {String}
	 */
	DEFAULT: 	"normal",

	/**
	 * Lower priority, for items that are less important.
	 * @type {String}
	 */
	LOW: 		"low",

	/**
	 * Minimum priority.
	 * @type {String}
	 */
	MIN: 		"min"
};

/**
 * Add a property to the notification
 * @param {String} 	key 	Index of the property
 * @param {*} 		value 	value of the property
 */
Notification.prototype.addProperty = function(key, value) {
	this.properties[key] = value;
};

/**
 * Add a property to the notification
 * @param {String} 	key 	Index of the property
 * @param {*} 		value 	value of the property
 */
Notification.prototype.getProperty = function(key) {
	return this.properties[key];
};

/**
 * Check to see if the notification has a property
 * @param  {String}  key Index of the property
 * @return {Boolean}
 */
Notification.prototype.hasProperty = function(key) {
	return (key in this.properties);
};

/**
 * Remove a property from the notification object if it exists
 * @param  {Stirng} key Index of the property
 */
Notification.prototype.removeProperty = function(key) {
	if(this.hasProperty(key))
		delete this.properties[key];
};

/**
 * Export the notificaiton object
 */
module.exports = Notification;