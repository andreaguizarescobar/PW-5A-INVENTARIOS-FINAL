import { EstatusVentaModel } from "../models/EstatusVentaModel";

export const EstatusVentaValues = (values) => {
  const estatusVenta = EstatusVentaModel();

  // Validaciones y asignaciones con valores predeterminados
  estatusVenta.IdTipoEstatusOK = values.IdTipoEstatusOK || "";
  estatusVenta.Actual = values.Actual === "S" || values.Actual === "N" ? values.Actual : "N"; // Por defecto, "N"
  estatusVenta.Observacion = values.Observacion || "Sin observaciones"; // Observación predeterminada
  estatusVenta.detail_row = {
    FechaReg: values.FechaReg || new Date().toISOString(), // Fecha actual si no se proporciona
    UsuarioReg: values.UsuarioReg || "Desconocido", // Usuario predeterminado si falta
  };

  return estatusVenta;
};
