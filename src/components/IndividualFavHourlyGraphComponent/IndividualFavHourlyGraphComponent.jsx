/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'


const IndividualFavHourlyGraphComponent = (props) => {
  const{ generateHourlyForecastDisplayHandler } = props
  return generateHourlyForecastDisplayHandler()
}

export default IndividualFavHourlyGraphComponent
