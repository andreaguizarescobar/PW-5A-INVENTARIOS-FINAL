import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InventoryValues } from "../../helpers/InventoryValues"; 
import { AddOneInventory } from "../../../remote/post/AddOneInventory";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";
import { getAllInventories } from "../../../remote/GetAllInventories";

const AddInventoryModal = ({AddInventoryShowModal, setAddInventoryShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Negocios ,setNegocio] = useState([]);     
    const [Loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            IdNegocioOK: "",
            IdAlmacenOK: "",
            //Principal: "",
            Principal: false,
            CantidadActual: "",
            CantidadDisponible: "",
            CantidadApartada: "",
            CantidadTransito: "",
            StockMaximo: "",
            StockMinimo: "",
        },
        validationSchema: Yup.object({
            IdNegocioOK: Yup.string().required("Campo requerido"),
            IdAlmacenOK: Yup.string().required("Campo requerido"),
            /*Principal: Yup.string().required("Campo requerido").max(1, 'Solo se permite una letra')
            .matches(/^[NS]+$/, 'Solo se permite S o N'),*/
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
                await AddOneInventory(values.IdNegocioOK,Inventory);
                setMensajeExitoAlert("Inventario creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Inventario");
            }
            setLoading(false);
        },
    });

    useEffect(() => { 
        fetchNegocio(); 
    }, []); 
    const fetchNegocio = async () => {
        try { 
            const data = await getAllInventories(); 
            const Negocios = data.flatMap(inventario => inventario.negocios);
            setNegocio(Negocios); 
        } catch (error) { 
            console.error("Error al obtener Negocios:", error); 
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
            open={AddInventoryShowModal}
            onClose={() => setAddInventoryShowModal(false)}
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
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Almacen</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    
                    <Select id="IdNegocioOK" name="IdNegocioOK" 
                            value={formik.values.IdNegocioOK} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)} > 
                        <MenuItem value=""> 
                            <em>Seleccione un Negocio</em> 
                        </MenuItem> {
                            Negocios.map((Negocio) => ( 
                            <MenuItem key={Negocio.IdNegocioOK} 
                            value={Negocio.IdNegocioOK}> 
                            {Negocio.IdNegocioOK} </MenuItem> ))} 
                        </Select> {formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}


                    <TextField
                        id="IdAlmacenOK"
                        label="IdAlmacenOK*"
                        value={formik.values.IdAlmacenOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK) }
                        helperText={ formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK }
                    />
                    {/*<TextField
                        id="Principal"
                        label="Principal*"
                        value={formik.values.Principal}
                        {...commonTextFieldProps}
                        error={ formik.touched.Principal && Boolean(formik.errors.Principal) }
                        helperText={ formik.touched.Principal && formik.errors.Principal }
                    />*/}
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
                        onClick={() => setAddInventoryShowModal(false)}
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
export default AddInventoryModal;