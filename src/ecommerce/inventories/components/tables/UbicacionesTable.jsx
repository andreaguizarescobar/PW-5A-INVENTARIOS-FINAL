import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddUbicacionesModal from '../modals/AddUbicacionesModal';
import { getAllInventories } from '../../../remote/GetAllInventories';

const UbicacionesColumns = [
    {
        accessorKey: "IdAlmacenOK",
        header: "ID OK",
        size: 30, //small column
    },
    {
        accessorKey: "Ubicacion",
        header: "Ubicación",
        size: 150, //small column
    },
    {
        accessorKey: "Actual",
        header: "Actual",
        size: 30, //small column
    },
    
];
    // Table - FrontEnd.
    const UbicacionesTable = () => {
        const [loadingTable, setLoadingTable] = useState(true);
        const [UbicacionData, setUbicacionData] = useState([]);
        const [AddUbicacionShowModal, setAddUbicacionShowModal] = useState(false);
        const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
        const [productSel, setProductSel] = useState(null);
        async function fetchData() {
          try { 
            const AllUbicacionesData = await getAllInventories();
            const UbicacionData = AllUbicacionesData.flatMap(inventario => inventario.negocios.flatMap(negocio => negocio.almacenes.flatMap(almacenes => almacenes.series.flatMap( series => series.ubicaciones))));
            //const productos = await getProducts();
            setUbicacionData(UbicacionData);   
            setLoadingTable(false);
          } catch (error) {
            console.error("Error al obtener productos:", error);
          }
        }
        useEffect(() => {
          fetchData();
        }, []);
        return (
            <Box>
              <Box>
                <MaterialReactTable
                 columns={UbicacionesColumns}
                 data={UbicacionData}
                  state={{isLoading: loadingTable}}
                 initialState={{ density: "compact", showGlobalFilter: true }}
                 muiTableBodyRowProps={({ row }) => ({
                  //CLIC EN UN ROW
                  onClick: (event) => {
                    console.log("ROW", row.original, "ID", row.id);
                    setProductSel(row.original);
                    setIdSelectedRowProduct(row.id);
                  },
                  sx: {
                    //Si esta cargando no debes dar click aun
                    cursor: loadingTable ? "not-allowed" : "pointer", 
                    backgroundColor:
                      idSelectedRowProduct === row.id
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
                                onClick={() => setAddUbicacionShowModal(true)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton>
                            <DeleteIcon />
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
              <Dialog open={AddUbicacionShowModal}>
                <AddUbicacionesModal
                  AddUbicacionShowModal={AddUbicacionShowModal}
                  setAddUbicacionShowModal={setAddUbicacionShowModal}
                  onClose={() => setAddUbicacionShowModal(false)}
                />
              </Dialog>
            </Box>
          );
      };
    
      export default UbicacionesTable;