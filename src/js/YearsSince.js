/** @param {Date|string} date */
export default function YearsSince(date) {
    if (!(date instanceof Date)) date = new Date(date);
    
    const now = new Date();

    return Math.floor(
        (now - date) / (365.25 * 24 * 60 * 60 * 1000)
    );
}