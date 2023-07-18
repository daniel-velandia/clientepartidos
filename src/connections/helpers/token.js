import axios from "axios";
import jwt_decode from 'jwt-decode';
import {store} from '../../states/store';
import {usuario} from "../../states/sliceReducers";
import {cerrarSesion} from '../usuarioAcciones';

export const setAutenticacionToken = (token) => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const getAutenticacionToken = () => {

    if(localStorage.token) {
        
        setAutenticacionToken(localStorage.token);
        
        const decodificado = jwt_decode(localStorage.token);

        store.dispatch(usuario({usuario: decodificado, conectado: true}))

        const tiempoActual = Math.floor(Date.now() / 1000);

        if(decodificado.exp < tiempoActual) {
            store.dispatch(cerrarSesion());
            window.location.href = '/signin';
        }
    }
}