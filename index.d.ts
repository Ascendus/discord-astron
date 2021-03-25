/**
 * A simplified discord.js framework based on discord.js and discord-akairo for beginners.
 * @author <Archreus />#6316 (Astron Studios) <astraon.studios@gmail.com>
 * @license CC0 1.0 Universal
 * @module discord-astron
 * @package 
 * @requires discord.js
 * @requires fs
 * @requires path   
 * @version 1.0.0
*/
declare module "discord-astron" {
    import { Client } from "discord.js"; // Importing the Client class from the discord.js module

    /** 
     * The current version for the discord-astron module.
     * @constant {string} version 
     * @type {string}
     * @returns {string} The current version for the discord-astron module
    */
    export const version: string;

    /**
     * The main discord-astron class, extended from discord.js.
     * @class 
     * @constructor
     * @exports AstronClient
     * @extends Client
     * @public
     * @type {AstronClient}
    */
    export class AstronClient extends Client {
        /**
         * Create a new instance of the AstronClient class.
         */
        public constructor();

        /**
         * The configuration options as a property for the client.
         * @public
         * @returns {Configuration} The configuration options
         * @type {Configuration}
        */
        public config: Configuration;

        /**
         * The utilities class as a property for the client.
         * @public
         * @returns {Utilities} The utilities for the client
         * @type {Utilities}
        */
        public util: Utilities;

        /**
         * The database for the client. This option is optional.
         * @public
         * @returns {any} Returns the database configured
         * @type {any}
        */
        public db?: any;

        /**
         * The command handler to manage commands, run permissions checks/cooldowns etc.
         * @public
         * @returns {CommandHandler} The command handler for the client
         * @type {CommandHandler}
        */
        public commandHandler: CommandHandler;

        /**
         * The listener handler to manage/handle discord.js client events.
         * @public
         * @returns {ListenerHandler} The listener handler for the client
         * @type {ListenerHandler}
        */
        public listenerHandler: ListenerHandler;

        /**
         * The init method to load the command handler and listener handlers.
         * @async 
         * @function 
         * @name init
         * @public 
         * @type {Promise<void>}
        */
        public init(): Promise<void>;

        /**
         * Logs into the discord.js client via the provided token.
         * @async 
         * @function
         * @name start
         * @public 
         * @type Function
        */
        public start(): Function;
    }

    /**
     * The Category class for assigning commands to
     * @class
     * @constructor
     * @exports Category
     * @param {string} id The id of the category (the category name)
     * @param {any} commands The collection of commands assigned to the category 
     * @public 
     * @type {Category}
    */
    export class Category {
        public constructor(id: string, commands: any);

        /**
         * The id of the category (the category name)
         * @public
         * @returns {string} The id of the category
         * @type {string}
        */
        public id: string;

        /**
         * The collection of commands for the client
         * @public
         * @returns {any} The collection of commands
         * @type {any}
        */        
        public commands: any;
    }

    /**
     * The Command class providing a structure for commands.
     * @class
     * @constructor
     * @exports Command
     * @param {string} id The id of the command
     * @public 
     * @type {Command}
    */
    export class Command {
        public constructor(id: string, {});
        /**
         * The id of the command.
         * @public
         * @type {string}
         * @returns {string} The id of the command
        */
        public commandID: string; 

        /**
         * The id of the command.
         * @public
         * @type {string}
         * @returns {string} The id of the command
        */
        public id: string;

        /**
         * The command's category.
         * @public
         * @type {string}
         * @returns {string} The command's category
        */
        public category: string;

        /**
         * The type of channel the command is allowed to be used in.
         * @public
         * @type {string}
         * @returns {string} The command's channel type
        */
        public channel: string;

        /**
         * The cooldown duration in seconds for the command.
         * @public
         * @type {string | number}
         * @returns {string | number} The cooldown value
        */
        public cooldown: string | number;

        /**
         * The description of the command.
         * @public
         * @type {string}
         * @returns {string} The command's category
        */
        public description: string;

        /**
         * Shows how the command should be used.
         * @public
         * @type {string}
         * @returns {string} The command's usage structure
         */
        public usage: string;

        /**
         * Displays example(s) of how the command should be used.
         * @public
         * @type {string}
         * @returns {string} The command example(s)
         */
        public examples: string | string [];

        /**
         * Deteremines whether the command can be only used by the owner.
         * @public
         * @type {boolean}
         * @returns {boolean} The boolean value
         */
        public ownerOnly: boolean;

        /**
         * The permissions required for the client in the current channel/guild to be able to run the command.
         * @public
         * @type {string | string[]}
         * @returns {string | string[]} The client permssions required for the command
         */
        public clientPermissions: string | string[];

        /**
         * The permissions required for the user running the command in the current channel/guuld to be able to run the command/
         * @public
         * @type {string | string[]}
         * @returns {string | string[]} The user permissions required for the command
         */
        public userPermissions: string | string[];

        /**The id or array of ids to be ignored when checking for cooldowns.
         * @public
         * @type {string | string[]}
         * @returns {string | string[]} The id or array of ids to be ignored when checking for cooldowns
         */
        public ignoreCooldown: string | string[];

        /**
         * The id or array of ids to be ignored when checking for permissions.
         * @public
         * @type {string | string[]}
         * @returns {string | string[]} The id or array of ids to be ignored when checking for permissions
         */
        public ignorePermissions: string | string[];

        /**
         * The function for executing the command.
         * @function
         * @public
         * @type {void}
         */
        public exec(): void;
    }

    /**
     * The command handler class for the client. Saves or updates commands and categories to the command and category collections, as well as running permission/cooldown checks.
     * @class
     * @constructor
     * @exports CommandHandler
     * @type {CommandHandler}
     */
    export class CommandHandler {
        public constructor(client: AstronClient, {});
        public client: AstronClient;
        public directory: string;
        public blockBots: boolean;
        public allowDirectMessages: boolean;
        public allowMention: boolean;
        public directMessageWarning: Function | string;
        public guildOnlyWarning: Function | string;
        public ownerOnlyWarning: Function | string;
        public missingSendPermissions: Function | string;
        public clientPermissionsMissing: Function | string;
        public userPermissionsMissing: Function | string;
        public cooldownMessage: Function | string;
        public load(): Function;
        public reloadCommand(): Promise<void>;
        public reloadAll(): Promise<void>;
        public fetchCommand(): Promise<any>;
    }

    export class Configuration {
        public constructor(client: AstronClient, {});
        public client: AstronClient;
        public token: string;
        public owners: string[];
        public defaultPrefix: string;
        public version: string;
    }

    export class Listener {
        public constructor(id: string, {});
        public name: string;
        public emitter: string;
        public category: string;
        public exec(): void;
    }

    export class ListenerHandler {
        public constructor(client: AstronClient, {});
        public client: AstronClient;
        public directory: string;
        public load(): Promise<void>;
    }

    export class Utilities {
        public constructor(client: AstronClient);
        public client: AstronClient;
        public day(): Date;
        public date(): string;
        public time(): string;
        public capitalize(): Promise<string>;
        public getDateSuffix(): Promise<"th" | "st" | "nd" | "rd">;
    }
}