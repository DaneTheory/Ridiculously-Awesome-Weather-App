/*=================================
            CONTAINER
==================================*/

// Deps
import React, { Component } from 'react'
import { Button } from 'react-toolbox/lib/button'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Dialog from 'react-toolbox/lib/dialog'

// Containers
import TempFavoritesListContainer from '../TempFavoritesListContainer/TempFavoritesListContainer'

// Components
import FAB from '../../components/FAB/FAB'
import AutocompleteDialog from '../../components/AutocompleteDialog/AutocompleteDialog'

// Styles
import styles from './FABContainer.pcss'
import AutoCompleteDialogStylesObject from './AutoCompleteDialogStylesObject'


class FABContainer extends Component {
  constructor(props) {
    super(props)
    this.fabBttnOnClickHandler                                      =       this.fabBttnOnClickHandler.bind(this)
    this.fabBttnCreationHandler                                     =       this.fabBttnCreationHandler.bind(this)
    this.fabUserInputPopUpCreationHandler                           =       this.fabUserInputPopUpCreationHandler.bind(this)
    this.fabFullComponentCreationHandler                            =       this.fabFullComponentCreationHandler.bind(this)
    this.autoCompleteSuggestionItemHandler                          =       this.autoCompleteSuggestionItemHandler.bind(this)
    this.userInputOnClickSubmitHandler                              =       this.userInputOnClickSubmitHandler.bind(this)
    this.removeTemporaryItemsFromUserInputListHandler               =       this.removeTemporaryItemsFromUserInputListHandler.bind(this)
    this.removeTemporaryItemsFromUserInputListOnIconClickHandler    =       this.removeTemporaryItemsFromUserInputListOnIconClickHandler.bind(this)
    this.temporaryItemListFromUserInputOnChangeHandler              =       this.temporaryItemListFromUserInputOnChangeHandler.bind(this)
    this.userInputValueOnChangeHandler                              =       this.userInputValueOnChangeHandler.bind(this)
    this.autoCompleteListItemOnSelectHandler                        =       this.autoCompleteListItemOnSelectHandler.bind(this)
    this.cancelBttnOnClickHandler                                   =       this.cancelBttnOnClickHandler.bind(this)
    this.userInputPopUpBttnActionsHandler                           =       this.userInputPopUpBttnActionsHandler.bind(this)
    this.userInputFormInitialProps                                  =       this.userInputFormInitialProps.bind(this)
    this.userInputLimitHandler                                      =       this.userInputLimitHandler.bind(this)
    this.userInputPopUpDialogViewCreationHandler                    =       this.userInputPopUpDialogViewCreationHandler.bind(this)
  }

  fabBttnOnClickHandler() {
    const{ isOpen, toggleIsActive, toggleIsOpen } = this.props
    !isOpen ? toggleIsActive(isOpen) : null
    toggleIsOpen(!isOpen)
  }

  fabBttnCreationHandler() {
    return (
      <Button className={ styles.footer__fab }
              icon='add'
              floating
              onClick={ this.fabBttnOnClickHandler } />
    )
  }

  autoCompleteSuggestionItemHandler({ suggestion }) {
    const{ selectedFavorites } = this.props
    return selectedFavorites.length < 5 ?
      <div><i className="fa fa-map-marker"/>{ [...new Set(suggestion.split())].toString() }</div>
      :
      null
  }

  userInputOnClickSubmitHandler(e) {
    e.preventDefault()
    const{ isOpen, toggleIsLoading, selectedFavorites, setFavorites, toggleIsOpen, resetSelectedItems, setFavsLatLng, fetchBasicDarkSideData } = this.props
    return Promise.resolve(toggleIsLoading(true))
      .then(() => [...new Set(selectedFavorites)])
      .then(dedupedSelectedFavs => {
        setFavorites(dedupedSelectedFavs)
        return dedupedSelectedFavs
      })
      .then(dedupedFavs => {
        toggleIsOpen(!isOpen)
        resetSelectedItems()
        return [...new Set(dedupedFavs)]
      })
      .then(dedupedFavorites => {
        return dedupedFavorites.map((fav,i) => {
          return geocodeByAddress(fav)
            .then(results => getLatLng(results[0]))
            .then(latLng => latLng)
            .catch(error => new Error(error))
        })
      })
      .then(favslatLngPromise => {
        return Promise.all(favslatLngPromise)
      })
      .then(favsLatLngArr => {
        return Array.from(new Set(favsLatLngArr))
      })
      .then(dedupedLatLngArr => {
        setFavsLatLng(Array.from(new Set(dedupedLatLngArr)))
        return Array.from(new Set(dedupedLatLngArr))
      })
        .then(data => {
          const latLngArr = Array.from(new Set(data.map(info => {
            return {
              lat: info.lat,
              lng: info.lng
            }
          })))
          return fetchBasicDarkSideData(latLngArr)
        })
        .then(data => {
          return data
        })
        .then(() => {
          return toggleIsLoading(false)
        })
        .catch(error => {
          return new Error(error)
        })

  }

  removeTemporaryItemsFromUserInputListHandler(e) {
    e.preventDefault()
    const{ removeSelectedFavorite } = this.props
    return removeSelectedFavorite(e.target.textContent)
  }

  removeTemporaryItemsFromUserInputListOnIconClickHandler(e) {
    e.preventDefault()
    const{ removeSelectedFavorite } = this.props
    return removeSelectedFavorite(e.target.parentElement.parentNode.parentNode.parentNode.firstChild.firstChild.textContent)
  }

  temporaryItemListFromUserInputOnChangeHandler(value) {
    console.log('List Item Change! WOOOOO!')
    console.log(value)
  }

  userInputValueOnChangeHandler() {
    console.log('Input Value Changed! YEAAAA!')
  }

  autoCompleteListItemOnSelectHandler(location, placeId) {
    const{ favs, setSelectedFavorites, resetLocationValue } = this.props
    return geocodeByAddress(location)
      .then(results => results[0].formatted_address)
      .then(favorite => favs.indexOf(favorite) > -1 ? null : setSelectedFavorites(favorite))
      .then(() => resetLocationValue())
      .catch(error => new Error(error))
  }

  cancelBttnOnClickHandler() {
    const{ resetSelectedItems } = this.props
    return resetSelectedItems()
  }

  userInputPopUpBttnActionsHandler() {
    const{ selectedFavorites } = this.props
    return selectedFavorites.length === 0 ?
      null
      :
      <div className={ styles.dialog__bttns__wrapper}>
        <Button className={ styles.dialog__bttns__submit }
                type="submit"
                label='Submit'
                raised />
        <Button className={ styles.dialog__bttns__cancel }
                onClick={ this.cancelBttnOnClickHandler }
                type="clear"
                label='Clear'
                raised />
      </div>
  }

  userInputFormInitialProps() {
    const{ location, setLocation } = this.props
    return {
      value: location,
      onChange: (location) => setLocation(location),
      onBlur: () => console.log('User Input Blur Event! YeeeeHAWW!!!'),
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true
    }
  }

  userInputLimitHandler() {
    const{ selectedFavorites } = this.props
    return selectedFavorites.length < 5 ? <PlacesAutocomplete inputProps={ this.userInputFormInitialProps() }
                                                              onSelect={ this.autoCompleteListItemOnSelectHandler }
                                                              autocompleteItem={ this.autoCompleteSuggestionItemHandler }
                                                              styles={ AutoCompleteDialogStylesObject } />
                                                              :
                                                              null
  }

  userInputPopUpDialogViewCreationHandler() {
    const{ isOpen, selectedFavorites, favs } = this.props
    return (
      <Dialog className={ styles.dialog__box__wrapper }
              title="City Search"
              active={ isOpen }
              onEscKeyDown={ this.fabBttnOnClickHandler }
              onOverlayClick={ this.fabBttnOnClickHandler }>
                <form onSubmit={ this.userInputOnClickSubmitHandler }>
                  { this.userInputLimitHandler() }
                    <i className={ styles.bar }></i>
                      <div className={ styles.dialog__list__container }>
                        <TempFavoritesListContainer removeTemporaryItemsFromUserInputListHandler={ this.removeTemporaryItemsFromUserInputListHandler }
                                                    removeTemporaryItemsFromUserInputListOnIconClickHandler={ this.removeTemporaryItemsFromUserInputListOnIconClickHandler }
                                                    temporaryItemListFromUserInputOnChangeHandler={ this.temporaryItemListFromUserInputOnChangeHandler }
                                                    selectedFavorites={ selectedFavorites }
                                                    favs={ favs } />
                      </div>
                      { this.userInputPopUpBttnActionsHandler() }
                </form>
      </Dialog>
    )
  }

  fabUserInputPopUpCreationHandler() {
    const{ isOpen } = this.props
    return (
      <AutocompleteDialog userInputValueOnChangeHandler={ this.userInputValueOnChangeHandler }
                          userInputPopUpDialogViewCreationHandler={ this.userInputPopUpDialogViewCreationHandler } />
    )
  }

  fabFullComponentCreationHandler() {
    const{ isSelected } = this.props
    return (
      isSelected ? null : <div>{ this.fabBttnCreationHandler() }{ this.fabUserInputPopUpCreationHandler() }</div>
    )
  }

  render() {
    return (
      <div>
        <FAB fabFullComponentCreationHandler={ this.fabFullComponentCreationHandler } />
      </div>
    )
  }
}

export default FABContainer
