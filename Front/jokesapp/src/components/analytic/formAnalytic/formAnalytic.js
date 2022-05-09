import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

// Funcion NavbarMarvel
function FormAnalytic () {
    const [datos, setDatos] = useState({
        study: '',
    })
    const [resultado, setResultado] = useState("")
    const [centinela, setCentinela] = useState(false)

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.id] : event.target.value,
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        setCentinela(true)
        prediccionElegibilidad(datos);
    }

    async function prediccionElegibilidad(datos) {
        var url = "http://127.0.0.1:8000/predict-elegibility"
        
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        const info = JSON.stringify({ "texto": [{"study_and_condition": datos.study}]});
        axios
            .post(url, info, {headers} )
            .then((resp)=> {
               console.log(resp.data.Predict_DT[1])
               setResultado(resp.data.Predict_DT[1])
            })
            .catch((err)=> {
                console.log(err);
            }) 
    }

    return (
        <div className="row">
            <div className="col-12 ">
                <Form onSubmit={enviarDatos}>
                    <Form.Group className="mt-3">
                        <Form.Label><b>Estudio y condición</b></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el estudio y la condición" id="study" onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Label><b>Algoritmo</b></Form.Label>
                    <Button className="bg-dark mt-3 mb-3" variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>
            <div className="col-12 ">
                <div className="d-flex justify-content-center">
                    {!centinela?
                    (
                        <div className="d-flex  justify-content-center">
                            <div class="text-justify">
                                <h3 class="text-justify">Por favor ingrese el texto.</h3>            
                            </div>
                        </div>
                    )
                    :
                    (resultado.resultadoElegibilidad === "0"
                    ? 
                    <div className="d-flex  justify-content-center">
                        <div class="text-justify">
                            <h3 class="text-justify">El paciente no es adecuado para pruebas clínicas de cancer.</h3>            
                        </div>
                    </div>
                    :
                    
                <div className="d-flex flex-column">
                    <h3 className="center">El paciente es adecuado para pruebas clínicas de cancer.</h3> 
                </div>)
            }
        </div>
            </div>  
        </div> 
    )
}

// Exportar funcion NavbarMarvel para ser visible en otros archivos
export default FormAnalytic;