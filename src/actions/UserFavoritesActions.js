import React from 'react'
import DarkSkyApi from 'dark-sky-api'

import * as types from '../constants/actionTypes'
import Configs from '../Configs/Configs'

// Utility Helper
import { DegreeSymbol } from '../utilities/common'

const darkSkyInitialInstance = new DarkSkyApi(Configs.DARK_SKY_API_KEY)

export const setFavorites = (arr) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_FAVS,
      favs: [...new Set(arr)]
    })
  }
}

export const setFavsLatLng = (latLngArr) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_FAVS_LAT_LNG,
      favsLatLng: [...new Set(latLngArr)]
    })
  }
}

export const setFavsWeatherData = (results) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_FAVS_WEATHER_DATA,
      favsWeatherData: [...new Set(results)]
    })
  }
}

export const setFavoritesFullData = (arr) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_FAVS_FULL_DATA_ARRAY,
      favsFullData: [...new Set(arr)]
    })
  }
}

export const removeFavItem = (item) => {
  return (dispatch) => {
    return dispatch({
      type: types.REMOVE_FAV_ITEM,
      removeFavItem: item
    })
  }
}

export const removeFavLatLngItem = (item) => {
  return (dispatch) => {
    return dispatch({
      type: types.REMOVE_FAV_LAT_LNG_ITEM,
      removeFavLatLngItem: item
    })
  }
}

export const removeFavWeatherDataItem = (item) => {
  return (dispatch) => {
    return dispatch({
      type: types.REMOVE_FAV_WEATHER_DATA_ITEM,
      removeFavWeatherDataItem: item
    })
  }
}

export const removeFullFavItem = (item) => {
  return (dispatch) => {
    return dispatch({
      type: types.REMOVE_FULL_FAV_ITEM,
      removeFullFavItem: item
    })
  }
}

export const masterFavoritesReset = () => {
  return (dispatch) => {
    console.log('RESTTTTTTTTT')
    return dispatch({
      type: types.RESET_ALL_FAVS
    })
  }
}

export const fetchBasicDarkSideData = (latLngObjArr) => {
  return (dispatch) => {
    return Promise.resolve(latLngObjArr.map(fav => {
        const position = {
          latitude: fav.lat,
          longitude: fav.lng
        }
        return darkSkyInitialInstance.position(position).loadItAll('hourly,minutely,flags,alerts')
          .then(res => {
            console.log(res.currently.icon)
            return {
              icon: res.currently.icon,
              temperature: Math.round(res.currently.temperature),
              temperatureWithSymbol: `${Math.round(res.currently.temperature)}${DegreeSymbol}`,
              temperatureMin: Math.round(res.daily.data[0].temperatureLow),
              temperatureMax: Math.round(res.daily.data[0].temperatureMax)
            }
          })
          .then(results => results)
          .catch(error => new Error(error))
      }))
      .then(results => Promise.all(results))
      .then(results => {
        return dispatch({
          type: types.SET_FAVS_WEATHER_DATA,
          favsWeatherData: [...new Set(results)]
        })
      })
      .catch(error => new Error(error))
  }
}
