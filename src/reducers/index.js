// Redux
import { combineReducers } from 'redux';

// Reducers
import GlobalStateVerificationReducer from './GlobalStateVerificationReducer'
import GoogleServicesAPIReducer from './GoogleServicesAPIReducer'
import TempFavoritesReducer from './TempFavoritesReducer'
import UserFavoritesReducer from './UserFavoritesReducer'
import IndividualFavoritesReducer from './IndividualFavoritesReducer'
import AppSettingsReducer from './AppSettingsReducer'


// Root Reducer
const rootReducer = combineReducers({
  GlobalStateVerificationReducer,
  GoogleServicesAPIReducer,
  TempFavoritesReducer,
  UserFavoritesReducer,
  IndividualFavoritesReducer,
  AppSettingsReducer
})

export default rootReducer;
