import axios from "axios";
export function deleteInstituto(id) { 
    return new Promise((resolve, reject) => { 
        axios.delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/${id}`) 
        .then((response) => { 
            console.log("Instituto eliminado: ", response.data); 
            resolve(response.data);
        }) .catch((error) => { 
            console.error("Error en <<deleteInstituto>>", error); 
            reject(error);
            }); 
        }); 
    }