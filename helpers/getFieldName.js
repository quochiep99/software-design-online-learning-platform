module.exports = (fieldName) => {
    return fieldName.replace("-", " ").replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
}