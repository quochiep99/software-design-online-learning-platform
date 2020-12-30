module.exports = (updatedAt, options) => {
    const today = new Date();
    const date = new Date(updatedAt);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // if the last updated day is within last 3 days
    if (diffDays <= 3) {
        return options.fn();
    }
}