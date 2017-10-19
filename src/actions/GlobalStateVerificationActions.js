import * as types from '../constants/actionTypes';


export const toggleIsLoading = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_LOADING,
      isLoading: bool
    })
  }
}

export const toggleIsError = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_ERROR,
      isError: bool
    })
  }
}

export const toggleIsLoaded = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_LOADED,
      isLoaded: bool
    })
  }
}

export const toggleIsEmpty = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_EMPTY,
      isEmpty: bool
    });
  };
}

export const toggleIsSelected = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_SELECTED,
      isSelected: bool
    });
  };
}

export const toggleIsActive = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_ACTIVE,
      isActive: bool
    });
  };
}

export const toggleIsOpen = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_OPEN,
      isOpen: bool
    });
  };
}
