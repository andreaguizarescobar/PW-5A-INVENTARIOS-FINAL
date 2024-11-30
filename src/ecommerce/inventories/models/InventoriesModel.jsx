export function InventoryModel() {
    let Inventory = {
        IdAlmacenOK: { type: String },
        Principal: { type: String },
        CantidadActual : { type : String },
        CantidadDisponible: { type: String },
        CantidadApartada: { type: String },
        CantidadTransito: { type: String },
        StockMaximo: { type: String },
        StockMinimo: { type: String },
        info_ad: [],
        mvtos: [],
        series: [],
    };
    return Inventory
};