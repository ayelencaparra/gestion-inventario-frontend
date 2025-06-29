import { useState, useEffect } from "react";
import { crearProducto, eliminarProducto, listarProductos, updateProducto, type Producto } from "../Service/apiproducto";
import { listarCategorias, type Categoria } from "../Service/apicategorias";

export function useProductos(triggerDependencia: boolean, setTrigger:React.Dispatch<React.SetStateAction<boolean>>) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto, setProducto] = useState<Producto>({
    id: 0,
    nombre: "",
    precioCompra: 0,
    precioVenta: 0,
    cantidad: 0,
    categoria: { id: 0, nombre: "", productos: [] },
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensajeExito, setMensajeExito] = useState(false);

  useEffect(() => {
    listarProductos().then(setProductos);
    listarCategorias().then(setCategorias);
  }, [triggerDependencia]);

 const handleCrearProducto = async (e: React.FormEvent<HTMLFormElement>) => {

     e.preventDefault(); 
     
    if (producto.categoria.id === 0) {
      alert("Debe seleccionar una categoría");
      return;
    }
    try {
      const nuevoProducto = await crearProducto(producto);
      setProductos((prev) => [...prev, nuevoProducto]);
      limpiarProducto();
      mostrarMensajeExito();
      setTrigger(prev  => !prev)
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear el producto");
    }
  };

  const handleEliminarProducto = async (id: number) => {
    try {
      const productoEliminado = await eliminarProducto(id);
      console.log(productoEliminado)
      setProductos((prev) => prev.filter((p) => p.id !== id));
      mostrarMensajeExito();
      setTrigger(prev  => !prev)
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar el producto");
    }
  };

  const handleModificarProducto = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault(); 

    if (!producto.id || producto.id === 0) {
      alert("Selecciona un producto para modificar");
      return;
    }
    try {
      const productoModificado = await updateProducto(producto);
      setProductos((prev) =>
        prev.map((p) => (p.id === productoModificado.id ? productoModificado : p))
      );
      limpiarProducto();
      mostrarMensajeExito();
      setTrigger(prev  => !prev)
    } catch (error) {
      console.error("Error al modificar el producto:", error);
      alert("Error al modificar el producto");
    }
  };

  const limpiarProducto = () => {
    setProducto({
      id: 0,
      nombre: "",
      precioCompra: 0,
      precioVenta: 0,
      cantidad: 0,
      categoria: { id: 0, nombre: "", productos: [] },
    });
  };

  const mostrarMensajeExito = () => {
    setMensajeExito(prev => !prev);
    setTimeout(() => setMensajeExito(false), 3000);
  };

  return {
    productos,
    producto,
    setProducto,
    categorias,
    mensajeExito,
    setMensajeExito,
    handleCrearProducto,
    handleEliminarProducto,
    handleModificarProducto,
    limpiarProducto,
  };
}