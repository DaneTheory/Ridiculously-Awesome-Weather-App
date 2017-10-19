/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react';

// Sub-Components
import ErrorIcon from '../ErrorIcon/ErrorIcon'
import ErrorText from '../ErrorText/ErrorText'

// Styles
import styles from './ErrorComponent.pcss'


const ErrorComponent = () => {
  return (
    <div className={ styles.errorComponent__wrapper }>
      <ErrorText />
      <ErrorIcon />
    </div>
  )
}

export default ErrorComponent
