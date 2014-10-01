/**
 * 
 */

/**
 * Base notification object
 * @param {Object} data Data to extrac the notification infomration from
 */
function Notification(data) {
	/**
	 * Varify the data has the minimum keys
	 */
	['subject', 'short_message', 'long_message'].forEach(function(k, i, d){
		if(!data[k]) throw new Error("Notification error: vlaue of {" + k + "} required!");
	});

	/**
	 * List of recipients
	 * @type {Array}
	 */
	this.recipients = [];

	/**
	 * Received timestamp
	 */
	this.received_at = (new Date()).getTime();

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
	this.long_message 	= data['long_message'];
}

/**
 * Export the notificaiton object
 */
module.exports = Notification;