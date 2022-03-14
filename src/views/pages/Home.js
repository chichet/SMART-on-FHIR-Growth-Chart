import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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


// Fronend: Component to render button testing SMART client
function Home(props) {
    const history = useHistory()
    // FHIR Client Context
    const clientContext = useContext(FhirClientContext)
    // Patient data
    // 1568313
    //1575519
    const [patientId, setPatientId] = useState('1575519')
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
  
    
    const getPatient = async() =>{
      const client = clientContext.client;
      const QueryParameters = `Patient?_id=${patientId}&_pretty=true`
      const result = await SMARTRequest(QueryParameters, client)
      return result[0]
    }

    const getGrowthCharData = async() =>{
        const patient = await getPatient()
        const client = clientContext.client;
        const length_result = await SMARTRequest(`Observation?code=http://loinc.org%7C8302-2&_pretty=true&patient=${patientId}`, client)
        const weight_result = await SMARTRequest(`Observation?code=29463-7&_pretty=true&patient=${patientId}`, client)
        const headCircumference_result = await SMARTRequest(`Observation?code=9843-4&_pretty=true&patient=${patientId}`, client)
        
        const length_month = [1.2, 2.3, 4, 7, 10, 13, 15, 18,20, 22, 24, 26, 28, 30, 32, 34]
        const length_value = [50, 55, 60.2, 64.5, 68.5, 72, 74, 78, 82,84, 87, 88.5, 91,92.5, 94, 96]
        length_result.forEach(_ => {
          const months = (new Date(_.meta.lastUpdated) - new Date(patient.birthDate)) / (1000 * 60 * 60 * 24 * 12)
          if(months <= 36){
            length_month.add(months)
            length_value.add(_.valueQuantity.value ? _.valueInteger:  _.valueInteger)
          }
        });

        const weight_month = [1, 2, 5]
        const weight_value = [4, 8, 12]
        weight_result.forEach(_ => {
          const months = (new Date(_.meta.lastUpdated) - new Date(patient.birthDate)) / (1000 * 60 * 60 * 24 * 12)
          if(months <= 36){
            weight_month.add(months)
            weight_value.add(_.valueQuantity.value ? _.valueInteger:  _.valueInteger)
          }
        });
        
        const headCircumference_month = [1, 2]
        const headCircumference_value = [35, 40]
        headCircumference_result.forEach(_ => {
          const months = (new Date(_.meta.lastUpdated) - new Date(patient.birthDate)) / (1000 * 60 * 60 * 24 * 12)
          if(months <= 36){
            headCircumference_month.add(months)
            headCircumference_value.add(_.valueQuantity.value ? _.valueInteger:  _.valueInteger)
          }
        });

        setPatientData({
          ...patient, 
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
      getGrowthCharData()
    },[])

    useEffect(()=>{
      console.log(patientData)
    },[patientData])

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
                
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tabValue}
                    onChangeIndex={handleChangeIndex}
                >
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