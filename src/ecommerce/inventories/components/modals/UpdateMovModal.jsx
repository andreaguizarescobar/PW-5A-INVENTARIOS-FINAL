import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress } from '@mui/material';
import { updateMovto } from '../../../remote/put/putMov'; // Asegúrate de importar la función correctamente
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdateMovModal = ({ open, onClose, movData, almacenId }) => {
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [error, setError] = useState('');

    useEffect(() => {
        if (movData) {
            formik.setValues(movData); // Actualizar datos del formulario al abrir el modal
        }
    }, [movData]);

    const validationSchema = Yup.object({
        CantidadMovto: Yup.number()
            .required('La cantidad de movimiento es obligatoria')
            .min(0, 'La cantidad debe ser mayor o igual a 0').integer("No se permiten decimales"),
        CantidadAnt: Yup.number()
            .required('La cantidad anterior es obligatoria')
            .min(0, 'La cantidad debe ser mayor o igual a 0').integer("No se permiten decimales"),
        CantidadAct: Yup.number()
            .required('La cantidad actual es obligatoria')
            .min(0, 'La cantidad debe ser mayor o igual a 0').integer("No se permiten decimales"),
        IdClaseMovtoOK: Yup.string()
            .required('El ID de clase de movimiento es obligatorio')
            .max(50, 'El ID no puede exceder los 50 caracteres'),
        IdTipoMovtoOK: Yup.string()
            .required('El ID de tipo de movimiento es obligatorio')
            .max(50, 'El ID no puede exceder los 50 caracteres'),
        Referencia: Yup.string()
            .required('La referencia es obligatoria')
            .max(100, 'La referencia no puede exceder los 100 caracteres'),
    });

    const formik = useFormik({
        initialValues: {
            IdAlmacenOK: movData?.IdAlmacenOK || '',
            CantidadMovto: movData?.CantidadMovto || '',
            CantidadAnt: movData?.CantidadAnt || '',
            CantidadAct: movData?.CantidadAct || '',
            IdClaseMovtoOK: movData?.IdClaseMovtoOK || '',
            IdTipoMovtoOK: movData?.IdTipoMovtoOK || '',
            Referencia: movData?.Referencia || '',
            _id: movData?._id || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Formulario enviado con valores:", values);
            setLoading(true); // Activa el estado de carga
            try {
                console.log("Datos extraídos del modal:", values); // Muestra los datos en la consola
                await updateMovto(values._id, formik.values.IdAlmacenOK, values);
                console.log("Respuesta de la API:", updateMovto);
                console.log("Se actualizó el movimiento correctamente.");
                onClose();
            } catch (error) {
                console.error("Error al procesar los datos:", error); // Captura cualquier error inesperado
                setMensajeErrorAlert("Error al enviar los datos.");
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Actualizar Movimiento</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        label="ID Almacén"
                        value={formik.values.IdAlmacenOK}
                        disabled
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cantidad Movto"
                        name="CantidadMovto"
                        value={formik.values.CantidadMovto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.CantidadMovto && Boolean(formik.errors.CantidadMovto)}
                        helperText={formik.touched.CantidadMovto && formik.errors.CantidadMovto}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cantidad Anterior"
                        name="CantidadAnt"
                        value={formik.values.CantidadAnt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.CantidadAnt && Boolean(formik.errors.CantidadAnt)}
                        helperText={formik.touched.CantidadAnt && formik.errors.CantidadAnt}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cantidad Actual"
                        name="CantidadAct"
                        value={formik.values.CantidadAct}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.CantidadAct && Boolean(formik.errors.CantidadAct)}
                        helperText={formik.touched.CantidadAct && formik.errors.CantidadAct}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Id Clase Movimiento"
                        name="IdClaseMovtoOK"
                        value={formik.values.IdClaseMovtoOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.IdClaseMovtoOK && Boolean(formik.errors.IdClaseMovtoOK)}
                        helperText={formik.touched.IdClaseMovtoOK && formik.errors.IdClaseMovtoOK}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Id Tipo Movimiento"
                        name="IdTipoMovtoOK"
                        value={formik.values.IdTipoMovtoOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.IdTipoMovtoOK && Boolean(formik.errors.IdTipoMovtoOK)}
                        helperText={formik.touched.IdTipoMovtoOK && formik.errors.IdTipoMovtoOK}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Referencia"
                        name="Referencia"
                        value={formik.values.Referencia}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Referencia && Boolean(formik.errors.Referencia)}
                        helperText={formik.touched.Referencia && formik.errors.Referencia}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="ID Movimiento"
                        value={formik.values._id}
                        disabled
                        fullWidth
                        margin="normal"
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained" 
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Actualizar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateMovModal;
