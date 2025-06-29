import API_URL from "../env";


export interface Venta {
  id: number;
  fecha: string; // ISO string, por ejemplo: "2025-06-24T20:30:28.938Z"
  detalles: DetalleVenta[];
}

export interface DetalleVenta {
  productoNombre: string;
  categoriaNombre: string;
  cantidad: number;
  precioVenta: number;
}

export const listarVentas = async (): Promise<Venta[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/ventas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const crearVenta = async (venta: Venta) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/ventas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(venta),
  });
  return res.json();
};
export const eliminarVenta = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/ventas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la venta");
  }

  return true;
};