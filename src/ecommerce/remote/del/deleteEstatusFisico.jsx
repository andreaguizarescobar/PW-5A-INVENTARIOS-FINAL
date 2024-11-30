import axios from 'axios';

export async function deleteEstatusFisico(idAlmacen, idSerie, idEstatusFisico) {
    try {
        // Verificar valores antes de enviar la solicitud
        console.log('Datos a eliminar:', { idAlmacen, idSerie, idEstatusFisico });

        const response = await axios.delete(
            `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/serie/${idSerie}/estatus_fisico/${idEstatusFisico}`
        );

        console.log('Respuesta del servidor:', response);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el estatus físico:', error);
        if (error.response && error.response.status === 404) {
            console.error('Estatus físico no encontrado');
        } else {
            console.error('Error inesperado:', error);
        }
        throw error;
    }
}

  