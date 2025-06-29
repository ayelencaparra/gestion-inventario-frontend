type SubIndexProduct ={
    setSeccionActiva: React.Dispatch<"crear" | "modificar" | "eliminar" | "listar" | null>;
    seccionActiva:string|null;
    handleClean: () => void;
    handleImageClick:() => void;
    setMensajeExito: React.Dispatch<React.SetStateAction<boolean>>
}

export function SubIndexCategories ({setSeccionActiva, seccionActiva, handleClean, handleImageClick, setMensajeExito}: SubIndexProduct) {
    const cambiarDeSubSeccion = (section:"crear" | "listar" | null) =>{
        const rol = localStorage.getItem("rol")?.toString()
        if(rol === "ROLE_USER" && section){
            setSeccionActiva("listar")
            alert("Como usuario sólo podés acceder a las visualizaciones, comunicate con un administrador si querés manipular el contenido.")
        }
        else{
           setSeccionActiva(section) 
        }
    }
    
    return(
        <section className="container-index-productspage">
                    <ul>
                        <li>Categorias</li>
                        <li 
                            onClick={() => {cambiarDeSubSeccion("listar"); handleClean(); setMensajeExito(false)}} 
                            style={(seccionActiva === "listar")? {textDecoration:"underline", textDecorationThickness:"2px", textUnderlineOffset:"7px"}:{}}
                        >
                            Listar</li>
                        <li 
                            onClick={() => {cambiarDeSubSeccion("crear"); handleClean(); setMensajeExito(false)}} 
                            style={(seccionActiva === "crear")? {textDecoration:"underline", textDecorationThickness:"2px", textUnderlineOffset:"7px"}:{}}
                        >
                            Crear</li>
                    </ul>
                    <img 
                    src="/image 1.png"
                    alt="Imagen de un botón off"
                    onClick={handleImageClick}
                    />
              </section>
    )
}