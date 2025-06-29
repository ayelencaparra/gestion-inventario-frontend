import type { Producto } from "../../Service/apiproducto";

export function LowStockProducts({ productosBajoStock }: { productosBajoStock: Producto[] }) {
  return (
    <div className="content-li">
      <h2 className="underline underline-offset-5">Los 5 productos proximos a agotarse</h2>
      <table className="mt-[10px]">
        <thead>
          <tr>
            <th>Indice</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad en Stock</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {productosBajoStock.length === 0 ? (
            <tr>
              <td colSpan={5}>No hay productos con bajo stock (Menor a 10 unidades)</td>
            </tr>
          ) : (
            productosBajoStock.map((producto, index) => (
              <tr key={producto.id}>
                <td>{index + 1}</td>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.categoria.nombre}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}