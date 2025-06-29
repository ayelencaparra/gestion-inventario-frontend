import { SuccessMessage } from "../SuccessMessage";

type CategoryCreatorProps = {
  handleCrearCategoria: (e: React.FormEvent<HTMLFormElement>) => void;
  mensajeExito: boolean;
  categoria: { id: number; nombre: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryCreator({handleCrearCategoria, mensajeExito, categoria, handleChange}: CategoryCreatorProps) {
  return (
    <section className="container-categorycreator justify-self-start">
      <form onSubmit={handleCrearCategoria} className="flex flex-col gap-[20px]" id="form-category-creator">
        {mensajeExito && (
          <SuccessMessage message={"Has creado una categoría con éxito ✅"} />
        )}
        <h2 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 before:content-['•'] before:absolute before:left-0">
          Crear Categoría
        </h2>

        <label>Nombre de la categoría:</label>
        <input
          type="text"
          name="nombre"
          value={categoria.nombre}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear categoría</button>
      </form>
    </section>
  );
}

