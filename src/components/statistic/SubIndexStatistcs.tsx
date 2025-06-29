type SubIndexStatistcs ={
    setSeccionActiva: React.Dispatch<React.SetStateAction<"iventas" | "iproductos" | "iganancias">>;
    seccionActiva:string|null;
    handleClean: () => void;
    handleImageClick:() => void;
    setMensajeExito: React.Dispatch<React.SetStateAction<boolean>>
}

export function SubIndexStatistcs ({setSeccionActiva, handleClean, setMensajeExito, seccionActiva, handleImageClick}:SubIndexStatistcs){
    
    return(
        <section className="container-subindex-statisticspage">
            <ul style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <li>Stock</li>
                <li 
                    onClick={() => {setSeccionActiva("iventas"); handleClean(); setMensajeExito(false)}} 
                    style={(seccionActiva === "iventas")? {textDecoration:"underline", textDecorationThickness:"2px", textUnderlineOffset:"7px"}:{}}
                >
                    Informe de Ventas <br />por periodo</li>
            </ul>
            <img 
            src="/image 1.png"
            alt="Imagen de un botón off"
            onClick={handleImageClick}
            />
        </section>
    )
}