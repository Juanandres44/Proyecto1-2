import React from "react";

// Funcion ResultadoProyecto
function ResultadoProyecto (props) {
    return (
        <div>
            {props.resultadoElegibilidad === "Elegible" ? 
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                    <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris-1.png" alt="logo_done"/>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <span><b>El paciente es elegible para ensayo clínico de cáncer.</b></span>            
                    </div>
                </div> : props.resultadoElegibilidad === "No elegible" ?
                 <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                        <img src="https://img.icons8.com/fluency-systems-filled/64/000000/x.png" alt="logo_cross"/>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <span><b>El paciente no es elegible para ensayo clínico de cáncer.</b></span> 
                    </div>
                </div> : 
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center mt-3">
                        <span className="text-center"><b>Por favor introducir el estudio y condicion del paciente para verificar la elegibilidad de este para los ensayos clínicos.</b></span> 
                    </div>
                </div>
            }
        </div>
    )
}

// Exportar funcion ResultadoProyecto para ser visible en otros archivos
export default ResultadoProyecto;