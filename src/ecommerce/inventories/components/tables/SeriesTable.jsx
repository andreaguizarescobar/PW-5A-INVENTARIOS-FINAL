import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import AddSeriesModal from '../modals/AddSeriesModal';
import { getAllInventories } from '../../../remote/GetAllInventories';
import { deleteSerie } from '../../../remote/del/deleteSerie';
import { SeriesValues } from "../../helpers/SeriesValues";
import UpdateSeriesModal from '../modals/UpdateSeriesModal';
import swal from 'sweetalert';
const SeriesColumns = [
  {
    accessorKey: "Id_almacen",
    header: "Id_almacen",
    size: 30,
  },
  {
    accessorKey: "Serie",
    header: "Serie",
    size: 30,
  },
  {
    accessorKey: "Placa",
    header: "Placa",
    size: 150,
  },
  {
    accessorKey: "Observacion",
    header: "Observación",
    size: 30,
  },
  
];

  const SeriesTable = ({AlmacenSel, SerieSelect}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [SeriesData, setSeriesData] = useState([]);
    const [AddSeriesShowModal, setAddSeriesShowModal] = useState(false);
    const [UpdateSeriesShowModal, setUpdateSeriesShowModal] = useState(false);
    const [idSelectedRowSerie, setIdSelectedRowSerie] = useState(null);
    const [SeriesSel, setSeriesSel] = useState(null);
    async function fetchData() {
      try {     
      let inventories;
      inventories = await getAllInventories();
      console.log(inventories)
     
      const SeriesData = (inventories || []).flatMap((inventario) =>
        (inventario?.negocios || []).flatMap((negocio) =>
          (negocio?.almacenes || []).flatMap((almacen) => almacen.IdAlmacenOK === AlmacenSel.IdAlmacenOK ?
            (almacen?.series || []).map((serie) => ({
              Id_almacen: almacen.IdAlmacenOK || null, 
              Serie: serie.Serie || null,              
              Placa: serie.Placa || null,              
              Observacion: serie.Observacion || null,  
            })) : []
          )
        )
      );
        setSeriesData(SeriesData);
        console.log(SeriesData)
      } catch (error) {
        console.error("Error al obtener las series:", error);
      } finally {
        setLoadingTable(false);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (values) => {
      const res = await swal({ title: "¿Estás seguro?", 
        text: `La serie con el ID ${SeriesSel.Id_almacen},' Serie: '${SeriesSel.Serie} será eliminado, ¿Desea continuar?`, 
        icon: "warning", 
        buttons: true, 
        dangerMode: true, });
      if (res) {
        try {
          await deleteSerie(SeriesSel.Id_almacen, SeriesSel.Serie);
          setSeriesSel(null);
          fetchData();
          swal("Listo","Se eliminó la serie","success");
        } catch (e) {
          swal("No se pudo eliminar la serie","error");
        }
      }
    };
    
    return (
     
        <Box>
           <Box>
            <MaterialReactTable
             columns={SeriesColumns}
             data={SeriesData}
              state={{isLoading: loadingTable}}
             initialState={{ density: "compact", showGlobalFilter: true }}
             muiTableBodyRowProps={({ row }) => ({
              //CLIC EN UN ROW
              onClick: (event) => {
                console.log("ROW", row.original, "ID", row.id);
                SerieSelect(row.original);
                setSeriesSel(row.original);
                setIdSelectedRowSerie(row.id);
              },
              sx: {
                //FIC: si esta cargando no debes dar click aun
                cursor: loadingTable ? "not-allowed" : "pointer", 
                backgroundColor:
                  idSelectedRowSerie === row.id
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
                            onClick={() => setAddSeriesShowModal(true)}>
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
          
                    <IconButton onClick={() => setUpdateSeriesShowModal(true)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detalles ">
                      <IconButton>
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
          <Dialog open={AddSeriesShowModal}>
            <AddSeriesModal
              AddSeriesShowModal={AddSeriesShowModal}
              setAddSeriesShowModal={setAddSeriesShowModal}
              onClose={() => setAddSeriesShowModal(false)}
            />
            </Dialog>
          <Dialog open={UpdateSeriesShowModal}>
            <UpdateSeriesModal
              UpdateSeriesShowModal={UpdateSeriesShowModal}
              setUpdateSeriesShowModal={setUpdateSeriesShowModal}
              onClose={() => setUpdateSeriesShowModal(false)}
              selectedSeries={SeriesSel}
            />
          </Dialog>
        </Box>
      );
  };
   

  export default SeriesTable;