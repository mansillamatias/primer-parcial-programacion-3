import { totalItemsCart } from "./utils/cart";

export const renderHeader = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  console.log("Current page:", currentPage);
  const headerHTML = `
  <header>
    <h1 class="logo">🛒Food Store</h1>
    <nav>
      <ul class="nav__list">
        <li><a ${currentPage === "home.html" ? 'class="nav__button nav__button--selected"' : 'class="nav__button"'} href="./../home/home.html">Catalogo</a></li>
        <li><a ${currentPage === "cart.html" ? 'class="nav__button nav__button--selected"' : 'class="nav__button"'} href="./../cart/cart.html">Carrito<span
              class="cart__count">0</span></a></li>
      </ul>
    </nav>
  </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
};

export const updateCartCount = () => {
  const total = totalItemsCart();
  const cartCountElement = document.querySelector(".cart__count");
  if (cartCountElement) {
    cartCountElement.textContent = total.toString();
  }
}