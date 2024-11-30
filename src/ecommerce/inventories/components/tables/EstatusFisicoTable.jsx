import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Dialog,
  darken,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import AddEstatusFisicoModal from "../modals/AddEstatusFisicoModal";
import { getAllInventories } from "../../../remote/getAllInventories";
import { deleteEstatusFisico } from "../../../remote/del/deleteEstatusFisico";
import EditEstatusFisicoModal from "../modals/EditEstatusFisicoModal";
import DetallesEstatusFisicoModal from "../modals/DetallesEstatusFisicoModal";

// Definición de las columnas de la tabla
const EstatusFisicoColumns = [
  { accessorKey: "IdTipoEstatusOK", header: "ID Tipo Estatus", size: 20 },
  { accessorKey: "Actual", header: "Estatus Actual", size: 20 },
  { accessorKey: "Observacion", header: "Observación", size: 30 },
  { accessorKey: "idAlmacen", header: "ID Almacén", size: 20 }, // Oculta por defecto
  { accessorKey: "idSerie", header: "ID Serie", size: 20 },
];

const EstatusFisicoTable = ({SerieSel}) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [estatusData, setEstatusData] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [estatusFisicoDetails, setEstatusFisicoDetails] = useState(null);

  // Función para obtener datos de la API
  async function fetchData() {
    try {
      const allData = await getAllInventories();

      // Transformamos los datos de la API
      const transformedData = allData.flatMap((inventario) =>
        inventario.negocios.flatMap((negocio) =>
          negocio.almacenes.flatMap((almacen) =>
            almacen.series.flatMap((serie) => serie.Serie === SerieSel.Serie ?
              serie.estatus_fisico.map((estatus) => ({
                IdTipoEstatusOK: estatus?.IdTipoEstatusOK || "No definido",
                Actual: estatus?.Actual || "Sin estado",
                Observacion: estatus?.Observacion,
                idAlmacen: almacen?.IdAlmacenOK,  // Aseguramos que sea IdAlmacenOK (según tu modelo)
                idSerie: serie?.Serie,  // Aseguramos que sea Serie (según tu modelo)
              })) : []
            )
          )
        )
      );

      setEstatusData(transformedData);
      setLoadingTable(false);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Manejar la eliminación
  const handleDelete = async () => {
    if (!selectedRowData) {
      swal("Error", "No se ha seleccionado una fila", "error");
      return;
    }

    const { idAlmacen, idSerie, IdTipoEstatusOK } = selectedRowData;

    const confirmDelete = await swal({
      title: "¿Estás seguro?",
      text: `Se eliminará el estatus físico con ID ${IdTipoEstatusOK}. ¿Deseas continuar?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        await deleteEstatusFisico(idAlmacen, idSerie, IdTipoEstatusOK);
        setSelectedRowData(null);
        fetchData(); // Refrescar la tabla después de borrar
        swal("Éxito", "Estatus físico eliminado correctamente", "success");
      } catch (error) {
        swal("Error", "No se pudo eliminar el estatus físico", "error");
      }
    }
  };

  // Función para manejar el clic en el botón de editar
  const handleEdit = () => {
    if (!selectedRowData) {
      swal("Error", "No se ha seleccionado una fila", "error");
      return;
    }

    // Aquí se abre el modal de edición y se pasan los datos
    setEditModalOpen(true);
  };

  // Función para manejar el clic en el botón de detalles
  const handleViewDetails = async () => {
    if (!selectedRowData) return; // Verifica si hay una fila seleccionada
    try {
      const details = await getEstatusFisicoDetails(
        selectedRowData.IdTipoEstatusOK
      );
      setEstatusFisicoDetails(details); // Guarda los detalles obtenidos
      setDetailsModalOpen(true); // Abre el modal de detalles
    } catch (error) {
      swal("Error", "No se pudieron obtener los detalles", "error");
    }
  };

  return (
    <Box>
      <MaterialReactTable
        columns={EstatusFisicoColumns}
        data={estatusData}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRowData(row.original), // `row.original` incluye todos los datos transformados, incluso `idAlmacen` e `idSerie`
          sx: {
            cursor: loadingTable ? "not-allowed" : "pointer",
            backgroundColor:
              selectedRowData?.IdTipoEstatusOK === row.original.IdTipoEstatusOK
                ? darken("#EFF999", 0.01)
                : "inherit",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton onClick={() => setAddModalOpen(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton
                onClick={handleEdit}
                disabled={!selectedRowData} // Solo habilitar si hay fila seleccionada
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={handleDelete}
                disabled={!selectedRowData}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detalles">
              <IconButton
                onClick={handleViewDetails} 
                disabled={!selectedRowData}>
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

      {/* Modal para agregar Estatus Físico */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <AddEstatusFisicoModal
          AddEstatusFisicoShowModal={addModalOpen}
          setAddEstatusFisicoShowModal={setAddModalOpen}
        />
      </Dialog>

      {/* Modal para editar Estatus Físico */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <EditEstatusFisicoModal
          selectedData={selectedRowData}  // Pasa los datos seleccionados
          EditEstatusFisicoShowModal={editModalOpen}
          setEditEstatusFisicoShowModal={setEditModalOpen}
          onSuccess={fetchData} // Refresca los datos después de editar
        />
      </Dialog>

      {/* Modal para mostrar los detalles */}
      <Dialog open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)}>
        <DetallesEstatusFisicoModal
          details={estatusFisicoDetails}
          closeModal={() => setDetailsModalOpen(false)}
        />
      </Dialog>
    </Box>
  );
};

export default EstatusFisicoTable;
