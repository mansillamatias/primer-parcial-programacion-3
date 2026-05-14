import type { ICategory } from "./ICategory";

export type Product = {
  id: number;
  eliminado: false;
  createdAt: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: ICategory[];
}