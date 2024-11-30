import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NegocioValues } from "../../helpers/NegocioValues"; 
import { AddOneNegocio } from "../../../remote/post/AddOneNegocio";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";
import { getAllInventories } from "../../../remote/GetAllInventories";

const AddNegocioModal = ({AddNegocioshowModal, setAddNegocioshowModal, InstitutoSel}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");  
    const [Institutes ,setInstitutes] = useState([]); 
    const [Loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            IdNegocioOK: "",
            NombreNegocio: "",
            ControlaSerie: false
        },
        validationSchema: Yup.object({
            IdNegocioOK: Yup.string().required("Campo requerido"),
            NombreNegocio: Yup.string().required("Campo requerido"),
            ControlaSerie: Yup.boolean(),
        }), 
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                values.ControlaSerie = values.ControlaSerie ? "S" : "N";
                const Negocio = NegocioValues(values);
                console.log("<<Negocio>>", Negocio);
                await AddOneNegocio(InstitutoSel.IdInstitutoOK,Negocio);
                setMensajeExitoAlert("Inventario creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Inventario");
            }
            setLoading(false);
        },
    });

    useEffect(() => { 
        fetchInstitutes(); 
    }, []); 
    const fetchInstitutes = async () => {
        try { 
            const data = await getAllInventories(); 
            setInstitutes(data); 
        } catch (error) { 
            console.error("Error al obtener institutos:", error); 
        }
    };
    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };
    return(
        <Dialog 
            open={AddNegocioshowModal}
            onClose={() => setAddNegocioshowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Negocio</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    <TextField
                        id="IdNegocioOK"
                        label="IdNegocioOK*"
                        value={formik.values.IdNegocioOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK) }
                        helperText={ formik.touched.IdNegocioOK && formik.errors.IdNegocioOK }
                    />
                    <TextField
                        id="NombreNegocio"
                        label="NombreNegocio*"
                        value={formik.values.NombreNegocio}
                        {...commonTextFieldProps}
                        error={ formik.touched.NombreNegocio && Boolean(formik.errors.NombreNegocio) }
                        helperText={ formik.touched.NombreNegocio && formik.errors.NombreNegocio }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.ControlaSerie}
                                onChange={formik.handleChange}
                                name="ControlaSerie"
                                color="primary"
                                disabled={!!mensajeExitoAlert}
                            />
                        }
                        label="ControlaSerie"
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
                        onClick={() => setAddNegocioshowModal(false)}
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
export default AddNegocioModal;