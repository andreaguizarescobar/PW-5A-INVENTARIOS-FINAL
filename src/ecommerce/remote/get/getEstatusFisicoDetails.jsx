import axios from "axios";

// Función para obtener los detalles del estatus físico
const getEstatusFisicoDetails = async (idAlmacen, idSerie, idEstatusFisico) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_REST_API_ECOMMERCE}/almacen/${idAlmacen}/serie/${idSerie}/estatus_fisico/${idEstatusFisico}`
        );
        return response.data; // Retorna los datos del estatus físico
    } catch (error) {
        console.error("Error al obtener los detalles del estatus físico:", error);
        throw error;
    }
};
