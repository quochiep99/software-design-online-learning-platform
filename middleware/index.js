const middlewareObj = [];

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error_msg", "You must log in first before you can purchase this course");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;