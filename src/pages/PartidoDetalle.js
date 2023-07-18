import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {PARTIDODETALLE_GET_ENDPOINT} from '../connections/helpers/endpoints';
import {Card, Col, Container, Row, Badge} from 'react-bootstrap';
import moment from 'moment';

const PartidoDetalle = () => {

    const [partido, setPartido] = useState(null);
    const {id} = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        axios.get(`${PARTIDODETALLE_GET_ENDPOINT}/${id}`)
        .then(respuesta => {
            setPartido(respuesta.data);
        }).catch(err => {
            navegar(-1);
        })
    }, [id, navegar]);

    return (

        <Container className='mt-3 mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm='12' md='8' lg='6'>
                    <h3 className='text-center'>Detalle partido</h3>
                    {
                        partido && (
                            <Card className='mt-3 mb-3'>
                                <Card.Header className='mi-card'>
                                    {partido.equipoEntityLocal.nombre} vs {partido.equipoEntityVisitante.nombre}
                                    {
                                        partido.jugado ?
                                            <Badge bg='success'>Jugado</Badge> :
                                            <Badge bg='secondary'>Pendiente</Badge>
                                    }
                                </Card.Header>
                                <Card.Body>
                                    <p>
                                        Local
                                        <Badge className='mi-badge-marcador'>
                                            {partido.golesLocal}
                                        </Badge>
                                        vs
                                        <Badge className='mi-badge-marcador'>
                                            {partido.golesVisitante}
                                        </Badge>
                                        Visitante
                                    </p>
                                    Fecha: {moment(partido.fecha).format('D[/]MM[/]YYYY')}
                                </Card.Body>
                                <Card.Footer>
                                    Creado por {partido.usuarioEntity.nombre}, {moment(partido.creado).fromNow()}
                                </Card.Footer>
                            </Card>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export {PartidoDetalle};