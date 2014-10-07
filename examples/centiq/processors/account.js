/**
 * Require Dependancies
 */
var BaseProcessor 	= require("../../../lib/base/processor.js"),
	debug 			= require('debug')("notifications:processor:account"),
	mysql 			= require('mysql'),
	util 			= require("util");

/**
 * base input class
 */
function AccountProcessor(options) {
	/**
	 * Call the parent constructor
	 */
	BaseProcessor.call(this, "account");

	/**
	 * Create a persistant connection to mysql
	 */
	this.connection = mysql.createConnection({
		host     : '192.168.253.7',
		user     : 'platform',
		database : 'platform',
		password : 'pOWlVw*acath&lf8'
	});

	this.connection.connect(this.onMySQLConnect.bind(this));
}
util.inherits(AccountProcessor, BaseProcessor);

AccountProcessor.prototype.onMySQLConnect = function(error) {
	if(error)
		throw error;

	debug("MySQL Connected, thread: %s", this.connection.threadId);
};

/**
 * Process function
 * @param  {Notification}   notification Notification Object
 * @param  {Function} callback     Callback once processing is complete
 */
AccountProcessor.prototype.process = function(notification, callback) {
	/**
	 * Check to see if we have an account id within this notification
	 */
	if(notification.hasProperty("account_id")) {

		/**
		 * Fetch the account id
		 * @type {Number}
		 */
		var id = notification.getProperty("account_id");

		/**
		 * Fetch the account from the database
		 */
		this.connection.query('SELECT * FROM accounts WHERE id = ?', [id], function(err, results) {
			if(err)
				return callback(err);

			notification.addProperty("account", results[0]);
			callback();
		});
	}
	else
	{
		/**
		 * Complete the process
		 */
		callback();
	}
};

/**
 * Export the Module
 * @type {BaseOutput}
 */
module.exports = AccountProcessor;