module.exports = (totalStudents, options) => {
    if (totalStudents >= 13) {
        return options.fn();
    }
}