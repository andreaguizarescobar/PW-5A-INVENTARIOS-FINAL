import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { getNegocio } from "../../../remote/get/getNegocio";

const DetalleNegocio = ({ DetallesNegocioShowModal, setDetallesNegocioShowModal, NegocioSel }) => { 
    const [Loading, setLoading] = useState(false);
    const [NegociosData, setNegociosData] = useState([]);

    useEffect(() => { 
        if (NegocioSel) {
            fetchNegocios(); 
        }
    }, [NegocioSel]); 

    const fetchNegocios = async () => {
        try { 
            const data = await getNegocio(NegocioSel.IdNegocioOK); 
            setNegociosData(data);
        } catch (error) { 
            console.error("Error al obtener negocio:", error); 
        }
    };

    return(
        <Dialog 
            open={DetallesNegocioShowModal}
            onClose={() => setDetallesNegocioShowModal(false)}
            fullWidth
        >
            <DialogTitle>
                <Typography>
                    <strong>Detalles del Negocio</strong>
                </Typography>
            </DialogTitle>
            <DialogContent 
                sx={{ display: 'flex', flexDirection: 'column' }}
                dividers
            >
                <Typography variant="body1">
                    <strong>ID Negocio:</strong> {NegociosData.IdNegocioOK || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Nombre negocio/:</strong> {NegociosData.NombreNegocio || "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Control Serie:</strong> {NegociosData.ControlaSerie || "No disponible"}
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
                    onClick={() => setDetallesNegocioShowModal(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DetalleNegocio;
