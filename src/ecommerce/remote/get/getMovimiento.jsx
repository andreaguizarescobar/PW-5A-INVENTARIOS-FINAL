import axios from "axios";
export function getInventario(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${id}`)
            .then((response) => {
                const data = response.data;

                if (!data) {
                    console.error("No se pudo realizar correctamente la petición <<getAllInventories - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else {
                    const almacen = data;
                    console.log("Almacen: ", almacen);
                    resolve(JSON.parse(JSON.stringify(almacen)));
                }
            })
            .catch((error) => {
                console.error("Error en <<getAllInventories - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}