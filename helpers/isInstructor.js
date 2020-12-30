module.exports = (user, course, options) => {
    if (user && user.role === "i") {
        return options.fn({ course });
    }
}