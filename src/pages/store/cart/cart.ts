import { renderHeader, updateCartCount } from "../../../main";
import type { ItemCart } from "../../../types/ItemCart";
import { getCart, removeCart, saveCart } from "../../../utils/cart";

// Renderizado del header
renderHeader();
updateCartCount();

// Referencias a elementos del DOM
const cartContainer = document.querySelector<HTMLElement>(".cart_container");
const cartItems = document.querySelector<HTMLElement>(".cart__items");
const cartSummary = document.querySelector<HTMLElement>(".cart__summary");

// Crear una tarjeta de producto en el carrito
const createCard = (item: ItemCart): HTMLElement => {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", item.id.toString());
  article.innerHTML = `
    <div class="cart__item__image">
      <img src="${item.imagen}" alt="${item.nombre}">
    </div>
    <div class="cart__item__details">
      <h2 class="cart__item__name">${item.nombre}</h2>
      <p class="cart__item__category">${item.categorias[0].nombre}</p>
      <p class="cart__item__subtotal">Subtotal: <span class="cart__item__price">$${item.precio * item.cantidad}</span></p>
    </div>
    <div class="cart__item__actions">
      <div class="quantity-controls">
        <button type="button" class="quantity-btn" data-action="decrease" aria-label="Disminuir cantidad">-</button>
        <span class="quantity">${item.cantidad}</span>
        <button type="button" class="quantity-btn" data-action="increase" aria-label="Aumentar cantidad">+</button>
      </div>
      <button type="button" class="remove-item-button" aria-label="Eliminar producto">Eliminar</button>
    </div>
  `;
  return article;
}

// Crear tarjeta de resumen del carrito
const createSummaryCard = (): HTMLElement => {
  const getCartItems: ItemCart[] = getCart();
  const article = document.createElement("article");
  article.classList.add("cart__summary");
  article.innerHTML = `
    <h2 class="cart__summary__title">Resumen</h2>
    <div class="cart__summary__subtotal">
      <p>Subtotal: </p>
      <p>$${getCartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)}</p>
    </div>
    <div class="cart__summary__total">
      <p>Total: </p>
      <p>$${getCartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)}</p>
    </div>
    <button type="button" class="checkout-button">Finalizar compra</button>
    <p class="cart__summary__warning">⚠️ El checkout no está disponible en esta versión.</p>
    <button type="button" class="clear-cart-button">Vaciar carrito</button>
  `;
  return article;
}

const updateResumeCard = () => {
  // Verificamos que ambos contenedores existan antes de continuar
  if (!cartItems || !cartSummary) return;

  const getCartItems: ItemCart[] = getCart();

  // Si el carro esta vacio
  if (getCartItems.length === 0) {
    cartItems.innerHTML = '<p class="cart__empty">Tu carrito está vacío.</p>';
    cartSummary.innerHTML = "";
    cartSummary.classList.add("cart__summary--empty");
    return;
  }

  // Renderizamos los items del carrito
  cartItems.innerHTML = "";
  const fragmentCart = document.createDocumentFragment();

  getCartItems.forEach((item) => {
    const card = createCard(item);
    fragmentCart.appendChild(card);
  });
  cartItems.appendChild(fragmentCart);
  updateCartCount();

  // Renderizamos el resumen del carrito
  cartSummary.innerHTML = "";
  const summaryCard = createSummaryCard();
  cartSummary.appendChild(summaryCard);
}

const changeQuantity = (productId: number, delta: number) => {
  const cart: ItemCart[] = getCart();
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].cantidad += delta;

    // Si la cantidad es menor o igual a 0, eliminar el producto del carrito
    if (cart[itemIndex].cantidad <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart(cart);
    updateResumeCard();

  }
}

// Inicializar el carrito al cargar la página
updateResumeCard();

// Escuchar cambios en el localStorage desde otras pestañas
window.addEventListener("storage", (event) => {
  if (event.key === "Cart") {
    updateResumeCard();
  }
});

cartContainer?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  console.log(target)

  if (target.classList.contains("clear-cart-button")) {
    removeCart();
    updateResumeCard();
    return;
  };

  const itemElement = target.closest(".cart__item") as HTMLElement;
  const productId = parseInt(itemElement?.getAttribute("data-id") || "0");

  if (target.classList.contains("quantity-btn")) {
    const action = target.getAttribute("data-action");
    if (action === "decrease") changeQuantity(productId, -1);
    if (action === "increase") changeQuantity(productId, 1);
  }

  if (target.classList.contains("remove-item-button")) {
    const cart: ItemCart[] = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
    updateResumeCard();
    updateCartCount();

  }
});

cartSummary?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("clear-cart-button")) {
    removeCart();
    updateResumeCard();
    updateCartCount();
  }
}
);