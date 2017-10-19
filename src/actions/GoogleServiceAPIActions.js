import * as types from '../constants/actionTypes';


export const toggleScriptLoadingState = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.SCRIPT_LOADING,
      scriptLoading: bool
    });
  };
}

export const toggleScriptLoadedState = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.SCRIPT_LOADED,
      scriptLoaded: bool
    });
  };
}

export const toggleScriptErrorState = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.SCRIPT_ERROR,
      scriptError: bool
    });
  };
}
