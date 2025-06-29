
import type { Venta } from "../../Service/apiventas";
import { DetailPoductsSold } from "./DetailPoductsSold";

type SalesDetailsPopup = { 
    setSaleDetailPopup:React.Dispatch<React.SetStateAction<boolean>>;
    sale:Venta;
}
export function SalesDetailsPopup ({setSaleDetailPopup, sale}: SalesDetailsPopup) {
    const totalVenta = sale.detalles.reduce((acc, sale) => {
                    return acc + sale.cantidad * sale.precioVenta;
                }, 0);
    return(
        <section className="container-saledatailpopup w-[800px] flex flex-row gap-[50px]">
            <div>
                <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">Detalle de la venta {new Date(sale.fecha).toLocaleDateString()}</h2>
                <DetailPoductsSold
                    sale={sale}
                />
            </div>
            <div className="mt-[10px] sm:mt-[90px]">
                <p className="p-[10px] border text-[20px] bg-[#A9CEFF] mb-[20px] w-[400px]">Precio total de la venta: {totalVenta.toLocaleString()}$</p>
                <button id="button-saledatailpopup" onClick={() => setSaleDetailPopup((prev:boolean) => !prev)}>Volver</button>
            </div>
        </section>
    )
}