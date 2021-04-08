const { Client, ClientOptions } = require("discord.js"); // Importing the Client class from the discord.js module to act as a base client
const { CommandHandler } = require("../handlers/CommandHandler");
const { Configuration } = require("../client/Config");
const { ListenerHandler } = require("../handlers/ListenerHandler");
const { Utilities } = require("../util/Utilities");

/**
 * The main discord-astron class, extended from the discord.js Client. 
*/
class AstronClient extends Client { 
    /**
     * The main discord-astron class, extended from the discord.js Client. 
     * @param {import("discord-astron").ConfigurationOptions} configurationOptions The configuration options
     * @param {import("discord-astron").ConfigurationOptions} commandHandlerOptions The command handler options
     * @param {import("discord-astron").ListenerHandlerOptions} listenerHandlerOptions The listener handler options
     * @param {any} db The database for the client
     * @param {ClientOptions} [clientOptions] The discord.js client options
     */
    constructor(configurationOptions, commandHandlerOptions, listenerHandlerOptions, db, clientOptions) {
        super(clientOptions);

        /**
         * The configuration options for the client.
         * @param {AstronClient} client The AstronClient
         * @param {string} token The token required to login to the client
         * @param {string} defaultPrefix The default prefix for commands
         * @param {string} version The version of the client
         * @param {string | string[]} owners The id/array of ids of the owners of the client
         * @type {Configuration}
         */
        this.config = new Configuration(this, {
            token: configurationOptions.token || new Error("[ AstronClient ] Error: Configuration option \"token\" is not set."),
            owners: configurationOptions.owners || new Error("[ AstronClient ] Error: Configuration option \"owners\" is not set."),
            defaultPrefix: configurationOptions.defaultPrefix || new Error("[ AstronClient ] Error: Configuration option \"defaultPrefix\" is not set."),
            version: configurationOptions.version || new Error("[ AstronClient ] Error: Configuration option \"version\" is not set."),
        }) || new Error("[ AstronClient ] Error: No configuration options were provided.");

        /**
         * The utility object containing useful properties and functions.
         * @param {AstronClient} client The AstronClient
         * @type {Utilities}
         */
        this.util = new Utilities(this);

        /**
         * The command handler for running/executing commands, as well as running permisison and cooldown checks.
         * @param {AstronClient} client The AstronClient
         * @param {string} directory The command folder directory (directory of commands to be run)
         * @param {string | Function} prefix The prefix to be used when running commands
         * @param {boolean} blockBots Deteremines whether to block other bots from running commands
         * @param {boolean} allowDirectMessages Deteremines whether commands can be run in direct message channels
         * @param {boolean} allowMention Deteremines whether mention prefixes are allowed when running commands
         * @param {string | Function} directMessageWarning The message to send to a user when a dm only command is run in a guild
         * @param {string | Function} guildOnlyWarning The message to send to a user when a guild only command is run in a dm channel
         * @param {string | Function} ownerOnlyWarning The message to send upon a non-user running a owner-only command
         * @param {string | Function} missingSendPermissions The message to send upon a user running a command in a guild in which the client is missing the SEND_MESSAGES permission
         * @param {string | Function} clientPermissionsMissing The message to send upon a user running a command in a guild in which the client is missing certain permissions required to run the command
         * @param {string | Function} userPermissionsMissing The message to send upon a user running a command in a guild in which the user is missing certain permisisons required to run the command
         * @param {string | Function} cooldownWarning The message to send upon a user running command in which the user is exceeding the command cooldown
         * @type {CommandHandler}
         */
        this.commandHandler = new CommandHandler(this, {
            directory: commandHandlerOptions.directory || new Error("[ AstronClient ] Error: Command handler option \"directory\" is not set."),
            prefix: commandHandlerOptions.prefix || new Error("[ AstronClient ] Error: Command handler option \"prefix\" is not set."),
            blockBots: commandHandlerOptions.blockBots || new Error("[ AstronClient ] Error: Command handler option \"blockBots\" is not set."),
            allowDirectMessages: commandHandlerOptions.allowDirectMessages || new Error("[ AstronClient ] Error: Command handler option \"allowDirectMessages\" is not set."),
            allowMention: commandHandlerOptions.allowMention || new Error("[ AstronClient ] Error: Command handler option \"allowMention\" is not set."),
            directMessageWarning: commandHandlerOptions.directMessageWarning || new Error("[ AstronClient ] Error: Command handler option \"directMessageWarning\" is not set."),
            guildOnlyWarning: commandHandlerOptions.guildOnlyWarning || new Error("[ AstronClient ] Error: Command handler option \"guildOnlyWarning\" is not set."),
            ownerOnlyWarning: commandHandlerOptions.ownerOnlyWarning || new Error("[ AstronClient ] Error: Command handler option \"ownerOnlyWarning\" is not set."),
            missingSendPermissions: commandHandlerOptions.missingSendPermissions || new Error("[ AstronClient ] Error: Command handler option \"missingSendPermissions\" is not set."),
            clientPermissionsMissing: commandHandlerOptions.clientPermissionsMissing || new Error("[ AstronClient ] Error: Command handler option \"clientPermissionsMissing\" is not set."),
            userPermissionsMissing: commandHandlerOptions.userPermissionsMissing || new Error("[ AstronClient ] Error: Command handler option \"userPermissionsMissing\" is not set."),
            cooldownWarning: commandHandlerOptions.cooldownWarning || new Error("[ AstronClient ] Error: Command handler option \"cooldownWarning\" is not set."),
        }) || new Error("[ AstronClient ] Error: No command handler was provided.");

        /**
         * The listener handler for managing and triggering discord.js events.
         * @param {AstronClient} client The AstronClient    
         * @param {string} directory The listener folder directory (directory of events to be run)
         * @type {ListenerHandler}
         */
        this.listenerHandler = new ListenerHandler(this, {
            directory: listenerHandlerOptions.directory || new Error("[ AstronClient ] Error: Listener handler option \"directory\" is not set."),
        }) || new Error("[ AstronClient ] Error: No listener handler was provided.");

        /**
         * The database for the client. This option is optional.
         * @type {any}
         */
        this.db = db || new Error("[ AstronClient ] Error: No database was provided.");

        /**
         * Loads the command handler and listener handler for the client. Throws an error if commandHandler and listenerHandler is not set.
         * @function 
         * @type {Promise<void>}
         * @returns
         */
        this.init = async () => {
            try {
                if (typeof this.commandHandler === Error) return console.log(this.commandHandler); // Checks if the command handler hasn't been assigned
                else this.commandHandler.load(); // Loads the command handler
                if (typeof this.listenerHandler === Error) return console.log(this.listenerHandler); // Checks if the listener handler hasn't been assigned
                else this.listenerHandler.load(); // Loads the listener handler
            } catch (err) { return console.log(`[ AstronClient ] ${err.stack}`); }; // Error checking
        }; 

        /**
         * Calls the init method and logs into the websocket client. Throws an error if util property isn't assigned a value.
         * @function
         * @type {Promise<string | void>}
         * @returns 
         */
        this.start = async () => {
            try {
                await this.init(); // Calls the init function
                return typeof this.config === Error ? console.log(this.config) : this.login(this.config.token); // Checks if the configuration property has been configured and logs into the websocket client
            } catch (err) { return console.log(`[ AstronClient ] ${err.stack}`); }; // Error checking
        };
    };
};

module.exports.AstronClient = AstronClient; // Exporting the AstronClient class