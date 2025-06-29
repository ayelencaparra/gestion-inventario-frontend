import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import "./salespage.css"
import { useNavigate } from "react-router-dom";
import { SubIndexSales } from "../components/sales/SubIndexSales";
import { SalesDetailsPopup } from "../components/sales/SalesDetailsPopup";
import { listarVentas, type Venta } from "../Service/apiventas";
import { SalesSearchEngines } from "../components/sales/SalesSearchEngines";
import { TableSales } from "../components/sales/TableSales";
import { SaleCreator } from "../components/sales/SaleCreator";
import { SalesEliminator } from "../components/sales/SalesEliminator";

export function SalesPage () {
    const [seccionActiva, setSeccionActiva] = useState<"listar" | "crear" | "eliminar"| null>("listar")
    
    const[mensajeDeExito, setMensajeExito] = useState<boolean>(false)

    const [saleDetailPopup, setSaleDetailPopup] = useState<boolean>(false)

    const[sale, setSale] = useState<Venta>({
      id: 0,
      fecha: "",
      detalles:[{productoNombre: "", categoriaNombre: "", cantidad: 0, precioVenta: 0,}],
    })

    const[sales, setSales] = useState<Venta[]>([])

    const [fechaBusqueda, setFechaBusqueda] = useState("");

    const [fechaInicio, setFechaInicio] = useState("");

    const [fechaFin, setFechaFin] = useState("");
    
    const [trigger, setTrigger] = useState(false)

    const getVentasParaMostrar = (): Venta[] => {
        if (fechaBusqueda) {
            return sales.filter(s => s.fecha.slice(0, 10) === fechaBusqueda);
        }

        if (fechaInicio && fechaFin) {
            return sales.filter(s => {
            const fecha = s.fecha.slice(0, 10);
            return fecha >= fechaInicio && fecha <= fechaFin;
            });
        }

        return sales;
    };

    const ventasParaMostrar = getVentasParaMostrar();

    const handleOnClickDetails = (venta: Venta | null | undefined) => {
        if (!venta) return;

        setSale(venta);
        setSaleDetailPopup(true);
    };
    useEffect(() => {
        listarVentas().then(setSales);
        
      }, [trigger]);

    const navigate = useNavigate();

    const handleClean = () => {
        setFechaBusqueda("");
        setFechaInicio("");
        setFechaFin("");
        setSale({
            id: 0,
            fecha: "",
            detalles: [{ productoNombre: "", categoriaNombre: "", cantidad: 0, precioVenta: 0 }],
        });
        setSaleDetailPopup(false);
    }
   

    const handleImageClick = () => {
        navigate("/"); 
    };

    return(
        <section className="container-salespage">
            <Header/>
            <div className="container-section-sales flex flex-row  min-h-[90vh]">
                <SubIndexSales
                    setMensajeExito={setMensajeExito}
                    setSeccionActiva={setSeccionActiva} 
                    seccionActiva={seccionActiva} 
                    handleClean={handleClean} 
                    handleImageClick={handleImageClick}
                />
                
                <section className="container-elements-salespage" style={!saleDetailPopup ?{flexDirection:"row"}: {flexDirection:"row", justifyContent:"start", paddingLeft:"100px"}}>
                
                {(seccionActiva === "listar" && !saleDetailPopup) && (
                    <>
                        <TableSales
                            ventasParaMostrar={ventasParaMostrar} 
                            handleOnClickDetails={handleOnClickDetails}
                            title="Listar ventas"
                        />
                        <SalesSearchEngines
                            fechaBusqueda={fechaBusqueda} 
                            setFechaBusqueda={setFechaBusqueda} 
                            fechaInicio={fechaInicio}
                            setFechaInicio={setFechaInicio} 
                            fechaFin={fechaFin} 
                            setFechaFin={setFechaFin}
                        />
                    </>
                    )}

                    {(seccionActiva === "listar" && saleDetailPopup) && (
                        <SalesDetailsPopup
                            setSaleDetailPopup={setSaleDetailPopup}
                            sale={sale}
                        />
                    )}

                    {seccionActiva === "crear" &&(
                        <SaleCreator
                            mensajeDeExito={mensajeDeExito}
                            setMensajeExito={setMensajeExito}
                            setTrigger2={setTrigger}
                        />
                    )}
                        {(seccionActiva === "eliminar" && !saleDetailPopup)&&(
                            <>
                                <SalesEliminator
                                    ventasParaMostrar={ventasParaMostrar} 
                                    handleOnClickDetails={handleOnClickDetails}
                                    title={"Eliminar venta"}
                                    mensajeDeExito={mensajeDeExito}
                                    setMensajeExito={setMensajeExito}
                                    setTrigger={setTrigger}
                                    
                                />
                                <SalesSearchEngines
                                    fechaBusqueda={fechaBusqueda} 
                                    setFechaBusqueda={setFechaBusqueda} 
                                    fechaInicio={fechaInicio}
                                    setFechaInicio={setFechaInicio} 
                                    fechaFin={fechaFin} 
                                    setFechaFin={setFechaFin}
                                />
                            </>
                        )}
                        {(seccionActiva === "eliminar" && saleDetailPopup) && (
                            <SalesDetailsPopup
                                setSaleDetailPopup={setSaleDetailPopup}
                                sale={sale}
                            />
                        )}
                    
                </section>
                
            </div>
        </section>
        
    )
}