export function ProductsToBeExpired() {
  return (
    <div className="content-li">
      <h2 className="underline underline-offset-5">Los 5 productos que a punto de vencer</h2>
      <table className="mt-[10px]">
        <thead>
          <tr>
            <th>Indice</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Cantida vendida</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5}>No hay productos que tenga fecha de vencimiento</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

