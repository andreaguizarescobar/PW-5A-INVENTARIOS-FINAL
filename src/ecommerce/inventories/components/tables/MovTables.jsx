import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog, darken, DialogActions, DialogContent, DialogTitle, Button, Typography, useTheme, Snackbar, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddMovModal from '../modals/AddMovModal';
import UpdateMovModal from '../modals/UpdateMovModal';
import { deleteMovto } from '../../../remote/del/deleteMov'
import { getAllInventories } from '../../../remote/GetAllInventories';
import WarningIcon from '@mui/icons-material/Warning'; // Ícono de advertencia

const MovColumns = [
    { accessorKey: "IdAlmacenOK", header: "ID OK", size: 30 },
    { accessorKey: "IdTipoMovtoOK", header: "IdTipoMovtoOK", size: 30 },
    { accessorKey: "IdClaseMovtoOK", header: "IdClaseMovtoOK", size: 150 },
    { accessorKey: "CantidadMovto", header: "Cantidad Movto Apartada", size: 50 },
    { accessorKey: "CantidadAnt", header: "Cantidad Ant", size: 30 },
    { accessorKey: "Referencia", header: "Referencia", size: 150 },
    { accessorKey: "_id", header: "ID Movimiento", size: 150 },
];

const MovTable = ({AlmacenSel}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [InventoriesData, setInventoriesData] = useState([]);
    const [AddMovShowModal, setAddMovShowModal] = useState(false);
    const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
    const [productSel, setProductSel] = useState(null);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);  // Nuevo estado para el modal de actualización
    const [selectedMovData, setSelectedMovData] = useState(null);  // Estado para los datos seleccionados del movimiento
    const theme = useTheme();

    async function fetchData() {
        try {
            const AllInventoriesData = await getAllInventories();
            const movimientos = (AllInventoriesData || []).flatMap((inventario) =>
                (inventario?.negocios || []).flatMap((negocio) =>
                    (negocio?.almacenes || []).flatMap((almacen) => almacen.IdAlmacenOK === AlmacenSel.IdAlmacenOK ?
                        (almacen?.movtos || []).map((movimiento) => ({
                            IdAlmacenOK: almacen.IdAlmacenOK || "Sin almacén",
                            IdTipoMovtoOK: movimiento.IdTipoMovtoOK || "Sin tipo",
                            IdClaseMovtoOK: movimiento.IdClaseMovtoOK || "Sin clase",
                            CantidadMovto: movimiento.CantidadMovto || 0,
                            CantidadAnt: movimiento.CantidadAnt || 0,
                            CantidadAct: movimiento.CantidadAct || 0,
                            Referencia: movimiento.Referencia || "Sin referencia",
                            _id: movimiento._id || "Sin ID",
                        })) : []
                    )
                )
            );
            setInventoriesData(movimientos);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = () => {
        setAddMovShowModal(true);
    };

    const handleCloseModal = () => {
        setAddMovShowModal(false);
    };

    const handleRowClick = (row) => {
        if (idSelectedRowProduct === row.id) {
            setIdSelectedRowProduct(null);
            setProductSel(null);
        } else {
            setProductSel(row.original);
            setIdSelectedRowProduct(row.id);
        }
    };

    const isRowSelected = idSelectedRowProduct !== null;

    // Función para abrir el modal de actualización
    const handleOpenUpdateModal = () => {
        if (productSel) {
            setSelectedMovData(productSel);  // Establecer los datos seleccionados del movimiento
            setOpenUpdateModal(true);
        }
    };

    // Función para cerrar el modal de actualización
    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false);
    };

    const handleDeleteClick = () => {
        setOpenDeleteConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const almacenId = productSel?.IdAlmacenOK;
            const movtoId = productSel?._id;
            console.log(`Eliminando el movimiento ${movtoId} en el almacén ${almacenId}`);
            const result = await deleteMovto(movtoId, almacenId);
            console.log("Resultado de eliminación:", result);
            setOpenDeleteConfirmation(false);
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error al eliminar el movimiento", error);
            setOpenDeleteConfirmation(false);
        }
    };

    const handleDeleteCancel = () => {
        setOpenDeleteConfirmation(false);
    };

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={MovColumns}
                    data={InventoriesData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => handleRowClick(row),
                        sx: {
                            cursor: loadingTable ? "not-allowed" : "pointer",
                            backgroundColor:
                                idSelectedRowProduct === row.id
                                    ? darken("#EFF999", 0.01)
                                    : "inherit",
                        },
                    })}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Stack direction="row" sx={{ m: 1 }}>
                            <Tooltip title="Agregar Movimiento">
                                <IconButton onClick={handleOpenModal}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                                <span>
                                    <IconButton onClick={handleOpenUpdateModal} disabled={!productSel}>
                                        <EditIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <span>
                                    <IconButton disabled={!isRowSelected} onClick={handleDeleteClick}>
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title="Detalles">
                                <IconButton onClick={() => getInventario(productSel?.IdAlmacenOK)}>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Recargar">
                                <IconButton onClick={fetchData}>
                                    <Autorenew />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )}
                />
            </Box>

            {/* Modal de Agregar Movimiento */}
            <Dialog open={AddMovShowModal} onClose={handleCloseModal}>
                <AddMovModal
                    AddMovShowModal={AddMovShowModal}
                    setAddMovShowModal={setAddMovShowModal}
                    onClose={handleCloseModal}
                />
            </Dialog>

            {/* Diálogo de confirmación de eliminación */}
            <Dialog
                open={openDeleteConfirmation}
                onClose={handleDeleteCancel}
                maxWidth="xs"
                sx={{
                    "& .MuiDialog-paper": {
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: theme.shadows[5],
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
            >
                <DialogTitle sx={{ color: "red", display: "flex", alignItems: "center", fontSize: "1.2rem" }}>
                    <WarningIcon sx={{ mr: 1, fontSize: "1.5rem", color: "red" }} />
                    <Typography variant="h6">Confirmar Eliminación</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        ¿Está seguro de que desea eliminar el movimiento del almacén{" "}
                        <strong>{productSel?.IdAlmacenOK}</strong>? Esta acción es irreversible.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Actualización */}
            <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
                <UpdateMovModal
                    open={openUpdateModal}
                    onClose={handleCloseUpdateModal}
                    movData={selectedMovData}
                />
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Movimiento eliminado con éxito.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MovTable;
