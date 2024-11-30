import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { getAlmacen } from "../../../remote/get/getAlmacen";

const DetalleAlmacen = ({ DetallesAlmacenShowModal, setDetallesAlmacenShowModal, AlmacenSel }) => { 
    const [loading, setLoading] = useState(false);
    const [InventoriesData, setInventoriesData] = useState({});

    useEffect(() => { 
        if (AlmacenSel) {
            fetchAlmacen(); 
        }
    }, [AlmacenSel]); 

    const fetchAlmacen = async () => {
        setLoading(true); // Inicia el estado de carga

        try { 
            const data = await getAlmacen(AlmacenSel.IdAlmacenOK); 
            setInventoriesData(data);
            console.log(InventoriesData);
        } catch (error) { 
            console.error("Error al obtener almacen:", error); 
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    return(
        <Dialog 
            open={DetallesAlmacenShowModal}
            onClose={() => setDetallesAlmacenShowModal(false)}
            fullWidth
        >
            <DialogTitle>
                <Typography>
                    <strong>Detalles del Almacen</strong>
                </Typography>
            </DialogTitle>
            <DialogContent 
                sx={{ display: 'flex', flexDirection: 'column' }}
                dividers
            >
                <Typography variant="body1">
                    <strong>ID Almacen:</strong> {AlmacenSel.IdAlmacenOK || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Principal:</strong> {InventoriesData.Principal || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Cantidad Actual:</strong> {InventoriesData.CantidadActual || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Cantidad disponible:</strong> {InventoriesData.CantidadDisponible || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Cantidad Apartada:</strong> {InventoriesData.CantidadApartada || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Cantidad en Transito:</strong> {InventoriesData.CantidadTransito || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Stock Máximo:</strong> {InventoriesData.StockMaximo || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Stock Mínimo:</strong> {InventoriesData.StockMinimo || "No disponible"}
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
                    onClick={() => setDetallesAlmacenShowModal(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DetalleAlmacen;
