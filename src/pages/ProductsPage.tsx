import { useState } from "react";
import "./productspage.css";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { SubIndexProduct } from "../components/products/SubIndexProduct";
import { SearchButtons } from "../components/SearchButtons";
import { SearchSuggestions } from "../components/products/SearchSuggestions";
import { ProductFound } from "../components/products/ProductFound";
import { ShowEverythingButton } from "../components/ShowEverythingButton";
import { ProductList } from "../components/products/ProductList";
import { ProductCreator } from "../components/products/ProductCreator";
import { ProductModifier } from "../components/products/ProductModifier";
import { ProductEliminator } from "../components/products/ProductEliminator";
import { useProductos } from "../hooks/useProducts";
import { useBusqueda } from "../hooks/useBusqueda";
import { SuccessMessage } from "../components/SuccessMessage";

export function ProductsPage() {

  const [trigger, setTrigger] = useState<boolean>(false);

  const [seccionActiva, setSeccionActiva] = useState<"crear" | "modificar" | "eliminar" | "listar" | null>("listar");

  const [mostrarTodoStock, setMostrarTodoStock] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    productos,
    producto,
    setProducto,
    setMensajeExito,
    categorias,
    mensajeExito,
    handleCrearProducto,
    handleEliminarProducto,
    handleModificarProducto,
  } = useProductos(trigger, setTrigger);

  const {
    modoBusqueda,
    setModoBusqueda,
    busqueda,
    sugerencias,
    productosFiltrados,
    handleBusquedaChange,
    handleSeleccionSugerencia,
    setProductosFiltrados,
  } = useBusqueda(productos);

  const productosParaMostrar = mostrarTodoStock
  ? productos
  : productos.slice(0, 15);

  const handleImageClick = () => {
        navigate("/"); 
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleClean = () => {
    setProductosFiltrados([])
    setProducto({id: 0,
    nombre: "",
    precioCompra: 0, 
    precioVenta: 0,
    cantidad: 0,
    categoria:{id:0, nombre:"", productos:[]}})
  }

  return (
    <section className="container-productspage">
      <Header/>
      <div className="container-sections-productspage flex flex-row  min-h-[90vh]" >
              <SubIndexProduct  
                setMensajeExito={setMensajeExito}
                setSeccionActiva={setSeccionActiva} 
                seccionActiva={seccionActiva} 
                handleClean={handleClean} 
                handleImageClick={handleImageClick}
              />

              {seccionActiva === "listar" && (
                <div className="container-elements-productspage">
                  <SearchButtons 
                    textTitle={"Buscar Producto"}
                    setModoBusqueda={setModoBusqueda} 
                    modoBusqueda={modoBusqueda} 
                    busqueda={busqueda} 
                    handleBusquedaChange={handleBusquedaChange}
                    />
                  {sugerencias.length > 0 && (
                    <SearchSuggestions 
                      sugerencias={sugerencias} 
                      handleSeleccionSugerencia={handleSeleccionSugerencia} 
                      modoBusqueda={modoBusqueda}
                      setProducto={setProducto}
                    />
                  )}
                  {productosFiltrados.length === 1 && (
                    <ProductFound 
                      productosFiltrados={productosFiltrados} 
                      handleClean={handleClean}
                    />
                  )}
                    <ProductList 
                      productosParaMostrar={productosParaMostrar}
                    />
                    <ShowEverythingButton 
                      mostrarTodoStock={mostrarTodoStock} 
                      setMostrarTodoStock={setMostrarTodoStock} 
                    />
                </div>
              )}

              {seccionActiva === "crear" && (
                <ProductCreator 
                  handleCrearProducto={handleCrearProducto}
                  mensajeExito={mensajeExito} 
                  producto={producto}
                  handleChange={handleChange} 
                  categorias={categorias} 
                  setProducto={setProducto}
                />
              )}

              {seccionActiva === "modificar" && (
                <section className="container-elements-productspage">
                    <SearchButtons 
                      textTitle={"Buscar producto que quieres modificar"}
                      setModoBusqueda={setModoBusqueda} 
                      modoBusqueda={modoBusqueda} 
                      busqueda={busqueda} 
                      handleBusquedaChange={handleBusquedaChange}
                    />
                    {mensajeExito && (
                      <SuccessMessage
                        message={"Has modificado un producto con exito ✅"}
                      />
                    )}
                    {sugerencias.length > 0 && (
                      <SearchSuggestions 
                        sugerencias={sugerencias} 
                        handleSeleccionSugerencia={handleSeleccionSugerencia} 
                        modoBusqueda={modoBusqueda}
                        setProducto={setProducto}
                      />
                    )}
                    {producto.nombre && (
                      <ProductModifier 
                        categorias={categorias}
                        setProducto={setProducto}
                        handleModificarProducto={handleModificarProducto}
                        producto={producto} 
                        handleChange={handleChange}
                      />
                    )}
                </section>
              )}

              {seccionActiva === "eliminar" && (
                <section className="container-elements-productspage">
                  <SearchButtons 
                    textTitle={"Eliminar Producto"}
                    setModoBusqueda={setModoBusqueda} 
                    modoBusqueda={modoBusqueda} 
                    busqueda={busqueda} 
                    handleBusquedaChange={handleBusquedaChange}
                  />
                  {mensajeExito && (
                    <SuccessMessage
                      message={"Has eliminado un producto con exito ✅"}
                    />
                  )}
                  {sugerencias.length > 0 && (
                    <SearchSuggestions 
                      sugerencias={sugerencias} 
                      handleSeleccionSugerencia={handleSeleccionSugerencia} 
                      modoBusqueda={modoBusqueda}
                      setProducto={setProducto}
                    />
                  )}
                  {productosFiltrados.length === 1 && (
                    <ProductEliminator 
                      handleClean={handleClean}
                      productosFiltrados={productosFiltrados} 
                      handleEliminarProducto={handleEliminarProducto}
                    />
                  )}
                </section>
              )}
      </div>
    </section>
  );
}