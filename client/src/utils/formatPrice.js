const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
};

export default formatPrice;