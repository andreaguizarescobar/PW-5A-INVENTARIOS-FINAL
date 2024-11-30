//import { getDetailRow } from "../helpers/Utils";

import { number } from "yup";

export function UbicacionModel() {
    let Ubicacion = {
        IdAlmacenOK: { type: String },
        Ubicacion: { type: number },
        Actual: { type : String },
       /* detail_row: getDetailRow(),
        FechaReg: Date.now(),
        UsuarrioReg: { type: String }, */
    };
    return Ubicacion
};
