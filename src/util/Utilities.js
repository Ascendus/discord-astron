class Utilities {
    constructor(client) {
        this.client = client;
        this.day = () => new Date();
        this.date = () => `${new Date().getUTCDay()} ${new Date().getUTCDay()}${this.getDateSuffix(new Date().getUTCDay())} of ${new Date().getUTCMonth()} ${new Date().getUTCFullYear()}`;
        this.time = () => new Date().toLocaleTimeString();
        this.capitalize = async (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        this.getDateSuffix = async (dayOfWeek) => {
            if (dayOfWeek > 3 && dayOfWeek < 21) return 'th';
            switch (dayOfWeek % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            };
        };
    };
};

module.exports = Utilities;