import axios from "axios";

export function AddOneInfoAd(ID, info_ad) {
    console.log("<<EJECUTA>> API <<AddOneInfoAd>> Requiere:", info_ad);
    return new Promise((resolve, reject) => {
        axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${ID}/info_ad`, info_ad)
            .then((response) => {
                console.log("<<RESPONSE>> AddOneInfoAd", info_ad);
                const data = response.data;
                if (!data || data.error) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneInfoAd>> de forma correcta", data);
                    reject(data);
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneInfoAd>>", error);
                reject(error);
            });
    });
}
