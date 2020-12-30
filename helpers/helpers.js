const helpers = {};
helpers.getTimeAgo = require("./getTimeAgo");

helpers.getLastUpdatedString = require("./getLastUpdatedString");

helpers.calculateDiscountPercentage = require("./calculateDiscountPercentage");

// function to convert i.e. 'web-development' into 'Web Development'
helpers.getFieldName = require("./getFieldName");

helpers.generatePagination = require("./generatePagination");

helpers.generateBestSeller = require("./generateBestSeller");

helpers.generateNew = require("./generateNew");

helpers.generateProfileOptions = require("./generateProfileOptions");

helpers.generateCurriculum = require("./generateCurriculum");

helpers.checkUploadedCourseOwnership = require("./checkUploadedCourseOwnership");

module.exports = helpers;