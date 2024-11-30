import axios from "axios";

export async function deleteEstatusVenta(idAlmacen, idSerie, idEstatus) {
  const apiUrl = `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/serie/${idSerie}/estatus_venta/${idEstatus}`;

  console.log("Ejecutando API deleteEstatusVenta con URL:", apiUrl);

  try {
    const response = await axios.delete(apiUrl);

    if (!response.data || response.data.error) {
      throw new Error(response.data.error || "Error desconocido en el servidor.");
    }

    console.log("Estatus de venta eliminado correctamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en deleteEstatusVenta:", error.message || error);
    throw error;
  }
}