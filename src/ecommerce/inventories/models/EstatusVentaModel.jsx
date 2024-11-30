export function EstatusVentaModel() {
  let EstatusVenta = {
    IdTipoEstatusOK: { type: String, required: true }, // Campo requerido
    Actual: { 
      type: String, 
      enum: ["S", "N"], // Solo permite "S" o "N"
      required: true 
    },
    Observacion: { type: String, default: "" }, // Opcional con valor por defecto
    detail_row: {
      FechaReg: { 
        type: String, 
        required: true, 
        validate: {
          validator: (v) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(v),
          message: "FechaReg debe estar en formato ISO 8601",
        },
      },
      UsuarioReg: { type: String, required: true }, // Usuario es obligatorio
      Borrado: { type: String, enum: ["S", "N"], default: "N" } // Indicador de borrado
    },
  };
  return EstatusVenta;
}
