import axios from "axios";
export function deleteAlmacen(id) { 
    return new Promise((resolve, reject) => { 
        axios.delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${id}`) 
        .then((response) => { 
            console.log("Almacen eliminado: ", response.data); 
            resolve(response.data);
        }) .catch((error) => { 
            console.error("Error en <<deleteAlmacen>>", error); 
            reject(error);
            }); 
        }); 
    }