import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Dialog,
  darken,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddEstatusVentaModal from "../modals/AddEstatusVentaModal";
import UpdateEstatusVentaModal from "../modals/UpdateEstatusVentaModal";
import DeleteEstatusVentaModal from "../modals/DeleteEstatusVentaModal";
import { getEstatusVenta } from "../../../remote/get/getEstatusVenta";
import { getAllInventories } from "../../../remote/getAllInventories";
import { deleteEstatusVenta } from "../../../remote/del/deleteEstatusVenta"; // Importa la función de eliminación

// Columnas para la tabla
const EstatusVentaColumns = [
  {
    accessorKey: "IdTipoEstatusOK",
    header: "ID Estatus",
    size: 30,
  },
  {
    accessorKey: "Actual",
    header: "Actual",
    size: 30,
    Cell: ({ cell }) => (cell.getValue() === "S" ? "Sí" : "No"), // Formateo de datos
  },
  {
    accessorKey: "Observacion",
    header: "Observación",
    size: 150,
  },
  {
    accessorKey: "detail_row.FechaReg",
    header: "Fecha Registro",
    size: 100,
  },
  {
    accessorKey: "detail_row.UsuarioReg",
    header: "Usuario Registro",
    size: 100,
  },
];

const EstatusVentaTable = ({SerieSel}) => {
  const [loadingTable, setLoadingTable] = useState(true); // Estado de carga
  const [estatusVentaData, setEstatusVentaData] = useState([]); // Datos para la tabla
  const [addStatusShowModal, setAddStatusShowModal] = useState(false); // Modal de agregar
  const [updateStatusShowModal, setUpdateStatusShowModal] = useState(false); // Modal de editar
  const [deleteStatusShowModal, setDeleteStatusShowModal] = useState(false); // Modal de eliminar
  const [selectedRowStatus, setSelectedRowStatus] = useState(null); // Fila seleccionada

  // Función para obtener datos
  const fetchData = async () => {
    setLoadingTable(true); // Activa el estado de carga
    try {
      const allStatusesData = await getAllInventories();
      const allStatus = allStatusesData.flatMap((instituto) =>
        instituto.negocios.flatMap((negocio) =>
          negocio.almacenes.flatMap((almacen) =>
            almacen.series.flatMap((serie) => serie.Serie === SerieSel.Serie ?
              serie.estatus_venta.map((estatus) => ({
                ...estatus,
                idSerie: serie.idSerie, // Agrega el ID de la serie
                idAlmacen: almacen.idAlmacen, // Agrega el ID del almacén
              })) : []
            )
          )
        )
      );
      setEstatusVentaData(allStatus);
    } catch (error) {
      console.error("Error al obtener los estatus de venta:", error);
    } finally {
      setLoadingTable(false); // Desactiva el estado de carga
    }
  };

  useEffect(() => {
    fetchData(); // Obtiene los datos al cargar el componente
  }, []);

  const handleEditClick = () => {
    setUpdateStatusShowModal(true); // Muestra el modal de editar
  };

  const handleSaveUpdate = (updatedStatus) => {
    setEstatusVentaData((prevData) =>
      prevData.map((item) =>
        item.IdTipoEstatusOK === updatedStatus.IdTipoEstatusOK
          ? updatedStatus
          : item
      )
    );
    setUpdateStatusShowModal(false); // Cierra el modal
  };

  const handleDeleteClick = () => {
    setDeleteStatusShowModal(true); // Abre el modal de confirmación de eliminación
  };

  const handleDelete = async (statusToDelete) => {
    const { idAlmacen, idSerie, IdTipoEstatusOK } = statusToDelete;

    try {
      // Llamada a la API para eliminar
      await deleteEstatusVenta(idAlmacen, idSerie, IdTipoEstatusOK);

      // Actualizar la tabla eliminando el estatus eliminado
      setEstatusVentaData((prevData) =>
        prevData.filter(
          (item) =>
            !(
              item.idAlmacen === idAlmacen &&
              item.idSerie === idSerie &&
              item.IdTipoEstatusOK === IdTipoEstatusOK
            )
        )
      );

      console.log("Estatus eliminado exitosamente.");
      setDeleteStatusShowModal(false); // Cierra el modal de eliminación
    } catch (error) {
      console.error("Error al eliminar el estatus:", error.message || error);
      alert("Hubo un error al eliminar el estatus. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Box>
      {/* Tabla principal */}
      <MaterialReactTable
        columns={EstatusVentaColumns}
        data={estatusVentaData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSelectedRowStatus(row.original); // Almacena la fila seleccionada
          },
          sx: {
            cursor: loadingTable ? "not-allowed" : "pointer",
            backgroundColor:
              selectedRowStatus?.IdTipoEstatusOK ===
              row.original.IdTipoEstatusOK
                ? darken("#EFF999", 0.01)
                : "inherit", // Destaca la fila seleccionada
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={1} sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton onClick={() => setAddStatusShowModal(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton
                disabled={!selectedRowStatus} // Desactiva si no hay fila seleccionada
                onClick={handleEditClick}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                disabled={!selectedRowStatus} // Desactiva si no hay fila seleccionada
                onClick={handleDeleteClick} // Abre el modal de confirmación
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detalles">
              <IconButton
                disabled={!selectedRowStatus} // Desactiva si no hay fila seleccionada
                onClick={() =>
                  selectedRowStatus &&
                  getEstatusVenta(selectedRowStatus.IdTipoEstatusOK)
                }
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recargar">
              <IconButton onClick={fetchData}>
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />

      {/* Modal para agregar estatus */}
      <Dialog open={addStatusShowModal} onClose={() => setAddStatusShowModal(false)}>
        <AddEstatusVentaModal
          show={addStatusShowModal}
          onClose={() => setAddStatusShowModal(false)}
          onSave={(newStatus) => {
            setEstatusVentaData((prevData) => [...prevData, newStatus]); // Agrega el nuevo estatus a la tabla
            setAddStatusShowModal(false);
          }}
        />
      </Dialog>

      {/* Modal para editar estatus */}
      <Dialog open={updateStatusShowModal} onClose={() => setUpdateStatusShowModal(false)}>
        <UpdateEstatusVentaModal
          show={updateStatusShowModal}
          onClose={() => setUpdateStatusShowModal(false)}
          onSave={handleSaveUpdate}
          initialData={selectedRowStatus}
        />
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <DeleteEstatusVentaModal
        show={deleteStatusShowModal}
        onClose={() => setDeleteStatusShowModal(false)}
        onDelete={handleDelete}
        selectedRowStatus={selectedRowStatus}
      />
    </Box>
  );
};

export default EstatusVentaTable;