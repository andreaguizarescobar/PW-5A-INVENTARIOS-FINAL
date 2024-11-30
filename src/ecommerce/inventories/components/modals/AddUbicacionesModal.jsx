import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UbicacionesValues } from "../../helpers/UbicacionesValues";
import { AddOneUbicacion } from "../../../remote/post/AddOneUbicacion";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";

const AddUbicacionesModal = ({AddUbicacionShowModal, setAddUbicacionShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");    
    const [Loading, setLoading] = useState(false);
    const formik = useFormik({

        initialValues: {
            IdAlmacenOK: "",
            Ubicacion: "",
            Actual: "",
          
        },

        validationSchema: Yup.object({
            IdAlmacenOK: Yup.string().required("Campo requerido"),
            Ubicacion: Yup.number().required("Campo requerido"),
            Actual: Yup.string().required("Campo requerido"),
    
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Ubicacion = UbicacionesValues(values);
                console.log("<<Ubicacion>>", Ubicacion);
                await AddOneUbicacion(Ubicacion);
                setMensajeExitoAlert("Ubicación creada y guardada Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la ubicación");
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
            open={AddUbicacionShowModal}
            onClose={() => setAddUbicacionShowModal(false)}
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
                {/* Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Ubicacion</strong>
                    </Typography>
                </DialogTitle>
                {/* Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Campos de captura o selección */}
                    <TextField
                        id="IdAlmacenOK"
                        label="IdAlmacenOK*"
                        value={formik.values.IdAlmacenOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK) }
                        helperText={ formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK }
                    />
                    
                    <TextField
                        id="Ubicacion"
                        label="Ubicacion*"
                        value={formik.values.Ubicacion}
                        {...commonTextFieldProps}
                        error={ formik.touched.Ubicacion && Boolean(formik.errors.Ubicacion) }
                        helperText={ formik.touched.Ubicacion && formik.errors.Ubicacion }
                    />
                    <TextField
                        id="Actual"
                        label="Actual*"
                        value={formik.values.Actual}
                        {...commonTextFieldProps}
                        error={ formik.touched.Actual && Boolean(formik.errors.Actual) }
                        helperText={ formik.touched.Actual && formik.errors.Actual }
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
                    {/* Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setAddUbicacionShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                     {/* Boton de Guardar. */}
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
export default AddUbicacionesModal;

