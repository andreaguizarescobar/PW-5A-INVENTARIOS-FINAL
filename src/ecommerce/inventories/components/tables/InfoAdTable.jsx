import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddInfoAdModal from '../modals/AddInfoAdModal';
import { getAllInventories } from '../../../remote/GetAllInventories';
import { deleteInfoAd } from '../../../remote/del/deleteInfoAd';
import UpdateInfoAd from '../modals/UpdateInfoAd';
import swal from 'sweetalert';
import { getAlmacen } from '../../../remote/get/getAlmacen';
import DetallesInfoAdModal from '../modals/DetalleInfoAd';

const InfoAdColumns = [
  {
    accessorKey: "IdAlmacenOK",
    header: "ID Almacen",
    size: 30, //small column
  },

  {
    accessorKey: "IdEtiquetaOK",
    header: "ID Etiqueta OK",
    size: 50, // small column
  },
  {
    accessorKey: "IdEtiqueta",
    header: "IdEtiqueta",
    size: 50, // small column
  },
  {
    accessorKey: "Etiqueta",
    header: "Etiqueta",
    size: 150, // medium column
  },
  {
    accessorKey: "Valor",
    header: "Valor",
    size: 150, // medium column
  },
  {
    accessorKey: "IdTipoSeccionOK",
    header: "ID Tipo Sección OK",
    size: 50, // small column
  },
  {
    accessorKey: "Secuencia",
    header: "Secuencia",
    size: 30, // small column
  },
];
 
const InfoAdTable = ({AlmacenSel}) => {
 const [loadingTable, setLoadingTable] = useState(true);
 const [infoAdData, setInfoAdData] = useState([]);
 const [AddInfoAdShowModal, setAddInfoAdShowModal] = useState(false);
 const [selectedRowId, setSelectedRowId] = useState(null);
 const [UpdateInfoAdShowModal, setUpdateInfoAdShowModal] = useState(false);
 const [DetallesInfoAdShowModal, setDetallesInfoAdShowModal] = useState(false);
 const [InfoAdSel, setInfoAdSel] = useState(null);

  async function fetchData() {
    try {
      const almacen = await getAlmacen(AlmacenSel.IdAlmacenOK);
      const InfoAdData = almacen.info_ad.map (info_ad => ({ IdAlmacenOK: almacen.IdAlmacenOK, ...info_ad }) );
      setInfoAdData(InfoAdData);
      setLoadingTable(false);
    } catch (error) {
      console.error("Error al obtener información adicional:", error);
    }
  } 

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const res = await swal({ title: "¿Estás seguro?", 
      text: `La información adicional con la etiqueta ${InfoAdSel.IdEtiquetaOK} será eliminado, ¿Desea continuar?`, 
      icon: "warning", 
      buttons: true, 
      dangerMode: true, });
    if (res) {
      try {
        await deleteInfoAd(AlmacenSel.IdAlmacenOK, selectedRowId);
        setInfoAdSel(null);
        fetchData();
        swal("Listo","Se eliminó la información","success");
      } catch (e) {
        swal("No se pudo eliminar la información","error");
      }
    }
  };

  return (
      <Box>
        <Box>
          <MaterialReactTable
            columns={InfoAdColumns}
            data={infoAdData}
            state={{ isLoading: loadingTable }}
            initialState={{ density: "compact", showGlobalFilter: true }}
            muiTableBodyRowProps={({ row }) => ({
              onClick: (event) => {
                console.log("ROW", row.original, "ID", row.id);
                setInfoAdSel(row.original);
                setSelectedRowId(row.id);
              },
              sx: {
                cursor: loadingTable ? "not-allowed" : "pointer",
                backgroundColor:
                  selectedRowId  === row.id
                    ? darken("#EFF999", 0.01)
                    : "inherit",
              },
            })}
            renderTopToolbarCustomActions={(table) => (
            <>
              <Stack direction="row" sx={{ m: 1 }}>
              <Box>
                <Tooltip title="Agregar">
                  <IconButton 
                      onClick={() => setAddInfoAdShowModal(true)}>
                      <AddCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton onClick={() => setUpdateInfoAdShowModal(true)} disabled={!InfoAdSel}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={handleDelete} disabled={!InfoAdSel}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Detalles ">
                      <IconButton onClick={() => setDetallesInfoAdShowModal(true)}>
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
            </>
            )}
          />
        </Box>
        <Dialog open={AddInfoAdShowModal} onClose={() => setAddInfoAdShowModal(false)}>
          <AddInfoAdModal
            AddInfoAdShowModal={AddInfoAdShowModal}
            setAddInfoAdShowModal={setAddInfoAdShowModal}
            onClose={() => setAddInfoAdShowModal(false)}
            AlmacenSel={AlmacenSel}
          />
        </Dialog>

        <Dialog open={UpdateInfoAdShowModal}>
            <UpdateInfoAd
              UpdateInfoAdShowModal={UpdateInfoAdShowModal}
              setUpdateInfoAdShowModal={setUpdateInfoAdShowModal}
              onClose={() => setUpdateInfoAdShowModal(false)}
              InfoAdSel={InfoAdSel}
              selectedRowId={selectedRowId}
              AlmacenSel={AlmacenSel}
            />
          </Dialog>
          
          <Dialog open={DetallesInfoAdShowModal}>
            <DetallesInfoAdModal
              DetallesInfoAdShowModal={DetallesInfoAdShowModal}
              setDetallesInfoAdShowModal={setDetallesInfoAdShowModal}
              onClose={() => setDetallesInfoAdShowModal(false)}
              InfoAdSel={InfoAdSel}
            />
          </Dialog>
      </Box>
    );
  };
  
  export default InfoAdTable;