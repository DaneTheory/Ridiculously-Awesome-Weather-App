/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'


const FAB = (props) => {
  const{ fabFullComponentCreationHandler } = props
  return fabFullComponentCreationHandler()
}

export default FAB
