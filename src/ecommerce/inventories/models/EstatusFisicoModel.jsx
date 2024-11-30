import { getDetailRow } from "../helpers/Utils";

export function EstatusFisicoModel() {
  let EstatusFisico = {
    IdTipoEstatusOK: { type: String },
    Actual: { type: String }, // "S" o "N"
    Observacion: { type: String },
    idAlmacen: { type: String }, // Nuevo campo para ID de Almacén
    idSerie: { type: String },   // Nuevo campo para ID de Serie
    detail_row: {
      FechaReg: { type: String }, // Fecha en formato ISO
      UsuarioReg: { type: String }, // Usuario que realizó el registro
    },
  };
  return EstatusFisico;
}

