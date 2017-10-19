import React from 'react'
import DarkSkyApi from 'dark-sky-api'
import Moment from 'moment'

import * as types from '../constants/actionTypes'
import Configs from '../Configs/Configs'

// Icons
import ClearDayIcon from '../components/Icons/ClearDayIcon/ClearDayIcon'
import ClearNightIcon from '../components/Icons/ClearNightIcon/ClearNightIcon'
import CloudIcon from '../components/Icons/CloudIcon/CloudIcon'
import FogIcon from '../components/Icons/FogIcon/FogIcon'
import PartlyCloudyDayIcon from '../components/Icons/PartlyCloudyDayIcon/PartlyCloudyDayIcon'
import PartlyCloudyNightIcon from '../components/Icons/PartlyCloudyNightIcon/PartlyCloudyNightIcon'
import RainIcon from '../components/Icons/RainIcon/RainIcon'
import SleetIcon from '../components/Icons/SleetIcon/SleetIcon'
import SnowIcon from '../components/Icons/SnowIcon/SnowIcon'
import WindIcon from '../components/Icons/WindIcon/WindIcon'


const darkSkyInitialInstance = new DarkSkyApi(Configs.DARK_SKY_API_KEY);
darkSkyInitialInstance.extendHourly(true)

const darkSkyIconTypeArr = [
  [
    'clear-day',
    'rgb(247,127,0)',
    <ClearDayIcon />
  ],
  [
    'clear-night',
    'rgb(95,125,140)',
    <ClearNightIcon />
  ],
  [
    'rain',
    'rgb(51,184,248)',
    <RainIcon />
  ],
  [
    'snow',
    'rgb(176,72,193)',
    <SnowIcon />
  ],
  [
    'sleet',
    'rgb(83,124,215)',
    <SleetIcon />
  ],
  [
    'wind',
    'rgb(132,219,185)',
    <WindIcon />
  ],
  [
    'fog',
    'rgb(207,216,220)',
    <FogIcon />
  ],
  [
    'cloudy',
    'rgb(143,164,175)',
    <CloudIcon />
  ],
  [
    'partly-cloudy-day',
    'rgb(236,212,40)',
    <PartlyCloudyDayIcon />
  ],
  [
    'partly-cloudy-night',
    'rgb(125,203,196)',
    <PartlyCloudyNightIcon />
  ]
]

export const setIndividualFavDetails = (favData) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_FAV_DETAIL_PAGE,
      individualFavDetails: favData
    })
  }
}

export const resetInidividualFavDetailContainer = () => {
  return (dispatch) => {
    return dispatch({
      type: types.RESET_FAV_DETAIL_CONTAINER,
      individualFavDetails: []
    });
  };
}

const apiDataToOutput = (apiRes) => {
  // TODO: maybe use for blank space full array?
  // ===> return darkSkyIconTypeArr.map(type => type[0] === apiRes ? type : null)
  let resultData = darkSkyIconTypeArr.filter((type,i,arr) => type[0] === apiRes)
  return {
    color: resultData.map(item => item[1]).toString(),
    icon: resultData.map(item => item[2])
  }
}

export const fetchDetailedDarkSideData = (latLngObjArr) => {
  const locationTitle = latLngObjArr.filter((item,i,arr) => i === 0)
  const latLngArr = Array.from(new Set(latLngObjArr.map(info => {
    return {
      lat: info.lat,
      lng: info.lng
    }
  })
  .filter((item,i,arr) => i === 1)
))
  return (dispatch) => {
    return Promise.resolve(latLngArr.map(fav => {
        const position = {
          latitude: fav.lat,
          longitude: fav.lng
        }
        const degreeSymbol = '&#176;'.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        return darkSkyInitialInstance.position(position).loadItAll('minutely,flags,alerts')
          .then(res => {
            console.log(res)
            return {
              title: locationTitle.toString(),
              mainColor: apiDataToOutput(res.currently.icon).color,
              icon: apiDataToOutput(res.currently.icon).icon[0],
              temperature: Math.round(res.currently.temperature),
              temperatureWithSymbol: `${Math.round(res.currently.temperature)}${degreeSymbol}`,
              temperatureMin: Math.round(res.daily.data[0].temperatureLow),
              temperatureMax: Math.round(res.daily.data[0].temperatureMax),
              hourlyUpdate: res.hourly.summary,
              hourlyForecast: res.hourly.data
                                .filter((hour, i, arr) => i < 12)
                                .map((hour,i,arr) => [
                                  Moment.unix(hour.time).local('en').format('h a'),
                                  Math.round(hour.temperature),
                                  hour.summary
                                ]),
              hourlyGraphData: res.hourly.data
                                .filter((hour, i, arr) => i < 12)
                                .map(hour => hour.summary),
              dailyForecast: res.daily.data
                              .filter((day,i,arr) => arr.indexOf(day) !== 0)
                              .filter((day,i,arr) => arr.indexOf(day) !== 6)
                              .map(day => [
                                Moment(day.dateTime._i).local().format('ddd'),
                                apiDataToOutput(day.icon).icon[0],
                                Math.round(day.temperatureMin),
                                Math.round(day.temperatureMax)
                              ])
            }
          })
          .then(results => results)
          .catch(error => new Error(error))
      }))
      .then(results => Promise.all(results))
      .then(results => {
        console.log(results)
        return dispatch({
          type: types.SET_FAV_DETAIL_PAGE,
          individualFavDetails: results
        })
      })
      .catch(error => new Error(error))
  }
}
