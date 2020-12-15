const URL = {};
URL.removeParameterFromURL = (url, parameter) => {
    return url
        .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
        .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}
URL.addParameterToURL = (url, key, value) => {
    return url += (url.match(/[\?]/g) ? '&' : '?') + `${key + "=" + value}`;
}
URL.containKeyInURL = (key) => {
    return new RegExp(`[?&]${key}=`).test(location.search)
}
module.exports = URL