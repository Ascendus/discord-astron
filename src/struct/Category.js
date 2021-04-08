const { Collection } = require("discord.js");

/**
 * Contains all commands with corresponding categories to the category's name.
 */
class Category {
    /**
     * Contains all commands with corresponding categories to the category's name.
     * @param {string} id The name of the category
     * @param {Collection<any, any>} commands The discord.js command collection
     */
    constructor(id, commands) {
        /**
         * The name of the category
         * @type {string}
         */
        this.id = id;

        /**
         * The discord.js command collection
         * @type {Collection<any, any>}
         */
        this.commands = commands;
    };
};

module.exports.Category = Category;