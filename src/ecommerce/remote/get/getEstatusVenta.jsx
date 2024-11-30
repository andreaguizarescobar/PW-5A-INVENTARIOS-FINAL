export async function getEstatusVenta(idTipoEstatusOK) {
  try {
    console.log(`Buscando el estatus de venta con ID: ${idTipoEstatusOK}`);
    const response = await fetch("/api/inventories"); // URL ficticia de la API
    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }

    const data = await response.json();

    // Buscar el estatus de venta específico
    const estatusVenta = data
      .flatMap((instituto) =>
        instituto.negocios.flatMap((negocio) =>
          negocio.almacenes.flatMap((almacen) =>
            almacen.series.flatMap((serie) => serie.estatus_venta)
          )
        )
      )
      .find((estatus) => estatus.IdTipoEstatusOK === idTipoEstatusOK);

    if (!estatusVenta) {
      throw new Error(`No se encontró el estatus de venta con ID: ${idTipoEstatusOK}`);
    }

    console.log(`Estatus encontrado:`, estatusVenta);
    return estatusVenta;
  } catch (error) {
    console.error(`Error al obtener el estatus de venta con ID: ${idTipoEstatusOK}`, error);
    throw error;
  }
}
