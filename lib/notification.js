/**
 * Base notification object
 * @param {Object} data Data to extrac the notification infomration from
 */
function Notification(data) {
	/**
	 * Varify the data has the minimum keys
	 */
	['subject', 'short_message', 'long_message'].forEach(function(k, i, d){
		if(!(k in data)) throw new Error("Notification error: vlaue of {" + k + "} required!");
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
	this.subject = data['subject'];

	/**
	 * Short message
	 * @type {String}
	 */
	this.short_message 	= data['short_message'];

	/**
	 * Long Message
	 * @type {String}
	 */
	this.long_message	= data['long_message'];

	/**
	 * Properties
	 * @type {Object}
	 */
	this.properties = {
		source : "Unknown"
	};
}

/**
 * Add a property to the notification
 * @param {String} 	key 	Index of the property
 * @param {*} 		value 	value of the property
 */
Notification.prototype.addProperty = function(key, value) {
	this.properties[key] = value;
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