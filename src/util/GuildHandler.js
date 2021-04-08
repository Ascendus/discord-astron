const { AstronClient } = require("../client/AstronClient");
const { Guild, GuildCreateOptions, GuildEditData } = require("discord.js");

/**
 * Used to create custom guilds, edit and delete guilds by name, id or anything with the discord.js Guild type.
 */
class GuildHandler {
    /**
     * Used to create custom guilds, edit and delete guilds by name, id or anything with the discord.js Guild type.
     * @param {AstronClient} client The client parameter to use to fetch guilds and users e.t.c
     */
    constructor(client) {
        /**
         * Use the client to create a new guild with the GuildPrototype. Guild settings can be configured pre-server generation.
         * @param {string | string[]} users The id/array of ids of users to add to the new server 
         * @param {string} name The name of the guild
         * @param {GuildCreateOptions} options The options for creating the guild
         * @returns
         */
        this.createGuild = (users, name, options) => {
            return client.guilds.create(name.toString(), {
                afkChannelID: options.afkChannelID ? options.afkChannelID : null,
                afkTimeout: options.afkTimeout ? options.afkTimeout : null,
                channels: options.channels ? options.afkTimeout : null,
                defaultMessageNotifications: options.defaultMessageNotifications ? options.defaultMessageNotifications : null,
                explicitContentFilter: options.explicitContentFilter ? options.explicitContentFilter : null,
                icon: options.icon ? options.icon : null,
                region: options.region ? options.region : null,
                roles: options.roles ? options.roles : null,
                systemChannelID:options. systemChannelID ? options.systemChannelID : null,
                verificationLevel: options.verificationLevel ? options.verificationLevel : null
            }).then(async guild => {
                Array.isArray(users) ? users.forEach(user => {
                    guild.addMember(client.users.cache.get(user));
                }) : guild.addMember(client.users.cache.get(users));
            }).catch(err => console.log(`[ AstronClient ] ${err.stack}`));
        };  

        /**
         * Fetches a guild and edits it according to the options parameter.
         * @param {string | Guild} guild The guild parameter for the client to search for. Can either be a name, id or anything with the discord.js Guild type
         * @param {GuildEditData} editOptions The guild editing options
         * @returns 
         */
        this.editGuild = (guild, editOptions) => {
            let editingGuild;
            if (typeof guild === Guild) editingGuild = client.guilds.cache.get(guild.id);
            if (typeof guild.toString === "string" && guild.length === 18) editingGuild = client.guilds.cache.get(guild.toString());
            editingGuild = client.guilds.cache.find(searchedGuild => searchedGuild.name.toLowerCase() === guild.toLowerCase());
            if (!editingGuild) throw new Error("[ AstronClient ] Error: Guild not found");
            if (!editingGuild.me.hasPermission("MANAGE_GUILD")) throw new Error("[ AstronClient ] Error: Client is missing permission required for editing guilds \"MANAGE_GUILD\"");

            return editingGuild.edit({
                name: editOptions.name ? editOptions.name : null,
                region: editOptions.region ? editOptions.region : null,
                verificationLevel: editOptions.verificationLevel ? editOptions.verificationLevel : null,
                explicitContentFilter: editOptions.explicitContentFilter ? editOptions.explicitContentFilter : null,
                defaultMessageNotifications: editOptions.defaultMessageNotifications ? editOptions.explicitContentFilter : null,
                afkChannel: editOptions.afkChannel ? editOptions.afkChannel : null,
                systemChannel: editOptions.systemChannel ? editOptions.systemChannel : null,
                systemChannelFlags: editOptions.SystemChannelFlagsResolvable ? editOptions.systemChannelFlags : null,
                afkTimeout: editOptions.afkTimeout ? editOptions.afkTimeout : null,
                icon: editOptions.icon ? editOptions.icon : null,
                owner: editOptions.owner ? editOptions.owner : null,
                splash: editOptions.splash ? editOptions.splash : null,
                discoverySplash: editOptions.discoverySplash ? editOptions.discoverySplash : null,
                banner: editOptions.banner ? editOptions.banner : null,
                rulesChannel: editOptions.rulesChannel ? editOptions.rulesChannel : null,
                publicUpdatesChannel: editOptions.publicUpdatesChannel ? editOptions.publicUpdatesChannel : null,
                preferredLocale: editOptions.preferredLocale ? editOptions.preferredLocale : null
            });
        };

        /**
         * Fetches a guild the client is in and deletes it.
         * @param {Guild | string} guild The guild parameter for the client to search for. Can either be a name, id or anything with the discord.js Guild type
         * @returns 
         */
        this.deleteGuild = (guild) => {
            let fetchedGuild;
            if (typeof guild === Guild) fetchedGuild = client.guilds.cache.get(guild.id);
            if (typeof guild.toString() === "string" && guild.length === 18) fetchedGuild = client.guilds.cache.get(guild.toString());
            fetchedGuild = client.guilds.cache.find(searchedGuild => searchedGuild.name.toLowerCase() === guild.toLowerCase());
            if (!fetchedGuild) throw new Error("[ AstronClient ] Error: Guild not found");
            if (!fetchedGuild.me.hasPermission("MANAGE_GUILD")) throw new Error("[ AstronClient ] Error: Client is missing permission required for deleting guilds \"MANAGE_GUILD\"");
            return fetchedGuild.delete();
        };
    };
};

module.exports.GuildHandler = GuildHandler;