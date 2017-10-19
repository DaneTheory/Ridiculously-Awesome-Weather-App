// Action Type Constants
import * as types from '../constants/actionTypes';

// Initial State
import InitialState from './InitialState';

const InitialStateReset = {
    favs: [],
    favsLatLng: [],
    favsWeatherData: [],
    favsFullData: []
}

const UserFavoritesReducer = (state = InitialState.userFavorites, action) => {
  let cleanFavsArray = Array.from(new Set(action.favs));
  let cleanStateArray = Array.from(new Set(state.favs));
  switch (action.type) {
    case types.SET_FAVS:
      return {...state, favs: [...new Set(state.favs), ...action.favs] };
    case types.SET_FAVS_LAT_LNG:
      return {...state, favsLatLng: [...new Set(state.favsLatLng), ...action.favsLatLng] };
    case types.SET_FAVS_WEATHER_DATA:
      return {...state, favsWeatherData: [...new Set(state.favsWeatherData), ...action.favsWeatherData] };
    case types.SET_FAVS_FULL_DATA_ARRAY:
      return {...state, favsFullData: action.favsFullData };
    case types.REMOVE_FAV_ITEM:
      return {...state, favs: (state.favs.filter(item => action.removeFavItem !== item)) }
    case types.REMOVE_FAV_LAT_LNG_ITEM:
      return {...state, favsLatLng: (state.favsLatLng.filter(item => action.removeFavLatLngItem !== item)) }
    case types.REMOVE_FAV_WEATHER_DATA_ITEM:
      return {...state, favsWeatherData: (state.favsWeatherData.filter(item => action.removeFavWeatherDataItem !== item)) }
    case types.REMOVE_FULL_FAV_ITEM:
      return {...state, favsFullData: (state.favsFullData.filter(item => action.removeFullFavItem !== item)) }
    case types.RESET_ALL_FAVS:
      return InitialStateReset
    default:
      return state
  }
}

export default UserFavoritesReducer
