const CART_KEY = "furnispace_cart";

export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);

    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart:", error);

    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();

  const existingProductIndex = cart.findIndex(
    (item) => item._id === product._id,
  );

  if (existingProductIndex !== -1) {
    const existingProduct = cart[existingProductIndex];

    const newQuantity = existingProduct.quantity + quantity;

    // Don't exceed stock

    const finalQuantity = Math.min(newQuantity, Number(product.stock || 999));

    cart[existingProductIndex] = {
      ...existingProduct,

      quantity: finalQuantity,
    };
  }

  else {
    const image =
      product.images?.[0]?.url || product.images?.[0] || "/placeholder.jpg";

    cart.push({
      _id: product._id,

      name: product.name,

      price: Number(product.price || 0),

      quantity: quantity,

      image: image,

      stock: Number(product.stock || 0),

      discount: Number(product.discount || 0),

      brand: product.brand || "FurniSpace",
    });
  }

  saveCart(cart);

  // Notify other components

  window.dispatchEvent(new Event("cartUpdated"));

  return cart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();

  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex === -1) {
    return cart;
  }

  if (quantity <= 0) {
    cart.splice(productIndex, 1);
  } else {
    const stock = Number(cart[productIndex].stock || 999);

    cart[productIndex].quantity = Math.min(quantity, stock);
  }

  saveCart(cart);

  window.dispatchEvent(new Event("cartUpdated"));

  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item._id !== productId);

  saveCart(updatedCart);

  window.dispatchEvent(new Event("cartUpdated"));

  return updatedCart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);

  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) => total + Number(item.quantity || 0),

    0,
  );
};

export const getCartTotal = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),

    0,
  );
};
