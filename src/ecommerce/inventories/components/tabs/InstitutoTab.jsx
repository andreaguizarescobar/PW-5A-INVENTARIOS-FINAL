import { Box } from "@mui/material";
import InstitutosTable from "../tables/InstitutosTable";

const InstitutoTab = ({InstSelect}) => {
    return (
  
      <div>
          
          <InstitutosTable InstSelect={InstSelect} />
        
      </div>
  
    );
  
  };

export default InstitutoTab;