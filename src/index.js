"use strict";

module.exports = {
    // Main classes
    AstronClient: require("./client/AstronClient").AstronClient,
    Configuration: require("./client/Config").Configuration,

    // Handlers
    CommandHandler: require("./handlers/CommandHandler").CommandHandler,
    ListenerHandler: require("./handlers/ListenerHandler").ListenerHandler,

    // Structures
    Category: require("./struct/Category").Category,
    Command: require("./struct/Command").Command,
    Listener: require("./struct/Listener").Listener,

    // Utilities
    GuildHandler: require("./util/GuildHandler").GuildHandler,
    Utilities: require("./util/Utilities").Utilities,

    // Providers from discord-akairo module by 1Computer1
    Provider: require("./providers/Provider").Provider,
    MongooseProvider: require("./providers/MongooseProvider").MongooseProvider,
    SequelizeProvider: require("./providers/SequelizeProvider").SequelizeProvider,
    SQLiteProvider: require("./providers/SQLiteProvider").SQLiteProvider,

    // Package information
    version: require("../package.json").version,
    description: require("../package.json").description,
    homepage: require("../package.json").homepage,
    npmURL: `https://www.npmjs.com/package/${require("../package.json").name.toLowerCase()}`,
    githubIssuesURL: require("../package.json").bugs.url,
    keywords: require("../package.json").keywords,
    author: "<Archreus />#6316 (archreus.dev@gmail.com)",
    publisher: "Astron Studios (astraon.studios@gmail.com)",
    license: "Creative Commons Zero v1.0 Universal",
    dependencies: require("../package.json").dependencies
};