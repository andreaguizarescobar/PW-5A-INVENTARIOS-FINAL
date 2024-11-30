import { Box } from "@mui/material";
import { useState } from "react";
// FIC:
import AlmacenesNavTab from "./AlmacenesNavTab";
import InfoAdTab from "./InfoAdTab";
import MvtosTab from "./MvtosTab";
import AlmacenTab from "./AlmacenesTabb";

const AlmacenesTab = ({ NegocioSel, AlmaSelect }) => {
   
   // FIC: indicamos que al iniciar no hay ningun Instituto seleccionado. 
   const [currentRowInAlmacenesTab, setCurrentRowInAlmacenesTab] = useState(0);    
   
   // FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS. 
   const [currentNameInAlmacenesTab, setCurrentNameTabInAlmacenesTab] = useState("ALMACENES");
   const [AlmacenSel, setAlmacenSel] = useState(null);

   const handleAlmacenSel = (AlmSelect) => { 
       setAlmacenSel(AlmSelect);
       AlmaSelect(AlmSelect);
       console.log(AlmSelect);
   };

   return ( 
      <Box>   
         <AlmacenesNavTab
            setCurrentRowInAlmacenesTab={setCurrentRowInAlmacenesTab}  
            setCurrentNameTabInAlmacenesTab={setCurrentNameTabInAlmacenesTab}   
            AlmacenSel={AlmacenSel}
         />
            
         {console.log(currentNameInAlmacenesTab)}
         {currentNameInAlmacenesTab === "ALMACENES" && <AlmacenTab NegocioSel={NegocioSel} AlmSelect={handleAlmacenSel}/>}
         {currentNameInAlmacenesTab === "INFORMACIÓN ADICIONAL" && <InfoAdTab AlmacenSel={AlmacenSel}/>}
         {currentNameInAlmacenesTab === "MOVIMIENTOS" && <MvtosTab AlmacenSel={AlmacenSel} />}
      </Box>
   );
};

export default AlmacenesTab;
