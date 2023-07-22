import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {SIGNUP_POST_ENDPOINT} from '../connections/helpers/endpoints';
import {Alert, Card, Col, Container, Row} from 'react-bootstrap';
import {SignupFormulario} from '../components/SignupFormulario';
import {isObjetoVacio} from "../connections/helpers/isObjetoVacio";
import validator from 'validator';

const Signup = () => {

    const [errores, setErrores] = useState({});
    const navegar = useNavigate();

    const registro = async ({username, password, nombre, email}) => {

        const error = {};
        setErrores(error);

        if(validator.isEmpty(nombre)) {
            errores.nombre = 'El nombre no puede estar vacio';
        }
        
        if(!validator.isEmail(email)) {
            error.email = 'El correo electronico es invalido';
        }

        if(validator.isEmpty(username)) {
            error.username = 'El usuario no puede estar vacio';
        }
        
        if(!validator.isLength(password, {min: 8, max: 30})) {
            error.password = 'La contraseña Debe tener entre 8 y 30 caracteres';
        }

        if(!isObjetoVacio(error)) {
            setErrores(error);
            return;
        }

        axios.post(SIGNUP_POST_ENDPOINT, {username, password, nombre, email},
                {headers: {'Accept': 'application/json', 'Content-type': 'application/json'}}
        ).then(respuesta => {
            console.log(respuesta);
            navegar('/signin');
        }).catch(err => {
            setErrores({crear: err.respuesta.data.message})
        })
    }

    return (
        <Container className='mt-3 mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm='12' md='8' lg='6'>
                    <h3 className='text-center'>Registro usuario</h3>
                    <Card.Body>
                        {errores.crear && <Alert variant='danger'>{errores.crear}</Alert>}
                        <SignupFormulario errores={errores} callback={registro}></SignupFormulario>
                        <div className='mt-3'>
                            <Link to={'/signin'}>¿Ya tienes una cuenta? Iniciar sesion aqui</Link>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    );
}

export {Signup};