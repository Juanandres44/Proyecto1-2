import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import ResultAnalytic from "../resultAnalytic/resultAnalytic";

// Funcion NavbarMarvel
function FormAnalytic () {
    const [datos, setDatos] = useState({
        study: '',
    })
    const [resultado, setResultado] = useState("-")

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.id] : event.target.value,
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        prediccionElegibilidad(datos);
    }

    async function prediccionElegibilidad(datos) {
        var url="http://127.0.0.1:8000/predict-elegibility"
        
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        const info = JSON.stringify({"texto": [{"study_and_condition": datos.study}]});
        axios
            .post(url, info, {headers} )
            .then((resp)=> {
               console.log(resp)
               console.log(resp.data.prediction)
               setResultado(resp.data.prediction)
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
                    <Button className="bg-dark mt-3 mb-3" variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>
            <div className="col-5 border d-flex align-items-center justify-content-center">
                <ResultAnalytic resultadoElegibilidad={resultado}/>
            </div>  
        </div>  
    )
}

// Exportar funcion NavbarMarvel para ser visible en otros archivos
export default FormAnalytic;