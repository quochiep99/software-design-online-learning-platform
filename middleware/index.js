const middlewareObj = [];

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error_msg", "You must log in first before you can do that !");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;