module.exports = (user, course, options) => {
    if (user && user.role === "i") {
        for (var i = 0; i < user.uploadedCourses.length; i++) {
            if (user.uploadedCourses[i]._id.equals(course._id)) {
                return options.fn({ course });
            }
        }
    }
}