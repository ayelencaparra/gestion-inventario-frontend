import { BrowserRouter } from "react-router-dom";
import "./App.css"
// ...otros imports de páginas

import Rutas from "./components/Routes";

function App() {
     return (
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  );
}

export default App;
