import axios from "axios";
export function getAlmacen(id) {
    return new Promise((resolve, reject) => {
      // Realiza una solicitud GET usando Axios a la URL de la API con el 'id' proporcionado
      axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${id}`)
        .then((response) => {
          // Extrae los datos de la respuesta
          const data = response.data;

          if (!data) {
            console.error("No se pudo realizar correctamente la petición <<getAllInventories - Services>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          
          }  else {
            const almacen = data;
            console.log("Almacen: ", almacen);
            // Resuelve la promesa, devolviendo una copia de 'almacen'
            resolve(JSON.parse(JSON.stringify(almacen)));
          }
        })
        .catch((error) => {
          console.error("Error en <<getAllInventories - Services>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }