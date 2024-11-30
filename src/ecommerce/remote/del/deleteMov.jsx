// deleteMov.jsx
import axios from "axios";

// Función para eliminar un movimiento en el almacén
export const deleteMovto = async (movtoId, almacenId) => {
    try {
        // Realiza la solicitud DELETE para eliminar el movimiento del almacén
        const response = await axios.delete(
            `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${almacenId}/movto/${movtoId}`
        );

        // Retorna los datos obtenidos de la API
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el movimiento:", error);
        throw new Error("Error al eliminar el movimiento");
    }
};
