import React, {useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import moment from 'moment';

function CrearPartidoFormulario({errores, callback,
        pFecha='', pNombreLocal='', pNombreVisitante='', pEquipoLocal='0', pEquipoVisitante='0',
        pGolesLocal='0', pGolesVisitante='0', editable}) {
    
    const [fecha, setFecha] = useState(pFecha);
    const [nombreEquipoLocal] = useState(pNombreLocal);
    const [nombreEquipoVisitante] = useState(pNombreVisitante);
    const [equipoLocal, setEquipoLocal] = useState(pEquipoLocal);
    const [equipoVisitante, setEquipoVisitante] = useState(pEquipoVisitante);
    const [golesLocal, setGolesLocal] = useState(pGolesLocal);
    const [golesVisitante, setGolesVisitante] = useState(pGolesVisitante);

    const enviar = (e) => {
        e.preventDefault();
        (!editable) ? callback({fecha, equipoLocal, equipoVisitante}) : callback({golesLocal, golesVisitante});
    }
    
    return (

        <Form onSubmit={enviar}>
            {
                !editable && 

                <Row>
                    <Col md='6' xs='12'>
                        <Form.Group className='mt-3 mb-3' controlId='fecha'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type='date'
                                value={moment(fecha).format('yyyy-MM-DD')} 
                                min={moment().format('yyyy-MM-DD')}
                                onChange={e => setFecha(e.target.value)}
                                isInvalid={errores.fecha} />

                            <Form.Control.Feedback type='invalid'>
                                {errores.fecha}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            }
            {
                !editable &&

                <Row>
                    <Col md='6' xs='12'>
                        <Form.Group controlId='idEquipoLocal'>
                            <Form.Label>Equipo local</Form.Label>
                            <Form.Control
                                as='select'
                                type='select'
                                value={equipoLocal}
                                onChange={e => setEquipoLocal(e.target.value)}
                                required 
                            >
                                <option value=''>Seleccione</option>
                                <option value='1'>Cucuta</option>
                                <option value='2'>Bogota</option>
                                <option value='3'>Medellin</option>
                                <option value='4'>Bucaramanga</option>
                                <option value='5'>Cali</option>
                            </Form.Control>

                            <Form.Control.Feedback type='invalid'>
                                {errores.equipoLocal}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md='6' xs='12'>
                        <Form.Group controlId='idEquipoVisitante'>
                            <Form.Label>Equipo visitante</Form.Label>
                            <Form.Control
                                as='select'
                                type='select'
                                value={equipoVisitante}
                                onChange={e => setEquipoVisitante(e.target.value)}
                                required 
                            >
                                <option value=''>Seleccione</option>
                                <option value='1'>Cucuta</option>
                                <option value='2'>Bogota</option>
                                <option value='3'>Medellin</option>
                                <option value='4'>Bucaramanga</option>
                                <option value='5'>Cali</option>
                            </Form.Control>

                            <Form.Control.Feedback type='invalid'>
                                {errores.equipoVisitante}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            }
            {
                editable &&

                <div className='mt-3 mb-3'>
                    <p>{nombreEquipoLocal} vs {nombreEquipoVisitante}</p>
                </div>
            }
            {
                editable &&

                <Row>
                    <Col md='6' xs='12'>
                        <Form.Group controlId='golesLocal'>
                            <Form.Label>Goles equipo local</Form.Label>
                            <Form.Control
                                type='number'
                                min='0'
                                max='20'
                                value={golesLocal} 
                                onChange={e => setGolesLocal(e.target.value)}
                                isInvalid={errores.golesLocal} />

                            <Form.Control.Feedback type='invalid'>
                                {errores.golesLocal}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md='6' xs='12'>
                        <Form.Group controlId='golesVisitante'>
                            <Form.Label>Goles equipo visitante</Form.Label>
                            <Form.Control
                                type='number'
                                min='0'
                                max='20'
                                value={golesVisitante} 
                                onChange={e => setGolesVisitante(e.target.value)}
                                isInvalid={errores.golesVisitante} />

                            <Form.Control.Feedback type='invalid'>
                                {errores.golesVisitante}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            }

            <Button type='submit' variant='primary' className='mt-3'>
                {!editable ? 'Crear' : 'Editar'} partido
            </Button>
        </Form>

    )
}

export {CrearPartidoFormulario};