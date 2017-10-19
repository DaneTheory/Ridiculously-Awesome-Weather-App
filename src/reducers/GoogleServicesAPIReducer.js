// Action Type Constants
import * as types from '../constants/actionTypes';

// Initial State
import InitialState from './InitialState';


const GoogleServicesAPIReducer = (state = InitialState.googleServices, action) => {
  switch (action.type) {
    case types.SCRIPT_LOADING:
      return {...state, scriptLoading: action.scriptLoading}
    case types.SCRIPT_LOADED:
      return {...state, scriptLoaded: action.scriptLoaded}
    case types.SCRIPT_ERROR:
      return {...state, scriptError: action.scriptError}
    default:
      return state;
  }
}

export default GoogleServicesAPIReducer
