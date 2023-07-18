import {Badge, Button, Card} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import moment from 'moment';
import {EliminarPartidoBoton} from './EliminarPartidoBoton';

const PartidoCard = ({partido, editable}) => {
    return (

        <Card className='mt-3 mb-3'>
            <Card.Header className='mi-card'>
                {
                    partido.jugado ?
                        <Badge bg='success' className='pt-2'>Jugado</Badge> :
                        <Badge bg='secondary' className='pt-2'>Pendiente</Badge>
                }
                {
                    editable &&
                        <div>
                            <Button variant='primary' size='sm' className='me-2'
                                as={NavLink} to={`/editarPartido/${partido.idPartido}`}
                            >
                                editar
                            </Button>
                            <EliminarPartidoBoton id={partido.idPartido} 
                                        local={partido.equipoEntityLocal.nombre} 
                                        visitante={partido.equipoEntityVisitante.nombre} 
                            />
                        </div>
                }
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Link to={`/partido/${partido.idPartido}`}>
                        {partido.equipoEntityLocal.nombre} vs {partido.equipoEntityVisitante.nombre}
                    </Link>
                </Card.Title>
                <Card.Text>
                    Fecha: {moment(partido.fecha).format('D[/]MM[/]YYYY')}
                </Card.Text>
                <Card.Text>
                    Creado por {partido.usuarioEntity.nombre}, {moment(partido.creado).fromNow()}
                </Card.Text>
            </Card.Body>
        </Card>

    );
}

export {PartidoCard};