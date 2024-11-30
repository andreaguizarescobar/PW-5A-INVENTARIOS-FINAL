import { getDetailRow } from "../helpers/Utils";

export function InfoAdModel() {
    let InfoAd = {
        infoAdDetails: [{
            IdEtiquetaOK: { type: String }, // ID único relacionado con la etiqueta
            IdEtiqueta: { type: String },  // Identificador general de la etiqueta
            Etiqueta: { type: String },    // Nombre o descripción de la etiqueta
            Valor: { type: String },       // Valor asociado con la etiqueta
            IdTipoSeccionOK: { type: String }, // ID relacionado con el tipo de sección
            Secuencia: { type: Number },   // Orden o secuencia de la información
            detail_row: getDetailRow(),    // Datos adicionales para la fila
        }],
    };
    return InfoAd;
};
