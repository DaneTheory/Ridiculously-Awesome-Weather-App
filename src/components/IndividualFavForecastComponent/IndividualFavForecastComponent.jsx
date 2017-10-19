/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'

// Styles
import styles from './IndividualFavForecastComponent.pcss'


const IndividualFavForecastComponent = (props) => {
  const{ generateForecastViewDisplayComponentHandler } = props
  return (
    <div className={ styles.fav__details__forecast }>
      <div className={ styles.forecast__grid__wrapper }>{ generateForecastViewDisplayComponentHandler() }</div>
    </div>
  )
}

export default IndividualFavForecastComponent
