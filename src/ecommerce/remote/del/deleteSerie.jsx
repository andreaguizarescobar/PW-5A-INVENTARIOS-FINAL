import axios from "axios";
export function deleteSerie(ID,Serie) { 
    return new Promise((resolve, reject) => { 
      console.log(ID)
      console.log(Serie)
        axios.delete(
            `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${ID}/serie/${Serie}`,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        .then((response) => { 
            console.log("Serie eliminado: ", response.data); 
            resolve(response.data);
        }) .catch((error) => { 
            console.error("Error en <<deleteSerie>>", error); 
            reject(error);
            }); 
        }); 
    }