import {useState} from "react";
import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {CREARPARTIDO_POST_ENDPOINT} from '../connections/helpers/endpoints';
import {CrearPartidoFormulario} from "../components/CrearPartidoFormulario";
import validator from "validator";

function CrearPartido() {

    const [errores, setErrores] = useState({});
    const navegar = useNavigate();

    const crear = async ({fecha, equipoLocal, equipoVisitante}) => {

        const error = {};
        setErrores(error);

        if(!validator.isDate(fecha)) {
            errores.fecha = 'Fecha invalida';
        }
        
        if(validator.isEmpty(equipoLocal)) {
            errores.equipoLocal = 'El nombre del equipo local no puede estar vacio';
        }
        
        if(validator.isEmpty(equipoVisitante)) {
            errores.equipoVisitante = 'El nombre del equipo visitante no puede estar vacio';
        }

        axios.post(CREARPARTIDO_POST_ENDPOINT, {fecha, equipoLocal, equipoVisitante})
            .then(respuesta => {
                navegar(`/partido/${respuesta.data.idPartido}`);
            }).catch(err => {
                setErrores({new: err.respuesta.data.message})
            });
    }

    return (
        <Container className='mt-3 mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm='12' md='8' lg='6'>
                    <h3 className='text-center'>Crear partido</h3>
                    <Card.Body>
                        {errores.new && <Alert variant="danger">{errores.new}</Alert>}
                        <CrearPartidoFormulario errores={errores} callback={crear} editable={false}></CrearPartidoFormulario>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export {CrearPartido};