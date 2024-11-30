import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateInstitutoModal from '../modals/UpdateInstitutoModal'; 
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddAlmacenModal from '../modals/AddAlmacenModal';
import { deleteAlmacen } from '../../../remote/del/deleteAlmacen';
import UpdateAlmacenModal from '../modals/UpdateAlmacenModal';
import { getNegocio } from '../../../remote/get/getNegocio';
import DetallesAlmacenModal from '../modals/DetalleAlmacen';

const InventoriesColumns = [

    {
      //Clave del dato
      accessorKey: "IdAlmacenOK",
      header: "ID OK",
      size: 30, //small column
    },
    {
      accessorKey: "IdNegocioOK",
      header: "Negocio",
      size: 150, //small column
    },
    {
      accessorKey: "Principal",
      header: "Principal",
      size: 30, //small column
    },
    {
      accessorKey: "CantidadActual",
      header: "Cantidad Actual",
      size: 30, //small column
    },
    {
      accessorKey: "CantidadDisponible",
      header: "Cantidad Disponible",
      size: 150, //small column
    },
    {
      accessorKey: "CantidadApartada",
      header: "Cantidad Apartada",
      size: 50, //small column
    },
    {
      accessorKey: "CantidadTransito",
      header: "Cantidad Transito",
      size: 30, //small column
    },
    {
      accessorKey: "StockMaximo",
      header: "Stock Maximo",
      size: 150, //small column
    },
    {
      accessorKey: "StockMinimo",
      header: "Stock Minimo",
      size: 30, //small column
    },
  ];
 
  const InventoriesTable = ({NegocioSel, AlmSelect}) => {
  //Inicializar useState
    const [loadingTable, setLoadingTable] = useState(true);
  //Almacena los datos del almacén
    const [InventoriesData, setInventoriesData] = useState([]);
  //Visibilidad de modales
    const [AddInventoryShowModal, setAddInventoryShowModal] = useState(false);
    const [UpdateInventoryShowModal, setUpdateInventoryShowModal] = useState(false);
    const [DetallesAlmacenShowModal, setDetallesAlmacenShowModal] = useState(false);
  //Fila seleccionada
    const [idSelectedRowAlmacen, setIdSelectedRowAlmacen] = useState(null);
    const [AlmacenSel, setAlmacenSel] = useState(null);

  //Obtener los datos del almacén seleccionado
    async function fetchData() {
      try { 
      //Datos del negocio seleccionado
        const negocio = await getNegocio(NegocioSel.IdNegocioOK);
        const InventoriesData = negocio.almacenes.map(almacen => ({IdNegocioOK: negocio.IdNegocioOK, ...almacen }) );  
        setInventoriesData(InventoriesData);  //Actualiza con los almacenes obtenidos
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener Almacen:", error);
      }
    }
    //Carga datos iniciales
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async () => {
      const res = await swal({ title: "¿Estás seguro?", 
        text: `El Almacen con el ID ${AlmacenSel.IdAlmacenOK} será eliminado, ¿Desea continuar?`, 
        icon: "warning", 
        buttons: true, 
        dangerMode: true, });
      if (res) {
        try {
          await deleteAlmacen(AlmacenSel.IdAlmacenOK);
          setAlmacenSel(null);
          fetchData();
          swal("Listo","Se eliminó el Almacen","success");
        } catch (e) {
          swal("Error","No se pudo eliminar el Almacen","error");
        }
      }
    };

    //Renderizar tabla
    return (
        <Box>
          <Box>
            <MaterialReactTable
             columns={InventoriesColumns}
             data={InventoriesData}
              state={{isLoading: loadingTable}}
             initialState={{ density: "compact", showGlobalFilter: true }}
             muiTableBodyRowProps={({ row }) => ({
              //CLIC EN UN ROW
              onClick: (event) => {
                console.log("ROW", row.original, "ID", row.id);
                AlmSelect(row.original);
                setAlmacenSel(row.original);
                setIdSelectedRowAlmacen(row.id);
              },
              sx: {
                //FIC: si esta cargando no debes dar click aun
                cursor: loadingTable ? "not-allowed" : "pointer", 
                backgroundColor:
                  idSelectedRowAlmacen === row.id
                    ? darken("#EFF999", 0.01)
                    : "inherit",
              },
            })}
             renderTopToolbarCustomActions={({ table }) => (
              <>
                {/* ------- BARRA DE ACCIONES ------ */}
                <Stack direction="row" sx={{ m: 1 }}>
                  <Box>
                    <Tooltip title="Agregar">
                        <IconButton 
                            onClick={() => setAddInventoryShowModal(true)}>
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => setUpdateInventoryShowModal(true)} disabled={!AlmacenSel}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton onClick={handleDelete} disabled={!AlmacenSel}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detalles ">
                      <IconButton onClick={() => setDetallesAlmacenShowModal(true)}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Recargar">
                      <IconButton onClick={fetchData}>
                        <Autorenew />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
                {/* ------- BARRA DE ACCIONES FIN ------ */}
              </>
            )}
            />
          </Box>
          <Dialog open={AddInventoryShowModal}>
            <AddAlmacenModal
              AddInventoryShowModal={AddInventoryShowModal}
              setAddInventoryShowModal={setAddInventoryShowModal}
              onClose={() => setAddInventoryShowModal(false)}
              NegocioSel={NegocioSel}
            />
          </Dialog>
          <Dialog open={UpdateInventoryShowModal}>
                <UpdateAlmacenModal
                UpdateInventoryShowModal={UpdateInventoryShowModal}
                setUpdateInventoryShowModal={setUpdateInventoryShowModal}
                onClose={() => setUpdateInventoryShowModal(false)}
                AlmacenSel={AlmacenSel}
                />
            </Dialog>
            <Dialog open={DetallesAlmacenShowModal}>
            <DetallesAlmacenModal
              DetallesAlmacenShowModal={DetallesAlmacenShowModal}
              setDetallesAlmacenShowModal={setDetallesAlmacenShowModal}
              onClose={() => setDetallesAlmacenShowModal(false)}
              AlmacenSel={AlmacenSel}
            />
          </Dialog>
        </Box>
      );
  };

  export default InventoriesTable;