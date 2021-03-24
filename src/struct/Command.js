class Command {
    constructor(id = "", {
        aliases = [],
        channel = null,
        ownerOnly = false,
        category = "",
        cooldown = null,
        description = "",
        usage = "",
        examples = [],
        clientPermissions = [],
        userPermissions = [],
        ignoreCooldown = [],
        ignorePermissions = []
    }) {
        this.commandID = String(id);
        this.id = String(id);
        this.categoryID = String(category);
        this.aliases = Array.isArray(aliases) ? aliases.join("\n") : aliases;
        this.channel = String(channel);
        this.ownerOnly = Boolean(ownerOnly);
        this.cooldown = Number(cooldown);
        this.description = Array.isArray(description) ? description.join("\n") : description;
        this.usage = String(usage);
        this.examples = Array.isArray(examples) ? examples.join("\n") : examples;
        this.clientPermissions = Array.isArray(clientPermissions) ? clientPermissions.join("\n") : clientPermissions;
        this.userPermissions = Array.isArray(userPermissions) ? userPermissions.join("\n") : clientPermissions;
        this.ignoreCooldown = Array.isArray(ignoreCooldown) ? ignoreCooldown.join("\n") : ignoreCooldown;
        this.ignorePermissions = Array.isArray(ignorePermissions) ? ignorePermissions.join("\n") : ignorePermissions;
    };

    exec() {
        throw new Error(`NOT_IMPLEMENTED ${this.id} exec`);
    };
};

module.exports = Command;