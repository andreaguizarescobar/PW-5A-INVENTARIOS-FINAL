import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

// Definimos las pestañas específicas para Estatus Venta
const EstatusVentaTabs = ["ESTATUS", "DETALLES", "OBSERVACIONES"];

const EstatusVentaNavTab = ({
  currentRowInEstatusVentaTab,
  setCurrentNameTabInEstatusVentaTab,
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleChange = (event, newTabIndex) => {
    const selectedTab = EstatusVentaTabs[newTabIndex]; // Selecciona el tab actual por índice
    setCurrentTabIndex(newTabIndex); // Actualiza el índice del tab
    setCurrentNameTabInEstatusVentaTab(selectedTab); // Envía el nombre de la pestaña seleccionada
  };

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        mx: 1,
        padding: 1,
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Tabs
        value={currentTabIndex}
        variant="fullWidth"
        onChange={handleChange}
        aria-label="Estatus Venta Tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        {EstatusVentaTabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab}
            disabled={!currentRowInEstatusVentaTab} // Desactiva si no hay fila seleccionada
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default EstatusVentaNavTab;
