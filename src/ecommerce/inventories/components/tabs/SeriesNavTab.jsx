import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const SeriesTabs = ["SERIES", "ESTATUS VENTA", "ESTATUS FISICO", "UBICACIONES"];

const SeriesNavTab = ({ setCurrentNameTabInSeriesTab, SerieSel }) => {
   const [currenTabIndex, setCurrentTabIndex] = useState(0);

   const handleChange = (e, newValue) => {
      const tabName = SeriesTabs[newValue];
      setCurrentNameTabInSeriesTab(tabName);
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
            {SeriesTabs.map((tab, index) => (
               <Tab
                  key={tab}
                  label={tab}
                  disabled={
                     (tab === "ESTATUS VENTA" && !SerieSel) ||
                     (tab === "ESTATUS FISICO" && !SerieSel) ||
                     (tab === "UBICACIONES" && !SerieSel)
                  }
               />
            ))}
         </Tabs>
      </Box>
   );
};

export default SeriesNavTab;
