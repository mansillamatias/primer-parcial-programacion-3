import { getCategories, PRODUCTS } from "../../../data/data";
import type { ICategory } from "../../../types/ICategory";
import type { Product } from "../../../types/Product";
import { renderHeader } from "../../../main";
import { addToCart, totalItemsCart } from "../../../utils/cart";

// Renderizado del header
renderHeader();

// Referencias a elementos del DOM
const categoriesList = document.querySelector<HTMLUListElement>("#categories__list");
const conteinerProducts = document.querySelector<HTMLElement>("#conteiner__products");
const searchInput = document.querySelector<HTMLInputElement>("#search__input");
const cartCount = document.querySelector<HTMLSpanElement>(".cart__count");

// Fragmento para optimizar la inserción de productos
const fragmentCategories = document.createDocumentFragment();
const fragmentProducts = document.createDocumentFragment();

// Obtener categorías
const categories = getCategories();

// Crear un elemento de categoría
const crateCategoryItem = (category: ICategory): HTMLElement => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="categories__item" >${category.nombre}</button>`;
  return li;
};

// Crear una tarjeta de producto
const createProductCard = (product: Product): HTMLElement => {
  const article = document.createElement("article");
  article.classList.add("product__card");
  article.setAttribute("data-id", product.id.toString());
  article.innerHTML = `
      <header class="product__header">
        <img src="${product.imagen}" alt="${product.nombre}">
      </header>
      <main class="product__main">
        <h4>${product.categorias.map((cat) => cat.nombre).join(", ")}</h4>
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
      </main>
      <footer class="product__footer">
        <p>$${product.precio}</p>
        <button class="add-to-cart">+ Agregar</button>
      </footer>
      `;
  return article;
}

// Mostrar productos en el contenedor
const showProducts = (products: Product[]) => {
  if (conteinerProducts) {
    conteinerProducts.innerHTML = "";
    products.forEach((product) => {
      const article = createProductCard(product);
      fragmentProducts.appendChild(article);
    });
  }
  if (conteinerProducts) conteinerProducts.appendChild(fragmentProducts);
};

// Filtrar productos por nombre o categoría
const filteredProducts = (filter: string): Product[] => {
  const filtered = PRODUCTS.filter((product) =>
    product.nombre.toLowerCase().includes(filter) ||
    product.descripcion.toLowerCase().includes(filter) ||
    product.categorias.some((cat) => cat.nombre.toLowerCase() === filter.toLowerCase())
  );
  return filtered;
};

// Renderizar categorías
categories.forEach((category: ICategory) => {
  const li = crateCategoryItem(category);
  fragmentCategories.appendChild(li);
});

if (categoriesList) categoriesList.appendChild(fragmentCategories);

// Mostrar todos los productos al cargar la página
showProducts(PRODUCTS);

// Busqueda en tiempo real
searchInput?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  const searchProduct = target.value.toLowerCase();
  const filtered = filteredProducts(searchProduct);
  showProducts(filtered);
});

// Selección de categoría
categoriesList?.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target as HTMLElement;

  // Eliminar seleccion previa
  categoriesList.querySelector(".categories__item--selected")?.classList.remove("categories__item--selected");

  if (target.classList.contains("categories__item")) {
    target.classList.add("categories__item--selected");
    const categoryName = target.textContent?.trim() || "";
    console.log("Categoría seleccionada:", categoryName);

    if (categoryName === "Todos los productos") {
      showProducts(PRODUCTS);
    } else {
      const categotyProducts = filteredProducts(categoryName);
      showProducts(categotyProducts);
    }
  }
});

// Agregar al carrito
conteinerProducts?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("add-to-cart")) {
    const productCard = target.closest(".product__card");
    const productId = productCard?.getAttribute("data-id");
    if (productId) {
      addToCart(parseInt(productId));
    }
    if (cartCount) {
      cartCount.textContent = totalItemsCart().toString();
    }
  }
});