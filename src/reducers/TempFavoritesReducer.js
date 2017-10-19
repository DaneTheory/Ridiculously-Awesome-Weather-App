// Action Type Constants
import * as types from '../constants/actionTypes';

// Initial State
import InitialState from './InitialState';


const TempFavoritesReducer = (state = InitialState.tempFavorites, action) => {
  switch (action.type) {
    case types.SET_LOCATION:
      return {...state, location: action.location};
    case types.SET_SELECTED_FAVORITES:
      return {...state, selectedFavorites: [...state.selectedFavorites, action.selectedFavorites]};
    case types.REMOVE_SELECTED_FAVORITE:
      return {...state, selectedFavorites: state.selectedFavorites.filter(item => action.selectedFavorites !== item)};
    case types.RESET_LOCATION_VALUE:
      return {...state, location: action.location};
    case types.RESET_SELECTED_FAVORITES:
      return {...state, selectedFavorites: action.selectedFavorites};
    default:
      return state;
  }
}

export default TempFavoritesReducer
