import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Si usas Redux para manejar el estado global
import { EstatusFisicoValues } from "../../helpers/EstatusFisicoValues";     
import { AddOneEstatusFisico } from "../../../remote/post/AddOneEstatusFisico";
const AddEstatusFisicoModal = ({ AddEstatusFisicoShowModal, setAddEstatusFisicoShowModal }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      IdTipoEstatusOK: "",
      Actual: "",
      Observacion: "",
      idAlmacen: "", 
      idSerie: "",  
    },
    validationSchema: Yup.object({
      IdTipoEstatusOK: Yup.string().required("Campo requerido"),
      Actual: Yup.string()
        .oneOf(["S", "N"], "Solo se permite 'S' o 'N'")
        .required("Campo requerido"),
      Observacion: Yup.string().max(255, "Máximo 255 caracteres"),
      idAlmacen: Yup.string().required("Campo requerido"),
      idSerie: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      console.log("FIC: entro al onSubmit despues de hacer click en boton Guardar");
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        // Llamar a la función para agregar el estatus físico
        const estatusFisico =EstatusFisicoValues(values);
        console.log("<<ubicacion>>",estatusFisico);
        await AddOneEstatusFisico(values); // Aquí se pasa 'values' directamente a la API
        setMensajeExitoAlert("Estatus físico agregado correctamente");
        setAddEstatusFisicoShowModal(false); // Cerrar el modal al guardar
      } catch (error) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo agregar el estatus físico");
      }
      setLoading(false);
    },
  });
  

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert, 
  };

  return (
    <Dialog open={AddEstatusFisicoShowModal} onClose={() => setAddEstatusFisicoShowModal(false)} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography>
            <strong>Agregar Nuevo Estatus Físico</strong>
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
          {/* Campos de formulario */}
          <TextField
            id="idAlmacen"
            label="Id Almacen*"
            value={formik.values.idAlmacen}
            {...commonTextFieldProps}
            error={formik.touched.idAlmacen && Boolean(formik.errors.idAlmacen)}
            helperText={formik.touched.idAlmacen && formik.errors.idAlmacen}
          />
          <TextField
            id="idSerie"
            label="Id Serie*"
            value={formik.values.idSerie}
            {...commonTextFieldProps}
            error={formik.touched.idSerie && Boolean(formik.errors.idSerie)}
            helperText={formik.touched.idSerie && formik.errors.idSerie}
          />
          <TextField
            id="IdTipoEstatusOK"
            label="Id Tipo Estatus*"
            value={formik.values.IdTipoEstatusOK}
            {...commonTextFieldProps}
            error={formik.touched.IdTipoEstatusOK && Boolean(formik.errors.IdTipoEstatusOK)}
            helperText={formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK}
          />
          <TextField
            id="Actual"
            label="Estatus Actual*"
            value={formik.values.Actual}
            {...commonTextFieldProps}
            error={formik.touched.Actual && Boolean(formik.errors.Actual)}
            helperText={formik.touched.Actual && formik.errors.Actual}
          />
          <TextField
            id="Observacion"
            label="Observación"
            value={formik.values.Observacion}
            {...commonTextFieldProps}
            error={formik.touched.Observacion && Boolean(formik.errors.Observacion)}
            helperText={formik.touched.Observacion && formik.errors.Observacion}
          />
        </DialogContent>

        {/* Acciones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
        <Box m="auto">
    {console.log("mensajeExitoAlert", mensajeExitoAlert)}
    {console.log("mensajeErrorAlert", mensajeErrorAlert)}
    {mensajeErrorAlert && (
    <Alert severity="error">
        <b>¡ERROR!</b> ─ {mensajeErrorAlert}
    </Alert>
    )}
    {mensajeExitoAlert && (
    <Alert severity="success">
        <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
    </Alert>
    )}
</Box>
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />

            }
            variant="outlined"
            onClick={() => setAddEstatusFisicoShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={!!mensajeExitoAlert}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEstatusFisicoModal;
