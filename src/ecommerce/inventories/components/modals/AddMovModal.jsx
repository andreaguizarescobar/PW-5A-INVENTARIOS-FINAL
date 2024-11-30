import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    DialogActions,
    Box,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllInventories } from "../../../remote/GetAllInventories"; // Asegúrate de que esta función esté correcta
import { MovimientosValues } from "../../helpers/MovimientosValues";
import { AddOneMov } from "../../../remote/post/AddOneMov";

const AddMovModal = ({ AddMovShowModal, setAddMovShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [comboOptions, setComboOptions] = useState([]); // Para almacenar opciones dinámicas

    // Cargar opciones del ComboBox desde la base de datos
    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const inventories = await getAllInventories(); // Llama a la API para obtener los inventarios
                console.log("Respuesta completa de la API:", inventories); // Verifica la respuesta completa

                // Extrae los IdAlmacenOK de cada almacén dentro de los negocios
                const almacenes = [];
                inventories.forEach((item) => {
                    item.negocios.forEach((negocio) => {
                        negocio.almacenes.forEach((almacen) => {
                            almacenes.push(almacen.IdAlmacenOK); // Agrega el IdAlmacenOK a la lista
                        });
                    });
                });

                // Actualiza el estado con los IdAlmacenOK extraídos
                setComboOptions(almacenes);
                console.log("Opciones extraídas:", almacenes); // Verifica las opciones extraídas
            } catch (error) {
                console.error("Error al cargar los inventarios:", error);
            }
        };

        if (AddMovShowModal) {
            fetchInventories();
        }
    }, [AddMovShowModal]);

    const formik = useFormik({
        initialValues: {
            IdAlmacenOK: "",
            IdTipoMovtoOK: "",
            CantidadMovto: "",
            CantidadAnt: "",
            CantidadAct: "",
            IdClaseMovtoOK: "",
            IdTipoMovtoOK: "",
            Referencia: "",
        },
        validationSchema: Yup.object({
            IdAlmacenOK: Yup.string().required("Campo requerido"),
            CantidadMovto: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número")
                .min(0, "La cantidad debe ser mayor o igual a 0").integer("No se permiten decimales"),
            CantidadAnt: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número")
                .min(0, "La cantidad debe ser mayor o igual a 0").integer("No se permiten decimales"),
            CantidadAct: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número")
                .min(0, "La cantidad debe ser mayor o igual a 0").integer("No se permiten decimales"),
            IdClaseMovtoOK: Yup.string()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            IdTipoMovtoOK: Yup.string()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            Referencia: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            // Mostrar los datos extraídos del modal
            console.log("Formulario enviado con valores:", values); // Muestra los valores en la consola
            setLoading(true); // Activa el estado de carga
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                // Simula un proceso exitoso
                console.log("Datos extraídos del modal:", values); // Muestra los datos en la consola
                const response = await AddOneMov(values.IdAlmacenOK, values);// Llama a la API para agregar el movimiento
                console.log("Respuesta de la API:", response);
                setMensajeExitoAlert("Datos enviados correctamente a la consola.");
            } catch (error) {
                console.error("Error al procesar los datos:", error); // Captura cualquier error inesperado
                setMensajeErrorAlert("Error al enviar los datos.");
            }

            setLoading(false); // Desactiva el estado de carga
        },
    });

    // Propiedades comunes para los TextField
    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={AddMovShowModal}
            onClose={() => setAddMovShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Movimiento</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{ display: "flex", flexDirection: "column" }}
                    dividers
                >
                    {/* ComboBox dinámico para seleccionar el ID de Almacén */}
                    <FormControl
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK)}
                    >
                        <InputLabel id="IdAlmacenOK-label">ID Almacén*</InputLabel>
                        <Select
                            id="IdAlmacenOK"
                            name="IdAlmacenOK"
                            value={formik.values.IdAlmacenOK}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            labelId="IdAlmacenOK-label"
                            disabled={!!mensajeExitoAlert}
                        >
                            {/* Mapea las opciones del ComboBox dinámicamente */}
                            {comboOptions.length > 0 ? (
                                comboOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option} {/* Texto visible de la opción */}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No hay opciones disponibles</MenuItem>
                            )}
                        </Select>

                        {/* Mensaje de error si el campo es inválido */}
                        {formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK && (
                            <Typography color="error" variant="caption">
                                {formik.errors.IdAlmacenOK}
                            </Typography>
                        )}
                    </FormControl>

                    {/* Otros campos de texto */}
                    <TextField
                        id="CantidadMovto"
                        label="Cantidad Mov.*"
                        value={formik.values.CantidadMovto}
                        {...commonTextFieldProps}
                        error={formik.touched.CantidadMovto && Boolean(formik.errors.CantidadMovto)}
                        helperText={formik.touched.CantidadMovto && formik.errors.CantidadMovto}
                    />
                    <TextField
                        id="CantidadAnt"
                        label="Cantidad Ant.*"
                        value={formik.values.CantidadAnt}
                        {...commonTextFieldProps}
                        error={formik.touched.CantidadAnt && Boolean(formik.errors.CantidadAnt)}
                        helperText={formik.touched.CantidadAnt && formik.errors.CantidadAnt}
                    />
                    <TextField
                        id="CantidadAct"
                        label="Cantidad Act.*"
                        value={formik.values.CantidadAct}
                        {...commonTextFieldProps}
                        error={formik.touched.CantidadAct && Boolean(formik.errors.CantidadAct)}
                        helperText={formik.touched.CantidadAct && formik.errors.CantidadAct}
                    />
                    <TextField
                        id="IdClaseMovtoOK"
                        label="Clase Movimiento*"
                        value={formik.values.IdClaseMovtoOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdClaseMovtoOK && Boolean(formik.errors.IdClaseMovtoOK)}
                        helperText={formik.touched.IdClaseMovtoOK && formik.errors.IdClaseMovtoOK}
                    />
                    <TextField
                        id="IdTipoMovtoOK"
                        label="Id Tipo Movimiento*"
                        value={formik.values.IdTipoMovtoOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoMovtoOK && Boolean(formik.errors.IdTipoMovtoOK)}
                        helperText={formik.touched.IdTipoMovtoOK && formik.errors.IdTipoMovtoOK}
                    />
                    <TextField
                        id="Referencia"
                        label="Referencia*"
                        value={formik.values.Referencia}
                        {...commonTextFieldProps}
                        error={formik.touched.Referencia && Boolean(formik.errors.Referencia)}
                        helperText={formik.touched.Referencia && formik.errors.Referencia}
                    />
                </DialogContent>
                <DialogActions>
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
                        onClick={() => setAddMovShowModal(false)}
                        variant="outlined"
                    >
                        Cerrar
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        loading={Loading}
                        onClick={() => console.log("Botón de Guardar presionado")} // Asegúrate de que esto se imprima
                    >
                        Guardar
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddMovModal;
