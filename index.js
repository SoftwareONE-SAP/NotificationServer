/**
 * Notifications
 */

/**
 * Import the system core.
 * @type {Core}
 */
exports = module.exports = require("./lib/router.js");

/**
 * Stock Innputs
 * @type {Object}
 */
exports.outputs = require("./lib/outputs/");

/**
 * Stock Inputs
 * @type {Object}
 */
exports.inputs = require("./lib/inputs/");

/**
 * Stock processors
 * @type {Object}
 */
exports.processors = require("./lib/processors/");

/**
 * Export the base processor
 * @type {BaseProcessor}
 */
exports.BaseProcessor = require("./lib/base/processor.js");

/**
 * Export the base input
 * @type {BaseInput}
 */
exports.BaseInput = require("./lib/base/input.js");

/**
 * Export the base output
 * @type {BaseOutput}
 */
exports.BaseOutput = require("./lib/base/output.js");