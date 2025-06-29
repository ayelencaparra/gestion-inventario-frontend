import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import { loginUsuario } from "../Service/apilogin";

export function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUsuario({ nombreUsuario: user, password });
      if (res.token) {
        navigate("/inicio");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <section className="container-login">
      <div className="container-elements-login">
        <h1>Iniciá sesión en tu cuenta</h1>
        <p>Ingrese su nombre de usuario a continuación para iniciar sesión en su cuenta</p>
        <form onSubmit={handleSubmit} className="form-login">
          <label htmlFor="login-user">Nombre de Usuario</label>
          <input
            id="login-user"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="flex flex-col gap-[0px]">
          <button type="submit">Ingresar</button>
          <button id="signup-button" style={{ backgroundColor:"#EAECEE", color: "#0197CF", fontWeight: 700, border:"solid 2px #0197CF"}}onClick={() => navigate("/registro")}>Registrarse</button>
          </div>

        </form>
        
      </div>
      <div className="container-img-login">
        <img
          src="public/pexels-artempodrez-5716034.jpg"
          alt="Imagen de mujer trabajando con estadísticas y datos"
          id="img-login"
        />
      </div>
    </section>
  );
}
