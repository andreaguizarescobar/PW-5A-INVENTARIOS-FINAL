import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const NegociosTabs = ["INSTITUTOS", "NEGOCIOS"];

const InstitutosNavTab = ({ currentRowInInstitutosTab, setCurrentNameTabInInstitutosTab }) => {
	
	const [currenTabIndex, setCurrentTabIndex] = useState(0);

	const handleChange = (e) => {
		setCurrentNameTabInInstitutosTab(e.target.innerText.toUpperCase());
		switch (e.target.innerText.toUpperCase()) {
			case "INSTITUTOS":
				setCurrentTabIndex(0);
				break;
			case "NEGOCIOS":
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
					return <Tab key={tab} label={tab} disabled ={currentRowInInstitutosTab === null}/>;
				})}
			</Tabs>
		</Box>
	);
};

export default InstitutosNavTab;