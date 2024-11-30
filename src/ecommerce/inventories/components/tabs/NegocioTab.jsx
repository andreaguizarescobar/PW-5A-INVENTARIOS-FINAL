import { Box } from "@mui/material";
import NegociosTable from "../tables/NegociosTable";

export default function NegocioTab({InstitutoSel, NegSelect}) {
    return (
  
      <Box>
  
        <NegociosTable InstitutoSel={InstitutoSel} NegSelect={NegSelect} />
        
      </Box>
  
    );
  
  }