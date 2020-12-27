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

module.exports = middlewareObj;