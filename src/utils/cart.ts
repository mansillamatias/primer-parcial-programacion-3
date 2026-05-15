import { PRODUCTS } from "../data/data";
import type { ItemCart } from "../types/ItemCart";

// Carrito de compras

export const addToCart = (productId: number) => {
  const cart: ItemCart[] = getCart();
  const product = PRODUCTS.find((p) => p.id === productId);
  if (product) {
    if (cart.some((item) => item.id === product.id)) {
      const itemIndex = cart.findIndex((item) => item.id === product.id);
      cart[itemIndex].cantidad += 1;
    } else {
      cart.push({ ...product, cantidad: 1 });
    }
    console.log("Producto agregado al carrito:", product);
    console.log("Carrito actual:", cart);
    saveCart(cart);
  }
};

export const saveCart = (product: ItemCart[]) => {
  const parseCart = JSON.stringify(product);
  localStorage.setItem("Cart", parseCart);
};

export const getCart = (): ItemCart[] => {
  const cartData = localStorage.getItem("Cart");
  return cartData ? JSON.parse(cartData) : [];
};

export const removeCart = () => {
  localStorage.removeItem("Cart");
};

export const totalItemsCart = (): number => {
  const cart: ItemCart[] = getCart();
  return cart.reduce((total, item) => total + item.cantidad, 0);
}

export const totalPriceCart = (): number => {
  const cart: ItemCart[] = getCart();
  return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

export const getItemCart = (productId: number) => {
  const cart: ItemCart[] = getCart();
  return cart.find((item) => item.id === productId);
};