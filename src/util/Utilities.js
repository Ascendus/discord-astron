/**
 * Contains several useful tools to use, such as returning the current date or time, capitalizing strings or returning the date suffix.
 */
class Utilities {
    /**
     * Contains several useful tools to use, such as returning the current date or time, capitalizing strings or returning the date suffix.
     */
    constructor() {
        /**
         * Creates a new instace of the Date constructor.
         * @returns 
         */
        this.day = () => new Date();

        /**
         * Gets the current date. 
         * @returns
         */
        this.date = () => `${new Date().getUTCDay()} ${new Date().getUTCDay()}${this.getDateSuffix(new Date().getUTCDay())} of ${new Date().getUTCMonth()} ${new Date().getUTCFullYear()}`;
        
        /**
         * Gets the current time.
         * @returns 
         */
        this.time = () => new Date().toLocaleTimeString();

        /**
         * Capitalizes the first letter of a string.
         * @param {string} string The string to capitalize 
         * @returns 
         */
        this.capitalize = async (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        /**
         * Gets the suffix of the date eg 1st, 2nd, 3rd.
         * @param {string} date The current date
         * @returns
         */
        this.getDateSuffix = async (date) => {
            if (date > 3 && date < 21) return "th";
            switch (date % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd"; 
                default: return "th";
            };
        };
    };
};

module.exports.Utilities = Utilities; 