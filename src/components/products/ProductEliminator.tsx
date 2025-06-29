import type { Producto } from "../../Service/apiproducto";


type ProductEliminatorProps = {
  productosFiltrados: Producto[];
 handleEliminarProducto: (id: number) => Promise<void>;
 handleClean:() => void;
};

export function ProductEliminator({productosFiltrados, handleEliminarProducto, handleClean}: ProductEliminatorProps) {
    return(
        <div className="container-creator-productspage" style={{ display:"flex", flexDirection:"column",marginTop: "10px", width:"800px", justifyContent:"star", alignItems:"center"}}>
            <h3 className="text-[30px] font-semibold mb-5">Producto Seleccionado</h3>
            <div style={{padding:"10px", border:"solid, 2px black", marginBottom:"10px"}}>
                <p><strong>Nombre:</strong> {productosFiltrados[0].nombre}</p>
                <p><strong>Precio de Compra:</strong> {productosFiltrados[0].precioCompra}</p>
                <p><strong>Precio de Venta:</strong> {productosFiltrados[0].precioVenta}</p>
                <p><strong>Categoría:</strong> {productosFiltrados[0].categoria?.nombre || "Sin categoría"}</p>
                <p><strong>Cantidad:</strong> {productosFiltrados[0].cantidad}</p>
            </div>
            <button
                style={{ backgroundColor: "red", color: "white", padding: "8px", marginTop: "10px", width:"400px" }}
                onClick={() => {if(productosFiltrados[0].id){handleEliminarProducto(productosFiltrados[0].id)}; handleClean()}}
            >
                Eliminar Producto
            </button>
        </div>
)
}