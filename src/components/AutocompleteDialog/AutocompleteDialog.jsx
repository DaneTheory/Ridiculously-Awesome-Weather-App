/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'


const AutocompleteDialog = (props) => {
  const{ userInputPopUpDialogViewCreationHandler } = props
  return userInputPopUpDialogViewCreationHandler()
}

export default AutocompleteDialog
