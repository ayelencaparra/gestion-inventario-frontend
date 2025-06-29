import type { Producto } from "../../Service/apilogin";
import { CategorySelector } from "../CategorySelector";

type ProductModifier = {
    handleModificarProducto:(e: React.FormEvent<HTMLFormElement>) => void;
    producto:Producto;
    handleChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductModifier ({categorias, setProducto, handleModificarProducto, producto, handleChange}: ProductModifier){

    return(
        <div className="container-creator-productspage">
            <form onSubmit={handleModificarProducto}>
                <h3 className="text-[25px] font-semibold underline text-center mb-[10px]" >Modificar producto seleccionado</h3>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                />
                <label>Precio de Compra</label>
                <input
                    type="number"
                    name="precioCompra"
                    value={producto.precioCompra}
                    onChange={handleChange}
                    required
                />
                <label>Precio de Venta</label>
                <input
                    type="number"
                    name="precioVenta"
                    value={producto.precioVenta}
                    onChange={handleChange}
                    required
                />
                <label>Categoría</label>
                <CategorySelector 
                    producto={producto}
                    categorias={categorias} 
                    setProducto={setProducto}
                />

                <label>Cantidad</label>
                <input
                    type="number"
                    name="cantidad"
                    value={producto.cantidad}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Modificar</button>
            </form>
        </div>
    )
}