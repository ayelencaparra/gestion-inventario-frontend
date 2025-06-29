import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SubIndexStatistcs } from "../components/statistic/SubIndexStatistcs";
import { useNavigate } from "react-router-dom";
import { listarVentas, type Venta} from "../Service/apiventas";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./StatisticsPage.css"

const COLORS = ['#0197CF', '#4CAF50', '#FFBB28', '#FF8042', '#8884d8', '#00C49F', '#FF6384', '#FFCD56', '#36A2EB', '#8E44AD'];
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

interface data {
  data: ProductoAgrupado[];
}


function filtrarVentasPorRango(ventas: Venta[], dias: number) {
  const ahora = new Date();
  return ventas.filter((venta) => {
    const fechaVenta = new Date(venta.fecha);
    const diferenciaEnDias = (ahora.getTime() - fechaVenta.getTime()) / (1000 * 60 * 60 * 24);
    return diferenciaEnDias <= dias;
  });
}
export function PieChartVentas({ data }: data) {
  return (
    <div className="chart-container">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="cantidad"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            outerRadius={200}
            label={({ name, percent }) => `${name} (${(((percent ? percent : 0)) * 100).toFixed(1)}%)`}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} unidades`, "Cantidad vendida"]}
          />
          <Legend verticalAlign="bottom" height={0} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartCantidadVendida({ data }: data) {
  const top10 = [...data]
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);

  return (
    <div className="w-full h-[400px] bg-[#545454] p-10 mb-[50px]">
      <ResponsiveContainer>
        <BarChart
          data={top10}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip
            formatter={(value: number) => [
              `${value} unidades`,
              "Cantidad vendida",
            ]}
          />
          <Legend />
          <Bar
            dataKey="cantidad"
            fill="#0197CF"
            name="Cantidad vendida"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export function BarChartVentas({ data }: data) {
  const top10 = [...data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <div className="w-full h-[400px] bg-[#545454] p-10">
      <ResponsiveContainer>
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

export function StatisticsPage() {
  const [seccionActiva, setSeccionActiva] = useState<"iventas" | "iproductos" | "iganancias">("iventas");
  const [mensajeExito, setMensajeExito] = useState<boolean>(false);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventasFiltradas, setVentasFiltradas] = useState<Venta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarVentas().then((datos) => {
      setVentas(datos);
      setVentasFiltradas(filtrarVentasPorRango(datos, 1)); // por defecto mostrar el día
      console.log(mensajeExito)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltroTiempo = (dias: number) => {
    setVentasFiltradas(filtrarVentasPorRango(ventas, dias));
  };

  const ventasResumen = agruparVentasPorProducto(ventasFiltradas);

  const handleClean = () => {};

  const handleImageClick = () => {
    navigate("/");
  };

const datosAgrupados = agruparVentasPorProducto(ventasFiltradas);



  return (
    <section className="container-statisticspage">
      <Header />
      <div className="container-sections-productspage flex flex-row min-h-[90vh]">
        <SubIndexStatistcs
          setMensajeExito={setMensajeExito}
          setSeccionActiva={setSeccionActiva}
          seccionActiva={seccionActiva}
          handleClean={handleClean}
          handleImageClick={handleImageClick}
        />
        <section className="container-elements-statisticspage">
          
          {seccionActiva === "iventas" && (
            <div className="flex flex-col gap-[100px]">
                <div>
                    <div className="flex flex-row h-[56px] gap-2 mb-4 w-[100%] self-start">
                        <button onClick={() => handleFiltroTiempo(1)}>Día</button>
                        <button onClick={() => handleFiltroTiempo(7)}>Semana</button>
                        <button onClick={() => handleFiltroTiempo(30)}>Mes</button>
                        <button onClick={() => handleFiltroTiempo(180)}>Semestre</button>
                        <button onClick={() => handleFiltroTiempo(365)}>Año</button>
                    </div>
                    <table className="container-table-statisticspage">
                    <thead>
                        <tr>
                        <th>Indice</th>
                        <th>ID</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad Vendida</th>
                        <th>Valor de los productos vendidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasResumen.length === 0 ? (
                        <tr>
                            <td colSpan={5}>No hay ventas en el periodo seleccionado</td>
                        </tr>
                        ) : (
                        ventasResumen.slice(0, 10).map((item, index) => (
                            <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>${item.total.toLocaleString()}</td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>
            {datosAgrupados.length !== 0 && (
                <>
                    <PieChartVentas data={datosAgrupados} />
                    <BarChartVentas data={datosAgrupados} />
                    <BarChartCantidadVendida data={datosAgrupados} />
                </> 
            )}
            
            </div>
          )}
           
        </section>
      </div>
    </section>
  );
}
