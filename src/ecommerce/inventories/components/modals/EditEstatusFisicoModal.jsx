import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Si usas Redux para manejar el estado global
import { EstatusFisicoValues } from "../../helpers/EstatusFisicoValues";     
import { UpdateEstatusFisico } from "../../../remote/put/UpdateEstatusFisico";
const EditEstatusFisicoModal = ({ selectedData, EditEstatusFisicoShowModal, setEditEstatusFisicoShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);
  
    const dispatch = useDispatch();
  
    const formik = useFormik({
      enableReinitialize: true, // Permitir que los valores iniciales cambien si los props cambian
      initialValues: {
        IdTipoEstatusOK: selectedData?.IdTipoEstatusOK || "",
        Actual: selectedData?.Actual || "",
        Observacion: selectedData?.Observacion || "",
        idAlmacen: selectedData?.idAlmacen || "", 
        idSerie: selectedData?.idSerie || "",  
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
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
          const estatusFisico = EstatusFisicoValues(values);
          await UpdateEstatusFisico(values); // Actualizar datos en la API
          setMensajeExitoAlert("Estatus físico actualizado correctamente");
          setEditEstatusFisicoShowModal(false); // Cerrar modal
        } catch (error) {
          setMensajeErrorAlert("No se pudo actualizar el estatus físico");
          setMensajeExitoAlert(null);
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
      <Dialog open={EditEstatusFisicoShowModal} onClose={() => setEditEstatusFisicoShowModal(false)} fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            <Typography><strong>editar Estatus Físico</strong></Typography>
          </DialogTitle>
          
          <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
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
              startIcon={<CloseIcon />}
              variant="outlined"
              onClick={() => setEditEstatusFisicoShowModal(false)}
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
  
  export default EditEstatusFisicoModal;
  