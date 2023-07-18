const API_URL = 'http://localhost:8080';

export const SIGNUP_POST_ENDPOINT = API_URL + '/usuario';
export const SIGNIN_POST_ENDPOINT = API_URL + '/usuario/login';
export const MISPARTIDOS_GET_ENDPOINT = API_URL + '/usuario/mispartidos';
export const CREARPARTIDO_POST_ENDPOINT = API_URL + '/partido';
export const PARTIDOSCREADOS_GET_ENDPOINT = API_URL + '/partido';
export const PARTIDODETALLE_GET_ENDPOINT = API_URL + '/partido';
export const ELIMINARPARTIDO_DELETE_ENDPOINT = API_URL + '/partido';
export const ACTUALIZARPARTIDO_PUT_ENDPOINT = API_URL + '/partido';