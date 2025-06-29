// useBusqueda.ts
import { useState } from "react";
import type { Producto } from "../Service/apiproducto";

export function useBusqueda(productos: Producto[]) {
  const [modoBusqueda, setModoBusqueda] = useState<"id" | "nombre">("id");
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>(productos.slice(0, 15));

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.trim();

    if (valor === "") {
      setBusqueda("");
      setSugerencias([]);
      setProductosFiltrados(productos.slice(0, 15));
      return;
    }

    setBusqueda(valor);

    if (modoBusqueda === "nombre") {
      const matches = productos.filter((p) =>
        p.nombre.toLowerCase().includes(valor.toLowerCase())
      );
      setSugerencias(matches.slice(0, 5));
    } else if (modoBusqueda === "id" && !isNaN(Number(valor))) {
      const producto = productos[Number(valor) - 1];
      setSugerencias(producto ? [producto] : []);
    } else {
      setSugerencias([]);
    }
  };

  const handleSeleccionSugerencia = (producto: Producto) => {
    setProductosFiltrados([producto]);
    setBusqueda("");
    setSugerencias([]);
  };

  return {
    modoBusqueda,
    setModoBusqueda,
    busqueda,
    setBusqueda,
    sugerencias,
    setSugerencias,
    productosFiltrados,
    setProductosFiltrados,
    handleBusquedaChange,
    handleSeleccionSugerencia,
  };
}