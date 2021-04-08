const { AstronClient } = require('../client/AstronClient');

/**
 * Creates a new command to be executed by the client.
 */
class Command {

    /**
     * Creates a new command to be executed by the client.
     * @param {string} id The command id
     * @param {import("discord-astron").CommandOptions} commandOptions The customizable options for the command
     */
    constructor(id = new Error("[ AstronClient ] Error: No command id was provided."),
        commandOptions = {
            aliases: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'aliases' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'aliases' option was not provided."),
            channel: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'channel' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'channel' option was not provided."),
            ownerOnly: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'ownerOnly' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'ownerOnly' option was not provided."),
            category: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'category' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'category' option was not provided."),
            cooldown: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'cooldown' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'cooldown' option was not provided."),
            description: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'description' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'description' option was not provided."),
            usage: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'usage' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'usage' option was not provided."),
            examples: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'examples' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'examples' option was not provided."),
            clientPermissions: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'clientPermissions' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'clientPermissions' option was not provided."),
            userPermissions: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'userPermissions' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'userPermissions' option was not provided."),
            ignoreCooldown: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'ignoreCooldown' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'ignoreCooldown' option was not provided."),
            ignorePermissions: typeof id === "string" ? new Error(`[ AstronClient ] Error: The 'ignorePermissions' option for the '${id}' command was not provided.`) : new Error("[ AstronClient ] Error: The 'ignorePermissions' option was not provided."),
        }) {

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        this.client = new AstronClient();

        /**
         * The id of the command.
         * @type {string}
         */
        this.commandID = String(id);

        /**
         * The id of the command.
         * @type {string}
         */
        this.id = String(id);

        /**
         * The name of the category for the command.
         * @type {string}
         */
        this.categoryID = String(commandOptions.category);

        /**
         * The aliase(es) for the command.
         * @type {string | string[]}
         */
        this.aliases = Array.isArray(commandOptions.aliases) ? commandOptions.aliases.join("\n") : commandOptions.aliases;

        /**
         * The type of channel the command is allowed to be used in.
         * @type {import("discord-astron").CommandChannels}
         */
        this.channel = String(commandOptions.channel);

        /**
         * Determines whether the command can only be used by an owner.
         * @type {boolean}
         */
        this.ownerOnly = Boolean(commandOptions.ownerOnly);

        /**
         * The time of cooldown for the command. 
         * @type {string | number}
         */
        this.cooldown = Number(commandOptions.cooldown);

        /**
         * The description of the command explaining what it is for and what it does.
         * @type {string}
         */
        this.description = Array.isArray(commandOptions.description) ? commandOptions.description.join("\n") : commandOptions.description;
            
        /**
         * Shows how the command should be used and its structure.
         * @type {string}
         */
        this.usage = String(commandOptions.usage);

        /**
         * Displays example(s) of how the command should be used.
         * @type {string | string[]}
         */
        this.examples = Array.isArray(commandOptions.examples) ? commandOptions.examples.join("\n") : commandOptions.examples;

        /**
         * The permissions required for the client in the current channel/guild to be able to run the command.
         * @type {string | string[]}
         */
        this.clientPermissions = Array.isArray(commandOptions.clientPermissions) ? commandOptions.clientPermissions.join("\n") : commandOptions.clientPermissions;

        /**
         * The permissions required for the user running the command in the current channel/guild to be able to run the command.
         * @type {string | string[]}
         */
        this.userPermissions = Array.isArray(commandOptions.userPermissions) ? commandOptions.userPermissions.join("\n") : commandOptions.clientPermissions;

        /**
         * The id/array of ids of users to be ignored when executing cooldown checks.
         * @type {string | string[]}
         */
        this.ignoreCooldown = Array.isArray(commandOptions.ignoreCooldown) ? commandOptions.ignoreCooldown.join("\n") : commandOptions.ignoreCooldown;

        /**
         * The id/array of ids of users to be ignored when executing permission checks.
         * @type {string | string[]}
         */
        this.ignorePermissions = Array.isArray(commandOptions.ignorePermissions) ? commandOptions.ignorePermissions.join("\n") : commandOptions.ignorePermissions;
    };

    /**
     * Executes the command using the provided parameters. Throws an error if not used.
     */
    exec() {
        throw new Error(`[ AstronClient ] Error: Command '${this.id}' exec function is empty.`);
    };
};

module.exports.Command = Command;