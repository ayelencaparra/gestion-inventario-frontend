import { NavLink } from "react-router-dom";
import "./header.css";
import { getCurrentPath } from "../utils";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/inicio", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/estadisticas", label: "Estadísticas" },
    { to: "/stock", label: "Stock" },
    { to: "/ventas", label: "Ventas" },
    { to: "/categorias", label: "Categorías" },
  ];

  return (
    <header className="container-header">
      <div className="header-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`header ${menuOpen ? "open" : ""}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={() => setMenuOpen(false)}
              style={
                getCurrentPath() === to
                  ? {
                      textDecoration: "underline",
                      textDecorationThickness: "2px",
                      textUnderlineOffset: "10px",
                    }
                  : {}
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}