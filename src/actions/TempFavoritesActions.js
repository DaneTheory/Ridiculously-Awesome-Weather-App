import * as types from '../constants/actionTypes';


export const setLocation = (str) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_LOCATION,
      location: str
    });
  };
}

export const setSelectedFavorites = (val) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_SELECTED_FAVORITES,
      selectedFavorites: val
    });
  };
}

export const removeSelectedFavorite = (str) => {
  return (dispatch) => {
    return dispatch({
      type: types.REMOVE_SELECTED_FAVORITE,
      selectedFavorites: str
    });
  };
}

export const resetLocationValue = () => {
  return (dispatch) => {
    return dispatch({
      type: types.RESET_LOCATION_VALUE,
      location: ''
    });
  };
}

export const resetSelectedItems = () => {
  return (dispatch) => {
    return dispatch({
      type: types.RESET_SELECTED_FAVORITES,
      selectedFavorites: []
    });
  };
}
