import type { Venta } from "../../Service/apiventas";


type DetailProductsSoldProps = {
  sale: Venta;
};

export function DetailPoductsSold({ sale }: DetailProductsSoldProps) {

  return (
    <div className="container-detailpoductssold h-[700px] overflow-hidden overflow-y-auto box-content">
        <table className="container-table-sales">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio de Venta</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            {sale.detalles.map((detalle, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{detalle.productoNombre}</td>
                        <td>{detalle.precioVenta}</td>
                        <td>{detalle.categoriaNombre}</td>
                        <td>{detalle.cantidad}</td>
                        <td>${(detalle.cantidad * detalle.precioVenta).toLocaleString()}</td>
                    </tr>
                );
            })}
        </tbody>
        </table>
    </div>
  );
}