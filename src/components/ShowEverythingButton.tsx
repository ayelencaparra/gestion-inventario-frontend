
type ShowEverythingButton = {
    mostrarTodoStock:boolean;
    setMostrarTodoStock:React.Dispatch<React.SetStateAction<boolean>>;
}
export function ShowEverythingButton({mostrarTodoStock, setMostrarTodoStock} : ShowEverythingButton){
    return(
        <>
        {mostrarTodoStock ? <button onClick={() => setMostrarTodoStock(false)}>Mostrar menos</button>: <button onClick={() => setMostrarTodoStock(true)}>Ver todo el Stock</button>}
        </>
    )
}