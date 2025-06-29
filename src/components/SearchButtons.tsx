
type SearchButtonsProps = {
  setModoBusqueda: React.Dispatch<React.SetStateAction<"id" | "nombre">>;
  modoBusqueda: "id" | "nombre";
  busqueda: string;
  handleBusquedaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textTitle: string;
};

export function SearchButtons ({setModoBusqueda, modoBusqueda, busqueda, handleBusquedaChange,textTitle}: SearchButtonsProps){
    return(
        <>
            <h2 className="text-[30px] font-semibold mt-[50px] mb-[10px]">{textTitle}</h2>
            <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                <button onClick={() => setModoBusqueda("id")}>Por ID</button>
                <button onClick={() => setModoBusqueda("nombre")}>Por Nombre</button>
            </div>
            <input
                type="text"
                placeholder={`Buscar por ${modoBusqueda}`}
                value={busqueda}
                //Esta handle maneja la busquedas en tiempo real cuando se ingresa por teclado
                onChange={handleBusquedaChange}
            />
        </>
    )
}