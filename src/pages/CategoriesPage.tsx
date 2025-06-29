/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { SubIndexCategories } from "../components/categories/SubIndexCategories";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import "./categorypage.css"
import { actualizarCategoria, crearCategoria, eliminarCategoria, listarCategorias, type Categoria } from "../Service/apicategorias";
import { SearchButtons } from "../components/SearchButtons";
import { CategoryCreator } from "../components/categories/CategoryCreator";
import { SuccessMessage } from "../components/SuccessMessage";

export function CategoriesPage () {
    const [mensajeExito, setMensajeExito] = useState<boolean>(false)
    const [seccionActiva, setSeccionActiva] = useState<"crear" | "modificar" | "eliminar" | "listar" | null>("listar");
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [modoBusqueda,setModoBusqueda] = useState<"nombre" | "id">("id")
    const [busqueda, setBusqueda] = useState<string>("")
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nuevoNombre, setNuevoNombre] = useState<string>("");
    const [categoria, setCategoria] = useState({ id: 0, nombre: "" });
    const [tituloMensajeExito, setTituloMensajeExito] = useState<string>("")

    useEffect(()=>{
        listarCategorias().then(setCategorias)
    },[])
    const handleClean = () => {

    }
    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate("/"); 
    };

    const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    };
    const categoriasFiltradas = categorias.filter(cat => {
        if (modoBusqueda === "id") {
            return cat.id.toString().includes(busqueda);
        } else {
            return cat.nombre.toLowerCase().includes(busqueda.toLowerCase());
        }
    });

    const handleModificar = (categoria: Categoria) => {
        setEditandoId(categoria.id);
        setNuevoNombre(categoria.nombre);
    };

    const handleAceptarModificacion = async (id: number) => {
        try {
            const rol = localStorage.getItem("rol")?.toString()
            if(rol ==="ROLE_USER") return alert("Como usuario sólo podés acceder a las visualizaciones, comunicate con un administrador si querés manipular el contenido.")
            const actualizada = await actualizarCategoria({ id, nombre: nuevoNombre });
            setCategorias(prev => prev.map(cat => cat.id === id ? actualizada : cat));
            setEditandoId(null);
            setMensajeExito(prev => !prev)
            setTituloMensajeExito("Has modificado con exito la categoria ✅")
            setTimeout(() => setMensajeExito(false), 3000);
        } catch (err) {
            alert("Error al actualizar la categoria");
        }
        };

        const handleEliminar = async (id: number) => {

        const rol = localStorage.getItem("rol")?.toString()
        if(rol ==="ROLE_USER") return alert("Como usuario sólo podés acceder a las visualizaciones, comunicate con un administrador si querés manipular el contenido.")

        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
        if (!confirmar) return;


        try {
            await eliminarCategoria(id);
            setCategorias(prev => prev.filter(cat => cat.id !== id));
            setMensajeExito(prev => !prev);
            setTituloMensajeExito("Has eliminado con exito la categoria ✅")
            setTimeout(() => setMensajeExito(false), 3000);
        } catch (err) {
            alert("Error al eliminar la categoria");
        }
    };



    const handleChangeCategoria = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoria(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleCrearCategoria = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await crearCategoria(categoria);
            setMensajeExito(prev => !prev);
            setTituloMensajeExito("Has creado con exito la categoria ✅")
            setCategoria({ id: 0, nombre: "" });
            const nuevas = await listarCategorias();
            setCategorias(nuevas);
            setTimeout(() => setMensajeExito(false), 3000);
        } catch (err) {
            alert("Error al crear la categoría");
        }
    };

    return(
        <section className="container-categorypage">
                    <Header/>
                    <div className="container-section-category flex flex-row  min-h-[90vh]">
                        <SubIndexCategories
                            setMensajeExito={setMensajeExito}
                            setSeccionActiva={setSeccionActiva} 
                            seccionActiva={seccionActiva} 
                            handleClean={handleClean} 
                            handleImageClick={handleImageClick}
                        />
                        
                        <section className="container-elements-categorypage" style={seccionActiva === "crear" ? {justifyContent:"start"} : {}}>
                            {seccionActiva=== "listar" &&(
                                <section className="container-section-elements-categorypage flex flex-row">
                                    <div>
                                        <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">Lista de Categorias</h2>
                                        {mensajeExito && (
                                            <SuccessMessage 
                                                message={tituloMensajeExito}/>
                                        )}
                                        
                                        <div className="container-section-table-category h-[650px] overflow-auto">
                                            <table className="container-table-category">
                                                <thead>
                                                    <tr>
                                                        <th>Indice</th>
                                                        <th>Nombre de la categoria</th>
                                                        <th>ID</th>
                                                        <th>Modificar</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   {categoriasFiltradas.map((categoria, index) => (
                                                    <tr key={categoria.id}>
                                                        <td>{index +1}</td>
                                                        <td>
                                                        {editandoId === categoria.id ? (
                                                            <input
                                                            style={{width: "220px", height:"50px",  borderRadius:"5px", border:"solid 2px", background:"white", margin:"0" , padding:"0", textAlign:"center"}}
                                                            type="text"
                                                            value={nuevoNombre}
                                                            onChange={e => setNuevoNombre(e.target.value)}
                                                            />
                                                        ) : (
                                                            categoria.nombre
                                                        )}
                                                        </td>
                                                        <td>{categoria.id}</td>
                                                        <td>
                                                        {editandoId === categoria.id ? (
                                                            <div className="flex flex-row gap-[5px]">
                                                                <button id="eliminator-button-cp-aceptar" onClick={() => handleAceptarModificacion(categoria.id)}>
                                                                Aceptar
                                                                </button>
                                                                <button id="eliminator-button-cp-cancelar" onClick={() =>{setEditandoId(null); setNuevoNombre("")}}>
                                                                Cancelar
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => handleModificar(categoria)}>Modificar</button>
                                                        )}
                                                        </td>
                                                        <td>
                                                            <button id="eliminator-button-cp" onClick={() => handleEliminar(categoria.id)}>Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div id="search-buttons-category">
                                        <SearchButtons
                                                setModoBusqueda={setModoBusqueda}
                                                modoBusqueda={modoBusqueda}
                                                busqueda={busqueda}
                                                handleBusquedaChange={handleBusquedaChange}
                                                textTitle={"Buscar categoria por:"}
                                        />
                                    </div>
                                </section>
                            )}

                            {seccionActiva === "crear" && (
                                <CategoryCreator
                                    handleCrearCategoria={handleCrearCategoria}
                                    mensajeExito={mensajeExito}
                                    categoria={categoria}
                                    handleChange={handleChangeCategoria}
                                />
                            )}

                        </section>
                    </div>
        </section>
    )
}