import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InstitutoValues } from "../../helpers/InstitutoValues"; 
import { putInstituto } from "../../../remote/put/putInstituto";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";
import { getInstituto } from "../../../remote/get/getInstituto";

const UpdateInstitutoModal = ({ UpdateInstitutoShowModal, setUpdateInstitutoShowModal, InstitutoSel}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");    
    const [Loading, setLoading] = useState(false);
    const [InstitutesData, setInstitutesData] = useState([]);

    useEffect(() => { 
        fetchInstitutes(); 
    }, [InstitutoSel]); 
    const fetchInstitutes = async () => {
        try { 
            const data = await getInstituto(InstitutoSel.IdInstitutoOK); 
            console.log(data);
            formik.setValues({ 
                IdInstitutoOK: data.IdInstitutoOK || '',
                NombreInstituto: data.NombreInstituto || '', 
                IdProdServOK: data.IdProdServOK || '', 
                IdPresentaOK: data.IdPresentaOK || ''
            });
        } catch (error) { 
            console.error("Error al obtener institutos:", error); 
        }
    };

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: '',
            NombreInstituto: '',
            IdProdServOK: '',
            IdPresentaOK: ''
        },
        
        validationSchema: Yup.object({
            NombreInstituto: Yup.string().required("Campo requerido"),
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdPresentaOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Instituto = InstitutoValues(values);
                console.log("<<Instituto>>", Instituto);
                await putInstituto(InstitutoSel.IdInstitutoOK, Instituto);
                setMensajeExitoAlert("Instituto creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Instituto");
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
            open={UpdateInstitutoShowModal}
            onClose={() => setUpdateInstitutoShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Editar Instituto</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK*"
                        value={formik.values.IdInstitutoOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK) }
                        helperText={ formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK }
                        disabled
                    />
                    <TextField
                        id="NombreInstituto"
                        label="NombreInstituto*"
                        value={formik.values.NombreInstituto}
                        {...commonTextFieldProps}
                        error={ formik.touched.NombreInstituto && Boolean(formik.errors.NombreInstituto) }
                        helperText={ formik.touched.NombreInstituto && formik.errors.NombreInstituto }
                    />
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK) }
                        helperText={ formik.touched.IdProdServOK && formik.errors.IdProdServOK }
                    />
                    <TextField
                        id="IdPresentaOK"
                        label="IdPresentaOK*"
                        value={formik.values.IdPresentaOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK) }
                        helperText={ formik.touched.IdPresentaOK && formik.errors.IdPresentaOK }
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
                        onClick={() => setUpdateInstitutoShowModal(false)}
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
export default UpdateInstitutoModal;