module.exports = (navFields) => {
    var ret = "<ul>";
    for (const navField of navFields) {
        ret += `
            <li><a href="/it/${navField.name}/courses/">
            ${require("./getFieldName")(navField.name)}</a></li>
            `
    }
    ret += "</ul>";
    return ret;
}