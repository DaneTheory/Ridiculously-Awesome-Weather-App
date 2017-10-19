// Action Type Constants
import * as types from '../constants/actionTypes';

// Initial State
import InitialState from './InitialState';


const AppSettingsReducer = (state = InitialState.appSettings, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_COLOR:
      return {...state, activeColor: action.activeColor }
    case types.SET_DEGREES_TYPE:
      return {...state, degreeType: action.degreeType }
    default:
      return state;
  }
}

export default AppSettingsReducer
