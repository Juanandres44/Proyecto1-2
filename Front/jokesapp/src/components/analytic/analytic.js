import React from "react";
import FormularioProyecto from "./formulario/formularioPr";
import Navbar from "./navbar/navbar";

// Funcion Analtytic
function Analtytic () {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div>
                    <FormularioProyecto />
                </div>
            </div>
        </div>
    );
}

// Exportar funcion Analtytic para ser visible en otros archivos
export default Analtytic;