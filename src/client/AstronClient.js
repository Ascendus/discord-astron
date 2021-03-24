const { Client } = require("discord.js"); 
const Utilities = require("../util/Utilities");

class AstronClient extends Client {
    constructor(options = {}, configuration, commandHandler, listenerHandler, database) { 
        super(options);

        this.config = configuration ? configuration : new Error("[ AstronClient ] Error: No configuration options were provided.");
        this.util = new Utilities(this);
        this.commandHandler = commandHandler ? commandHandler : new Error("[ AstronClient ] Error: No command handler was provided.");
        this.listenerHandler = listenerHandler ? listenerHandler : new Error("[ AstronClient ] Error: No listener handler was provided.");
        this.db = database ? database : new Error("[ AstronClient ] Error: No database was provided.");

        this.init = async () => {
            try {
                if (typeof this.commandHandler === Error) {
                    return console.log(this.commandHandler);
                } else this.commandHandler.load();

                if (typeof this.listenerHandler === Error) {
                    return console.log(this.listenerHandler);
                } else this.listenerHandler.load();

                if (typeof this.db === Error) {
                    return console.log(this.db);
                } else await this.db.connect();

                if (typeof this.db === Error) {
                    return console.log(this.db);
                } else await this.db.synchronize(); 
            } catch (err) {
                return console.log(`[ AstronClient ] ${err.stack}`);
            };
        };

        this.start = async () => {
            try {
                await this.init(); 
                if (typeof this.config === Error) {
                    return console.log(this.config);
                } else return this.login(this.config.token); 
            } catch (err) {
                return console.log(`[ AstronClient ] ${err.stack}`);
            };
        };
    };
};

module.exports = AstronClient;