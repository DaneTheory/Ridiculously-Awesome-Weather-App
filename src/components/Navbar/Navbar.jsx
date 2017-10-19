/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
// import Switch from 'react-toolbox/lib/switch'
// import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'

// Icons
// import SkullIcon from '../Icons/SkullIcon/SkullIcon'

// Styles
import styles from './Navbar.pcss'


const Navbar = (props) => {
  const{ navBarTitleChangeHandler, navBarIconChangeHandler, navBarColorChangeHandler, navBarIconOnClickHandler, editBttnDisplayHandler, generateIconMenuComponent, isSelected, degreeType, setDegreeType, favs, resetFavorites } = props
  // const menuStyleSwitchHandler = () => !isSelected ? styles.navbar__menu__inactive : styles.navbar__menu__active
  // const degreeTypeMenuItemCaptionHandler = () => !degreeType ? 'Fahrenheit' : 'Celsius'
  // const degreeTypeMenuItemIconIsCheckedHandler = () => !degreeType ? false : true
  // const degreeTypeMenuItemOnClickHandler = () => !degreeType ? setDegreeType(true) : setDegreeType(false)
  return (
    <AppBar className={ navBarColorChangeHandler() }
            title={ navBarTitleChangeHandler() }
            leftIcon={ navBarIconChangeHandler() }
            onLeftIconClick={ navBarIconOnClickHandler }>
              {/* <IconMenu className={ menuStyleSwitchHandler() }
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
                                    onCLick={ resetFavorites } />
              </IconMenu> */}
              { generateIconMenuComponent() }
              { editBttnDisplayHandler() }
    </AppBar>
  )
}

export default Navbar
