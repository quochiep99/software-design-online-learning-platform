const path = require("path");
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /zip|rar/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Zip files Only!');
    }
}

module.exports = checkFileType;