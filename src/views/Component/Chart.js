import React, { useEffect, useState } from 'react';
import Plot from "react-plotly.js";
import {PERCENTILE_DATA, Y_TICKS} from '../../utils/constant'



function Chart(props){
  const {title, type, patientData} = props
  const [chartData, setChartData] = useState([])

  const layout = {
    width: 1600,
    height: 850,
    title: {
      text: `${title} (${patientData  && typeof patientData.gender==="string" ? (patientData.gender[0].toUpperCase() + patientData.gender.substring(1)) : 'Male'})`,
      font: {
        size: 25,
      }
    },
    xaxis:{
      title: {
        text: 'Age (months)',
        font: {size: 20},
      },
      showgrid: true,
      zeroline: true,
      showline: true,
      tickvals:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
    },
    yaxis:{
      title: {
        text: `Value (${Y_TICKS[type].unit})`,
        standoff: 20,
        font: {size: 20},
      },
      tickvals: Y_TICKS[type].tickvals,
      ticktext: Y_TICKS[type].ticktext,
      
    },
    legend: {
      y: 0.5,
      traceorder: 'reversed',
      font: {size: 16},
      yref: 'paper'    
    },
  };

  useEffect(()=>{
    if(patientData === null || type==null) return 
    const data = Object.keys(PERCENTILE_DATA[type][patientData.gender || 'male']).map((key, index)=>{
      return {
        x: PERCENTILE_DATA.month,
        y: PERCENTILE_DATA[type][patientData.gender|| 'male'][key],
        mode: 'lines',
        name: key==='3'? `${key}rd` : `${key}th`,
        line: {
          dash: 'dot',
          width: 2
        },
        marker: {
          color: PERCENTILE_DATA.color[index],
          size: parseInt(key)%5 ===0 ? 30: 11
        },
      }
    })
    data.push(
      {
        x: patientData[type].month,
        y: patientData[type].value,
        mode: 'markers',
        name: 'Patient Data',
        marker: {
          color: 'rgb(0, 0, 0)',
          size: 11
        },
        type: 'scatter',
      }
    )
    setChartData(data)
  }, [type, patientData])    
  
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Plot data={chartData} layout={layout}/>
    </div>
  )
}
export default Chart