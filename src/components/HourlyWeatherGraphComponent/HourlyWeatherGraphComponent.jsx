/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'


const HourlyWeatherGraphComponent = (props) => {
  const{ generateHourlyForecastGraphDisplayHandler } = props
  return generateHourlyForecastGraphDisplayHandler()
}

export default HourlyWeatherGraphComponent
