/**
 * A simplified discord.js framework based on discord.js and discord-akairo for beginners.
 * @author Archreus#6316 (Astron Studios) <astraon.studios@gmail.com>
 * @license CC0 1.0 Universal
 * @version 1.0.3
*/
declare module "discord-astron" {
    import { Client, ClientOptions, Collection, Guild, GuildCreateOptions, GuildEditData, Message } from "discord.js"; // Importing the Client class from the discord.js module

    //#region Package Information

    /** 
     * The current version for the discord-astron module.
     * @constant {string} version 
     * @readonly
     * @type {string} 
    */
    export const version: string;

    /**
     * The description of the discord-astron module package.
     * @constant {string} description
     * @readonly
     * @type {string}
     */
    export const description: string;

    /**
     * The homepage URL for the discord-astron module packagage.
     * <https://www.google.com>
     * @constant {string} homepage
     * @readonly
     * @type {string}
     */
    export const homepage: string;

    /**
     * The URL of the discord-astron npm page.
     * <https://www.google.com>
     * @constant {string} npmURL
     * @readonly
     * @type {string}
     */
    export const npmURL: string;

    /**
     * The URL for the discord-astron issues page on the Github repository. 
     * <https://www.google.com>
     * @constant {string} githubIssuesURL
     * @readonly
     * @type {string}
     */
    export const githubIssuesURL: string;

    /**
     * The array of keywords for the discord-astron module.
     * @constant {string[]} keywords
     * @readonly
     * @type {string}
     */
    export const keywords: string[];

    /**
     * The author of the discord-astron module.
     * @constant {string} author
     * @readonly 
     * @type {string}
     */
    export const author: string;

    /**
     * The publisher of the discord-astron module.
     * @constant {string} publisher
     * @readonly
     * @type {string}
     */
    export const publisher: string;

    /**
     * The license for the discord-astron module.
     * @constant {string} license
     * @readonly
     * @type {string}
     */
    export const license: string;

    /**
     * The dependencies used by the discord-astron module.
     * @constant {} dependencies
     * @readonly
     * @type {}
     */
    export const dependencies: {};

    //#endregion


    //#region Classes

    /**
     * The main discord-astron class, extended from the discord.js Client.
     * @class 
     * @constructor 
     * @exports AstronClient
     * @extends Client
     * @type {AstronClient}
    */
    export class AstronClient extends Client {
        /**
         * Create a new instance of the AstronClient class.
         * @param {ConfigurationOptions} configurationOptions The configuration options
         * @param {CommandHandlerOptions} commandHandlerOptions The command handler options
         * @param {ListenerHandlerOptions} listenerHandlerOptions The listener handler options
         * @param {any} database The database for the client
         * @param {ClientOptions} [clientOptions] The discord.js client options
         */
        public constructor(configurationOptions: ConfigurationOptions, commandHandlerOptions: CommandHandlerOptions, listenerHandlerOptions: ListenerHandlerOptions, database?: any, clientOptions?: ClientOptions);

        /**
         * The configuration options for the client.
         * @param {AstronClient} client The AstronClient
         * @param {string} token The token required to login to the client
         * @param {string} defaultPrefix The defaul prefix for commands
         * @param {string} version The version of the client
         * @param {string | string[]} owners The id/array of ids of the owners of the client
         * @type {Configuration}
         */
        public config: Configuration;

        /**
         * The utility object containing useful properties and functions.
         * @type {Utilities}
         */
        public util: Utilities;

        /**
         * The command handler for running/executing commands, as well as running permisison and cooldown checks.
         */
        public commandHandler: CommandHandler;

        /**
         * The listener handler for managing and triggering discord.js events.
         * @param {AstronClient} client The AstronClient
         * @param {string} directory The listener folder directory (directory of events to be run)
         * @type {ListenerHandler}
         */
        public listenerHandler: ListenerHandler;

        /**
         * The database for the client. This option is optional.
         * @type {any}
        */
        public db?: any;

        /**
         * Loads the command handler and listener handler for the client. Throws an error if commandHandler and listenerHandler is not set.
         * @async
         * @function
         * @name init 
         * @type {Promise<void>}
         * @returns
         */
        public init(): Promise<void>;

        /**
         * Calls the init method and logs into the websocket client via the provided token. Throws an error if util property isn't assigned a value.
         * @async
         * @function
         * @name start
         * @type {Promise<string | void>}
         * @returns 
         */
        public start(): Function;
    }

    /**
     * Contains all commands with corresponding categories to the category's name.
     */
    export class Category {
        /**
         * Contains all commands with corresponding categories to the category's name.
         * @param {string} id The name of the category
         * @param {Collection<any, any>} commands The discord.js command collection
         */
        public constructor(id: string, commands: Collection<any, any>);

        /**
         * The name of the category
         * @type {string}
         */
        public id: string;

        /**
         * The discord.js command collection
         * @type {Collection<any, any>}
         */
        public commands: Collection<any, any>;
    }

    /**
     * Creates a new command to be executed by the client.
     */
    export class Command {

        /**
         * Creates a new command to be executed by the client.
         * @param {string} id The command id
         * @param {CommandOptions} commandOptions The customizable options for the command
         */
        public constructor(id: string | Error, commandOptions: CommandOptions);

        /**
         * The Astron client.
         * @type {AstronClient} 
         */
        public client: AstronClient

        /**
         * The id of the command.
         * @type {string}
        */
        public commandID: string;

        /**
         * The id of the command.
         * @type {string} 
         */
        public id: string;

        /**
         * The name of the category for the command.
         * @type {string}
        */
        public category: string;

        /**
         * The alias(es) for the command.
         * @type {string | string[]}
         */
        public aliases: string

        /**
         * The type of channel the command is allowed to be used in.
         * @type {string}
        */
        public channel: CommandChannels;

        /**
         * The cooldown duration for the command to prevent command spam.
         * @type {string | number}
        */
        public cooldown: string | number;

        /**
         * The description of the command explaining what it is for and what it does.
         * @type {string}
        */
        public description: string;

        /**
         * Shows how the command should be used and its structure.
         * @type {string}
         */
        public usage: string;

        /**
         * Displays example(s) of how the command should be used.
         * @type {string}
         */
        public examples: string | string[];

        /**
         * Deteremines whether the command can be only used by the owner.
         * @type {boolean}
         */
        public ownerOnly: boolean;

        /**
         * The permissions required for the client in the current channel/guild to be able to run the command.
         * @type {string | string[]}
         */
        public clientPermissions: string | string[];

        /**
         * The permissions required for the user running the command in the current channel/guild to be able to run the command.
         * @type {string | string[]}
         */
        public userPermissions: string | string[];

        /**
         * The id/array of ids of users to be ignored when executing cooldown checks.
         * @type {string | string[]}
         */
        public ignoreCooldown: string | string[];

        /**
         * The id or array of ids of users to be ignored when executing permission checks.
         * @type {string | string[]}
         */
        public ignorePermissions: string | string[];

        /**
         * Executes the command using the provided parameters. Throws an error if not used.     
         * @type {void}
         */
        public exec(): void;
    }

    /**
     * The command handler class for the client. Saves or updates commands and categories to the command and category collections, as well as running permission/cooldown checks.
     */
    export class CommandHandler {
        /**
         * The command handler class for the client. Saves or updates commands and categories to the command and category collections, as well as running permission/cooldown checks.
         * @param {AstronClient} client 
         * @param {CommandHandlerOptions} options The options for the command handler
         */
        public constructor(client: AstronClient, commandHandlerOptions: CommandHandlerOptions);

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        public client: AstronClient;

        /**
         * The directory of commands to save to the command collection and execute.
         * @type {string}
         */
        public directory: string;

        /**
         * The prefix for triggering commands.
         * @type {string | Function}
         */
        public prefix: string | Function;

        /**
         * Determines whether to block bots from using commands.
         * @type {boolean}
         */
        public blockBots: boolean;

        /**
         * Determines whether to allow commands run in direct message channels.
         * @type {boolean}
         */
        public allowDirectMessages: boolean;

        /**
         * Determines whether the client's user mention can be used as a prefix.
         * @type {boolean}
         */
        public allowMention: boolean;

        /**
         * The message to send upon a user running commands in direct messages if disabled.
         * @type {string | Function}
         */
        public directMessageWarning: string | Function;

        /**
         * A message to warn a user when a command only meant to be used in servers is run in a dm.
         * @type {string | Function}
         */
        public guildOnlyWarning: string | Function;

        /**
         * A message to warn a non-owner running a owner only command.
         * @type {string | Function}
         */
        public ownerOnlyWarning: string | Function;

        /**
         * Sends a warning message to the dm of the user who runs a command but the client is missing the SEND_MESSAGES permission.
         * @type {string | Function}
         */
        public missingSendPermissions: string | Function;

        /**
         * Sends a message to the user if the client is missing permissions for a command.
         * @type {string | Function}
         */
        public clientPermissionsMissing: string | Function;

        /**
         * Sends a message to the user if the user is missing permissions for a command.
         * @type {string | Function}
         */
        public userPermissionsMissing: string | Function;

        /**
         * Warns a user when the person executing the command exceeds the cooldown limit.
         * @type {string | Function}
         */
        public cooldownWarning: string | Function;

        /** 
         * The command collection to store the commands for the client.
         * @type {Collection}
         */
        public commands: Collection<any, any>;

        /** 
         * The collection of command cooldowns.
         * @type {Collection}
         */
        public commandCooldowns: Collection<any, any>;

        /** 
         * The command alias collection to store command name aliases for each command.
         * @type {Collection}
         */
        public aliases: Collection<any, any>;

        /** 
         * The collection of command categories.
         * @type {Collection}
         */
        public categories: Collection<any, any>;

        /**
         * Executes the command using the provided parameters.
         * @param {any[]} [args] The commnad parameters
         * @type {Promise<void>}
         */
        public load(...args: any[]): Promise<void>;

        /**
         * Fetches a command via parameters and reloads it.
         * @param {string | Command} command The command to search for
         * @type {Promise<void>}
         */
        public reloadCommand(command: string | Command): Promise<void>;

        /**
         * Fetches all commands and reloads them.
         * @type {Promise<void>}
         */
        public reloadAll(): Promise<void>;

        /**
         * Fetches a certain command by searching through the command collection
         * @param {string | Command} command
         * @type {Promise<Command>}
         */
        public fetchCommand(command: string | Command): Promise<Command>;
    }

    /**
     * The configuration options for the client.
     */
    export class Configuration {
        /**
         * The configuration options for the client.
         * @param {AstronClient} client 
         * @param {ConfigurationOptions} configurationOptions
         */
        public constructor(client: AstronClient, configurationOptions: ConfigurationOptions);

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        public client: AstronClient;

        /**
         * The token required to log into the client.
         * @type {string}
         */
        public token: string;

        /**
         * The id/array of ids of the owners of the bot.
         * @type {string | string[]}
         */
        public owners: string[];

        /**
         * The default prefix for triggering commands.
         * @type {string}
         */ 
        public defaultPrefix: string;

        /**
         * The current version of the client.
         * @type {string}
         */
        public version: string;
    }

    /**
     * Used to create custom guilds, edit and delete guilds by name, id or anything with the discord.js Guild type.
     */
    export class GuildPrototype {
        /**
         * Used to create custom guilds, edit and delete guilds by name, id or anything with the discord.js Guild type.
         * @param {AstronClient} client The client parameter to use to fetch guilds and users e.t.c
         */
        public constructor(client: AstronClient);

        /**
         * Use the client to create a new guild with the GuildPrototype. Guild settings can be configured pre-server generation.
         * @param {string | string[]} users The id/array of ids of users to add to the new server 
         * @param {string} name The name of the guild
         * @param {GuildCreateOptions} options The options for creating the guild
         * @returns
         */
        public createGuild(users: string | string[], name: string, options: GuildCreateOptions);

        /**
         * Fetches a guild and edits it according to the options parameter.
         * @param {string | Guild} guild The guild parameter for the client to search for. Can either be a name, id or anything with the discord.js Guild type
         * @param {GuildEditData} editOptions The guild editing options
         * @returns 
         */
        public editGuild(guild: string | Guild, editOptions: GuildEditData);

        /**
         * Fetches a guild the client is in and deletes it.
         * @param {Guild | string} guild The guild parameter for the client to search for. Can either be a name, id or anything with the discord.js Guild type
         * @returns 
         */
        public deleteGuild(guild: string | Guild);
    }

    /**
     * Creates a new event listener triggered by the client.
     */
    export class Listener {
        /**
         * Creates a new event listener triggered by the client.
         * @param {ListenerOptions} listenerOptions The event listener options
         */
        public constructor(id: string | Error, listenerOptions: ListenerOptions);

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        public client: AstronClient;

        /**
         * The id of the event listener.
         * @type {string}
         */
        public name: string;

        /**
         * The emitter for the event listener.
         * @type {string}
         */
        public emitter: string;

        /**
         * The event listener category.
         * @type {string}
         */
        public category: string;

        /**
         * Executes the listener using the provided parameters. Throws an error if not used.
         * @type {void}
         */
        public exec(...args: any[]): void;
    }


    /**
     * The event listener manager, which triggers event listeners via the Astron client. Saves all listeners to a discord.js collection.
     */
    export class ListenerHandler {
        
        /**
         * The event listener manager, which triggers event listeners via the Astron client. Saves all listeners to a discord.js collection.
         * @param {AstronClient} client The Astron client
         * @param {ListenerHandlerOptions} options The options for the listener handler
         */
        public constructor(client: AstronClient, options: ListenerHandlerOptions);

        /**
         * The Astron client.
         * @type {AstronClient}
         */
        public client: AstronClient;

        /**
         * The directory of event listeners.
         * @type {string}
         */
        public directory: string;

        /**
         * Fetches all event listener files via the directory and saves them a discord.js collection, then executes them.
         * @param {any[]} [args] The event listener parameters
         * @type {Promise<void>}
         */
        public async load(...args: any[]): Promise<void>;
    }

    /**
     * Contains several useful tools to use, such as returning the current date or time, capitalizing strings or returning the date suffix.
     */
    export class Utilities {
        /**
         * Contains several useful tools to use, such as returning the current date or time, capitalizing strings or returning the date suffix.
         */
        public constructor();

        /**
         * Creates a new instace of the Date constructor.
         * @returns 
         */
        public get day(): Date;

        /**
         * Gets the current date. 
         * @returns
         */
        public get date(): string;

        /**
         * Gets the current time.
         * @returns 
         */
        public get time(): string;


        /**
         * Gets the suffix of the date eg 1st, 2nd, 3rd.
         * @param {string} date The current date
         * @returns
         */
        public get getDateSuffix(): Promise<"th" | "st" | "nd" | "rd">;

        /**
         * Capitalizes the first letter of a string.
         * @param {string} string The string to capitalize 
         * @returns 
         */
        public capitalize(): Promise<string>;
    }

    //#endregion

    //#region Database providers | Code from discord-akairo module by 1Computer1 <https://github.com/discord-akairo/discord-akairo>

    export abstract class Provider {
        public items: Collection<string, any>;

        public abstract clear(id: string): any;
        public abstract delete(id: string, key: string): any;
        public abstract get(id: string, key: string, defaultValue: any): any;
        public abstract init(): any;
        public abstract set(id: string, key: string, value: any): any;
    }

    export class SequelizeProvider extends Provider {
        public constructor(table: any, options?: ProviderOptions);

        public dataColumn?: string;
        public idColumn: string;
        public items: Collection<string, any>;
        public table: any;

        public clear(id: string): Promise<void>;
        public delete(id: string, key: string): Promise<boolean>;
        public get(id: string, key: string, defaultValue: any): any;
        public init(): Promise<void>;
        public set(id: string, key: string, value: any): Promise<boolean>;
    }

    export class SQLiteProvider extends Provider {
        public constructor(db: any | Promise<any>, tableName: string, options?: ProviderOptions);

        public dataColumn?: string;
        public db: any;
        public idColumn: string;
        public items: Collection<string, any>;
        public tableName: string;

        public clear(id: string): Promise<any>;
        public delete(id: string, key: string): Promise<any>;
        public get(id: string, key: string, defaultValue: any): any;
        public init(): Promise<void>;
        public set(id: string, key: string, value: any): Promise<any>;
    }

    export class MongooseProvider extends Provider {
        public constructor(model: any);

        public model: any;
        public items: Collection<string, any>;

        public clear(id: string): Promise<any>;
        public delete(id: string, key: string): Promise<any>;
        public get(id: string, key: string, defaultValue: any): any;
        public getDocument(id: string): any;
        public init(): Promise<void>;
        public set(id: string, key: string, value: any): Promise<any>;
    }

    //#endregion

    /**
     * The list of options for the type of channels commands can be run in.
     */
    type CommandChannels = "any" | "dm" | "guild";

    //#region Interfaces 


    /**
     * The option parameters for the Configuration class.
     */
    export interface ConfigurationOptions {
        token: string | Error;
        owners: string | string[] | Error;
        defaultPrefix: string | Error;
        version: string | Error;
    }

    /**
     * The command option parameters for the Command class (excluding the command id).
     */
    export interface CommandOptions {
        aliases: string | string[] | Error;
        channel: string | Error;
        ownerOnly?: boolean | Error;
        category: string | Error;
        cooldown?: number | Error;
        description?: string | Error;
        usage?: string | Error;
        examples?: string | string[] | Error;
        clientPermissions?: string | string[] | Error;
        userPermissions?: string | string[] | Error;
        ignoreCooldown?: string | string[] | Error;
        ignorePermissions?: string | string[] | Error;
    }

    /**
     * The command handler option parameters for the CommandHandler class (excluding the client parameter).
     */
    export interface CommandHandlerOptions {
        directory: string | Error;
        blockBots: boolean | Error;
        allowDirectMessage: boolean | Error;
        allowMention: boolean | Error;
        directMessageWarning: string | Function | Error;
        guildOnlyWarning: string | Function | Error;
        ownerOnlyWarning: string | Function | Error;
        missingSendPermissions: string | Function | Error;
        clientPermissionsMissing: string | Function | Error;
        userPermissionsMissing: string | Function | Error;
        cooldownMessage: string | Function | Error;
    }


    /**
     * The listener option parameters for the Listener class (excluding the listener id).
     */
    export interface ListenerOptions {
        name: string | Error;
        emitter?: string | Error;
        category: string | Error;
    }

    /**
     * The listener handler option parameters for the CommandHandler class (excluding the client parameter).
     */
    export interface ListenerHandlerOptions {
        directory: string | Error;
    }

    /**
     * The database provider options for providers from discord-akairo by 1Computer1.
     */
    export interface ProviderOptions {
        dataColumn?: string;
        idColumn?: string;
    }

    //#endregion
}