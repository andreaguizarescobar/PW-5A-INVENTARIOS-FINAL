import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { getInstituto } from "../../../remote/get/getInstituto";

const DetallesInstitutoModal = ({ DetallesInstitutoShowModal, setDetallesInstitutoShowModal, InstitutoSel }) => { 
    const [Loading, setLoading] = useState(false);
    const [InstitutesData, setInstitutesData] = useState({});

    useEffect(() => { 
        if (InstitutoSel) {
            fetchInstitutes(); 
        }
    }, [InstitutoSel]); 

    const fetchInstitutes = async () => {
        try { 
            const data = await getInstituto(InstitutoSel.IdInstitutoOK); 
            setInstitutesData(data);
        } catch (error) { 
            console.error("Error al obtener institutos:", error); 
        }
    };

    return(
        <Dialog 
            open={DetallesInstitutoShowModal}
            onClose={() => setDetallesInstitutoShowModal(false)}
            fullWidth
        >
            <DialogTitle>
                <Typography>
                    <strong>Detalles del Instituto</strong>
                </Typography>
            </DialogTitle>
            <DialogContent 
                sx={{ display: 'flex', flexDirection: 'column' }}
                dividers
            >
                <Typography variant="body1">
                    <strong>ID Instituto:</strong> {InstitutesData.IdInstitutoOK || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Nombre Instituto:</strong> {InstitutesData.NombreInstituto || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>ID Producto/Servicio:</strong> {InstitutesData.IdProdServOK || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>ID Presentación:</strong> {InstitutesData.IdPresentaOK || "No disponible"}
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
                    onClick={() => setDetallesInstitutoShowModal(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DetallesInstitutoModal;
