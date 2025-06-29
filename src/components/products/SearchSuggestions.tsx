import type { Producto } from "../../Service/apiproducto";


type SearchSuggestionsProps = {
  sugerencias: Producto[];
  handleSeleccionSugerencia: (producto: Producto) => void;
  modoBusqueda: "id" | "nombre";
  setProducto: React.Dispatch<React.SetStateAction<Producto>>;
};

export function SearchSuggestions({sugerencias, handleSeleccionSugerencia, modoBusqueda, setProducto}: SearchSuggestionsProps){
    return(
        <ul className="sugerencias-dropdown">
            {sugerencias.map((producto: Producto, i:number) => (
                <li 
                    key={i} 
                    //este handle deberia poner e n la tabla central el objeto clikeado pero no funciona aun
                    onClick={() => {handleSeleccionSugerencia(producto); setProducto({ ...producto})}} 
                    style={{listStyle:"none", border:"solid black 1px", borderRadius:"5px",marginTop:"2px", padding:"5px", cursor:"pointer"}}
                >
                {modoBusqueda === "id" ? 
                `ID: ${producto.id} Nomb: ${producto.nombre}, Cant: ${producto.cantidad}, Catego: ${producto.categoria.nombre}, Descrip: ${""}, P.Compra: ${producto.precioCompra}, P.Venta: ${producto.precioVenta}` :
                `Nomb: ${producto.nombre}, Cant: ${producto.cantidad}, Catego: ${producto.categoria.nombre}, Descrip: ${""}, P.Compra: ${producto.precioCompra}, P.Venta: ${producto.precioVenta}`}
                </li>
            ))}
        </ul>
    )
}