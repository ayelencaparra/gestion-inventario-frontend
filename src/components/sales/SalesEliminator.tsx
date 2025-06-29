import { eliminarVenta, type Venta } from "../../Service/apiventas";
import { SuccessMessage } from "../SuccessMessage";

interface TableSalesProps {
  ventasParaMostrar: Venta[];
  handleOnClickDetails: (venta: Venta) => void;
  title:string;
  mensajeDeExito:boolean;
  setMensajeExito?: React.Dispatch<React.SetStateAction<boolean>>;
  setTrigger?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SalesEliminator ({ventasParaMostrar, handleOnClickDetails, title, mensajeDeExito, setMensajeExito, setTrigger }:TableSalesProps) {

    const handleEliminar = async (id: number) => {
        if (!confirm("¿Estás seguro de que querés eliminar esta venta?")) return;

        try {
            await eliminarVenta(id);
            setMensajeExito?.(prev => !prev)
            setTrigger?.(prev => !prev)
            setTimeout(() => setMensajeExito?.(false), 3000);
        } catch (error) {
            console.error(error);
            alert("Error al eliminar la venta.");
        }
    };


    return(
        <div>
            <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">{title}</h2>
            {mensajeDeExito &&(
                <SuccessMessage
                message="Has eliminado la venta exitosamente"
            />
            )}
            <div className="container-sale-eliminator h-[650px] overflow-auto">
                <table className="container-table-sales">
                    <thead>
                        <tr>
                            <th>Indice</th>
                            <th>Fecha</th>
                            <th>Valor de la venta</th>
                            <th>Detalle</th>
                            <th>Eliminar</th>
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
                                <td>{new Date(sale.fecha).toLocaleDateString()}</td>
                                <td>${totalVenta.toLocaleString()}</td>
                                <td className="td-expandible">
                                    <button onClick={() => handleOnClickDetails(sale)}>
                                    Detalle
                                    </button>
                                </td>
                                <td className="td-expandible">
                                    <button
                                    
                                    id="eliminator-button"
                                    onClick={() => handleEliminar(sale.id)}
                                    >
                                    Eliminar
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