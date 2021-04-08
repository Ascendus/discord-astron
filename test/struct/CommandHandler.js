const { CommandHandler } = require("../../src/handlers/CommandHandler");
const { client } = require("../client/TrialClient");
const { join } = require("path");

const commandHandler = new CommandHandler(client, {
    directory: join(__dirname, "..", "commands"),
    prefix: client.config.prefix,
    blockBots: true,
    allowMention: false,
    directMessageWarning: (msg) => `${msg.author}, you can only use this command in servers!`,
    guildOnlyWarning: (msg) => `${msg.author}, you can only use this command in dms!`,
    ownerOnlyWarning: (msg) => `${msg.author}, only owners can use this command!`,
    missingSendPermissions: (msg) => `${msg.author}, I am missing the following permission(s): \`SEND_MESSAGES\``,
    clientPermissionsMissing: (msg, permissions) => `${msg.author}, I am missing the following permissions(s): ${permissions}`,
    userPermissionsMissing: (msg, permissions) => `${msg.author}, I am missing the following permissions(s): ${permissions}`,
    cooldownMessage: (msg, remaining, command) => `${msg.author}, please wait **${remaining}** seconds before reusing the \`${command.id}\` command!`
});

module.exports.commandHandler = commandHandler;