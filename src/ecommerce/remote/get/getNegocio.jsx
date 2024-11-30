import axios from "axios";
export function getNegocio(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/${id}`)
        .then((response) => {
          const data = response.data;

          if (!data) {
            console.error("No se pudo realizar correctamente la petición <<getNegocio>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          }  else {
            const Negocio = data;
            console.log("Negocio: ", Negocio);
            resolve(JSON.parse(JSON.stringify(Negocio)));
          }
        })
        .catch((error) => {
          console.error("Error en <<getNegocio>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }