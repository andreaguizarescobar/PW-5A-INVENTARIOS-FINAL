import axios from "axios";
export function getInstituto(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/${id}`)
        .then((response) => {
          const data = response.data;

          if (!data) {
            console.error("No se pudo realizar correctamente la petición <<getInstituto>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          }  else {
            const instituto = data;
            console.log("instituto: ", instituto);
            resolve(JSON.parse(JSON.stringify(instituto)));
          }
        })
        .catch((error) => {
          console.error("Error en <<getInstituto>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }