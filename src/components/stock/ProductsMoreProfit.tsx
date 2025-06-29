type ProductoConGanancia = {
  id?: number;
  nombre: string;
  cantidadVendida: number;
  gananciaTotal: number;
  precioCompra?: number;
  precioVenta?: number;
};

export function ProductsMoreProfit({ top5Ingresos }: { top5Ingresos: ProductoConGanancia[] }) {
  return (
    <div className="content-li">
      <h2 className="underline underline-offset-5">Los 5 productos que generan mas ingresos son</h2>
      <table className="mt-[10px]">
        <thead>
          <tr>
            <th>Indice</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio de Venta</th>
            <th>Precio de Compra</th>
            <th>Cantida Vendida</th>
            <th>Ganancia Total</th>
          </tr>
        </thead>
        <tbody>
          {top5Ingresos.slice(0, 5).map((item, index) => (
            <tr key={item.id ?? index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>${item.precioVenta?.toLocaleString()}</td>
              <td>${item.precioCompra?.toLocaleString()}</td>
              <td>{item.cantidadVendida}</td>
              <td>${item.gananciaTotal.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}