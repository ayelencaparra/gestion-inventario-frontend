import API_URL from "../env";
import type { Producto } from "./apiproducto";


export interface Categoria {
  id: number;
  nombre: string;
  productos: Producto[];
}

export async function listarCategorias(): Promise<Categoria[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/categorias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener categorías");
  }

  return res.json();
}

export const crearCategoria = async (categoria: { id: number; nombre: string }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/categorias/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoria),
  });

  if (!res.ok) {
    throw new Error("Error al crear la categoría");
  }

  return res.json();
};

export const actualizarCategoria = async (categoria:{ id: number; nombre: string }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/categorias/actualizar/${categoria.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoria),
  });

  if (!res.ok) {
    throw new Error("Error al modificar la categoria");
  }

  return res.json();
};

export const eliminarCategoria = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/categorias/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la categoria");
  }

  return true;
};