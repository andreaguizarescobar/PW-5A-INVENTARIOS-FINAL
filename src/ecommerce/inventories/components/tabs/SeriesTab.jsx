import { Box } from "@mui/material";
import { useState } from "react";
// FIC:
import SeriesNavTab from "./SeriesNavTab";
import EstatusVentaTab from "./EstatusVentaTab"; // Componente para Estatus Venta
import EstatusFisicoTab from "./EstatusFisicoTab"; // Componente para Estatus Físico
import UbicacionTab from "./UbicacionesTab"; // Componente para Ubicación
import SeriesTabb from "./SeriesTabb"; // Componente para Ubicación

const SeriesTab = ({ AlmacenSel }) => {
   // Indicamos que al iniciar no hay ningún elemento seleccionado
   const [currentRowInAlmacenesTab, setCurrentRowInAlmacenesTab] = useState(0);

   // El estado inicial de la pestaña activa es "SERIES"
   const [currentRowInSeriesTab, setCurrentNameTabInSeriesTab] = useState("SERIES");
   const [SerieSel, setSerieSel] = useState(null);

   const handleSerieSel = (SerieSelect) => { 
      setSerieSel(SerieSelect);
      console.log(SerieSelect);
   };

   return (
      <Box>
         <SeriesNavTab
            setCurrentRowInAlmacenesTab={setCurrentRowInAlmacenesTab}
            setCurrentNameTabInSeriesTab={setCurrentNameTabInSeriesTab}
            SerieSel={SerieSel}
         />
         
         {console.log(currentRowInSeriesTab)}

         {currentRowInSeriesTab === "SERIES" && <SeriesTabb AlmacenSel={AlmacenSel} SerieSelect={handleSerieSel}/>}
         {currentRowInSeriesTab === "ESTATUS VENTA" && <EstatusVentaTab SerieSel={SerieSel}/>}
         {currentRowInSeriesTab === "ESTATUS FISICO" && <EstatusFisicoTab SerieSel={SerieSel}/>}
         {currentRowInSeriesTab === "UBICACIONES" && <UbicacionTab SerieSel={SerieSel}/>}
      </Box>
   );
}

export default SeriesTab;
