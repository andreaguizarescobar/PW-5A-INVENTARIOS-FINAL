import { UbicacionModel } from "../models/UbicacionesModel"

export const UbicacionesValues = (values) => {
    let Ubicacion = UbicacionModel()
    Ubicacion.IdAlmacenOK = values.IdAlmacenOK,
    Ubicacion.Ubicacion = values.Ubicacion,
    Ubicacion.Actual = values.Actual
   // Ubicacion.detail_row = values.detail_row,
   // Ubicacion.FechaReg = values.FechaReg,
   // Ubicacion.UsuarrioReg = values.UsuarrioReg
    return Ubicacion
}