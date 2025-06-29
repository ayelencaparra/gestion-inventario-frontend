import type { Categoria } from "../Service/apicategorias";
import type { Producto } from "../Service/apiproducto";


type CategorySelector ={
    producto:Producto;
    categorias:Categoria[];
    setProducto:React.Dispatch<React.SetStateAction<Producto>>;
}

export function CategorySelector ({producto, categorias, setProducto}: CategorySelector) {
    return(
        <select
            name="categoria"
            value={producto.categoria.id}
            onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            const categoriaSeleccionada = categorias.find((cat:Categoria) => cat.id === selectedId);
            if (categoriaSeleccionada) {
                setProducto((prev:Producto) => ({
                ...prev,
                categoria: categoriaSeleccionada
                }));
            }
            }}
        >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((categoria:Categoria) => (
            <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
            </option>
            ))}
        </select>
    )
}