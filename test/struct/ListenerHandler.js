const { ListenerHandler } = require("../../src/handlers/ListenerHandler");
const { client } = require("../client/TrialClient");
const { join } = require("path");

const listenerHandler = new ListenerHandler(client, {
    directory: join(__dirname, "..", "listeners")
});

module.exports.listenerHandler = listenerHandler;