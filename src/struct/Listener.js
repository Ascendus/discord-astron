class Listener {
    constructor(id, {
        name = '',
        emitter = '',
        category = ''
    }) {
        this.id = id;
        this.name = name;
        this.emitter = emitter;
        this.category = category;
    };

    exec() {
        throw new Error(`NOT_IMPLEMENTED ${this.id} exec`);
    };
};

module.exports = Listener;