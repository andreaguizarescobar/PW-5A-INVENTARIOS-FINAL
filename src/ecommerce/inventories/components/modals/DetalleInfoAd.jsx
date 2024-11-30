import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { getAlmacen } from "../../../remote/get/getAlmacen";

const DetalleInfoAd = ({ DetallesInfoAdShowModal, setDetallesInfoAdShowModal, InfoAdSel }) => { 
    const [loading, setLoading] = useState(false);

    return(
        <Dialog 
            open={DetallesInfoAdShowModal}
            onClose={() => setDetallesInfoAdShowModal(false)}
            fullWidth
        >
            <DialogTitle>
                <Typography>
                    <strong>Detalles del Información Adicional</strong>
                </Typography>
            </DialogTitle>
            <DialogContent 
                sx={{ display: 'flex', flexDirection: 'column' }}
                dividers
            >
                <Typography variant="body1">
                    <strong>ID Etiqueta OK:</strong> {InfoAdSel.IdEtiquetaOK || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>ID Etiqueta:</strong> {InfoAdSel.IdEtiqueta || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Etiqueta:</strong> {InfoAdSel.Etiqueta || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Valor:</strong> {InfoAdSel.Valor || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>ID Tipo Sección:</strong> {InfoAdSel.IdTipoSeccionOK || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Secuencia:</strong> {InfoAdSel.Secuencia || "No disponible"}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{ display: 'flex', flexDirection: 'row' }}
            >
                <LoadingButton
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => setDetallesInfoAdShowModal(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DetalleInfoAd;
