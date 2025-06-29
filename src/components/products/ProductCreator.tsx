import type { Categoria } from "../../Service/apicategorias";
import type { Producto } from "../../Service/apiproducto";
import { CategorySelector } from "../CategorySelector";
import { SuccessMessage } from "../SuccessMessage";

type ProductCreator = {
  handleCrearProducto: (e: React.FormEvent<HTMLFormElement>) => void;
  mensajeExito: boolean;
  producto: Producto;
  categorias: Categoria[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProducto: React.Dispatch<React.SetStateAction<Producto>>;
};

export function ProductCreator ({handleCrearProducto, mensajeExito, producto, handleChange, categorias, setProducto}:ProductCreator) {
    return(
        <section className="container-creator-productspage mt-[50px]">
            <form onSubmit={handleCrearProducto}>
                {/* Popup de éxito */}
            {mensajeExito && (
            <SuccessMessage
                message={"Has creado un producto con exito ✅"}
            />
            )}
            {/* Este HandleChange gestiona en tiempo real como muta por teclado el estado producto
                para poder ingresarlo en modificar porducto o crear producto */}
            <h2 className="text-[30px] font-semibold mb-10 text-center">Crear Producto</h2>
            <label>Nombre</label>
            <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
            
            <label>Precio de Compra</label>
            <input type="number" name="precioCompra" value={producto.precioCompra} onChange={handleChange} required />
            
            <label>Precio de Venta</label>
            <input type="number" name="precioVenta" value={producto.precioVenta} onChange={handleChange} required />
            
            <label>Categoría</label>
            <CategorySelector producto={producto} categorias={categorias} setProducto={setProducto}/>
            
            <label>Cantidad</label>
            <input type="number" name="cantidad" value={producto.cantidad} onChange={handleChange} required />
            
            <button type="submit">Crear</button>
            </form>
        </section>
    )
}