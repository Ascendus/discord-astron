const Discord = require('discord.js');
const { readdirSync } = require('fs');
const Category = require('../struct/Category');

class CommandHandler {
    constructor(client, {
        directory = "",
        prefix = "", 
        blockBots = true,
        allowDirectMessages = true, 
        allowMention = false,
        directMessageWarning = "", 
        guildOnlyWarning = "",
        ownerOnlyWarning = "",
        missingSendPermissions = "",
        clientPermissionsMissing = "", 
        userPermissionsMissing = "", 
        cooldownMessage = ""
    }) {
        /**The extended discord.js Client class.
         * @type {Client} 
         * @type {AstronClient}
         */
        this.client = client;

        /**The directory of commands to save to the command Collection and execute.
         * @type {string}
         */
        this.directory = directory;

        /**The prefix for all commands executed.
         * @type {string}
         * @type {function}
         */
        this.prefix = prefix;

        /**Determines whether to block bots from using commands.
         * @type {boolean}
         */
        this.blockBots = blockBots || true;

        /**Determines whether to allow commands run in direct messages with the bot.
         * @type {boolean}
         */
        this.allowDirectMessages = allowDirectMessages || true;

        /**Determines whether the client's user mention can be used as a prefix.
         * @type {boolean}
         */
        this.allowMention = allowMention || true;

        /**The message to send upon a user running commands in direct messages if disabled.
         * @type {string}
         * @type {function}
         */
        this.directMessageWarning = directMessageWarning;

        /**A message to warn a user when a command only meant to be used in servers is run in a dm.
         * @type {string}
         * @type {Function}
         */
        this.guildOnlyWarning = guildOnlyWarning;

        /**A message to warn a non-owner running a owner only command.
         * @type {string}
         * @type {Function}
         */
        this.ownerOnlyWarning = ownerOnlyWarning;

        /**Sends a warning message to the dm of the user who runs a command but the client is missing the SEND_MESSAGES permission.
         * @type {string}
         * @type {Function}
         */
        this.missingSendPermissions = missingSendPermissions;

        /**Sends a message to the user if the client is missing permissions for a command.
         * @type {string}
         * @type {Function}
         */
        this.clientPermissionsMissing = clientPermissionsMissing;

        /**Sends a message to the user if the user is missing permissions for a command.
         * @type {string}
         * @type {Function}
         */
        this.userPermissionsMissing = userPermissionsMissing;

        /**Warns a user when the person executing the command exceeds the cooldown limit.
         * @type {string}
         * @type {Function}
         */
        this.cooldownMessage = cooldownMessage;

        /** The command collection to store the commands for the client.
         * @type {Discord.Collection}
        */
        this.commands = new Discord.Collection();

        /** The command alias collection to store command name aliases for each command.
         * @type {Discord.Collection}
        */
        this.aliases = new Discord.Collection();

        /** The cooldown collection to prevent command spam
         * @type {Discord.Collection}
        */
        this.commandCooldown = new Discord.Collection();
        
        /** The category collection. 
         * @type {Discord.Collection}
        */
        this.categories = new Discord.Collection();

        /** Loads all command files and saves them to the command collection. Also executes commands in a message event, as well as running permission and cooldown checks and warnings.
         * @type {Function}
         * @returns
        */
        this.load = async () => {
            try {
                // Sets or updates categories and commands to the command and categories collections.
                ["configuration", "information"].forEach(category => {
                    this.categories.set(this.client.util.capitalize(category), new Category(this.client.util.capitalize(category, null))); // Creates category classes for each category.
                });

                for (const category of this.categories.values()) {
                    for (const command of readdirSync(`${this.directory}/${(await category.id).toLowerCase()}`).filter(fileName => fileName.endsWith(".js"))) { // Creates a constant for each command file.
                        const commandFile = require(`${this.directory}/${(await category.id).toLowerCase()}/${command}`); // The command file.
                        this.commands.set(new commandFile(this.client).id.toLowerCase(), commandFile); // Creates a new instance of the command class exported from the command file and sets it to the command collection.

                        if (new commandFile(this.client).aliases) {
                            for (const alias of new commandFile(this.client).aliases) {
                                this.aliases.set(alias, commandFile); // Checks if command aliases found, if so, sets command aliases to the alias collection.
                            };
                        };
                    };

                    this.categories.set(this.client.util.capitalize(await category.id), new Category(this.client.util.capitalize(await category.id), this.commands.filter(async cmd => new cmd(this.client).category.toLowerCase() === (await category.id).toLowerCase()))); // Sets the commands with matching categories to each category in the category collection.
                    console.log(`${await this.client.util.time()} | [ ${await this.client.util.capitalize((await category.id))} Module ] Loaded ${readdirSync(`${this.directory}/${(await category.id).toLowerCase()}`).length} command(s)`); // Logs successful message to the console.
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
         * A command handler function for reloading a given command.
         * @param {string} commandName The name of the command to be reloaded.
         * @type {Promise<void>}
         * @type {Function}
         */
        this.reloadCommand = async (commandName) => {
            const commandFile = require(`${this.directory}/${commandName}.js`); // The command file.
            this.commands.set(new commandFile(this.client).id, commandFile); // Sets the command to the command collection.

            if (new commandFile(this.client).aliases) for (const alias of new commandFile(this.client).aliases) {
                this.aliases.set(alias, commandFile); // Checks for aliases, if found, sets them to the aliases collection.
            };
        };

        /**
         * A command handler function for reloading all commands.
         * @type {Promise<void>}
         * @type {Function}
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
         * A useful command handler utility function to search for a command.
         * Returns a boolean value.
         * @param {string} searchQuery The command name to search for.
         * @argument searchQuery The command name to search for.
         * @type {Promise<any>}
         * @type {Function} 
         * @returns
         */
        this.fetchCommand = async (searchQuery) => {
            const command = this.commands.get(searchQuery.toLowerCase()) || this.aliases.get(searchQuery.toLowerCase()); // Searches for the command in the commands or aliases collection/
            return new command();
        };
    };
};

module.exports = CommandHandler; 