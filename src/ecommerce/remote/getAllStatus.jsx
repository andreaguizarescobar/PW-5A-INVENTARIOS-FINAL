export async function getAllStatus() {
    try {
      // Simulación de una API que devuelve datos completos
      const response = await fetch('/api/prov-serv'); 
      const data = await response.json();
  
      // Transformamos los datos para extraer `estatus_venta`
      const allStatus = data.flatMap((instituto) =>
        instituto.negocios.flatMap((negocio) =>
          negocio.almacenes.flatMap((almacen) =>
            almacen.series.flatMap((serie) => serie.estatus_venta)
          )
        )
      );
  
      return allStatus;
    } catch (error) {
      console.error("Error al obtener todos los estatus de venta:", error);
      throw error;
    }
  }
  