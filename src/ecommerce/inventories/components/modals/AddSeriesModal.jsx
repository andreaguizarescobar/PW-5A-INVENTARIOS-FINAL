import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox,
    InputLabel, Select, MenuItem, FormHelperText
 } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SeriesValues } from "../../helpers/SeriesValues"; 
import { AddOneSerie } from "../../../remote/post/AddOneSerie";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";

const AddSeriesModal = ({AddSeriesShowModal, setAddSeriesShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");    
    const [Loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            IdAlmacenOK: "",
            Serie: "",
            Placa: "",
            Observacion: "",
        },
        validationSchema: Yup.object({
            IdAlmacenOK: Yup.string().required("Campo requerido"),
            Serie: Yup.string().required("Campo requerido"),
            Placa: Yup.string().required("Campo requerido"),
          
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Serie = SeriesValues(values);
                await AddOneSerie(Serie,values.Serie,values.Placa,values.Observacion);
            
                setMensajeExitoAlert("Series creado y guardado Correctamente");             
            } catch (e) {
                setMensajeExitoAlert(null);
                console.log(e)
                setMensajeErrorAlert("No se pudo crear la serie");
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
    return(
        <Dialog 
            open={AddSeriesShowModal}
            onClose={() => setAddSeriesShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
        
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Serie</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdAlmacenOK"
                        label="IdAlmacenOK"
                        value={formik.values.IdAlmacenOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK) }
                        helperText={ formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK }
                    />
                    <TextField
                        id="Serie"
                        label="Serie"
                        value={formik.values.Serie}
                        {...commonTextFieldProps}
                        error={ formik.touched.Serie && Boolean(formik.errors.Serie) }
                        helperText={ formik.touched.Serie && formik.errors.Serie }
                    />
                    <TextField
                        id="Placa"
                        label="Placa"
                        value={formik.values.Placa}
                        {...commonTextFieldProps}
                        error={ formik.touched.Placa && Boolean(formik.errors.Placa) }
                        helperText={ formik.touched.Placa && formik.errors.Placa }
                    />
                    <TextField
                        id="Observacion"
                        label="Observacion"
                        value={formik.values.Observacion}
                        {...commonTextFieldProps}
                        error={ formik.touched.Observacion && Boolean(formik.errors.Observacion) }
                        helperText={ formik.touched.Observacion && formik.errors.Observacion }
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
                        onClick={() => setAddSeriesShowModal(false)}
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
export default AddSeriesModal;