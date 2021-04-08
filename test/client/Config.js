const Configuration = require("../../src/client/Config");
const { client } = require("./TrialClient");

const configuration = new Configuration(client, {
    token: "client_token",
    owners: ["owner_id"],
    defaultPrefix: "!",
    version: "1.0.0"
});

module.exports.configuration = configuration;