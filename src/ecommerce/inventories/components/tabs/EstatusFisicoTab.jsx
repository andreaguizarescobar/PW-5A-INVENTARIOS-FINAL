import { Box } from "@mui/material";
import React from 'react';
import EstatusFisicoTable from "../tables/EstatusFisicoTable";
const EstatusTab = ({SerieSel}) => {
  return (

    <div>
      <EstatusFisicoTable SerieSel={SerieSel}/>
    </div>

  );

};

export default EstatusTab;