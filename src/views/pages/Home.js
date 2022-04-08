import React, { useState, useContext, useEffect } from 'react';
// Import FhirClientContext (should contain client object after SMART verification)
import { FhirClientContext } from "../../Context/FhirClientContext";
// Import SMART Query helper function
import { SMARTRequest } from "../../utils/SMARTRequest.js";

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../Component/TabPanel'
import Chart from '../Component/Chart'
import * as dayjs from 'dayjs'

function Home(props) {
    // FHIR Client Context
    const clientContext = useContext(FhirClientContext)
    const client = clientContext.client;
    const [patientData, setPatientData] = useState(null)
    
    // Tab state
    const theme = useTheme();
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setTabValue(newValue);
    };
    const handleChangeIndex = (index) => {
      setTabValue(index);
    };
    const a11yProps = (index) => {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }
  

    const sanitizeData = (patient_data, length_data, weight_data, headCircumference_data) => {
        patient_data = patient_data[0]

        const length_month = []
        const length_value = []
        length_data.forEach(_ => {
          const months = dayjs(_.effectiveDateTime).diff(patient_data.birthDate, 'month', true)
          if(months >= 0 && months <= 36){
            length_month.push(months)
            length_value.push(_.valueQuantity.value)
          }
        });

        const weight_month = []
        const weight_value = []
        weight_data.forEach(_ => {
          const months = dayjs(_.effectiveDateTime).diff(patient_data.birthDate, 'month', true)
          if(months >= 0 && months <= 36){
            weight_month.push(months)
            weight_value.push(_.valueQuantity.value)
          }
        });
        
        const headCircumference_month = []
        const headCircumference_value = []
        headCircumference_data.forEach(_ => {
          const months = dayjs(_.effectiveDateTime).diff(patient_data.birthDate, 'month', true)
          if(months >= 0 && months <= 36){
            headCircumference_month.push(months)
            headCircumference_value.push(_.valueQuantity.value)
          }
        });

        setPatientData({
          ...patient_data, 
          length: {
            month: length_month,
            value: length_value
          },
          weight: {
            month: weight_month,
            value: weight_value
          },
          headCircumference: {
            month: headCircumference_month,
            value: headCircumference_value
          },
        })
    }

    useEffect(()=>{
      Promise.all([
        // get patient data
        SMARTRequest(`Patient?_id=${client.patient.id}&_pretty=true`, client),
        // get length
        SMARTRequest(`Observation?code=http://loinc.org%7C8302-2&_pretty=true&patient=${client.patient.id}`, client),
        // get weight
        SMARTRequest(`Observation?code=http://loinc.org%7C29463-7&_pretty=true&patient=${client.patient.id}`, client),
        // get head circumference 
        SMARTRequest(`Observation?code=http://loinc.org%7C9843-4&_pretty=true&patient=${client.patient.id}`, client)
      ]).then(allResponses => {
        sanitizeData(...allResponses)
      })
    }, [])

	return (
      <React.Fragment>
        <Box sx={{ bgcolor: 'background.paper'}}>
          <AppBar position="static">
              <Tabs
                value={tabValue}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Length" {...a11yProps(0)} />
                <Tab label="Weight" {...a11yProps(1)} />
                <Tab label="Head Circumference" {...a11yProps(2)} />
              </Tabs>
          </AppBar>
          
          <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tabValue} onChangeIndex={handleChangeIndex}>
            <TabPanel value={tabValue} index={0} dir={theme.direction} patientData={patientData}>
              <Chart title={"Length"} type={"length"} patientData={patientData}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1} dir={theme.direction} patientData={patientData}>
              <Chart title={"Weight"} type={"weight"} patientData={patientData}/>
            </TabPanel>
            <TabPanel value={tabValue} index={2} dir={theme.direction} patientData={patientData}>
              <Chart title={"Head Circumference"} type={"headCircumference"} patientData={patientData}/>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </React.Fragment>
    )
}

export default Home;