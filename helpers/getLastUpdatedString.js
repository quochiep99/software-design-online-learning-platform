module.exports = (date) => {
    const newDate = new Date(date);
    // return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    const [hour, minute, second] = newDate.toLocaleTimeString("en-US").split(/:| /);
    // return hour + "h : " + minute + "m : " + second + "s    " + newDate.toDateString();
    return newDate.toTimeString();
}