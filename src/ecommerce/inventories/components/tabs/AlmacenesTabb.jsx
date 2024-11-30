import { Box } from "@mui/material";
import AlmacenesTable from "../tables/AlmacenesTable";
const AlmacenesTabb = ({NegocioSel, AlmSelect}) => {
    return (
  
      <div>
        <AlmacenesTable NegocioSel={NegocioSel} AlmSelect={AlmSelect}/>
      </div>
  
    );
  
  };

export default AlmacenesTabb;