const Discord = require('discord.js');
const { readdirSync } = require('fs');
const { Category } = require('../struct/Category');

/**
 * The command handler class for the client. Saves or updates commands and categories to the command and category collections, as well as running permission/cooldown checks.
 */
class CommandHandler {
    /**
     * The command handler class for the client. Saves or updates commands and categories to the command and category collections, as well as running permission/cooldown checks.
     * @param {AstronClient} client 
     * @param {import("discord-astron").CommandHandlerOptions} commandHandlerOptions The options for the command handler
     */
    constructor(client, commandHandlerOptions) {

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        this.client = client;

        /**
         * The directory of commands to save to the command collection and execute.
         * @type {string}
         */
        this.directory = commandHandlerOptions.directory;

        /**
         * The prefix for triggering commands.
         * @type {string | Function}
         */
        this.prefix = commandHandlerOptions.prefix;

        /**
         * Determines whether to block bots from using commands.
         * @type {boolean}
         */
        this.blockBots = commandHandlerOptions.blockBots || true;

        /**
         * Determines whether to allow commands run in direct message channels.
         * @type {boolean}
         */
        this.allowDirectMessages = commandHandlerOptions.allowDirectMessages || true;

        /**
         * Determines whether the client's user mention can be used as a prefix.
         * @type {boolean}
         */
        this.allowMention = commandHandlerOptions.allowMention || true;

        /**
         * The message to send upon a user running commands in direct messages if disabled.
         * @type {string | Function}
         */
        this.directMessageWarning = commandHandlerOptions.directMessageWarning;

        /**
         * A message to warn a user when a command only meant to be used in servers is run in a dm.
         * @type {string | Function}
         */
        this.guildOnlyWarning = commandHandlerOptions.guildOnlyWarning;

        /**
         * A message to warn a non-owner running a owner only command.
         * @type {string | Function}
         */
        this.ownerOnlyWarning = commandHandlerOptions.ownerOnlyWarning;

        /**
         * Sends a warning message to the dm of the user who runs a command but the client is missing the SEND_MESSAGES permission.
         * @type {string | Function}
         */
        this.missingSendPermissions = commandHandlerOptions.missingSendPermissions;

        /**
         * Sends a message to the user if the client is missing permissions for a command.
         * @type {string | Function}
         */
        this.clientPermissionsMissing = commandHandlerOptions.clientPermissionsMissing;

        /**
         * Sends a message to the user if the user is missing permissions for a command.
         * @type {string | Function}
         */
        this.userPermissionsMissing = commandHandlerOptions.userPermissionsMissing;

        /**
         * Warns a user when the person executing the command exceeds the cooldown limit.
         * @type {string | Function}
         */
        this.cooldownMessage = commandHandlerOptions.cooldownWarning;

        /**
         * The command collection to store the commands for the client.
         * @type {Discord.Collection}
        */
        this.commands = new Discord.Collection();

        /** 
         * The command alias collection to store command name aliases for each command.
         * @type {Discord.Collection}
        */
        this.aliases = new Discord.Collection();

        /** 
         * The collection of command cooldowns.
         * @type {Collection}
         */
        this.commandCooldowns = new Discord.Collection();
        
        /** 
         * The collection of command categories.
         * @type {Collection}
         */
        this.categories = new Discord.Collection();

        /**
         * Executes the command using the provided parameters.
         * @param {any[]} [args] The commnad parameters
         * @type {Promise<void>}
         */
        this.load = async () => {
            try {
                // Sets or updates categories and commands to the command and categories collections.
                const categories = ["configuration", "information"];
                categories.forEach(async category => {
                    this.categories.set(await this.client.util.capitalize(category), new Category(await this.client.util.capitalize(category), null)); // Creates category classes for each category.
                });

                for (const category of categories.values()) {
                    for (const command of readdirSync(`${this.directory}/${category.toLowerCase()}`).filter(fileName => fileName.endsWith(".js"))) { // Creates a constant for each command file.
                        const commandFile = require(`${this.directory}/${category.toLowerCase()}/${command}`); // The command file.
                        this.commands.set(new commandFile(this.client).id.toLowerCase(), commandFile); // Creates a new instance of the command class exported from the command file and sets it to the command collection.

                        if (new commandFile(this.client).aliases) {
                            for (const alias of new commandFile(this.client).aliases) {
                                this.aliases.set(alias, commandFile); // Checks if command aliases found, if so, sets command aliases to the alias collection.
                            };
                        };
                    };

                    this.categories.set(await this.client.util.capitalize(category), new Category(await this.client.util.capitalize(category), this.commands.filter(async cmd => new cmd(this.client).categoryID.toLowerCase() === category.toLowerCase()))); // Sets the commands with matching categories to each category in the category collection.
                    console.log(`${await this.client.util.time()} | [ ${await this.client.util.capitalize(category)} Module ] Loaded ${readdirSync(`${this.directory}/${category}`).length} command(s)`); // Logs successful message to the console.
                };

                // Message event
                this.client.on("message", async (message) => {
                    if (message.author.bot && this.blockBots === true) return; // Checks if the author is a bot user.
                    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Mention regex function.
                    const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${escapeRegex(typeof this.prefix === "function" ? (await this.prefix(message)) : this.prefix)})\\s*`); // The prefix.
                    if (!prefixRegex.test(message.content)) return; // Checks if the content of the message includes either the prefix for mention prefix.

                    const [, matchedPrefix] = message.content.match(prefixRegex); // Also checks if the content of the message includes either the prefix for mention prefix.
                    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g); // The arguments in the command input.
                    const commandName = args.shift().toLowerCase(); // Retrieves the command name from the provided argument input.
                    const command = this.commands.get(commandName) || this.aliases.get(commandName); // The command object.
                    if (!command) return; // Checks if the command exists.
                    const cmd = new command(this.client); // Creates a new instance of the command class.

                    // Channel and permissions checks
                    if (message.channel.type === "dm" && !this.allowDirectMessages === false && cmd.channel === "guild") return message.channel.send(typeof this.directMessageWarning === 'function' ? this.directMessageWarning(message) : this.directMessageWarning);
                    if (message.channel.type === "text" && cmd.channel === "dm") return message.channel.send(typeof this.guildOnlyWarning === 'function' ? this.guildOnlyWarning(message) : this.guildOnlyWarning);
                    if (cmd.ownerOnly && !this.client.config.owners.includes(message.author.id)) return message.channel.send(typeof this.ownerOnlyWarning === 'function' ? this.ownerOnlyWarning(message) : this.ownerOnlyWarning);
                    if (message.guild && !message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return message.author.send(typeof this.missingSendPermissions === 'function' ? this.missingSendPermissions(message) : this.missingSendPermissions);
                    if (message.guild && cmd.clientPermissions && !message.guild.me.permissions.has(cmd.clientPermissions)) return message.channel.send(typeof this.clientPermissionsMissing === 'function' ? this.clientPermissionsMissing(message, message.guild.me.permissions.missing(cmd.clientPermissions).length > 1 ? `${message.guild.me.permissions.missing(cmd.clientPermissions).slice(0, -1).map(perm => `\`${perm}\``).join(', ')} and \`${message.guild.me.permissions.missing(cmd.clientPermissions).slice(-1)[0]}\`` : `\`${message.guild.me.permissions.missing(cmd.clientPermissions)[0]}\``) : this.clientPermissionsMissing);
                    if (message.guild && cmd.userPermissions && !message.member.permissions.has(cmd.userPermissions) && !cmd.ignorePermissions.includes(message.author.id)) return message.channel.send(typeof this.userPermissionsMissing === 'function' ? this.userPermissionsMissing(message, message.member.permissions.missing(cmd.userPermissions).length > 1 ? `${message.member.permissions.missing(cmd.userPermissions).slice(0, -1).map(perm => `\`${perm}\``).join(', ')} and \`${message.member.permissions.missing(cmd.userPermissions).slice(-1)[0]}\`` : `\`${message.member.permissions.missing(cmd.userPermissions)[0]}\``) : this.userPermissionsMissing);

                    // Commands run in a server.
                    if (message.guild) {
                        // Cooldown checks.
                        if (!this.commandCooldown.has(cmd.id)) this.commandCooldown.set(cmd.id, new Discord.Collection());
                        const now = Date.now();
                        const timestamps = this.commandCooldown.get(cmd.id);
                        const cooldownAmount = (cmd.cooldown || 3) * 1000;
                        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                        const timeLeft = (expirationTime - now) / 1000;

                        if (timestamps.has(message.author.id) && !this.client.config.owners.includes(message.author.id) && (now < expirationTime) && !cmd.ignoreCooldown.includes(message.author.id)) return message.channel.send(typeof this.cooldownMessage === "function" ? this.cooldownMessage(message, timeLeft.toFixed(1), cmd) : this.cooldownMessage);
                        timestamps.set(message.author.id, now);
                        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                    };

                    return cmd.exec(this.client, message, args, Discord); // Executing the command.
                });

                // Error handling.
                this.client.on("error", (err) => console.log(`[ AstronClient ] ${err}`)); // discord.js client error event.
                process.on("unhandledRejection", async (err) => console.error('Unhandled Rejection:', err)); // Node process unhandledRejection event. Called when a promise is rejected.
            } catch (err) {
                return console.log(`[ AstronClient ] ${err.stack}`); // Logging any errors with the command handler to the console.
            };
        };

        /**
         * Fetches a command via parameters and reloads it.
         * @param {string | import("discord-astron").Command} command The command to search for
         * @type {Promise<void>}
         */
        this.reloadCommand = async (command) => {
            const commandFile = require(`${this.directory}/${command}.js`); // The command file.
            this.commands.set(new commandFile(this.client).id, commandFile); // Sets the command to the command collection.

            if (new commandFile(this.client).aliases) for (const alias of new commandFile(this.client).aliases) {
                this.aliases.set(alias, commandFile); // Checks for aliases, if found, sets them to the aliases collection.
            };
        };

        /**
         * Fetches all commands and reloads them.
         * @type {Promise<void>}
         */
        this.reloadAll = async () => {
            for (const command of readdirSync(this.directory).filter(fileName => fileName.endsWith(".js"))) {
                const commandFile = require(`${this.directory}/${command}`); // The command files.
                this.commands.set(new commandFile(this.client).id, commandFile); // Sets the commands from each command file to the command collection.

                if (new commandFile(this.client).aliases) for (const alias of new commandFile(this.client).aliases) {
                    this.aliases.set(alias, commandFile); // Checks for aliases in each command file, if found, sets them to the aliases collection.
                };
            };
        };

        /**
         * Fetches a certain command by searching through the command collection
         * @param {string | Command} command
         * @type {Promise<Command>}
         */
        this.fetchCommand = async (searchQuery) => {
            const command = this.commands.get(searchQuery.toLowerCase()) || this.aliases.get(searchQuery.toLowerCase()); // Searches for the command in the commands or aliases collection/
            return new command();
        };
    };
};

module.exports.CommandHandler = CommandHandler; // Exporting the CommandHandler class