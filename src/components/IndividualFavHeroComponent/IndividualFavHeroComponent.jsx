/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'

// Styles
import styles from './IndividualFavHeroComponent.pcss'


const IndividualFavHeroComponent = (props) => {
  const{ generateHeroViewDisplayComponentHandler } = props
  return (<div className={ styles.fav__details__hero }>{ generateHeroViewDisplayComponentHandler() }</div>)
}

export default IndividualFavHeroComponent
