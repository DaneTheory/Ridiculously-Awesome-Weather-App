import * as types from '../constants/actionTypes';


export const setActiveColor = (color) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_ACTIVE_COLOR,
      activeColor: color
    })
  }
}

export const setDegreeType = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_DEGREES_TYPE,
      degreeType: bool
    })
  }
}
