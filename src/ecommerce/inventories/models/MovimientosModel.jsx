export function MovimientosModel() {
    let Mov = {
        IdTipoMovtoOK: { type: String },
        CantidadMovto: { type: String },
        CantidadAnt : { type : String },
        CantidadAct: { type: String },
        IdClaseMovtoOK: { type: String },
        Referencia: { type: String },
        info_ad: [],
        mvtos: [],
        series: [],
    };
    return Mov
};