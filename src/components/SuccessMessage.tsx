type SuccessMessage = {
    message:string;
}

export function SuccessMessage({message}:SuccessMessage) {

    return(
        <div style={{
            textAlign:"center",
            backgroundColor: message=="Has eliminado un producto con exito ✅" || 
                message == "Has eliminado la venta exitosamente" || 
                message =="Has eliminado con exito la categoria ✅"? "red":"green",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "8px",
            fontWeight: "bold",
            marginBottom:"20px",
            zIndex: 1000
        }}>
            {message}
        </div>
    )
}