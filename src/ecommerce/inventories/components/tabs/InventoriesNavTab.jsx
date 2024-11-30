import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const InventoriesTabs = [
    "INSTITUTOS", "NEGOCIOS", "ALMACENES", "SERIES"
];

const InventoriesNavTab = ({ CurrentRowInInventoriesTab, setCurrentNameTabInPrincipalTab, InstitutoSel,NegocioSel,AlmacenSel }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        const tabName = e.target.innerText.toUpperCase();
        console.log("Entro al handleChange", tabName);
        setCurrentNameTabInPrincipalTab(tabName);

        setCurrentTabIndex(InventoriesTabs.indexOf(tabName));
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {InventoriesTabs.map((tab) => (
                    <Tab
                        key={tab}
                        label={tab}
                        disabled={(tab === "NEGOCIOS" && !InstitutoSel) || (tab === "ALMACENES" && !NegocioSel) || (tab === "SERIES" && !AlmacenSel)}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default InventoriesNavTab;
