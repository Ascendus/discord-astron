const { AstronClient } = require("../../src/client/AstronClient");
const { configuration } = require("./Config");
const { commandHandler } = require("../struct/CommandHandler");
const { listenerHandler } = require("../struct/ListenerHandler");

const client = new AstronClient({
    com
})

module.exports.client = client;