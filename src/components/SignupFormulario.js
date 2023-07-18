import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const SignupFormulario = ({errores, callback}) => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const enviarformulario = (e) => {
        e.preventDefault();
        callback({username, password, nombre, email});
    }

    return (
        <Form onSubmit={enviarformulario}>
            <Form.Group className='mt-3 mb-3' controlId='nombre'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingrese su nombre'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    isInvalid={errores.nombre} />

                <Form.Control.Feedback type='invalid'>
                    {errores.nombre}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='correo'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Ingrese su correo'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    isInvalid={errores.email} />

                <Form.Control.Feedback type='invalid'>
                    {errores.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='userName'>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingrese su usuario'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    isInvalid={errores.username} />

                <Form.Control.Feedback type='invalid'>
                    {errores.username}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Ingrese su contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    isInvalid={errores.password} />

                <Form.Control.Feedback type='invalid'>
                    {errores.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Crear usuario
            </Button>
        </Form>
    )
}

export {SignupFormulario};