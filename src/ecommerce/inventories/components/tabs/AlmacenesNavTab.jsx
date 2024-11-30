import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const AlmacenesTabs = ["ALMACENES", "INFORMACIÓN ADICIONAL", "MOVIMIENTOS"];

const AlmacenesNavTab = ({ currentNameInAlmacenesTab, setCurrentNameTabInAlmacenesTab, AlmacenSel }) => {
    
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newValue) => {
        const tabName = AlmacenesTabs[newValue];
        setCurrentNameTabInAlmacenesTab(tabName);
        setCurrentTabIndex(newValue);
    };

    return (
        <Box sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {AlmacenesTabs.map((tab, index) => (
                    <Tab
                        key={tab}
                        label={tab}
                        disabled={
                            (tab === "INFORMACIÓN ADICIONAL" && !AlmacenSel) ||
                            (tab === "MOVIMIENTOS" && !AlmacenSel)
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default AlmacenesNavTab;
