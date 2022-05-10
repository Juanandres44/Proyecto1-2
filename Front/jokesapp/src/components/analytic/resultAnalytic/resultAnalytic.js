import React from "react";

// Funcion ResultAnalytic
function ResultAnalytic (props) {
    return (
        <div>
            {props.resultadoElegibilidad === "Elegible" ? 
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                    <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris-1.png" alt="logo_done"/>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <span><b>The patient is suitable for cancer clinical trials.</b></span>            
                    </div>
                </div> : props.resultadoElegibilidad === "No elegible" ?
                 <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                        <img src="https://img.icons8.com/fluency-systems-filled/64/000000/x.png" alt="logo_cross"/>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <span><b>The patient is not suitable for cancer clinical trials.</b></span> 
                    </div>
                </div> : 
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center mt-3">
                        <span className="text-center"><b>Please enter the study, condition and prediction model to obtain the patient's eligibility prediction.</b></span> 
                    </div>
                </div>
            }
        </div>
    )
}

// Exportar funcion ResultAnalytic para ser visible en otros archivos
export default ResultAnalytic;