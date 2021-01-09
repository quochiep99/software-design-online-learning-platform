module.exports = (navFields) => {
    var ret = "";
    for (const navField of navFields) {
        ret += `
            <li><a class="dropdown-item" href="/it/${navField.name}/courses/">
            ${require("./getFieldName")(navField.name)}</a></li>
            `
    }

    return ret;
}