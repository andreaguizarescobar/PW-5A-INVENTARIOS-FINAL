import { EstatusFisicoModel } from "../models/EstatusFisicoModel";

export const EstatusFisicoValues = (values) => {
  let EstatusFisico = EstatusFisicoModel();

  // Mapeo de valores principales
  EstatusFisico.IdTipoEstatusOK = values.IdTipoEstatusOK || "No definido";
  EstatusFisico.Actual = values.Actual || "Sin estado";
  EstatusFisico.Observacion = values.Observacion || "Sin observación";

  // Detalles adicionales
  EstatusFisico.detail_row = {
    FechaReg: values.FechaReg || "Fecha no registrada",
    UsuarioReg: values.UsuarioReg || "Usuario no definido",
  };

  // Campos adicionales relacionados con almacenes y series
  EstatusFisico.idAlmacen = values.idAlmacen || "Sin ID de almacén";
  EstatusFisico.idSerie = values.idSerie || "Sin ID de serie";

  return EstatusFisico;
};
