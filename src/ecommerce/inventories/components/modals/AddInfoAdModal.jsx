import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InfoAdValues } from "../../helpers/InfoAdValues"; 
import { AddOneInfoAd } from "../../../remote/post/AddOneInfoAd";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";
import { getAllInventories } from "../../../remote/GetAllInventories";

const AddInfoAdModal = ({AddInfoAdShowModal, setAddInfoAdShowModal, AlmacenSel}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");  
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdEtiquetaOK: "",
      IdEtiqueta: "",
      Etiqueta: "",
      IdTipoSeccionOK: "",
      Valor: "0",
      Secuencia: "0",
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
          await AddOneInfoAd(AlmacenSel.IdAlmacenOK,InfoAd);
          setMensajeExitoAlert("Información añadida y guardada Correctamente");
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
      open={AddInfoAdShowModal}
      onClose={() => setAddInfoAdShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <MyAddLabels
          disabled={!!mensajeExitoAlert}
          label={"Agrega Índices de Búsqueda"}
          onChangeLabels={(labels) =>
            (formik.values.Indice = labels.join("-"))
          }
        />
        
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
            <Typography>
                <strong>Agregar Información Adicional a Almacén</strong>
            </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Negocios */}
        <DialogContent 
            sx={{ display: 'flex', flexDirection: 'column' }}
            dividers
        >

      <TextField
          id="IdEtiquetaOK"
          label="IdEtiquetaOK*"
          value={formik.values.IdEtiquetaOK}
          {...commonTextFieldProps}
          error={formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)}
          helperText={formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK}
      />

      <TextField
          id="IdEtiqueta"
          label="IdEtiqueta*"
          value={formik.values.IdEtiqueta}
          {...commonTextFieldProps}
          error={formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)}
          helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
      />

      <TextField
          id="Etiqueta"
          label="Etiqueta*"
          value={formik.values.Etiqueta}
          {...commonTextFieldProps}
          error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
          helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
      />

      <TextField
          id="Valor"
          label="Valor*"
          value={formik.values.Valor}
          {...commonTextFieldProps}
          error={formik.touched.Valor && Boolean(formik.errors.Valor)}
          helperText={formik.touched.Valor && formik.errors.Valor}
      />
      <TextField
          id="IdTipoSeccionOK"
          label="IdTipoSeccionOK*"
          type="number"
          value={formik.values.IdTipoSeccionOK}
          {...commonTextFieldProps}
          error={formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)}
          helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
      />

      <TextField
          id="Secuencia"
          label="Secuencia*"
          type="number"
          value={formik.values.Secuencia}
          {...commonTextFieldProps}
          error={formik.touched.Secuencia && Boolean(formik.errors.Secuencia)}
          helperText={formik.touched.Secuencia && formik.errors.Secuencia}
      />
      </DialogContent>
      <DialogActions
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
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
                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setAddInfoAdShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                     {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading} 
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddInfoAdModal;