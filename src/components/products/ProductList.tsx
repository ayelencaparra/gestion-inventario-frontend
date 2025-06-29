import type { Producto } from "../../Service/apiproducto";

export function ProductList ({ productosParaMostrar }: { productosParaMostrar: Producto[] }){
    return(
        <table className="container-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {productosParaMostrar.map((producto:Producto, index:number) => (
                <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precioCompra?.toLocaleString()}</td>
                    <td>${producto.precioVenta?.toLocaleString()}</td>
                    <td>{producto.categoria?.nombre}</td>
                    <td>{producto.cantidad}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}