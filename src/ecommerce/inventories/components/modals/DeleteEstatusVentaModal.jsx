import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Box,
  Alert,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { deleteEstatusVenta } from "../../../remote/del/deleteEstatusVenta";

const DeleteEstatusVentaModal = ({ show, onClose, onDelete, selectedRowStatus }) => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  const formik = useFormik({
    initialValues: {
      idAlmacen: selectedRowStatus?.idAlmacen || "", // ID Almacén
      idSerie: selectedRowStatus?.idSerie || "",     // ID Serie
      IdTipoEstatusOK: selectedRowStatus?.IdTipoEstatusOK || "", // ID Estatus
    },
    validationSchema: Yup.object({
      idAlmacen: Yup.string().required("El ID del Almacén es requerido."),
      idSerie: Yup.string().required("El ID de la Serie es requerido."),
      IdTipoEstatusOK: Yup.string().required("El ID del Estatus es requerido."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Llamamos a la función que elimina el estatus
        await deleteEstatusVenta(values.idAlmacen, values.idSerie, values.IdTipoEstatusOK);
        setAlertMessage({ type: "success", message: "Estatus eliminado exitosamente." });
        onDelete(values);  // Actualizamos la vista principal
      } catch (error) {
        setAlertMessage({ type: "error", message: "Hubo un error al eliminar el estatus. Por favor, inténtalo de nuevo." });
      } finally {
        setLoading(false);
        onClose(); // Cerramos el modal después de la eliminación
      }
    },
  });

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">Confirmar Eliminación</Typography>
      </DialogTitle>
      <DialogContent>
        {/* Mostrar mensaje de alerta si existe */}
        {alertMessage.message && (
          <Alert severity={alertMessage.type} sx={{ mb: 2 }}>
            {alertMessage.message}
          </Alert>
        )}
        <Typography>
          ¿Estás seguro de que deseas eliminar el estatus con ID: {formik.values.IdTipoEstatusOK}?
        </Typography>

        {/* Mostrar los detalles del estatus que se eliminará */}
        <TextField
          label="ID Almacén"
          value={formik.values.idAlmacen}
          onChange={formik.handleChange}
          name="idAlmacen"
          fullWidth
          margin="normal"
          
        />
        <TextField
          label="ID Serie"
          value={formik.values.idSerie}
          onChange={formik.handleChange}
          name="idSerie"
          fullWidth
          margin="normal"
          
        />
        <TextField
          label="ID Estatus"
          value={formik.values.IdTipoEstatusOK}
          onChange={formik.handleChange}
          name="IdTipoEstatusOK"
          fullWidth
          margin="normal"
          
        />
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 1, position: "relative" }}>
          {/* Botón para cancelar la eliminación */}
          <LoadingButton
            onClick={onClose}
            color="secondary"
            startIcon={<CloseIcon />}
            variant="contained"
            disabled={loading}
          >
            Cancelar
          </LoadingButton>
        </Box>
        <Box sx={{ m: 1, position: "relative" }}>
          {/* Botón para confirmar la eliminación */}
          <LoadingButton
            onClick={formik.handleSubmit}
            color="error"
            startIcon={<DeleteIcon />}
            variant="contained"
            loading={loading}
            disabled={loading}
          >
            Eliminar
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEstatusVentaModal;
