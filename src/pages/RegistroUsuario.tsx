import { useState } from "react";
import { registrarUsuario } from "../Service/apilogin";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    nombreUsuario: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
   const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await registrarUsuario(form);
  setMensaje(res.mensaje || "Error en el registro");
  if (res.mensaje && res.mensaje.includes("creado")) {
    setTimeout(() => navigate("/"), 1500); // Redirige después de mostrar el mensaje
  }
};

  return (
    <section className="container-login h-[100vh]">
      <div className="container-elements-login">
        <h1 className="text-[30px] font-semibold mb-10 underline underline-offset-10 relative pl-5 text-center">Registro de usuario</h1>
        <form onSubmit={handleSubmit} className="form-login">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="nombreUsuario">Nombre de Usuario</label>
          <input
            id="nombreUsuario"
            name="nombreUsuario"
            type="text"
            value={form.nombreUsuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrarse</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </section>
  );
}