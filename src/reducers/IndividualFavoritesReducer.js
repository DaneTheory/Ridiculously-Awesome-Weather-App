// Action Type Constants
import * as types from '../constants/actionTypes';

// Initial State
import InitialState from './InitialState';


const IndividualFavoritesReducer = (state = InitialState.individualFavorites, action) => {
  switch (action.type) {
    case types.SET_FAV_DETAIL_PAGE:
      return {...state, individualFavDetails: action.individualFavDetails };
    case types.RESET_FAV_DETAIL_CONTAINER:
      return {...state, individualFavDetails: action.individualFavDetails };
    default:
      return state;
  }
}

export default IndividualFavoritesReducer
