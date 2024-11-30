import { getDetailRow } from "../helpers/Utils";

export function InstitutoModel() {
    let Instituto = {
        IdInstitutoOK: { type: String },
        NombreInstituto: { type: String },
        IdProdServOK : { type : String },
        IdPresentaOK: { type: String },
        negocios: [],
        detail_row: getDetailRow(), 
    };
    return Instituto
};