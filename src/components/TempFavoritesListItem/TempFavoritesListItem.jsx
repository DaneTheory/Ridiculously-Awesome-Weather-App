/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import FontIcon from 'react-toolbox/lib/font_icon';

// Styles
import styles from './TempFavoritesListItem.pcss';


const TempFavoritesListItem = (props) => {
  const{ selectedFavorites, removeTemporaryItemsFromUserInputListHandler, removeTemporaryItemsFromUserInputListOnIconClickHandler, temporaryItemListFromUserInputOnChangeHandler, favs, selectionLimit } = props
  const temporaryListItemsGenerationHandler = () => {
    const temporaryListItemSelectionsAlreadyChosenHandler = () => {
      return [...new Set(selectedFavorites)]
        .filter((el,i,arr) => [...new Set(favs)])
        .map((fav,index) => {
          return (
            <ListItem className={ styles.dialog__list__item__wrapper }
                      key={ index }
                      caption={ fav }
                      onClick={ removeTemporaryItemsFromUserInputListHandler }
                      rightIcon={ <FontIcon onClick={ removeTemporaryItemsFromUserInputListOnIconClickHandler } value='clear' disabled={ true } className={ styles.dialog__list__item__icon } /> }>
            </ListItem>
          )
        })
    }
    return selectedFavorites.length > 0 ? temporaryListItemSelectionsAlreadyChosenHandler() : null
  }
  return (<div>{ temporaryListItemsGenerationHandler() }</div>)
}

export default TempFavoritesListItem
