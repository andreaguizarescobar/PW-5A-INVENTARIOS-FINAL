import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NegocioValues } from "../../helpers/NegocioValues"; 
import { putNegocio } from "../../../remote/put/putNegocio";
import { getNegocio } from "../../../remote/get/getNegocio";
import { getAllInventories } from "../../../remote/GetAllInventories";

const UpdateNegocioModal = ({UpdateNegocioshowModal, setUpdateNegocioshowModal, NegocioSel}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");  
    const [Institutes ,setInstitutes] = useState([]); 
    const [Loading, setLoading] = useState(false);

    useEffect(() => { 
        fetchInstitutes();
        fetchNegocio(); 
    }, [NegocioSel]); 

    const fetchInstitutes = async () => {
        try { 
            const data = await getAllInventories(); 
            setInstitutes(data); 
        } catch (error) { 
            console.error("Error al obtener Negocios:", error); 
        }
    };

    const fetchNegocio = async () => {
        try { 
            const data = await getNegocio(NegocioSel.IdNegocioOK); 
            console.log(data);
            formik.setValues({ 
                IdNegocioOK: data.IdNegocioOK || '',
                NombreNegocio: data.NombreNegocio || '', 
                ControlaSerie: (data.ControlaSerie === 'S') || false,
            });
        } catch (error) { 
            console.error("Error al obtener Negocios:", error); 
        }
    };

    const formik = useFormik({
        initialValues: {
            IdNegocioOK: "",
            NombreNegocio: "",
            ControlaSerie: ""
        },
        validationSchema: Yup.object({
            NombreNegocio: Yup.string().required("Campo requerido"),
            ControlaSerie: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                values.ControlaSerie = values.ControlaSerie ? "S" : "N";
                const Negocio = NegocioValues(values);
                console.log("<<Negocio>>", Negocio);
                await putNegocio(NegocioSel.IdNegocioOK, Negocio);
                setMensajeExitoAlert("Negocio actualizado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar el Negocio");
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
            open={UpdateNegocioshowModal}
            onClose={() => setUpdateNegocioshowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Editar Negocio</strong>
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
                        disabled
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

                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setUpdateNegocioshowModal(false)}
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
                        loading={Loading} 
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default UpdateNegocioModal;