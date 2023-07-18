import 'bootstrap/dist/css/bootstrap.min.css';
import {Navegacion} from '../layouts/Navegacion';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '../states/store';
import {PartidosCreados} from '../pages/PartidosCreados';
import {PartidoDetalle} from '../pages/PartidoDetalle';
import {Signup} from '../pages/Signup';
import {Signin} from '../pages/Signin';
import {getAutenticacionToken} from '../connections/helpers/token';
import {RutaPrivada} from './RutaPrivada';
import {MisPartidos} from '../pages/MisPartidos';
import {CrearPartido} from '../pages/CrearPartido';
import {EditarPartido} from '../pages/EditarPartido';
import {Error404} from '../pages/Error404';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'moment/locale/es';
import 'react-confirm-alert/src/react-confirm-alert.css';

getAutenticacionToken();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navegacion />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<PartidosCreados />} />
          <Route path='/partido/:id' element={<PartidoDetalle />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route element={<RutaPrivada />} >
            <Route path='/mispartidos' element={<MisPartidos />} />
            <Route path='/crearpartido' element={<CrearPartido />} />
            <Route path='/editarpartido/:id' element={<EditarPartido />} />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
