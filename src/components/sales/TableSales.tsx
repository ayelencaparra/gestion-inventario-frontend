import type { Venta } from "../../Service/apiventas";

interface TableSalesProps {
  ventasParaMostrar: Venta[];
  handleOnClickDetails: (venta: Venta) => void;
  title:string;
}

export function TableSales ({ventasParaMostrar, handleOnClickDetails, title}:TableSalesProps) {
    return(
        <div>
            <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">{title}</h2>
            <div className="container-section-table-sales h-[650px] overflow-auto">
                <table className="container-table-sales">
                    <thead>
                        <tr>
                            <th>Indice</th>
                            <th>Fecha</th>
                            <th className="td-expandible">Valor de la venta</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasParaMostrar.length > 0 ? (
                            ventasParaMostrar.map((sale:Venta, index:number) => {
                            const totalVenta = sale.detalles.reduce(
                                (acc, detalle) => acc + detalle.cantidad * detalle.precioVenta,
                                0
                            );

                            return (
                                <tr key={sale.id}>
                                <td>{index + 1}</td>
                                <td className="td-expandible">{new Date(sale.fecha).toLocaleDateString()}</td>
                                <td className="td-expandible">${totalVenta.toLocaleString()}</td>
                                <td className="td-expandible p-0">
                                    <button onClick={() => handleOnClickDetails(sale)}>
                                    Detalle
                                    </button>
                                </td>
                                </tr>
                            );
                            })
                        ) : (
                            <tr>
                            <td colSpan={4} className="text-center text-black-500 font-semibold p-5">
                                No se encontraron ventas para la fecha o rango seleccionado.
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}