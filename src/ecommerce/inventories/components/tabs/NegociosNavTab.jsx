import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const NegociosTabs = ["NEGOCIOS", "ALMACENES"];

const NegociosNavTab = ({ currentRowInNegociosTab, setCurrentNameTabInAlmacenesTab }) => {
	
	const [currenTabIndex, setCurrentTabIndex] = useState(0);

	const handleChange = (e) => {
		setCurrentNameTabInAlmacenesTab(e.target.innerText.toUpperCase());
		switch (e.target.innerText.toUpperCase()) {
			case "NEGOCIOS":
				setCurrentTabIndex(0);
				break;
			case "ALMACENES":
				setCurrentTabIndex(1);
                break;
		}
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
				
				{NegociosTabs.map((tab) => {		
					return <Tab key={tab} label={tab} disabled ={currentRowInNegociosTab === null}/>;
				})}
			</Tabs>
		</Box>
	);
};

export default NegociosNavTab;