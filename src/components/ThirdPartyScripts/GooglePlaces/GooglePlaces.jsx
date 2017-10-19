/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react';
import Script from 'react-load-script';

// Global Configs Object
import GlobalConfigs from '../../../Configs/Configs';


const GooglePlaces = (props) => {
  const{ scriptLoading, scriptLoaded, scriptError, toggleIsLoading, toggleScriptLoadingState, toggleScriptLoadedState, toggleScriptErrorState } = props
  const scriptLoadingStateHandler = () => scriptLoaded === false ? toggleScriptLoadingState(true) : toggleScriptLoadingState(false)
  const scriptLoadStateHandler = () => {
    return scriptLoading === false ?
      Promise.resolve(toggleScriptLoadedState(true))
        .then(() => toggleScriptLoadingState(false))
        .then(() => toggleIsLoading(false))
        .catch((error) => {
          scriptErrorHandler()
          return new Error(error)
        })
      :
      Promise.resolve(toggleScriptLoadedState(false))
        .then(() => toggleScriptLoadingState(true))
        .then(() => toggleIsLoading(true))
        .catch((error) => {
          scriptErrorHandler()
          return new Error(error)
        })
  }
  const scriptErrorHandler = () => toggleScriptErrorState(true)
  return (
    <Script url={ GlobalConfigs.GOOGLE_PLACES_API_ENDPOINT  }
            onCreate={ scriptLoadingStateHandler }
            onLoad={ scriptLoadStateHandler }
            onError={ scriptErrorHandler } />
  )
}

export default GooglePlaces
