/*=================================
            CONTAINER
==================================*/

// Deps
import React, { Component } from 'react'
import { IconButton, Button } from 'react-toolbox/lib/button'
import { Card, CardTitle, CardMedia, CardText } from 'react-toolbox/lib/card'

// Utility Helper
import { DegreeSymbol } from '../../utilities/common'

// Components
import BasicWeatherViewCard from '../../components/BasicWeatherViewCard/BasicWeatherViewCard'

// Styles
import styles from './BasicWeatherViewCardContainer.pcss';

// Icons
import ClearDayIcon from '../../components/Icons/ClearDayIcon/ClearDayIcon'
import ClearNightIcon from '../../components/Icons/ClearNightIcon/ClearNightIcon'
import CloudIcon from '../../components/Icons/CloudIcon/CloudIcon'
import FogIcon from '../../components/Icons/FogIcon/FogIcon'
import PartlyCloudyDayIcon from '../../components/Icons/PartlyCloudyDayIcon/PartlyCloudyDayIcon'
import PartlyCloudyNightIcon from '../../components/Icons/PartlyCloudyNightIcon/PartlyCloudyNightIcon'
import RainIcon from '../../components/Icons/RainIcon/RainIcon'
import SleetIcon from '../../components/Icons/SleetIcon/SleetIcon'
import SnowIcon from '../../components/Icons/SnowIcon/SnowIcon'
import WindIcon from '../../components/Icons/WindIcon/WindIcon'


const weatherConditionTypeArray = [
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


export default class BasicWeatherViewCardContainer extends Component {
  constructor(props) {
    super(props)
    this.basicWeatherAddMoreCardBttnOnClickHandler       =      this.basicWeatherAddMoreCardBttnOnClickHandler.bind(this)
    this.convertDegreeType                               =      this.convertDegreeType.bind(this)
    this.toggleRemoveBasicCardItemBttnHandler            =      this.toggleRemoveBasicCardItemBttnHandler.bind(this)
    this.generateBasicCardIconAndBackgroundColor         =      this.generateBasicCardIconAndBackgroundColor.bind(this)
    this.basicWeatherViewCardCreationHandler             =      this.basicWeatherViewCardCreationHandler.bind(this)
    this.basicWeatherCardCompleteDivGenerationHandler    =      this.basicWeatherCardCompleteDivGenerationHandler.bind(this)
    this.toggleDegreeType                                =      this.toggleDegreeType.bind(this)
  }

  basicWeatherAddMoreCardBttnOnClickHandler() {
    const{ isOpen, toggleIsActive, toggleIsOpen } = this.props
    !isOpen ? toggleIsActive(isOpen) : null
    toggleIsOpen(!isOpen)
  }

  toggleDegreeType() {
    const{ setDegreeType, degreeType } = this.props
    !degreeType ? setDegreeType(degreeType) : null
  }

  toggleRemoveBasicCardItemBttnHandler = (key) => {
    const{ isActive, toggleIsLoading, removeFavItem, removeFavLatLngItem, removeFavWeatherDataItem } = this.props
    return isActive ?
      <IconButton className={ styles.basicWeatherViewCard__bttn__remove }
                  icon='clear'
                  key={ key }
                  onClick={
                    ()=>{
                      return Promise.resolve()
                        .then(async () => await toggleIsLoading(true))
                        .then(() => {
                          const removeFavDataHandler = async () => {
                            try {
                              return await removeFavItem(key[0])
                            }
                            catch (error) { return new Error(error) }
                          }
                          return removeFavDataHandler()
                        })
                        .then(async () => await removeFavLatLngItem(key[1]))
                        .then(async () => await removeFavWeatherDataItem(key[2]))
                        .then(async () => await toggleIsLoading(false))
                        .catch(error => new Error(error))
                    }
                  } />
      :
      null
  }

  convertDegreeType(temp) {
    const{ degreeType } = this.props
    return !degreeType ? `${temp}${DegreeSymbol}` : `${Math.round((temp - 32) * 5 / 9)}${DegreeSymbol}`
  }

  generateBasicCardIconAndBackgroundColor(weatherConditionArray) {
    let resultData = weatherConditionTypeArray.filter((type,i,arr) => type[0] === weatherConditionArray)
    return {
      color: resultData.map(item => item[1]).toString(),
      icon: resultData.map(item => item[2])
    }
  }

  basicWeatherViewCardCreationHandler() {
    const{ favsFullData, toggleIsLoading, fetchDetailedDarkSideData, setActiveColor, toggleIsSelected } = this.props
    return favsFullData.map((card, index) => {
        const basicWeatherViewCardOnClickHandler = (e, data) => {
            return Promise.resolve()
              .then(async () => await toggleIsLoading(true))
              .then(() => {
                const fetchDetailedDarkSideDataHandler = async (data) => {
                  try {
                    return await fetchDetailedDarkSideData(data)
                  }
                  catch (error) { return new Error(error) }
                }
                return fetchDetailedDarkSideDataHandler(data)
              })
              .then(async () => await setActiveColor(this.generateBasicCardIconAndBackgroundColor(card[2].icon).color))
              .then(async () => await toggleIsLoading(false))
              .then(async () => await toggleIsSelected(true))
              .catch(error => new Error(error))
        }
        return (
          <div className={ styles.main__basicWeatherViewCard__container } key={ index }>
          { this.toggleRemoveBasicCardItemBttnHandler(card) }
            <Card className={ styles.main__basicWeatherViewCard }
                  style= {{ background: this.generateBasicCardIconAndBackgroundColor(card[2].icon).color}}
                  onClick={ ((e) => basicWeatherViewCardOnClickHandler(e, card)) }>
                    <div className={ styles.main__basicWeatherViewCard__title__wrapper }>
                      <CardTitle className={ styles.main__basicWeatherViewCard__title }
                                 title={ card[0] } />
                      <CardMedia className={ styles.main__basicWeatherViewCard__svg }
                                 children={ this.generateBasicCardIconAndBackgroundColor(card[2].icon).icon[0] } />
                      <CardTitle className={ styles.main__basicWeatherViewCard__degrees}
                                 title={ this.convertDegreeType(card[2].temperature) }/>
                      <div className={ styles.main__basicWeatherCard__footer__wrapper }>
                        <CardText className={ styles.main__basicWeatherCard__footer__item }>
                          <div className={ styles.main__basicWeatherCard__footer__title }>
                            L
                          </div>
                          <span>
                            { this.convertDegreeType(card[2].temperatureMin) }
                          </span>
                        </CardText>
                        <CardText className={ styles.main__basicWeatherCard__footer__item }>
                          <div className={ styles.main__basicWeatherCard__footer__title }>
                            H
                          </div>
                          <span>
                            { this.convertDegreeType(card[2].temperatureMax) }
                          </span>
                        </CardText>
                      </div>
                    </div>
            </Card>
          </div>
        )
    })
  }

  basicWeatherCardCompleteDivGenerationHandler() {
    return (
      <div className={ styles.main__basicWeatherViewCard__wrapper }>
      { this.basicWeatherViewCardCreationHandler() }
        <Card className={ styles.main__basicWeatherViewCard__addMore }>
          <CardTitle className={ styles.main__basicWeatherViewCard__button__title }>
            <Button className={ styles.basicWeatherViewCard__addMore__button }
                    icon='add'
                    floating
                    onClick={ this.basicWeatherAddMoreCardBttnOnClickHandler } />
          </CardTitle>
          <CardText className={ styles.main__basicWeatherCard__addMore__text}>
            <p>
              Get Some
              <br></br>
              Weather
            </p>
          </CardText>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <BasicWeatherViewCard basicWeatherCardCompleteDivGenerationHandler={ this.basicWeatherCardCompleteDivGenerationHandler } />
    )
  }
}
