import type { Producto } from "../../Service/apiproducto";

export function RecommendedProducts({ productosRecomendados }: { productosRecomendados: Producto[] }) {
  return (
    <div className="content-li">
      <h2 className="underline underline-offset-5">Los 5 productos que se recomienda tener en stock</h2>
      <table className="mt-[10px]">
        <thead>
          <tr>
            <th>Indice</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {productosRecomendados.map((producto, index) => (
            <tr key={producto.id}>
              <td>{index + 1}</td>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}