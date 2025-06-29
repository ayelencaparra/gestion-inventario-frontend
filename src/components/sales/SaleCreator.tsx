import { useEffect, useState } from "react";
import { listarProductos, type Producto } from "../../Service/apiproducto";
import { crearVenta, type Venta } from "../../Service/apiventas";
import { SuccessMessage } from "../SuccessMessage";

type SaleCreator = {
    mensajeDeExito?:boolean;
    setMensajeExito?: React.Dispatch<React.SetStateAction<boolean>>;
    setTrigger2:React.Dispatch<React.SetStateAction<boolean>>;
}

export function SaleCreator({mensajeDeExito, setMensajeExito, setTrigger2}:SaleCreator){
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [trigger, setTrigger] = useState<boolean>(false)

  useEffect(() => {
    listarProductos().then(setProductos);
  }, [trigger]);

  const handleCantidadChange = (id: number, cantidadIngresada: number) => {
    const producto = productos.find(p => p.id === id);
    if (!producto || !producto.cantidad) return;

    const cantidadFinal = Math.min(cantidadIngresada, producto.cantidad); // no más que stock
        setCantidades(prev => ({
        ...prev,
        [id]: cantidadFinal,
        }));
    };
    const calcularTotalVenta = (): number => {
        return productos.reduce((total, p) => {
            const cantidad = cantidades[p.id] || 0;
            return total + (cantidad * p.precioVenta);
        }, 0);
    };

  const calcularSubtotal = (producto: Producto) => {
    const cantidad = producto.id && cantidades[producto.id] || 0;
    return producto.precioVenta && cantidad * producto.precioVenta;
  };

  const handleCrearVenta = async () => {
    const detalles= productos
      .filter(p => p.id && cantidades[p.id] > 0)
      .map(p => ({
        productoNombre: p.nombre,
        categoriaNombre: p.categoria.nombre,
        cantidad: p.id && cantidades[p.id],
        precioVenta: p.precioVenta,
      }));

    if (detalles.length === 0) {
      alert("Debes seleccionar al menos un producto con cantidad válida.");
      return;
    }

    const nuevaVenta: Venta = {
      id: 0,
      fecha: new Date().toISOString(),
      detalles,
    };

    try {
      const res = await crearVenta(nuevaVenta);
      console.log(res)
      setMensajeExito(prev => !prev)
      setTrigger(prev => !prev)
      setTrigger2(prev => !prev)
      setTimeout(() => setMensajeExito(false), 3000);
      setCantidades({}); // limpiar cantidades
    } catch (err) {
      console.error(err);
      alert("Error al crear la venta.");
    }
  };

  return (
    <section className="container-salecreator flex flex-row gap-[50px]">
      <div>
        <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">Crear nueva venta</h2>
        {mensajeDeExito &&(
            <SuccessMessage
                message="Has creado una venta exitosamente ✅"
            />
        )}
        <div className="container-salecreator h-[650px] overflow-auto">
            <table className="container-table-sales">
                <thead>
                <tr>
                    <th>Índice</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio Venta</th>
                    <th>Precio Compra</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((p, index) => (
                    <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria.nombre}</td>
                    <td>${p.precioVenta}</td>
                    <td>${p.precioCompra}</td>
                    <td>{p.cantidad}</td>
                    <td className="p-0 m-0">
                        <input
                        type="number"
                        min={0}
                        max={p.cantidad}
                        value={p.id && cantidades[p.id] || ""}
                        onChange={e =>p.id &&
                            handleCantidadChange(p.id, Number(e.target.value))
                        }
                        style={{ width: "60px", height:"50px",  borderRadius:"5px", border:"solid 2px", background:"white", margin:"0" , padding:"0", textAlign:"center"}}
                        />
                    </td>
                    <td>${calcularSubtotal(p)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
      <div className="container-totalamount flex flex-col mt-[90px]">
        <p className="text-[25px] border border-2 mb-[20px] p-[20px] bg-[#A9CEFF]">Monto total de la venta: ${calcularTotalVenta().toLocaleString()}</p>
        <button
            style={{width:"200px"}}
            onClick={handleCrearVenta}
        >
            Confirmar venta
        </button>
      </div>
    </section>
  );
}