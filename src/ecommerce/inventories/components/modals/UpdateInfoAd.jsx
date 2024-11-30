import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InfoAdValues } from "../../helpers/InfoAdValues";
import { putInfoAd } from "../../../remote/put/putInfoAd";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";

const UpdateInfoAd = ({ UpdateInfoAdShowModal, setUpdateInfoAdShowModal, InfoAdSel, selectedRowId, AlmacenSel}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");    
  const [Loading, setLoading] = useState(false);

  useEffect(() => { 
    fetchInfoAd(); 
}, [InfoAdSel]); 

const fetchInfoAd = async () => {
    try { 
        formik.setValues({
            IdEtiquetaOK: InfoAdSel.IdEtiquetaOK || '', 
            IdEtiqueta: InfoAdSel.IdEtiqueta || '', 
            Etiqueta: InfoAdSel.Etiqueta || '', 
            Valor: InfoAdSel.Valor || '',
            IdTipoSeccionOK: InfoAdSel.IdTipoSeccionOK || '',
            Secuencia: InfoAdSel.Secuencia || ''
        });
    } catch (error) { 
        console.error("Error al obtener información adicional:", error); 
    }
};


  const formik = useFormik({
    initialValues: {
      IdEtiquetaOK: '',
      IdEtiqueta: '',
      Etiqueta: '',
      IdTipoSeccionOK: '',
      Valor: '',
      Secuencia: '',
    },
    validationSchema: Yup.object({
      IdEtiquetaOK: Yup.string().required("Campo requerido"),
      IdEtiqueta: Yup.string().required("Campo requerido"),
      Etiqueta: Yup.string().required("Campo requerido"),
      IdTipoSeccionOK: Yup.string().required("Campo requerido"),
      Valor: Yup.string().required("Campo requerido"),
      Secuencia: Yup.string().required("Campo requerido"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const InfoAd = InfoAdValues(values);
        console.log("<<InfoAd>>", InfoAd);
        await putInfoAd(InfoAdSel.IdAlmacenOK,selectedRowId, InfoAd);
        setMensajeExitoAlert("Información creada y guardada Correctamente");
      
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo añadir la información");
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
    <Dialog
      open={UpdateInfoAdShowModal}
      onClose={() => setUpdateInfoAdShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle
          style={{
            backgroundColor: "#1976d2", // Color de Fondo
            color: "white", // Color del Texto
          }}
        >
          <Typography style={{ fontSize: "25px" }}>
            <strong>Modificar Info Adicional</strong>
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="IdEtiquetaOK"
            label="IdEtiquetaOK*"
            value={formik.values.IdEtiquetaOK}
            error={formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)}
            helperText={formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK}
            {...commonTextFieldProps}
            disabled
          />
          <TextField
            id="IdEtiqueta"
            label="IdEtiqueta*"
            value={formik.values.IdEtiqueta}
            error={
              formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)
            }
            helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="Etiqueta"
            label="Etiqueta*"
            value={formik.values.Etiqueta}
            error={
              formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)
            }
            helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="Valor"
            label="Valor*"
            value={formik.values.Valor}
            error={formik.touched.Valor && Boolean(formik.errors.Valor)}
            helperText={formik.touched.Valor && formik.errors.Valor}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="IdTipoSeccionOK"
            label="IdTipoSeccionOK*"
            value={formik.values.IdTipoSeccionOK}
            error={
              formik.touched.Valor && Boolean(formik.errors.IdTipoSeccionOK)
            }
            helperText={
              formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK
            }
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="Secuencia"
            label="Secuencia*"
            value={formik.values.Secuencia}
            error={formik.touched.Secuencia && Boolean(formik.errors.Secuencia)}
            helperText={formik.touched.Secuencia && formik.errors.Secuencia}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
        </DialogContent>
        <DialogActions sx={{ width: "auto" }}>
          <Box m="auto">
            {!formik.isValid && (
              <Alert severity="error">{"El formulario contiene Errores"}</Alert>
            )}
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
            sx={{ p: 1.5, px: 2 }}
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setUpdateInfoAdShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            type="submit"
            sx={{ p: 1.5, px: 2 }}
            color="primary"
            loading={Loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            disabled={!formik.isValid || !!mensajeExitoAlert}
          >
            <span>MODIFICAR</span>
          </LoadingButton>
        </DialogActions>{" "}
      </form>
    </Dialog>
  );
};

export default UpdateInfoAd;