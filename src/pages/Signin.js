import {useEffect, useState} from "react";
import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {SigninFormulario} from '../components/SigninFormulario';
import {autenticacion} from '../connections/usuarioAcciones';
import validator from "validator";

function Signin() {

    const [errores, setErrores] = useState({});
    const conectado = useSelector(estado => estado.conectado);
    const navegar = useNavigate();
    const enviarAccion = useDispatch();

    useEffect(() => {
        if(conectado) {
            navegar('/');
        }
    });

    const login = ({username, password}) => {

        const error = {};
        setErrores(error);

        if(validator.isEmpty(username)) {
            errores.username = 'El usuario no puede estar vacio';
        }
        
        if(validator.isEmpty(password)) {
            errores.password = 'La contraseña no puede estar vacia';
        }

        enviarAccion(autenticacion({username, password}))
        .then(respuesta => {
            navegar('/');
        })
        .catch(err => {
            setErrores({ingresar: 'No se puede iniciar sesion con esas credenciales'});
        });
    }

    return (

        <Container className='mt-3 mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm='12' md='8' lg='6'>
                    <h3 className='text-center'>Iniciar sesion</h3>
                    <Card.Body>
                        {errores.ingresar && <Alert variant='danger'>{errores.ingresar}</Alert>}
                        <SigninFormulario errores={errores} callback={login}></SigninFormulario>
                        <div className='mt-3'>
                            <Link to={'/signup'}>¿No tienes una cuenta? Registrate aqui</Link>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    )
}

export {Signin};