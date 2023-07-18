import {useState, useEffect} from 'react';
import axios from 'axios';
import {PARTIDOSCREADOS_GET_ENDPOINT} from '../connections/helpers/endpoints';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {PartidoCard} from '../components/PartidoCard';
import {Buscando} from '../components/utils/Buscando';

const PartidosCreados = () => {

    const [partidos, setPartidos] = useState([]);
    const [buscando, setBuscando] = useState(true);
    
    useEffect(() => {
        axios.get(PARTIDOSCREADOS_GET_ENDPOINT)
        .then(respuesta => {
            setPartidos(respuesta.data);
            setBuscando(false);
        }).catch(err => {
            setBuscando(false);
        })
    }, []);

    return (
        <Container className='mt-3 mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm='12' md='8' lg='6'>
                    <h3 className='text-center'>Partidos Creados</h3>
                    <Card.Body>
                        {buscando ? <Buscando /> : (partidos.length === 0 && "No hay partidos disponibles")}
                        {partidos.map(partido => <PartidoCard key={partido.idPartido} partido={partido} editable={false} />)}
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    );
}

export {PartidosCreados};