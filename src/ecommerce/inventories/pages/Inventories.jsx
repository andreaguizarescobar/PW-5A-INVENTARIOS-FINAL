import { Box } from "@mui/material";
import InventoriesNavTab from "../components/tabs/InventoriesNavTab";
import { useState } from "react";
import InstitutoTab from "../components/tabs/InstitutoTab";
import NegocioTab from "../components/tabs/NegocioTab";
import AlmacenTab from "../components/tabs/AlmacenesTab";
// import InfoTab from "../components/tabs/InfoAdTab";
// import MvtosTab from "../components/tabs/MvtosTab";
import SeriesTab from "../components/tabs/SeriesTab";
// import EstatusFisicoTab from "../components/tabs/EstatusFisicoTab";
// import EstatusVentaTab from "../components/tabs/EstatusVentaTab";
// import UbicacionesTab from "../components/tabs/UbicacionesTab";

const Inventories = () => {
    const [CurrentRowInInventoriesTab, setCurrentRowInInventoriesTab] = useState(0);
    const [currentNameTabInPrincipalTab, setCurrentNameTabInPrincipalTab] = useState("INSTITUTOS");
    const [InstitutoSel, setInstitutoSel] = useState(null);
    const [NegocioSel, setNegocioSel] = useState(null);
    const [AlmacenSel, setAlmacenSel] = useState(null);
    
    const hendleInstitutoSel = (InstSelect) => { 
        setInstitutoSel(InstSelect);
        console.log(InstSelect);
      };

      const hendleNegocioSel = (NegSelect) => { 
        setNegocioSel(NegSelect);
        console.log(NegSelect);
      };
      const hendleAlmacenSel = (AlmaSelect) => { 
        setAlmacenSel(AlmaSelect);
        console.log(AlmaSelect);
      };
    return (
        <Box>
            <InventoriesNavTab
                InstitutoSel={InstitutoSel}
                NegocioSel={NegocioSel}
                AlmacenSel={AlmacenSel}
                setCurrentRowInInventoriesTab={setCurrentRowInInventoriesTab}
                setCurrentNameTabInPrincipalTab={setCurrentNameTabInPrincipalTab}
            />
            {currentNameTabInPrincipalTab === "INSTITUTOS" && <InstitutoTab InstSelect={hendleInstitutoSel}/>}
            {currentNameTabInPrincipalTab === "NEGOCIOS" && <NegocioTab InstitutoSel={InstitutoSel} NegSelect={hendleNegocioSel} />}
            {currentNameTabInPrincipalTab === "ALMACENES" && <AlmacenTab NegocioSel={NegocioSel} AlmaSelect={hendleAlmacenSel} />}
            {currentNameTabInPrincipalTab === "SERIES" && <SeriesTab AlmacenSel={AlmacenSel}/>}
        </Box>
    );
};

export default Inventories;
