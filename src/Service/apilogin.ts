import API_URL from "../env";

export interface Credenciales {
  nombreUsuario: string;
  password: string;
}

export interface RegistroUsuario {
  nombre: string;
  nombreUsuario: string;
  password: string;
}

export const registrarUsuario = async (datos: RegistroUsuario) => {
  const res = await fetch(`${API_URL}/auth/nuevo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
};

export const loginUsuario = async (credenciales: Credenciales) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });
  const data = await res.json();
  if (data.token) localStorage.setItem("token", data.token);
  if(data.rol) localStorage.setItem("rol", data.rol)
  console.log("token",data.token)
  console.log("ROL[]", data.rol)
  return data;
};



