/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'


const BasicWeatherViewCard = (props) => {
  const{ basicWeatherCardCompleteDivGenerationHandler } = props
  return basicWeatherCardCompleteDivGenerationHandler()
}

export default BasicWeatherViewCard
