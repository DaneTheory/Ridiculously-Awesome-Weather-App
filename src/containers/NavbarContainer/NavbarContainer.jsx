/*=================================
            CONTAINER
==================================*/

// Deps
import React, { Component } from 'react'
import Moment from 'moment'

// Components
import Navbar from '../../components/Navbar/Navbar'
import EditButton from '../../components/EditButton/EditButton'
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'
import Switch from 'react-toolbox/lib/switch'

// Icons
import SkullIcon from '../../components/Icons/SkullIcon/SkullIcon'

// Styles
import styles from './NavbarContainer.pcss';


class NavbarContainer extends Component {
  constructor(props) {
    super(props)
    this.editBttnOnClickHandler     =    this.editBttnOnClickHandler.bind(this)
    this.navBarTitleChangeHandler   =    this.navBarTitleChangeHandler.bind(this)
    this.navBarIconChangeHandler    =    this.navBarIconChangeHandler.bind(this)
    this.navBarColorChangeHandler   =    this.navBarColorChangeHandler.bind(this)
    this.navBarIconOnClickHandler   =    this.navBarIconOnClickHandler.bind(this)
    this.editBttnDisplayHandler     =    this.editBttnDisplayHandler.bind(this)
    this.editBttnStyleHandler       =    this.editBttnStyleHandler.bind(this)
    this.editBttnTextChangeHandler  =    this.editBttnTextChangeHandler.bind(this)
    this.navBarSettingsMenuBttn     =    this.navBarSettingsMenuBttn.bind(this)
    this.generateIconMenuComponent  =    this.generateIconMenuComponent.bind(this)
    this.iconMenuResetBttnHandler   =    this.iconMenuResetBttnHandler.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const{ isEmpty, isActive, isSelected, individualFavDetails } = this.props
    return isEmpty !== nextProps.isEmpty
        || isActive !== nextProps.isActive
        || isSelected !== nextProps.isSelected
        || nextProps.individualFavDetails.length === 0
        || nextProps.individualFavDetails.length === 1
  }

  editBttnOnClickHandler() {
    const{ toggleIsActive, isActive} = this.props
    toggleIsActive(!isActive)
  }

  navBarTitleChangeHandler() {
    const{ isSelected, individualFavDetails } = this.props
    let date = Moment()
    const dateNavBarTitle = `${date.format('dddd')} - ${date.format('MMMM')} ${date.format('DD')}`
    return !isSelected ? dateNavBarTitle : individualFavDetails.map(detail => detail.title).toString()
  }

  navBarSettingsMenuBttn() {
    return (
      <IconMenu icon='more_vert' position='topLeft' menuRipple>
        <MenuItem value='download' icon='get_app' caption='Download' />
        <MenuItem value='help' icon='favorite' caption='Favorite' />
        <MenuItem value='settings' icon='open_in_browser' caption='Open in app' />
        <MenuDivider />
        <MenuItem value='signout' icon='delete' caption='Delete' disabled />
      </IconMenu>
    )
  }

  editBttnDisplayHandler() {
    const{ isSelected, isEmpty } = this.props
    return !isSelected ?
      isEmpty ?
        null : <EditButton editBttnOnClickHandler={ this.editBttnOnClickHandler }
                           editBttnStyleHandler={ this.editBttnStyleHandler() }
                           editBttnTextChangeHandler={ this.editBttnTextChangeHandler() } />
      :
      null
  }

  navBarIconChangeHandler() {
    const{ isSelected } = this.props
    return isSelected ? 'clear' : null
  }

  navBarColorChangeHandler() {
    const{ isSelected } = this.props
    return isSelected ? styles.header__navbar__isSelected : styles.header__navbar
  }

  navBarIconOnClickHandler() {
    const{ individualFavDetails, resetInidividualFavDetailContainer, toggleIsSelected } = this.props
    const resetDetailedFavContainerView = () => {
      toggleIsSelected(false)
      resetInidividualFavDetailContainer()
    }
    return individualFavDetails.length !== 0 ? resetDetailedFavContainerView() : null
  }

  editBttnStyleHandler() {
    const{ isActive } = this.props
    return isActive ? styles.navbar__button__isActive : styles.navbar__button
  }

  editBttnTextChangeHandler() {
    const{ isActive } = this.props
    return isActive ? `SAVE` : `EDIT`
  }

  editBttnDisplayHandler() {
    const{ isSelected, isEmpty } = this.props
    return !isSelected ?
      isEmpty ?
        null : <EditButton editBttnOnClickHandler={ this.editBttnOnClickHandler }
                           editBttnStyleHandler={ this.editBttnStyleHandler() }
                           editBttnTextChangeHandler={ this.editBttnTextChangeHandler() } />
      :
      null
  }

  iconMenuResetBttnHandler() {
    const{ masterFavoritesReset } = this.props
    return masterFavoritesReset
  }

  generateIconMenuComponent() {
    const{ isSelected, degreeType, setDegreeType, favs, masterFavoritesReset } = this.props
    const menuStyleSwitchHandler = () => !isSelected ? styles.navbar__menu__inactive : styles.navbar__menu__active
    const degreeTypeMenuItemCaptionHandler = () => !degreeType ? 'Fahrenheit' : 'Celsius'
    const degreeTypeMenuItemIconIsCheckedHandler = () => !degreeType ? false : true
    const degreeTypeMenuItemOnClickHandler = () => !degreeType ? setDegreeType(true) : setDegreeType(false)
    return (
      <IconMenu className={ menuStyleSwitchHandler() }
                icon='more_vert'
                position='auto'
                menuRipple>
                  <MenuItem className={ styles.navbar__menuItem }
                            icon={
                              <Switch className={ styles.navbar__menuItem__switchIcon }
                                      checked={ degreeTypeMenuItemIconIsCheckedHandler() }
                                      disabled />
                            }
                            caption={ degreeTypeMenuItemCaptionHandler() }
                            onClick={ degreeTypeMenuItemOnClickHandler }>

                  </MenuItem>
                  <MenuDivider />
                  <MenuItem className={ styles.navbar__menuItem__favoriteDetails }
                            disabled
                            caption='Active Favorites'>
                              <div className={ styles.navbar__menuItem__activeFavs }>{ favs.length }</div>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem className={ styles.navbar__menuItem__clear }
                            icon={ <SkullIcon /> }
                            caption='RESET'
                            onClick={ masterFavoritesReset }>
                  </MenuItem>
      </IconMenu>
    )
  }

  render() {
    return (
      <Navbar navBarTitleChangeHandler={ this.navBarTitleChangeHandler }
              navBarIconChangeHandler={ this.navBarIconChangeHandler }
              navBarColorChangeHandler={ this.navBarColorChangeHandler }
              navBarIconOnClickHandler={ this.navBarIconOnClickHandler }
              editBttnDisplayHandler={ this.editBttnDisplayHandler }
              generateIconMenuComponent={ this.generateIconMenuComponent } />
    )
  }
}

export default NavbarContainer
