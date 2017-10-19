/*=================================
        MAIN APP CONTAINER
==================================*/

// Module
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loadable from 'react-loading-overlay'

// Actions
import * as googleServiceAPIActions from '../../actions/GoogleServiceAPIActions'
import * as globalActions from '../../actions/GlobalStateVerificationActions'
import * as userFavoritesActions from '../../actions/UserFavoritesActions'
import * as individualFavoritesActions from '../../actions/IndividualFavoritesActions'
import * as tempFavoriteActions from '../../actions/TempFavoritesActions'
import * as appSettingActions from '../../actions/AppSettingsActions'

// Containers
import NavbarContainer from '../NavbarContainer/NavbarContainer'
import MainContainer from '../MainContainer/MainContainer'
import FABContainer from '../FABContainer/FABContainer'

// Components
import GooglePlaces from '../../components/ThirdPartyScripts/GooglePlaces/GooglePlaces'

// Styles
import styles from './AppContainer.pcss'


class AppContainer extends Component {

  componentWillMount() {
    const{ toggleIsLoading } = this.props
    toggleIsLoading(true)
  }

  render() {

    const{
      // Google Service Actions
      toggleScriptLoadingState,
      toggleScriptLoadedState,
      toggleScriptErrorState,

      // App Settings Actions
      setActiveColor,
      setDegreeType,

      // User Favorites Actions
      masterFavoritesReset,

      toggleIsLoading,
      toggleIsLoaded,
      toggleIsError,
      toggleIsEmpty,
      resetInidividualFavDetailContainer,
      toggleIsSelected,
      toggleIsActive,
      toggleIsOpen,
      setFavorites,
      resetSelectedItems,
      setFavsLatLng,
      fetchBasicDarkSideData,
      fetchDetailedDarkSideData,
      removeSelectedFavorite,
      setSelectedFavorites,
      resetLocationValue,
      setLocation,
      setFavoritesFullData,
      removeFavItem,
      removeFavLatLngItem,
      removeFavWeatherDataItem,
      removeFullFavItem,
      setIndividualFavDetails,
      setFavsWeatherData
    } = this.props

    const{
      scriptLoading,
      scriptLoaded,
      scriptError
    } = this.props.googleServices

    const{
      isLoading,
      isLoaded,
      isSelected,
      isEmpty,
      isActive,
      isOpen
    } = this.props.globalSettings

    const{
      location,
      selectedFavorites
    } = this.props.tempFavorites

    const{
      favs,
      favsWeatherData,
      favsFullData,
      favsLatLng
    } = this.props.userFavorites

    const{
      individualFavDetails
    } = this.props.individualFavorites

    const{
      activeColor,
      degreeType
    } = this.props.appSettings


    return (
      <Loadable className={ styles.app__loader }
                active={ isLoading }
                animate={ true }
                spinner={ true }
                background={ 'rgba(22, 31, 36, 1)' }
                color={ 'rgba(125, 203, 196, 1)' }
                spinnerSize={ '10em' }
                zIndex={ 9999999 }>

                <GooglePlaces scriptLoading={ scriptLoading }
                              scriptLoaded={ scriptLoaded }
                              scriptError={ scriptError }
                              toggleIsLoading={ toggleIsLoading }
                              toggleScriptLoadingState={ toggleScriptLoadingState }
                              toggleScriptLoadedState={ toggleScriptLoadedState }
                              toggleScriptErrorState={ toggleScriptErrorState } />

                              <div style={{ opacity: (()=> isLoading === true ? 0 : 1 )() }}>

                                <NavbarContainer isEmpty={ isEmpty }
                                                 isActive={ isActive }
                                                 isSelected={ isSelected }
                                                 toggleIsSelected={ toggleIsSelected }
                                                 toggleIsActive={ toggleIsActive }
                                                 individualFavDetails={ individualFavDetails }
                                                 resetInidividualFavDetailContainer={ resetInidividualFavDetailContainer }
                                                 degreeType={ degreeType }
                                                 setDegreeType={ setDegreeType }
                                                 favs={ favs }
                                                 masterFavoritesReset={ masterFavoritesReset } />

                                <MainContainer favsFullData={ favsFullData }
                                               favsWeatherData={ favsWeatherData }
                                               setFavoritesFullData={ setFavoritesFullData }
                                               favs={ favs }
                                               favsLatLng={ favsLatLng }
                                               toggleIsEmpty={ toggleIsEmpty }
                                               isEmpty={ isEmpty }
                                               isActive={ isActive }
                                               isSelected={ isSelected }
                                               individualFavDetails={ individualFavDetails }
                                               removeFullFavItem={ removeFullFavItem }
                                               removeFavItem={ removeFavItem }
                                               removeFavLatLngItem={ removeFavLatLngItem }
                                               removeFavWeatherDataItem={ removeFavWeatherDataItem }
                                               toggleIsLoading={ toggleIsLoading }
                                               fetchDetailedDarkSideData={ fetchDetailedDarkSideData }
                                               setActiveColor={ setActiveColor }
                                               toggleIsSelected={ toggleIsSelected }
                                               removeFavItem={ removeFavItem }
                                               activeColor={ activeColor }
                                               toggleIsActive={ toggleIsActive }
                                               toggleIsOpen={ toggleIsOpen }
                                               setDegreeType={ setDegreeType }
                                               degreeType={ degreeType }
                                               resetInidividualFavDetailContainer={ resetInidividualFavDetailContainer }
                                               toggleIsSelected={ toggleIsSelected }
                                               toggleIsLoading={ toggleIsLoading } />

                                 <FABContainer isOpen={ isOpen }
                                               toggleIsActive={ toggleIsActive }
                                               toggleIsOpen={ toggleIsOpen }
                                               isSelected={ isSelected }
                                               selectedFavorites={ selectedFavorites }
                                               toggleIsLoading={ toggleIsLoading }
                                               setFavorites={ setFavorites }
                                               resetSelectedItems={ resetSelectedItems }
                                               setFavsLatLng={ setFavsLatLng }
                                               fetchBasicDarkSideData={ fetchBasicDarkSideData }
                                               removeSelectedFavorite={ removeSelectedFavorite }
                                               favs={ favs }
                                               setSelectedFavorites={ setSelectedFavorites }
                                               resetLocationValue={ resetLocationValue }
                                               location={ location }
                                               setLocation={ setLocation } />

                              </div>
      </Loadable>
    )
  }
}

const mapStateToProps = (state) => {
   return {
     globalSettings: {
       isEmpty: state.GlobalStateVerificationReducer.isEmpty,
       isSelected: state.GlobalStateVerificationReducer.isSelected,
       isActive: state.GlobalStateVerificationReducer.isActive,
       isOpen: state.GlobalStateVerificationReducer.isOpen,
       isLoading: state.GlobalStateVerificationReducer.isLoading,
       isError: state.GlobalStateVerificationReducer.isError,
       isLoaded: state.GlobalStateVerificationReducer.isLoaded
     },
     googleServices: {
       scriptLoading: state.GoogleServicesAPIReducer.scriptLoading,
       scriptLoaded: state.GoogleServicesAPIReducer.scriptLoaded,
       scriptError: state.GoogleServicesAPIReducer.scriptError
     },
     tempFavorites: {
       location: state.TempFavoritesReducer.location,
       selectedFavorites: state.TempFavoritesReducer.selectedFavorites
     },
     userFavorites: {
       favs: state.UserFavoritesReducer.favs,
       favsLatLng: state.UserFavoritesReducer.favsLatLng,
       favsWeatherData: state.UserFavoritesReducer.favsWeatherData,
       favsFullData: state.UserFavoritesReducer.favsFullData
     },
     individualFavorites: {
       individualFavDetails: state.IndividualFavoritesReducer.individualFavDetails
     },
     appSettings: {
       activeColor: state.AppSettingsReducer.activeColor,
       degreeType: state.AppSettingsReducer.degreeType,
     }
   }
}

const mapDispatchToProps = (dispatch) => {
  return({
    // Google Service Actions
    toggleScriptLoadingState: (bool) => { dispatch(googleServiceAPIActions.toggleScriptLoadingState(bool)) },
    toggleScriptLoadedState: (bool) => { dispatch(googleServiceAPIActions.toggleScriptLoadedState(bool)) },
    toggleScriptErrorState: (bool) => { dispatch(googleServiceAPIActions.toggleScriptErrorState(bool)) },

    toggleIsLoading: (bool) => { dispatch(globalActions.toggleIsLoading(bool)) },
    toggleIsError: (bool) => { dispatch(globalActions.toggleIsError(bool)) },
    toggleIsEmpty: (bool) => { dispatch(globalActions.toggleIsEmpty(bool)) },

    // Individual Detailed User Favorites Actions
    setIndividualFavDetails: (favData) => { dispatch(individualFavoritesActions.setIndividualFavDetails(favData)) },
    resetInidividualFavDetailContainer: () => { dispatch(individualFavoritesActions.resetInidividualFavDetailContainer()) },
    fetchDetailedDarkSideData: (latLngObjArr) => { dispatch(individualFavoritesActions.fetchDetailedDarkSideData(latLngObjArr)) },

    // User Favorites Actions
    masterFavoritesReset: () => dispatch(userFavoritesActions.masterFavoritesReset()),

    toggleIsSelected: (bool) => { dispatch(globalActions.toggleIsSelected(bool)) },
    toggleIsActive: (bool) => { dispatch(globalActions.toggleIsActive(bool)) },
    toggleIsOpen: (bool) => { dispatch(globalActions.toggleIsOpen(bool)) },
    setFavorites: (array) => { dispatch(userFavoritesActions.setFavorites(array)) },
    resetSelectedItems: () => { dispatch(tempFavoriteActions.resetSelectedItems()) },
    setFavsLatLng: (latLngArr) => { dispatch(userFavoritesActions.setFavsLatLng(latLngArr)) },
    fetchBasicDarkSideData: (latLngObjArr) => { dispatch(userFavoritesActions.fetchBasicDarkSideData(latLngObjArr)) },
    removeSelectedFavorite: (string) => { dispatch(tempFavoriteActions.removeSelectedFavorite(string)) },
    setSelectedFavorites: (val) => { dispatch(tempFavoriteActions.setSelectedFavorites(val)) },
    setLocation: (string) => { dispatch(tempFavoriteActions.setLocation(string)) },
    resetLocationValue: () => { dispatch(tempFavoriteActions.resetLocationValue()) },
    setFavoritesFullData: (array) => { dispatch(userFavoritesActions.setFavoritesFullData(array)) },
    removeFavItem: (item) => { dispatch(userFavoritesActions.removeFavItem(item)) },
    removeFavLatLngItem: (item) => { dispatch(userFavoritesActions.removeFavLatLngItem(item)) },
    removeFavWeatherDataItem: (item) => { dispatch(userFavoritesActions.removeFavWeatherDataItem(item)) },
    removeFullFavItem: (item) => { dispatch(userFavoritesActions.removeFullFavItem(item)) },

    // App Settings Actions
    setActiveColor: (color) => { dispatch(appSettingActions.setActiveColor(color)) },
    setDegreeType: (bool) => { dispatch(appSettingActions.setDegreeType(bool)) },

    toggleIsLoaded: (bool) => { dispatch(globalActions.toggleIsLoaded(bool)) },
    setFavsWeatherData: (results) => { dispatch(userFavoritesActions.setFavsWeatherData(results)) }
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(AppContainer)
