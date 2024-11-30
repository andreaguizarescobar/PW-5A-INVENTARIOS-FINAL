import axios from "axios";

export function deleteInfoAd(idAlmacen, idInfoAd) {
    return new Promise((resolve, reject) => {
        axios.delete(
            `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/info_ad/${idInfoAd}`
        )
        .then((response) => {
            console.log("Información adicional eliminada: ", response.data);
            resolve(response.data);
        })
        .catch((error) => {
            console.error("Error en <<deleteInfoAd>>", error);
            reject(error);
        });
    });
}
