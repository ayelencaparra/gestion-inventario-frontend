interface SalesSearchEnginesProps {
  fechaBusqueda: string;
  setFechaBusqueda: React.Dispatch<React.SetStateAction<string>>;
  fechaInicio: string;
  setFechaInicio: React.Dispatch<React.SetStateAction<string>>;
  fechaFin: string;
  setFechaFin: React.Dispatch<React.SetStateAction<string>>;
}

export function SalesSearchEngines ({fechaBusqueda, setFechaBusqueda, fechaInicio, setFechaInicio, fechaFin, setFechaFin}: SalesSearchEnginesProps) {
    return(
        <div className="container-search-buttons flex flex-col pt-[80px]" >
            <div className="flex flex-col">
                <label htmlFor="">Buscar venta por fecha</label>
                <input 
                    type="date"
                    value={fechaBusqueda}
                    onChange={e => {
                        setFechaBusqueda(e.target.value);
                        setFechaInicio("");
                        setFechaFin("")}}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="">Buscar las ventas de la fecha :</label>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={e => {
                        setFechaInicio(e.target.value);
                        setFechaBusqueda("");
                    }}
                />
                <label className="text-center">a</label>
                <input
                    type="date"
                    value={fechaFin}
                    onChange={e => {
                        setFechaFin(e.target.value)
                        setFechaBusqueda("");}
                    }
                />
            </div>
        </div>
    )
}