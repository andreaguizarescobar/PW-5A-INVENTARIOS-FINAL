import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { putEstatusVenta } from "../../../remote/put/putEstatusVenta";

const UpdateEstatusVentaModal = ({ show, onClose, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  const formik = useFormik({
    initialValues: {
      idAlmacen: initialData?.idAlmacen || "",
      idSerie: initialData?.idSerie || "",
      IdTipoEstatusOK: initialData?.IdTipoEstatusOK || "", // Incluido como valor inicial
      Actual: initialData?.Actual === "S",
      Observacion: initialData?.Observacion || "",
      FechaReg: initialData?.FechaReg || new Date().toISOString().split("T")[0],
      UsuarioReg: initialData?.UsuarioReg || "",
    },
    validationSchema: Yup.object({
      idAlmacen: Yup.string().required("El ID del Almacén es requerido."),
      idSerie: Yup.string().required("El ID de la Serie es requerido."),
      Actual: Yup.boolean().required("Campo requerido."),
      FechaReg: Yup.date()
        .required("La fecha de registro es requerida.")
        .typeError("Debe ser una fecha válida."),
      UsuarioReg: Yup.string()
        .max(100, "El usuario no puede exceder 100 caracteres.")
        .required("El usuario es requerido."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setAlertMessage({ type: "", message: "" });

      try {
        const statusData = {
          ...values,
          Actual: values.Actual ? "S" : "N",
        };

        console.log("Datos enviados al API:", statusData);

        await putEstatusVenta(
          values.idAlmacen, 
          values.idSerie,
          values.IdTipoEstatusOK, 
          statusData
        );

        setAlertMessage({
          type: "success",
          message: "Estatus de venta actualizado exitosamente.",
        });

        onSave(statusData); // Actualiza los datos en la tabla
      } catch (error) {
        console.error("Error al actualizar estatus de venta:", error);
        setAlertMessage({
          type: "error",
          message:
            error.message || "Ocurrió un error al intentar actualizar el estatus.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={show} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Actualizar Estatus de Venta</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* Mensajes de éxito o error */}
          {alertMessage.message && (
            <Alert severity={alertMessage.type} sx={{ mb: 2 }}>
              {alertMessage.message}
            </Alert>
          )}

          {/* Campo para ID Almacén */}
          <TextField
            id="idAlmacen"
            label="ID Almacén*"
            value={formik.values.idAlmacen}
            onChange={formik.handleChange}
            error={formik.touched.idAlmacen && Boolean(formik.errors.idAlmacen)}
            helperText={formik.touched.idAlmacen && formik.errors.idAlmacen}
            fullWidth
            margin="normal"
          />

          {/* Campo para ID Serie */}
          <TextField
            id="idSerie"
            label="ID Serie*"
            value={formik.values.idSerie}
            onChange={formik.handleChange}
            error={formik.touched.idSerie && Boolean(formik.errors.idSerie)}
            helperText={formik.touched.idSerie && formik.errors.idSerie}
            fullWidth
            margin="normal"
          />

          {/* Campo para ID Estatus (Solo Lectura) */}
          <TextField
            id="IdTipoEstatusOK"
            label="ID Estatus"
            value={formik.values.IdTipoEstatusOK}
            InputProps={{
              readOnly: true, // Hace el campo solo lectura
            }}
            fullWidth
            margin="normal"
          />

          {/* Checkbox para Estatus Activo */}
          <FormControlLabel
            control={
              <Checkbox
                id="Actual"
                checked={formik.values.Actual}
                onChange={formik.handleChange}
                name="Actual"
                color="primary"
              />
            }
            label="¿Estatus Activo?"
          />

          {/* Campo para Observación */}
          <TextField
            id="Observacion"
            label="Observación*"
            value={formik.values.Observacion}
            onChange={formik.handleChange}
            error={
              formik.touched.Observacion &&
              Boolean(formik.errors.Observacion)
            }
            helperText={
              formik.touched.Observacion && formik.errors.Observacion
            }
            fullWidth
            margin="normal"
          />

          {/* Campo para Fecha de Registro */}
          <TextField
            id="FechaReg"
            label="Fecha de Registro*"
            type="date"
            value={formik.values.FechaReg}
            onChange={formik.handleChange}
            error={formik.touched.FechaReg && Boolean(formik.errors.FechaReg)}
            helperText={formik.touched.FechaReg && formik.errors.FechaReg}
            fullWidth
            margin="normal"
          />

          {/* Campo para Usuario de Registro */}
          <TextField
            id="UsuarioReg"
            label="Usuario Registro*"
            value={formik.values.UsuarioReg}
            onChange={formik.handleChange}
            error={
              formik.touched.UsuarioReg && Boolean(formik.errors.UsuarioReg)
            }
            helperText={
              formik.touched.UsuarioReg && formik.errors.UsuarioReg
            }
            fullWidth
            margin="normal"
          />

          {/* Botones de Acciones */}
          <DialogActions>
            <LoadingButton
              type="submit"
              color="primary"
              loading={loading}
              startIcon={<SaveIcon />}
              variant="contained"
              disabled={loading}
            >
              Guardar
            </LoadingButton>
            <LoadingButton
              color="secondary"
              onClick={onClose}
              startIcon={<CloseIcon />}
              variant="contained"
              disabled={loading}
            >
              Cancelar
            </LoadingButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEstatusVentaModal;
