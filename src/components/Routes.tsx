import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Registro } from "../pages/RegistroUsuario";
import { Home } from "../pages/Home";
import { ProductsPage } from "../pages/ProductsPage";
import { SalesPage } from "../pages/SalesPage";
import { CategoriesPage } from "../pages/CategoriesPage";
import { StockPage } from "../pages/StockPage";
import { StatisticsPage } from "../pages/StatisticsPage";

export default function Rutas() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route path="/inicio" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/ventas" element={<SalesPage />} />
        <Route path="/categorias" element={<CategoriesPage/>}/>
        <Route path="/stock" element={<StockPage/>}/>
        <Route path="/estadisticas" element={<StatisticsPage/>}/>
      </Routes>
  );
}