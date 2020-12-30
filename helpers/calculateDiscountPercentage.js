module.exports = (discountPrice, originalPrice) => {
    return ((100 * (originalPrice - discountPrice)) / originalPrice).toFixed(0);
}