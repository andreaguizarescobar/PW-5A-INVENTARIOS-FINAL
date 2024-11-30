import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddOneStatusVenta } from "../../../remote/post/AddOneStatusVenta";
import { EstatusVentaValues } from "../../helpers/EstatusVentaValues";

const AddEstatusVentaModal = ({ show, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  const formik = useFormik({
    initialValues: {
      idAlmacen: "", // Nuevo campo para ID Almacén
      idSerie: "", // Nuevo campo para ID Serie
      IdTipoEstatusOK: "",
      Actual: false,
      Observacion: "",
      FechaReg: new Date().toISOString().split("T")[0], // Fecha actual por defecto
      UsuarioReg: "UsuarioTest", // Sustituir por usuario autenticado
    },
    validationSchema: Yup.object({
      idAlmacen: Yup.string().required("El ID del Almacén es requerido."),
      idSerie: Yup.string().required("El ID de la Serie es requerido."),
      IdTipoEstatusOK: Yup.string().required("El ID del Estatus es requerido."),
      Actual: Yup.boolean().required("Campo requerido."),
      Observacion: Yup.string()
        .max(255, "La observación no puede exceder 255 caracteres.")
        .required("La observación es requerida."),
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
        const statusData = EstatusVentaValues({
          ...values,
          Actual: values.Actual ? "S" : "N",
        });

        await AddOneStatusVenta(statusData, values.idSerie, values.idAlmacen);

        setAlertMessage({
          type: "success",
          message: "Estatus creado y guardado correctamente.",
        });

        onSave(statusData); // Agrega el estatus al listado en la vista principal
        formik.resetForm(); // Reinicia el formulario
      } catch (error) {
        setAlertMessage({
          type: "error",
          message: error.message || "Hubo un error al intentar guardar el estatus.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: alertMessage.type === "success",
  };

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        {/* Título del Modal */}
        <DialogTitle>
          <Typography variant="h6">
            <strong>Agregar Nuevo Estatus de Venta</strong>
          </Typography>
        </DialogTitle>

        {/* Contenido del Formulario */}
        <DialogContent dividers>
          {/* Campo para ID Almacén */}
          <TextField
            id="idAlmacen"
            label="ID Almacén*"
            value={formik.values.idAlmacen}
            {...commonTextFieldProps}
            error={formik.touched.idAlmacen && Boolean(formik.errors.idAlmacen)}
            helperText={formik.touched.idAlmacen && formik.errors.idAlmacen}
          />

          {/* Campo para ID Serie */}
          <TextField
            id="idSerie"
            label="ID Serie*"
            value={formik.values.idSerie}
            {...commonTextFieldProps}
            error={formik.touched.idSerie && Boolean(formik.errors.idSerie)}
            helperText={formik.touched.idSerie && formik.errors.idSerie}
          />

          {/* Campo para ID Estatus */}
          <TextField
            id="IdTipoEstatusOK"
            label="ID Estatus*"
            value={formik.values.IdTipoEstatusOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoEstatusOK &&
              Boolean(formik.errors.IdTipoEstatusOK)
            }
            helperText={
              formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK
            }
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
            {...commonTextFieldProps}
            error={
              formik.touched.Observacion &&
              Boolean(formik.errors.Observacion)
            }
            helperText={
              formik.touched.Observacion && formik.errors.Observacion
            }
          />

          {/* Campo para Fecha de Registro */}
          <TextField
            id="FechaReg"
            label="Fecha de Registro*"
            type="date"
            value={formik.values.FechaReg}
            {...commonTextFieldProps}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.FechaReg && Boolean(formik.errors.FechaReg)}
            helperText={formik.touched.FechaReg && formik.errors.FechaReg}
          />

          {/* Campo para Usuario de Registro */}
          <TextField
            id="UsuarioReg"
            label="Usuario de Registro*"
            value={formik.values.UsuarioReg}
            {...commonTextFieldProps}
            error={
              formik.touched.UsuarioReg && Boolean(formik.errors.UsuarioReg)
            }
            helperText={
              formik.touched.UsuarioReg && formik.errors.UsuarioReg
            }
          />
        </DialogContent>

        {/* Acciones del Modal */}
        <DialogActions>
          <Box m="auto">
            {alertMessage.message && (
              <Alert severity={alertMessage.type}>
                <b>{alertMessage.type === "success" ? "¡ÉXITO!" : "¡ERROR!"}</b>{" "}
                ─ {alertMessage.message}
              </Alert>
            )}
          </Box>
          <LoadingButton
            color="secondary"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={onClose}
            loadingPosition="start"
          >
            Cerrar
          </LoadingButton>
          <LoadingButton
            color="primary"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            loading={loading}
            disabled={alertMessage.type === "success"}
            loadingPosition="start"
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEstatusVentaModal;


