const { AstronClient } = require("./AstronClient");

/**
 * The configuration options for the client.
 */
class Configuration {
    /**
     * The configuration options for the client.
     * @param {AstronClient} client 
     * @param {import("../../index").ConfigurationOptions} configurationOptions
     */
    constructor(client, configurationOptions = {
        token: new Error("[ AstronClient ] Error: Configuration option 'token' is not set."),
        owners: new Error("[ AstronClient ] Error: Configuration option 'owners' is not set."),
        defaultPrefix: new Error("[ AstronClient ] Error: Configuration option 'defaultPrefix' is not set."),
        version: new Error("[ AstronClient ] Error: Configuration option 'version' is not set.")
    }) {
        
        /**
         * The Astron client.
         * @type {AstronClient}
         */
        this.client = client;

        /**
         * The token required to log into the client.
         * @type {string}
         */
        this.token = configurationOptions.token;

        /**
         * The id/array of ids of the owners of the bot.
         * @type {string | string[]}
         */
        this.owners = configurationOptions.owners;

        /**
         * The default prefix for triggering commands.
         * @type {string}
         */
        this.defaultPrefix = configurationOptions.defaultPrefix;

        /**
         * The current version of the client.
         * @type {string}
         */
        this.version = configurationOptions.version;
    };
};

module.exports.Configuration = Configuration;