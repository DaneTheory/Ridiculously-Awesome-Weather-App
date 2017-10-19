/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'
import { Link } from 'react-router-dom'

// Styles
import styles from './ErrorText.pcss'


const ErrorText = () => {
  return (
    <div className={ styles.error__text }>
      <h1>
        4 OH! 4
      </h1>
      <h5>
        You're a little lost...
      </h5>
      <Link to='/'>
        <h3>
          Click here to get back to reality.
        </h3>
      </Link>
    </div>
  )
}

export default ErrorText
