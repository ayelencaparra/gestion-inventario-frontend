import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { SubIndexStock } from "../components/stock/SubIndexStock";
import "./stockpage.css"
import { useNavigate } from "react-router-dom";
import { ProductList } from "../components/products/ProductList";
import { ShowEverythingButton } from "../components/ShowEverythingButton";
import{ listarProductos, updateProducto, type Producto } from "../Service/apiproducto";
import { listarVentas, type Venta } from "../Service/apiventas";
import { ProductsMoreProfit } from "../components/stock/ProductsMoreProfit";
import { LowStockProducts } from "../components/stock/LowStockProducts";
import { RecommendedProducts } from "../components/stock/RecommendedProducts";
import { ProductsToBeExpired } from "../components/stock/ProductsToBeExpired";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type ProductoConGanancia = {
  id?: number;
  nombre: string;
  cantidadVendida: number;
  gananciaTotal: number;
  precioCompra?: number;
  precioVenta?: number;
};

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export function calcularTop5PorGanancia(ventas: Venta[], productos: Producto[]): ProductoConGanancia[] {
  const ganancias: { [nombre: string]: ProductoConGanancia } = {};

  for (const venta of ventas) {
    for (const detalle of venta.detalles) {
      const producto = productos.find(p => p.nombre === detalle.productoNombre);
      if (!producto) continue;

      const gananciaUnit = detalle.precioVenta - producto.precioCompra;
      const gananciaTotal = gananciaUnit * detalle.cantidad;

      if (!ganancias[detalle.productoNombre]) {
        ganancias[detalle.productoNombre] = {
          id: producto.id,
          nombre: detalle.productoNombre,
          cantidadVendida: detalle.cantidad,
          gananciaTotal: gananciaTotal,
          precioCompra: producto.precioCompra,
          precioVenta: detalle.precioVenta,
        };
      } else {
        ganancias[detalle.productoNombre].cantidadVendida += detalle.cantidad;
        ganancias[detalle.productoNombre].gananciaTotal += gananciaTotal;
      }
    }
  }

  return Object.values(ganancias)
    .sort((a, b) => b.gananciaTotal - a.gananciaTotal);
}

export function obtenerProductosRecomendados(productos: Producto[]): Producto[] {
  const categoriasUsadas = new Set<string>();
  const productosAleatorios: Producto[] = [];

  const productosMezclados = [...productos].sort(() => 0.5 - Math.random());

  for (const producto of productosMezclados) {
    const nombreCategoria = producto.categoria.nombre;

    if (!categoriasUsadas.has(nombreCategoria)) {
      categoriasUsadas.add(nombreCategoria);
      productosAleatorios.push(producto);
    }

    if (productosAleatorios.length >= 5) break;
  }

  return productosAleatorios;
}

export function StockPage () {
    const [seccionActiva, setSeccionActiva] = useState<"listar" | "crear">("listar")
    const [mensajeExito, setMensajeExito] = useState<boolean>(false)
    const [productos, setProductos] = useState<Producto[]>([]);
    const [mostrarTodoStock, setMostrarTodoStock] = useState<boolean>(false)
    const navigate = useNavigate();
    const [top5Ingresos, setTop5Ingresos] = useState<ProductoConGanancia[]>([])
    const [productosBajoStock, setProductosBajoStock] = useState<Producto[]>([]);
    const [productosRecomendados, setProductosRecomendados] = useState<Producto[]>([]);
    const [seccionesVisibles, setSeccionesVisibles] = useState({
        ocompra:false,
        ingresos: false,
        bajoStock: false,
        recomendados: false,
        porVencer: false,
    });
    const [cantidadesOrden, setCantidadesOrden] = useState<{ [id: number]: number }>({});

    const toggleSeccion = (clave: keyof typeof seccionesVisibles) => {
        setSeccionesVisibles(prev => ({
            ...prev,
            [clave]: !prev[clave],
        }));
    };
    

    useEffect(() => {
    Promise.all([listarProductos(), listarVentas()]).then(([productos, ventas]) => {
        setProductos(productos);

        const top5 = calcularTop5PorGanancia(ventas, productos);
        const pfitrados = productos.filter(p => p.cantidad < 10)
        
        setTop5Ingresos(top5);
        setProductosBajoStock(pfitrados)
        setProductosRecomendados(obtenerProductosRecomendados(productos));
    });
    }, []);
    const totalOrden = useMemo(() => {

        return productos.reduce((total, producto) => {
            const cantidad = cantidadesOrden[producto.id] || 0;
            return total + cantidad * producto.precioCompra;
        }, 0);
        
    }, [cantidadesOrden, productos]);
    
    const handleCrearOrdenCompra = async () => {
        try {
            const actualizados = await Promise.all(
            productos.map(async (producto) => {
                const cantidadAgregar = cantidadesOrden[producto.id] || 0;
                if (cantidadAgregar > 0) {
                const productoActualizado = {
                    ...producto,
                    cantidad: producto.cantidad + cantidadAgregar,
                };
                return await updateProducto(productoActualizado);
                }
            })
            );

            alert("Orden de compra realizada con éxito ✅");
            // Refrescamos la lista de productos
            const nuevosProductos = await listarProductos();
            generarOrdenPDF()
            setProductos(nuevosProductos);
            setCantidadesOrden({});
        } catch (error) {
            alert("Error al realizar la orden de compra");
            console.error(error);
        }
    };
    const productosFiltrados = (mostrarTodoStock )? (productos): (productos.slice(0,10))

    const generarOrdenPDF = () => {
    const doc = new jsPDF();

     doc.setFontSize(18);
    doc.text("Orden de Compra", 14, 22);

    doc.setFontSize(12);
    doc.text("Compañía: Omega7", 14, 30);
    doc.text("Domicilio: Calle Siempreviva 116", 14, 36);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 42);

    // Encabezados y datos
    const columns = ["ID", "Nombre", "Categoría", "Cantidad actual", "Precio de compra", "Cantidad a ordenar", "Subtotal"];
    const rows = productos
        .filter(p => cantidadesOrden[p.id] > 0)
        .map(p => [
        p.id,
        p.nombre,
        p.categoria.nombre,
        p.cantidad,
        p.precioCompra,
        cantidadesOrden[p.id],
        cantidadesOrden[p.id] * p.precioCompra
        ]);

    autoTable(doc, {
        startY: 50,
        head: [columns],
        body: rows,
    });

    const yFinal = doc.lastAutoTable.finalY || 60;

        doc.setFontSize(12);
        doc.text(`Total: $${totalOrden.toFixed(2)}`, 14, yFinal + 10);

        doc.save("orden-de-compra.pdf");
    };

    const handleClean = () => {

    }

    const handleImageClick = () => {
        navigate("/"); 
    };

    return(
        <section className="container-stockpage">
            <Header/>
            <div className="container-section-stockpage flex flex-row  min-h-[90vh] ">
                <SubIndexStock
                    setMensajeExito={setMensajeExito}
                    setSeccionActiva={setSeccionActiva} 
                    seccionActiva={seccionActiva} 
                    handleClean={handleClean} 
                    handleImageClick={handleImageClick}
                />
                {seccionActiva === "listar" &&(
                    <section className="container-elements-stockpage">
                        <div className="container-recomendations flex flex-col items-start w-[76%]">
                            <ul className="stock-recomendation">
                                <li>
                                    <div className="central-li" onClick={() => toggleSeccion("ingresos")}>
                                    <span className="drop-down-button">{seccionesVisibles.ingresos ? "-" : "+"}</span>
                                    <span className="li-text">Productos que generan más ingresos</span>
                                    </div>
                                    {seccionesVisibles.ingresos && (
                                    <ProductsMoreProfit top5Ingresos={top5Ingresos} />
                                    )}
                                </li>

                                <li>
                                    <div className="central-li" onClick={() => toggleSeccion("bajoStock")}>
                                    <span className="drop-down-button">{seccionesVisibles.bajoStock ? "-" : "+"}</span>
                                    <span className="li-text">Productos próximas a agotarse</span>
                                    </div>
                                    {seccionesVisibles.bajoStock && (
                                    <LowStockProducts productosBajoStock={productosBajoStock} />
                                    )}
                                </li>

                                <li>
                                    <div className="central-li" onClick={() => toggleSeccion("recomendados")}>
                                    <span className="drop-down-button">{seccionesVisibles.recomendados ? "-" : "+"}</span>
                                    <span className="li-text">Productos que necesitan</span>
                                    </div>
                                    {seccionesVisibles.recomendados && (
                                    <RecommendedProducts productosRecomendados={productosRecomendados} />
                                    )}
                                </li>

                                <li>
                                    <div className="central-li" onClick={() => toggleSeccion("porVencer")}>
                                    <span className="drop-down-button">{seccionesVisibles.porVencer ? "-" : "+"}</span>
                                    <span className="li-text">Productos por vencer</span>
                                    </div>
                                    {seccionesVisibles.porVencer && (
                                    <ProductsToBeExpired />
                                    )}
                                </li>
                                </ul>

                        </div>
                        <h2 className="text-[30px] font-semibold underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">Stock de Productos</h2>
                        
                        <ProductList 
                            productosParaMostrar={productosFiltrados}
                        />
                        <ShowEverythingButton 
                            mostrarTodoStock={mostrarTodoStock} 
                            setMostrarTodoStock={setMostrarTodoStock} 
                        />
                        <div className="p-10"></div>
                    </section>
                )}
                {seccionActiva === "crear" && (
                    <section className="flex flex-col items-center pt-[100px] w-[100%]">
                        <ul className="stock-recomendation" style={{width:"100%", paddingLeft:"50px"}}>
                            <li><div className="central-li"onClick={() => toggleSeccion("ocompra")}>
                                    <span className="drop-down-button">{seccionesVisibles.ocompra ? "V" : ">"}</span>
                                    <span className="li-text" >{"Info"}</span>
                                </div>
                                {seccionesVisibles.ocompra && (
                                    <div className="stock-info h-[200px] w-[1000px] flex items-center p-[100px] bg-[#abc1ab] ml-[90px] mb-[30px] border border-solid rounded-[25px]">
                                        <p>{"El simbolo >10 nos esta indicando que para cada producto con esta señalizacion se debe poseer en stock por lo menos 10 elementos, ya que son los productos que mas ganancia dejan o los que mas se venden."}</p>
                                    </div>
                                    )}
                            </li>
                        </ul>
                        <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">Orden de Compra</h2>
                        <div className="h-[600px] overflow-y-auto max-w-min">
                            <table className="container-table">
                                <thead>
                                    <tr>
                                    <th>Indice</th>
                                    <th>Nombre</th>
                                    <th>Precio de Compra</th>
                                    <th>Precio de Venta</th>
                                    <th>Categoria</th>
                                    <th>Cantidad</th>
                                    <th>Cantidad a Ordenar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.sort((a, b) => a.cantidad - b.cantidad).map((producto:Producto, index:number) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                                        <td>{producto.nombre}</td>
                                        <td>${producto.precioCompra?.toLocaleString()}</td>
                                        <td>${producto.precioVenta?.toLocaleString()}</td>
                                        <td>{producto.categoria?.nombre}</td>
                                        <td>{producto.cantidad}</td>
                                        <td className="td-expandible">
                                            <input
                                                type="number"
                                                min={0}
                                                value={cantidadesOrden[producto.id] || ""}
                                                onChange={(e) =>
                                                    setCantidadesOrden({
                                                    ...cantidadesOrden,
                                                    [producto.id]: Number(e.target.value),
                                                    })
                                                }
                                                style={{ width: "60px", height:"50px",  borderRadius:"5px", border:"solid 2px", background:"white", margin:"0" , padding:"0", textAlign:"center"}}
                                            />  </td>
                                            {top5Ingresos.slice(0, 10 ).map((p) =>(
                                                (p.id === producto.id) && (<td style={{background:"transparent"}}>{">10"}</td>)
                                            ))}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 text-lg font-semibold">
                            Valor total de la orden de compra: <span className="text-green-600">${totalOrden.toLocaleString()}</span>
                        </div>
                        <button onClick={handleCrearOrdenCompra} style={{background:"#0197CF", color:"white", marginTop:"10px", fontSize:"20px"}}>
                            Crear orden de compra
                        </button>
                    </section>
                )}
            </div>
        </section>

    )
}