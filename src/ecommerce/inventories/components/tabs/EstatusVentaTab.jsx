import React, { useState } from "react";
import EstatusVentaNavTab from "./EstatusVentaNavTab";
import EstatusVentaTable from "../tables/EstatusVentaTable"; // Tabla para mostrar datos
import AddEstatusVentaModal from "../modals/AddEstatusVentaModal"; // Modal para agregar/editar estatus
import { Button, Box } from "@mui/material";

function EstatusVentaTab({SerieSel}) {
  const [currentTab, setCurrentTab] = useState("ESTATUS");
  const [currentRow, setCurrentRow] = useState(null); // Simula la fila seleccionada
  const [data, setData] = useState([]); // Datos para la tabla de estatus de venta
  const [modalOpen, setModalOpen] = useState(false); // Controla el modal

  // Guardar un nuevo estatus o actualizar uno existente
  const handleSaveEstatus = (newEstatus) => {
    setData((prevData) => [...prevData, newEstatus]);
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Estatus de Venta</h2>
      {/* Navegación entre subpestañas */}
      <EstatusVentaNavTab
        currentRowInEstatusVentaTab={currentRow}
        setCurrentNameTabInEstatusVentaTab={setCurrentTab}
      />

      <Box sx={{ marginTop: 2 }}>
        {/* Renderización condicional según la pestaña seleccionada */}
        {currentTab === "ESTATUS" && (
          <>
            <EstatusVentaTable 
              SerieSel={SerieSel}
              data={data}
              onRowSelect={setCurrentRow} // Permite seleccionar una fila
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
              sx={{ marginTop: 2 }}
            >
              Agregar Estatus
            </Button>
          </>
        )}
        {currentTab === "DETALLES" && (
          <p>Contenido de la pestaña DETALLES (puedes personalizar esto).</p>
        )}
        {currentTab === "OBSERVACIONES" && (
          <p>Contenido de la pestaña OBSERVACIONES (puedes personalizar esto).</p>
        )}
      </Box>

      {/* Modal para agregar o editar estatus */}
      <AddEstatusVentaModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        onSave={handleSaveEstatus}
      />
    </Box>
  );
}

export default EstatusVentaTab;
