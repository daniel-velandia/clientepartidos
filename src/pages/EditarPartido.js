import axios from "axios";
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {ACTUALIZARPARTIDO_PUT_ENDPOINT, PARTIDODETALLE_GET_ENDPOINT} from '../connections/helpers/endpoints';
import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import {CrearPartidoFormulario} from "../components/CrearPartidoFormulario";
import {isObjetoVacio} from "../connections/helpers/isObjetoVacio";
import validator from "validator";

function EditarPartido() {

    const {id} = useParams();
    const [errores, setErrores] = useState({});
    const [partido, setPartido] = useState(null);
    const navegar = useNavigate();

    useEffect(() => {

        axios.get(`${PARTIDODETALLE_GET_ENDPOINT}/${id}`)
            .then(respuesta => {
                setPartido(respuesta.data);
            }).catch(err => {
                navegar('/');
            })
    }, [id, navegar]);

    const editar = async ({golesLocal, golesVisitante}) => {

        const error = {};
        setErrores(error);

        if(validator.isEmpty(golesLocal)) {
            errores.golesLocal = 'Los goles del equipo local no pueden estar vacios';
        }
        
        if(validator.isEmpty(golesVisitante)) {
            errores.golesVisitante = 'Los goles del equipo visitante no pueden estar vacios';
        }

        if(!isObjetoVacio(errores)) {
            setErrores(errores);
            return;
        }

        axios.put(`${ACTUALIZARPARTIDO_PUT_ENDPOINT}/${partido.idPartido}`, {golesLocal, golesVisitante})
            .then(respuesta => {
                navegar('/');
            }).catch(err => {
                setErrores({update: err.respuesta.data.message});
            });
    }

    return (

        <Container className='mt-3 mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm='12' md='8' lg='6'>
                    <h3 className='text-center'>Editar partido</h3>
                    <Card.Body>
                        {errores.update && <Alert variant='danger'>{errores.update}</Alert>}
                        {
                            partido &&

                            <CrearPartidoFormulario 
                                errores={errores}
                                callback={editar}
                                pFecha={partido.creado}
                                pNombreLocal={partido.equipoEntityLocal.nombre}
                                pNombreVisitante={partido.equipoEntityVisitante.nombre}
                                pIdLocal={partido.equipoEntityLocal.id}
                                pIdVisitante={partido.equipoEntityVisitante.id}
                                pGolesLocal={partido.golesLocal}
                                pGolesVisitante={partido.golesVisitante}
                                editable={true}
                            />
                        }
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export {EditarPartido};