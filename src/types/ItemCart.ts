import type { ICategory } from "./ICategory";

export type ItemCart = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categorias: ICategory[];
  cantidad: number;
};
