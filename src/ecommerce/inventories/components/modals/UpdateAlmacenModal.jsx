import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InventoryValues } from "../../helpers/InventoryValues"; 
import { getAlmacen } from "../../../remote/get/getAlmacen";
import { putAlmacen } from "../../../remote/put/putAlmacen";

const UpdateAlmacenModal = ({UpdateInventoryShowModal, setUpdateInventoryShowModal, AlmacenSel}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");     
    const [Loading, setLoading] = useState(false);


    useEffect(() => { 
        fetchInfoAd(); 
    }, [AlmacenSel]); 
    
    const fetchInfoAd = async () => {
        try { 
            console.log(AlmacenSel.IdAlmacenOK);
            const data = await getAlmacen(AlmacenSel.IdAlmacenOK); 
            console.log(data);
            formik.setValues({
                IdAlmacenOK: data.IdAlmacenOK || '',
                Principal: (data.Principal === 'S') || false, 
                CantidadActual: data.CantidadActual || '', 
                CantidadDisponible: data.CantidadDisponible || '',
                CantidadApartada: data.CantidadApartada || '',
                CantidadTransito: data.CantidadTransito || '',
                StockMaximo: data.StockMaximo || '',
                StockMinimo: data.StockMinimo || ''
            });
        } catch (error) { 
            console.error("Error al obtener el almacen:", error); 
        }
    };
    


    const formik = useFormik({
        initialValues: {
            IdAlmacenOK: "",
            Principal: false,
            CantidadActual: "",
            CantidadDisponible: "",
            CantidadApartada: "",
            CantidadTransito: "",
            StockMaximo: "",
            StockMinimo: "",
        },
        validationSchema: Yup.object({
            Principal: Yup.boolean().required("Campo requerido"),
            CantidadActual: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
            CantidadDisponible: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
            CantidadApartada: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
            CantidadTransito: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
            StockMaximo: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
            StockMinimo: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                values.Principal = values.Principal ? "S" : "N";
                const Inventory = InventoryValues(values);
                console.log("<<Inventory>>", Inventory);
                await putAlmacen(AlmacenSel.IdAlmacenOK,Inventory);
                setMensajeExitoAlert("Inventario creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Inventario");
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
            open={UpdateInventoryShowModal}
            onClose={() => setUpdateInventoryShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Almacen</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    <TextField
                        id="IdAlmacenOK"
                        label="IdAlmacenOK*"
                        value={formik.values.IdAlmacenOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK) }
                        helperText={ formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.Principal}
                                onChange={formik.handleChange}
                                name="Principal"
                                color="primary"
                                disabled={!!mensajeExitoAlert}
                            />
                        }
                        label="Principal"
                    />  
                    <TextField
                        id="CantidadActual"
                        label="CantidadActual*"
                        value={formik.values.CantidadActual}
                        {...commonTextFieldProps}
                        error={ formik.touched.CantidadActual && Boolean(formik.errors.CantidadActual) }
                        helperText={ formik.touched.CantidadActual && formik.errors.CantidadActual }
                    />
                    <TextField
                        id="CantidadDisponible"
                        label="CantidadDisponible*"
                        value={formik.values.CantidadDisponible}
                        {...commonTextFieldProps}
                        error={ formik.touched.CantidadDisponible && Boolean(formik.errors.CantidadDisponible) }
                        helperText={ formik.touched.CantidadDisponible && formik.errors.CantidadDisponible }
                    />
                    <TextField
                        id="CantidadApartada"
                        label="CantidadApartada*"
                        value={formik.values.CantidadApartada}
                        {...commonTextFieldProps}
                        error={ formik.touched.CantidadApartada && Boolean(formik.errors.CantidadApartada) }
                        helperText={ formik.touched.CantidadApartada && formik.errors.CantidadApartada }
                    />
                    <TextField
                        id="CantidadTransito"
                        label="CantidadTransito*"
                        value={formik.values.CantidadTransito}
                        {...commonTextFieldProps}
                        error={ formik.touched.CantidadTransito && Boolean(formik.errors.CantidadTransito) }
                        helperText={ formik.touched.CantidadTransito && formik.errors.CantidadTransito }
                    />
                    <TextField
                        id="StockMaximo"
                        label="StockMaximo*"
                        value={formik.values.StockMaximo}
                        {...commonTextFieldProps}
                        error={ formik.touched.StockMaximo && Boolean(formik.errors.StockMaximo) }
                        helperText={ formik.touched.StockMaximo && formik.errors.StockMaximo }
                    />
                    <TextField
                        id="StockMinimo"
                        label="StockMinimo*"
                        value={formik.values.StockMinimo}
                        {...commonTextFieldProps}
                        error={ formik.touched.StockMinimo && Boolean(formik.errors.StockMinimo) }
                        helperText={ formik.touched.StockMinimo && formik.errors.StockMinimo }
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
                        onClick={() => setUpdateInventoryShowModal(false)}
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
export default UpdateAlmacenModal;