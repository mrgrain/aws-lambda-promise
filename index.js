'use strict';

/**
 * Create a λ run helper with the given handler.
 *
 * @param {string} file Path to the handler file.
 * @param {string} name Name of the exported handler.
 * @returns {Function}
 */
module.exports = function (file, name) {
    /**
     * Run the given handler.
     *
     * @param event
     * @param context
     * @returns {Promise}
     */
    return function (event, context) {
        // create handler only once it's executed
        const handler = require(file)[name];

        // Setup and return promise
        return new Promise(function (resolve, reject) {
            handler(event, context, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    };
};
