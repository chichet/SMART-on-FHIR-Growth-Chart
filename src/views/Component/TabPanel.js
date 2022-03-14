import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, patientData, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <div style={{marginLeft: '10px', marginTop: '5px', fontSize:'20px'}}> 
        <div>{patientData && Array.isArray(patientData.name) && "Patient Name: "+ patientData.name[0].family}</div>
        <div>{patientData && patientData.gender && "Gender: "+ patientData.gender}</div>
      </div>
      
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel