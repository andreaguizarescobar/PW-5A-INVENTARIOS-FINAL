import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const DetallesEstatusFisicoModal = ({ open, onClose, details }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del Estatus Físico</DialogTitle>
      <DialogContent dividers>
        {details ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              <strong>ID Tipo Estatus:</strong> {details.IdTipoEstatusOK || "No definido"}
            </Typography>
            <Typography>
              <strong>Estatus Actual:</strong> {details.Actual || "No definido"}
            </Typography>
            <Typography>
              <strong>Observación:</strong> {details.Observacion || "Sin observaciones"}
            </Typography>
            {/* Aquí puedes agregar más datos si es necesario */}
          </Box>
        ) : (
          <Typography>Cargando detalles...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetallesEstatusFisicoModal;
