import { getCategories } from "../../../data/data";
import type { ICategory } from "../../../types/ICategory";

// Referencias a elementos del DOM
const categoriesList = document.querySelector<HTMLUListElement>("#categories__list");

// Fragmento para optimizar la inserción de productos
const fragmentCategories = document.createDocumentFragment();

// Obtener categorías
const categories = getCategories();

// crear un elemento de categoría
const crateCategoryItem = (category: ICategory): HTMLElement => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="categories__item" >${category.nombre}</button>`;
  return li;
};

// Renderizar categorías
categories.forEach((category: ICategory) => {
  const li = crateCategoryItem(category);
  fragmentCategories.appendChild(li);
});

if (categoriesList) categoriesList.appendChild(fragmentCategories);