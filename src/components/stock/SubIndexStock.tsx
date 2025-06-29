type SubIndexStock ={
    setSeccionActiva: React.Dispatch<React.SetStateAction<"listar" | "crear"| null>>;
    seccionActiva:string|null;
    handleClean: () => void;
    handleImageClick:() => void;
    setMensajeExito: React.Dispatch<React.SetStateAction<boolean>>
}

export function SubIndexStock ({setSeccionActiva, handleClean, setMensajeExito, seccionActiva, handleImageClick}:SubIndexStock){

    const cambiarDeSubSeccion = (section:"crear" | "listar" | null) =>{
        const rol = localStorage.getItem("rol")?.toString()
        if(rol === "ROLE_USER" && section){
            console.log("Bloqueado por ROL_USER, redirigiendo a LISTAR");
            setSeccionActiva("listar")
            alert("Como usuario sólo podés acceder a las visualizaciones, comunicate con un administrador si querés manipular el contenido.")
        }
        else{
           setSeccionActiva(section) 
        }
    }
    return(
        <section className="container-subindex-stockpage">
            <ul>
                <li>Stock</li>
                <li 
                    onClick={() => {cambiarDeSubSeccion("listar"); handleClean(); setMensajeExito(false)}} 
                    style={(seccionActiva === "listar")? {textDecoration:"underline", textDecorationThickness:"2px", textUnderlineOffset:"7px"}:{}}
                >
                    Listar</li>
                <li 
                    onClick={() => {cambiarDeSubSeccion("crear"); handleClean(); setMensajeExito(false)}} 
                    style={(seccionActiva === "crear")? {textDecoration:"underline", textDecorationThickness:"2px", textUnderlineOffset:"7px"}:{}}
                >
                    Crear orden de <br />compra</li> 
            </ul>
            <img 
            src="/public/image 1.png" 
            alt="Imagen de un botón off"
            onClick={handleImageClick}
            />
        </section>
    )
}