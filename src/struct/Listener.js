const { AstronClient } = require("../client/AstronClient");

/**
 * Creates a new event listener triggered by the client.
 */
class Listener {
    /**
     * Creates a new event listener triggered by the client.
     * @param {import("discord-astron").ListenerOptions} listenerOptions The event listener options
     */
    constructor(id = new Error("[ AstronClient ] Error: No id was provided for an event listener."),
        listenerOptions = {
            name: new Error("[ AstronClient ] Error: No name was provided for an event listener."),
            emitter: new Error("[ AstronClient ] Error: No emitter was provided for an event listener."),
            category: new Error("[ AstronClient ] Error: No category was provided for an event listener.")
        }) {

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        this.client = new AstronClient();

        /**
         * The id of the event listener.
         * @type {string}
         */
        this.id = id;

        /**
         * The name of the event listener.
         * @type {string}
         */
        this.name = listenerOptions.name;

        /**
         * The emitter for the event listener.
         * @type {string}
         */
        this.emitter = listenerOptions.emitter;

        /**
         * The event listener category.
         * @type {string}
         */
        this.category = listenerOptions.category;
    };

    /**
     * Executes the listener using the provided parameters. Throws an error if not used.
     */
    exec() {
        throw new Error(`[ AstronClient ] Error: Listener '${this.id}' exec function is empty.`);
    };
};

module.exports.Listener = Listener;