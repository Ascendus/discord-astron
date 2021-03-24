class Configuration {
    constructor(client, {
        token = "",
        owners = [],
        defaultPrefix = "",
        version = ""
    }) {
        this.client = client;
        this.token = token;
        this.owners = owners;
        this.defaultPrefix = defaultPrefix;
        this.version = version;
    };
};

module.exports = Configuration;