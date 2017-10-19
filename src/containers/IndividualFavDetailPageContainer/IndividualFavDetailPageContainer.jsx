/*=================================
            CONTAINER
==================================*/

// Deps
import React, { Component } from 'react'
import * as chromatism from 'chromatism'

// Utility Helper
import { DegreeSymbol } from '../../utilities/common'

// Components
import IndividualFavHeroComponent from '../../components/IndividualFavHeroComponent/IndividualFavHeroComponent'
import IndividualFavForecastComponent from '../../components/IndividualFavForecastComponent/IndividualFavForecastComponent'
import IndividualFavHourlyGraphComponent from '../../components/IndividualFavHourlyGraphComponent/IndividualFavHourlyGraphComponent'
import HourlyWeatherGraphComponent from '../../components/HourlyWeatherGraphComponent/HourlyWeatherGraphComponent'
import GradientIcon from '../../components/Icons/GradientIcon/GradientIcon'

// Styles
import styles from './IndividualFavDetailPageContainer.pcss'


const alphaRangeMap = [
  {
    min: 0.60,
    max: 0.75
  },
  {
    min: 0.65,
    max: 0.80
  },
  {
    min: 0.65,
    max: 0.85
  },
  {
    min: 0.65,
    max: 0.90
  },
  {
    min: 0.65,
    max: 0.90
  },
  {
    min: 0.6,
    max: 0.90
  },
  {
    min: 0.55,
    max: 0.85
  },
  {
    min: 0.5,
    max: 0.80
  },
  {
    min: 0.45,
    max: 0.80
  },
  {
    min: 0.4,
    max: 0.70
  },
  {
    min: 0.35,
    max: 0.70
  },
  {
    min: 0.3,
    max: 0.75
  }
]

const getRandomArbitrary = (min, max) => {
  return Math.random() * max - min + min
}


export default class IndividualFavDetailPageContainer extends Component {
  constructor(props) {
    super(props)
    this.generateHourlyGraphBaseColorHandler            =       this.generateHourlyGraphBaseColorHandler.bind(this)
    this.generateHeroViewDisplayComponentHandler        =       this.generateHeroViewDisplayComponentHandler.bind(this)
    this.generateForecastViewDisplayComponentHandler    =       this.generateForecastViewDisplayComponentHandler.bind(this)
    this.generateHourlyForecastDisplayHandler           =       this.generateHourlyForecastDisplayHandler.bind(this)
    this.completeGraphCellCreationHandler               =       this.completeGraphCellCreationHandler.bind(this)
    this.generateHourlyForecastGraphDisplayHandler      =       this.generateHourlyForecastGraphDisplayHandler.bind(this)
    this.convertActiveColorToGreyScaleHandler           =       this.convertActiveColorToGreyScaleHandler.bind(this)
    this.convertDegreeType                              =       this.convertDegreeType.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const{ favsFullData, favsWeatherData, resetInidividualFavDetailContainer, toggleIsLoading, toggleIsSelected } = this.props
    const resetAsyncEventChain = () => {
      return Promise.resolve()
        .then(async () => await toggleIsLoading(true))
        .then(() => {
          const resetAllFavsMasterHandler = async () => {
            try {
              return await resetInidividualFavDetailContainer()
            }
            catch (error) { return new Error(error) }
          }
          return resetAllFavsMasterHandler()
        })
        .then(async () => await toggleIsSelected(false))
        .then(async () => await toggleIsLoading(false))
        .catch(error => new Error(error))
    }

    favsFullData.length !== nextProps.favsWeatherData.length && nextProps.favsWeatherData.length === 0 ? resetAsyncEventChain() : null
  }

  convertDegreeType(temp) {
    const{ degreeType } = this.props
    return !degreeType ? `${temp}${DegreeSymbol}` : `${Math.round((temp - 32) * 5 / 9)}${DegreeSymbol}`
  }

  generateHourlyGraphBaseColorHandler(alpha) {
    const{ individualFavDetails } = this.props
    const rgbArrayValues = individualFavDetails.map(detail => detail.mainColor).toString().split('').splice(4).slice(0,-1).join('').split(',')
    let r = rgbArrayValues[0]
    let g = rgbArrayValues[1]
    let b = rgbArrayValues[2]
    return `rgba(${r},${g},${b},${alpha})`
  }

  generateHeroViewDisplayComponentHandler() {
    const{ individualFavDetails } = this.props
      return individualFavDetails.map((detail,key) => (
        <div className={ styles.fav__details__container } key={ key }>
          <div className={ styles.fav__details__left }>
            <div className={ styles.details__hero__icon}>{ detail.icon }</div>
          </div>
          <div className={ styles.fav__details__right }>
            <div className={ styles.details__hero__title}>
              <h3>TODAY</h3>
            </div>
            <div className={ styles.details__hero__degrees}>
              <h2>{ this.convertDegreeType(detail.temperature) }</h2>
            </div>
            <div className={ styles.details__hero__lowHighTempBox}>
              <div className={ styles.details__lowTemp__block }>
                <div className={ styles.details__lowTemp__text }>
                  <h5>L</h5>
                </div>
                <div className={ styles.details__lowTemp__degrees }>
                  <h3>{ this.convertDegreeType(detail.temperatureMin) }</h3>
                </div>
              </div>
              <div className={ styles.details__highTemp__block }>
                <div className={ styles.details__highTemp__text }>
                  <h5>H</h5>
                </div>
                <div className={ styles.details__highTemp__degrees }>
                  <h3>{ this.convertDegreeType(detail.temperatureMax) }</h3>
                </div>
              </div>
            </div>
            <div className={ styles.details__hourly__message__block }>
              <div className={ styles.details__hourly__title }>
                <h4>HOURLY UPDATE</h4>
              </div>
              <div className={ styles.details__hourly__message }>
                <h4>{ `${detail.hourlyUpdate}` }</h4>
              </div>
            </div>
          </div>
        </div>
    ))
  }

  generateForecastViewDisplayComponentHandler() {
    const{ individualFavDetails } = this.props
    return individualFavDetails.map((detail, key) => {
      return detail.dailyForecast.map((day, key) => {
        let dayName = day[0]
        let dayIcon = day[1]
        let dayLowTemp = this.convertDegreeType(day[2])
        let dayHighTemp = this.convertDegreeType(day[3])
        return (
          <div className={ `${styles.details__forecast__grid__0}` } key={key}>
            <div className={ `${styles.forecast__day}` }>
              <h3>{ dayName }</h3>
            </div>
            <div className={ `${styles.forecast__icon}` }>
              { dayIcon }
            </div>
            <div className={ `${styles.forecast__lowHighTemp__wrapper}` }>
              <div className={ `${styles.forecast__lowTemp__wrapper}` }>
                <div className={ `${styles.forecast__low__text}` }>
                  <h5>L</h5>
                </div>
                <div className={ `${styles.forecast__low__temp}` }>
                  <h3>{ dayLowTemp }</h3>
                </div>
              </div>
              <div className={ `${styles.forecast__highTemp__wrapper}` }>
                <div className={ `${styles.forecast__high__text}` }>
                  <h5>H</h5>
                </div>
                <div className={ `${styles.forecast__high__temp}` }>
                  <h3>{ dayHighTemp }</h3>
                </div>
              </div>
            </div>
          </div>
        )
      })
    })
  }

  completeGraphCellCreationHandler() {
    const{ individualFavDetails } = this.props
    let tempDataArr = []
    let tempLabelArr = []
    let tempLengthArr = []
    let fullDataArr = []
    const individualHourlyDetailMap = individualFavDetails.map(detail => detail.hourlyGraphData)[0]

    const graphCellDataArray = individualHourlyDetailMap
      .reduce((prev, next, curr, arr) => {
        if(curr === 1) tempDataArr.push([curr-1, prev])
        if(arr[curr-1] !== arr[curr]) tempDataArr.push([...new Set([curr, next])])
        return tempDataArr
      })

    const graphCellLabelArray = graphCellDataArray.map((label,i,arr) => label[1])

    const graphCellLengthArray = graphCellDataArray
      .map((num,i,arr2) => {
        if(i !== 0) tempLengthArr.push(arr2[i][0] - arr2[i-1][0])
        return tempLengthArr
      })
      .filter((item,i,arr3) => i === 0)
      .reduce((a, b, c, d) => d[0])

    const lastGraphCellData = 12 - graphCellLengthArray.reduce((a, b) => a + b, 0)
    graphCellLengthArray.push(lastGraphCellData)

    const graphCellLengthPercentageHandler = graphCellLengthArray.map(leng => leng/12*100)

    const rando = (min, max) => Math.random() * (max - min) + min

    return graphCellLengthArray.map((cell,i,arr) => fullDataArr.concat(graphCellLengthArray[i],graphCellLabelArray[i],graphCellLengthPercentageHandler[i]))
  }

  convertActiveColorToGreyScaleHandler(alpha) {
    const{ activeColor } = this.props
    const greyScales = chromatism.greyscale( activeColor ).rgb
    const greyScale2 = chromatism.contrast( 0, greyScales ).rgb
    const greyScale = chromatism.sepia( greyScale2 ).rgb
    return `rgba(${Math.round(greyScale.r)},${Math.round(greyScale.g)},${Math.round(greyScale.b)},${alpha})`
  }

  generateHourlyForecastGraphDisplayHandler() {
    const{ activeColor } = this.props
    const arrLength = this.completeGraphCellCreationHandler().map(item => item)
    const dynamicAlphaVal = 12/arrLength.length/10
    return (
      <div className={ styles.hourly__summary } style={{ width: `${100}%`, background: this.convertActiveColorToGreyScaleHandler(0.4) }}>
        {
          this.completeGraphCellCreationHandler()
            .map((item,key,arr) => {
              return arr[key]
            })
            .map((item,key,arr) => {
              const rgbVals = chromatism.greyscale( activeColor ).rgb
              const rgbVal = chromatism.contrast( 4, rgbVals ).rgb
              const rgbaVal = `rgba(${Math.round(rgbVal.r)},${Math.round(rgbVal.g)},${Math.round(rgbVal.b)},${getRandomArbitrary(alphaRangeMap[arr.length].min,alphaRangeMap[arr.length].max)})`
              return [
                ...[item[1]],
                ...[item[2]],
                rgbaVal
              ]
            })
            .map((item,key,arr) => (
                <span key={ key } style={{ width: `${item[1]}%`, background: `${item[2]}`, border: `1px solid ${this.convertActiveColorToGreyScaleHandler(0.50)}` }} className={ styles.summary }>
                  <div className={ styles.summary__title }>{ item[0] }</div>
                </span>
            ))
        }
      </div>
    )
  }

  generateHourlyForecastDisplayHandler() {
    const{ individualFavDetails } = this.props
    return (
      <div className={ styles.fav__details__hourly__graph } style={{ background: this.generateHourlyGraphBaseColorHandler(0.30) }}>
      <div className={ styles.hourly__graph__title }>
        <h5>NEXT 12 HOURS</h5>
      </div>
      <div className={ styles.fav__details__hourly__wrapper }>
        {
          individualFavDetails.map(detail => {
            return detail.hourlyForecast
              .map((hour, i) => i === 0 ? [`Now`, hour[1], hour[2]] : hour)
              .map((hour, key, arr) => {
                let time = hour[0]
                let tempDegrees = this.convertDegreeType(hour[1])
                let summary = hour[2]
                return (
                  <div className={ styles.hourly__graph__wrapper } key={ key }>
                    <div className={ styles.hourly__time }>
                      <div className={ styles.time }>
                        <h5>{ time }</h5>
                      </div>
                    </div>
                    <div className={ styles.hourly__degree }>
                      <div className={ styles.degree }>
                        <h3>{ tempDegrees }</h3>
                      </div>
                    </div>
                  </div>
                )
              })
          })
       }
     </div>
     <HourlyWeatherGraphComponent generateHourlyForecastGraphDisplayHandler={ this.generateHourlyForecastGraphDisplayHandler } />
    </div>
  )
}

render() {
  const{ activeColor } = this.props
    return (
      <div>
        <div className={ styles.fav__detail__cover } style={{ background: activeColor }}></div>
        <IndividualFavHourlyGraphComponent className={ styles.graph__block } generateHourlyForecastDisplayHandler={ this.generateHourlyForecastDisplayHandler } />
        <div className={ styles.fav__detail__wrapper } style={{ background: activeColor }}>
          <IndividualFavHeroComponent generateHeroViewDisplayComponentHandler={ this.generateHeroViewDisplayComponentHandler } />
          <IndividualFavForecastComponent generateForecastViewDisplayComponentHandler={ this.generateForecastViewDisplayComponentHandler } />
          <div className={ styles.gradient__icon }>
            <GradientIcon />
          </div>
        </div>
      </div>
    )
  }
}
