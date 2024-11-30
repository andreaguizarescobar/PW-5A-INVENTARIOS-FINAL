import axios from 'axios';

export async function AddOneEstatusFisico(values) {
  const { idAlmacen, idSerie, IdTipoEstatusOK, Actual, Observacion } = values;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/serie/${idSerie}/estatus_fisico`,
      {
        IdTipoEstatusOK,
        Actual,
        Observacion
      }
    );

    console.log('Estatus físico agregado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al agregar estatus físico:', error);
    throw new Error('Error al agregar el estatus físico: ' + error.message);
  }
}