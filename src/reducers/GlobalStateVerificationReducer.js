// Action Type Constants
import * as types from '../constants/actionTypes';

// Initial State
import InitialState from './InitialState';


const GlobalStateVerificationReducer = (state = InitialState.globalSettings, action) => {
  switch (action.type) {
    case types.IS_EMPTY:
      return {...state, isEmpty: action.isEmpty};
    case types.IS_SELECTED:
      return {...state, isSelected: action.isSelected};
    case types.IS_ACTIVE:
      return {...state, isActive: action.isActive};
    case types.IS_OPEN:
      return {...state, isOpen: action.isOpen};
    case types.IS_LOADING:
      return {...state, isLoading: action.isLoading};
    case types.IS_ERROR:
      return {...state, isError: action.isError};
    case types.IS_LOADING:
      return {...state, isLoaded: action.isLoaded};
    default:
      return state;
  }
}

export default GlobalStateVerificationReducer
