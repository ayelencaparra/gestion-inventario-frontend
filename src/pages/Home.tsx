import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./home.css"
import { useEffect, useState } from "react";
import "./home.css"
import { listarProductos, type Producto } from "../Service/apiproducto";
import { listarCategorias, type Categoria } from "../Service/apicategorias";
import { listarVentas, type Venta } from "../Service/apiventas";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function obtenerUltimas5VentasPorFecha(ventas: Venta[]) {
  const agrupadas = ventas.reduce((acc: Record<string, number>, venta) => {
    const fecha = new Date(venta.fecha).toLocaleDateString();
    const totalVenta = venta.detalles.reduce((sum, d) => sum + d.precioVenta * d.cantidad, 0);

    acc[fecha] = (acc[fecha] || 0) + totalVenta;
    return acc;
  }, {});

  // Convertir a array y ordenar por fecha descendente
  const ordenadas = Object.entries(agrupadas)
    .map(([fecha, total], index) => ({
      id: index + 1,
      fecha,
      valorVenta: total,
    }))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  return ordenadas.slice(0, 5);
}

type ProductoAgrupado = {
  cantidad: number,
  total: number,
  id:number
}
interface data {
  data: ProductoAgrupado[];
}

function agruparVentasPorProducto(ventas: Venta[]) {
  const resumen: { [nombre: string]: { cantidad: number; total: number; id: number } } = {};

  for (const venta of ventas) {
    for (const detalle of venta.detalles) {
      if (!resumen[detalle.productoNombre]) {
        resumen[detalle.productoNombre] = {
          cantidad: 0,
          total: 0,
          id: detalle.productoNombre.length + Math.floor(Math.random() * 1000), // mock id
        };
      }
      resumen[detalle.productoNombre].cantidad += detalle.cantidad;
      resumen[detalle.productoNombre].total += detalle.precioVenta * detalle.cantidad;
    }
  }

  return Object.entries(resumen)
    .map(([nombre, info]) => ({ nombre, ...info }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

function obtenerUltimos5Productos(productos: Producto[]) {
  return [...productos]
    .sort((a, b) => ((b.id)?b.id:0) - ((a.id? a.id: 0)))
    .slice(0, 5);
}

function filtrarVentasPorRango(ventas: Venta[], dias: number) {
  const ahora = new Date();
  return ventas.filter((venta) => {
    const fechaVenta = new Date(venta.fecha);
    const diferenciaEnDias = (ahora.getTime() - fechaVenta.getTime()) / (1000 * 60 * 60 * 24);
    return diferenciaEnDias <= dias;
  });
}
function BarChartVentas({ data }: data) {
  const top10 = [...data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <div className="w-[450px] h-[300px] bg-[#545454] p-10">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            data={top10}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
                formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Total generado ($)",
                ]}
            />
            <Legend />
            <Bar
                dataKey="total"
                fill="#4CAF50"
                name="Total generado ($)"
            />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export function Home () {

const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
  const [ventas, setVentas] = useState<Venta[]>([])
  const [ventasFiltradas, setVentasFiltradas] = useState<Venta[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    listarProductos().then(setProductos);
    listarCategorias().then(setCategorias);
    listarVentas().then((datos) => {
          setVentas(datos);
          setVentasFiltradas(filtrarVentasPorRango(datos, 30));
        });
  }, []);

  const handleImageClick = () => {
    navigate("/");
  };

  const handleCategoriaClick = (cat: Categoria) => {
    setCategoriaSeleccionada(cat.nombre);
  };

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => p.categoria.nombre === categoriaSeleccionada)
    : productos;

    const ultimas5Ventas = obtenerUltimas5VentasPorFecha(ventas);
    const ultimos5Productos = obtenerUltimos5Productos(productos);

    const datosAgrupados = agruparVentasPorProducto(ventasFiltradas);
    return(
        <section className="container-homepage">
            <Header/>
            <div className="container-sections-home">
                <section className="container-index-home">
                     <ul>
            <li><strong>Categorías</strong></li>
                        {categorias.slice(0, 5).map((cat, index) => (
                        <li
                            key={index}
                            onClick={() => handleCategoriaClick(cat)}
                            style={
                            cat.nombre === categoriaSeleccionada
                                ? {
                                    textDecoration: "underline",
                                    textDecorationThickness: "2px",
                                    textUnderlineOffset: "7px",
                                    fontWeight: "bold",
                                }
                                : {}
                            }
                        >
                            {cat.nombre}
                        </li>
                        ))}
                    </ul>
                    <img 
                    src="/image 1.png" 
                    alt="Imagen de un botón off"
                    onClick={handleImageClick}
                    />
                </section>
                <section className="container-elements-home">
                    <div className="container-table-products">
                        <p>
                        Primeros 9 Productos del Stock -{" "}
                        <strong>
                            {categoriaSeleccionada || "Todas las categorías"}
                        </strong>
                        </p>
                        <table>
                        <thead>
                            <tr>
                            <th>Index</th>
                            <th>Nombre del Producto</th>
                            <th>Precio de Compra</th>
                            <th>Precio de Venta</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.slice(0, 9).map((prod, index) => (
                            <tr key={prod.id}>
                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                <td>{prod.nombre}</td>
                                <td style={{ textAlign: "center" }}>
                                ${prod.precioCompra}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                ${prod.precioVenta}
                                </td>
                                <td style={{ textAlign: "center" }}>{prod.cantidad}</td>
                            </tr>
                            ))}
                            {productosFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                                No hay productos para esta categoría
                                </td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                
                    <section className="container-table-below">
                            <div className="sales-table-container mr-[70px]">
                            <p>Últimas 5 Ventas</p>
                            <table className="mt-[20px]">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Valor de venta</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ultimas5Ventas.map((venta) => (
                                <tr key={venta.id}>
                                <td style={{ textAlign: "center" }}>{venta.id}</td>
                                <td>{venta.fecha}</td>
                                <td>${venta.valorVenta.toLocaleString()}</td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </div>
                        <div className="products-table-container mr-[80px]">
                            <p>Últimos 5 Productos Agregados</p>
                            <table className="mt-[20px]">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ultimos5Productos.map((producto) => (
                                <tr key={producto.id}>
                                <td style={{ textAlign: "center" }}>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </div>
                        <div >
                        <p>Ventas del ultimo mes</p>
                        <div className="statistics-container-home mt-[20px]  mr-[70px]" >
                            <BarChartVentas data={datosAgrupados}/>
                        </div>
                    </div>
                    </section>
                </section>
            </div>
        </section>
    )
}