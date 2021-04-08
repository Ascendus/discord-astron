const { AstronClient } = require("../client/AstronClient");
const { readdirSync } = require("fs");

/**
 * The event listener manager, which triggers event listeners via the Astron client. Saves all listeners to a discord.js collection.
 */
class ListenerHandler {
    /**
     * The event listener manager, which triggers event listeners via the Astron client. Saves all listeners to a discord.js collection.
     * @param {AstronClient} client The Astron client
     * @param {import("discord-astron").ListenerHandlerOptions} options The options for the listener handler
    */ 
    constructor(client, options) {

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        this.client = client;       

        /**
         * The directory of event listeners.
         * @type {string}
         */
        this.directory = options.directory;

        /**
         * Fetches all event listener files via the directory and saves them a discord.js collection, then executes them.
         * @async
         * @param {any[]} [args] The event listener parameters
         * @type {Promise<void>}
         */
        this.load = async () => {
            for (const events of readdirSync(this.directory)) {
                const event = require(`${this.directory}/${events}`);
                this.client.on(`${new event().name.toString().toLowerCase()}`, new event().exec.bind(null, this.client));
            };
        
            console.log(`${client.util.time()} | [ Event Handler ] Loaded ${readdirSync(this.directory).length} event(s)`);
        };
    };
};

module.exports.ListenerHandler = ListenerHandler;