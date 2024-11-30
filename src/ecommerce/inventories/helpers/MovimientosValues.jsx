import { MovimientosModel } from "../models/MovimientosModel";

export const MovimientosValues = (values) => {
    let Movi = MovimientosModel()
    Movi.IdTipoMovtoOK=values.IdTipoMovtoOK,
    Movi.CantidadMovto=values.CantidadMovto,
    Movi.CantidadAnt=values.CantidadAnt,
    Movi.CantidadAct=values.CantidadAct,
    Movi.IdClaseMovtoOK=values.IdClaseMovtoOK,
    Movi.Referencia=values.Referencia
    return Movi
}