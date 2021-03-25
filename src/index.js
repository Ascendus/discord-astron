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

    // Package information
    version: require("../package.json").version,
    description: require("../package.json").description,
    homepage: require("../package.json").homepage,
    npmURL: `https://www.npmjs.com/package/${require("../package.json").name}`,
    githubIssuesURL: require("../package.json").bugs.url,
    keywords: require("../package.json").keywords,
    author: "<Archreus />#6316 (archreus.dev@gmail.com)",
    publisher: "Astron Studios (astraon.studios@gmail.com)",
    license: "Creative Commons Zero v1.0 Universal",
    dependencies: require("../package.json").dependencies
};