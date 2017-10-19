/*=================================
            CONTAINER
==================================*/

// Deps
import React, { Component } from 'react';

// Components/Containers
import EmptyStateCard from '../../components/EmptyStateCard/EmptyStateCard';
import BasicWeatherViewCardContainer from '../BasicWeatherViewCardContainer/BasicWeatherViewCardContainer';
import IndividualFavDetailPageContainer from '../IndividualFavDetailPageContainer/IndividualFavDetailPageContainer';

// Styles
import styles from './MainContainer.pcss';


class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.generateFullFavsDataHandler    =   this.generateFullFavsDataHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const{ favsFullData, favsWeatherData, setFavoritesFullData, favs, favsLatLng, toggleIsEmpty } = this.props
    favsFullData.length !== nextProps.favsWeatherData.length && nextProps.favsWeatherData.length !== 0 ? setFavoritesFullData(this.generateFullFavsDataHandler([...new Set(favs)], [...new Set(favsLatLng)], [...new Set(nextProps.favsWeatherData)])) : null
    favsFullData.length < nextProps.favsFullData.length && nextProps.favsFullData.length !== 0 ? toggleIsEmpty(false) : null
    favsFullData.length > 0 && nextProps.favsFullData.length === 0 ? toggleIsEmpty(true) : null
  }

  shouldComponentUpdate(nextProps) {
    const{ isEmpty, isActive, isSelected, favsFullData, favsWeatherData, individualFavDetails, degreeType } = this.props
    return isEmpty !== nextProps.isEmpty
        || isActive !== nextProps.isActive
        || isSelected !== nextProps.isSelected
        || degreeType !== nextProps.degreeType
        || favsFullData.length !== nextProps.favsWeatherData.length
        || individualFavDetails.length !== nextProps.individualFavDetails.length
        || favsFullData.length > nextProps.favsFullData.length && isActive === true && nextProps.isActive === false
  }

  generateFullFavsDataHandler(locationProps, latLngProps, weatherDataProps) {
    const latLng = latLngProps.map(ltLg => ltLg)
    const weatherData = weatherDataProps.map(data => data)
    const locationData = locationProps.map((address, i) => [address, latLng[i], weatherData[i]])
    return [...new Set(locationData)]
  }

  render() {
    const{ individualFavDetails, favsFullData, setDegreeType, degreeType } = this.props
    return (
      individualFavDetails.length === 0 ?
        favsFullData.length === 0 ? <EmptyStateCard /> : <BasicWeatherViewCardContainer {...this.props} /> :
        <IndividualFavDetailPageContainer {...this.props} />
    )
  }
}

export default MainContainer
