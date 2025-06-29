import type { Producto } from "../../Service/apiproducto";

type ProductFound = {
    productosFiltrados:Producto[];
    handleClean:() => void;
}
export function ProductFound ({productosFiltrados, handleClean}: ProductFound){
    return(
        <div className="container-creator-productspage" style={{ display:"flex", flexDirection:"column",marginTop: "20px", width:"800px", justifyContent:"star", alignItems:"center"}}>
            <h3>Producto Seleccionado</h3>
            <div style={{padding:"10px", border:"solid, 2px black", marginBottom:"10px"}}>
                <p><strong>Nombre:</strong> {productosFiltrados[0].nombre}</p>
                <p><strong>Precio de Compra:</strong> {productosFiltrados[0].precioCompra}</p>
                <p><strong>Precio de Venta:</strong> {productosFiltrados[0].precioVenta}</p>
                <p><strong>Categoría:</strong> {productosFiltrados[0].categoria?.nombre || "Sin categoría"}</p>
                <p><strong>Cantidad:</strong> {productosFiltrados[0].cantidad}</p>
            </div>
            <button onClick={handleClean}>Cerrar</button>
        </div>
    )
}