/*=================================
            CONTAINER
==================================*/

// Deps
import React, { Component } from 'react';
import { List, ListSubHeader } from 'react-toolbox/lib/list';

// Components
import TempFavoritesListItem from '../../components/TempFavoritesListItem/TempFavoritesListItem';

// Styles
import styles from './TempFavoritesListContainer.pcss';


export default class TempFavoritesListContainer extends Component {
  constructor(props) {
    super(props)
    this.generateListSubHeaderCaptionHandler              =     this.generateListSubHeaderCaptionHandler.bind(this)
    this.generateTemporaryListItemLimitDisplayHandler     =     this.generateTemporaryListItemLimitDisplayHandler.bind(this)
  }

  generateListSubHeaderCaptionHandler() {
    const{ selectedFavorites } = this.props
    return selectedFavorites.length > 0 ? 'Locations to add to favorites' : ''
  }

  generateTemporaryListItemLimitDisplayHandler() {
    const{ selectedFavorites } = this.props
    return selectedFavorites.length > 0 ? `Remaining selections: ${selectedFavorites.length}/5` : ''
  }

  render() {
    const{ selectedFavorites, removeTemporaryItemsFromUserInputListHandler, removeTemporaryItemsFromUserInputListOnIconClickHandler, temporaryItemListFromUserInputOnChangeHandler, favs } = this.props
    const selectionLimit = 5
    return (
      <List selectable ripple>
        <ListSubHeader  className={ styles.dialog__list__subHeader__one }
                        caption={ this.generateListSubHeaderCaptionHandler() } />
        <ListSubHeader  className={ styles.dialog__list__subHeader__two }
                        caption={ this.generateTemporaryListItemLimitDisplayHandler() } />
        <TempFavoritesListItem selectedFavorites={ selectedFavorites }
                               removeTemporaryItemsFromUserInputListHandler={ removeTemporaryItemsFromUserInputListHandler }
                               removeTemporaryItemsFromUserInputListOnIconClickHandler={ removeTemporaryItemsFromUserInputListOnIconClickHandler }
                               temporaryItemListFromUserInputOnChangeHandler={ temporaryItemListFromUserInputOnChangeHandler }
                               favs={ favs }
                               selectionLimit={ selectionLimit } />
      </List>
    )
  }
}
