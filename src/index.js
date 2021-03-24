"use strict";

module.exports = {
    // Main classes
    AstronClient: require("./client/AstronClient"),
    Configuration: require("./client/Config"),

    // Handlers
    CommandHandler: require("./handlers/CommandHandler"),
    ListenerHandler: require("./handlers/ListenerHandler"),

    // Structures
    Category: require("./struct/Category"),
    Command: require("./struct/Command"),
    Listener: require("./struct/Listener"),

    // Utilities
    Utilities: require("./util/Utilities"),

    // Package version
    version: require("../package.json").version
};