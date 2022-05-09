import React from "react";
import FormAnalytic from "./formAnalytic/formAnalytic";
import Navbar from "./navbarAnalytic/navbar";

// Funcion Analtytic
function Analtytic () {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div>
                    <FormAnalytic />
                </div>
            </div>
        </div>
    );
}

// Exportar funcion Analtytic para ser visible en otros archivos
export default Analtytic;