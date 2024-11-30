import axios from "axios";
export function deleteNegocio(id) { 
    return new Promise((resolve, reject) => { 
        axios.delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/${id}`) 
        .then((response) => { 
            console.log("Negocio eliminado: ", response.data); 
            resolve(response.data);
        }) .catch((error) => { 
            console.error("Error en <<deleteNegocio>>", error); 
            reject(error);
            }); 
        }); 
    }