import API_URL from "../env";
import type { Categoria } from "./apicategorias";


export interface Producto {
  id?: number;
  nombre: string;
  precioCompra?: number;  // Para productos detallados
  precioVenta?: number;
  cantidad?: number;
  categoria: Categoria;
  
}

export const eliminarProducto = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/producto/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el producto");
  }

  return true; // No esperamos un JSON en DELETE
};

export const updateProducto = async (producto: Producto) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/producto/update/${producto.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al modificar el producto");
  }

  return res.json();
};

export const crearProducto = async (producto: Producto) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/producto/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });
  
  return res.json();
};

export const listarProductos = async (): Promise<Producto[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/producto/lista`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};