const middlewareObj = [];

middlewareObj.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error_msg", "You must log in first before you can do that !");
        req.session.returnTo = req.originalUrl;
        res.redirect("/login");
    }
}

middlewareObj.checkUploadedCourseOwnership = (req, res, next) => {
    for (var i = 0; i < req.user.uploadedCourses.length; i++) {
        // This is the instructor who actually owns the course
        if (req.user.uploadedCourses[i]._id.equals(req.params.id)) {
            return next();
        }
    }
    req.flash("error_msg", "You are not allowed to do that !");
    const backURL = req.session.returnTo.replace("/edit", "");
    res.redirect(backURL);
    delete req.session.returnTo;
}

middlewareObj.checkEnrolledCourseOwnership = (req, res, next) => {
    for (var i = 0; i < req.user.enrolledCourses.length; i++) {
        // This is the user who has already and actually purchased the course
        if (req.user.enrolledCourses[i]._id.equals(req.params.id)) {
            return next();
        }
    }
    req.flash("error_msg", "You must purchase the course first before you can access it !");
    const backURL = req.session.returnTo.replace("/learn", "");
    res.redirect(backURL);
    delete req.session.returnTo;
}

middlewareObj.isInstructor = (req, res, next) => {
    if (req.user.role === "i") {
        return next();
    }
    req.flash("error_msg", "You are not allowed to do that !");
    res.redirect("/");
}
module.exports = middlewareObj;