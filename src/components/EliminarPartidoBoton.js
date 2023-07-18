import axios from "axios";
import {Button} from "react-bootstrap";
import {ELIMINARPARTIDO_DELETE_ENDPOINT} from '../connections/helpers/endpoints';
import {confirmAlert} from "react-confirm-alert";
import React from "react";
import {toast} from 'react-toastify';


function EliminarPartidoBoton({id, local, visitante}) {

    const eliminar = async () => {

        axios.delete(`${ELIMINARPARTIDO_DELETE_ENDPOINT}/${id}`)
        .then(respuesta => {
            toast.info('El partido se ha eliminado con exito', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000
            });
        }).catch(err => {
            toast.error(err.respuesta.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000
            });
        })
    }

    const crearAlerta = () => {

        confirmAlert({
            title: 'Eliminar Partido',
            message: `¿Desea eliminar el partido ${local} vs ${visitante}?`,
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {eliminar()}
                },
                {
                    label: 'No',
                    onClick: () => {return false}
                }
            ]
        })
    }

    return (
        <Button variant='danger' size='sm' onClick={crearAlerta}>Eliminar</Button>
    )
}

export {EliminarPartidoBoton};