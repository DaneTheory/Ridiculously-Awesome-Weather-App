/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'
import { Button } from 'react-toolbox/lib/button'


const EditButton = (props) => {
  const{ editBttnStyleHandler, editBttnOnClickHandler, editBttnTextChangeHandler } = props
  return (
    <Button className={ editBttnStyleHandler }
            label={ editBttnTextChangeHandler }
            flat
            onClick={ editBttnOnClickHandler } />
  )
}

export default EditButton
