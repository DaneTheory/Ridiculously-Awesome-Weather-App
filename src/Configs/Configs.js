// GLOBAL APP CONFIGS AND RESOURCES
import DarkSkyApi from 'dark-sky-api';


const googlePlacesAPIKey = process.env.GOOGLE_PLACES_API_KEY
const googlePlacesAPIEndpoint = `https://maps.googleapis.com/maps/api/js?key=${googlePlacesAPIKey}&libraries=places`

const darkSkyAPIKey = process.env.DARK_SKY_API_KEY
const darkSkyAPIEndpoint = `https://api.darksky.net/forecast/${darkSkyAPIKey}/`

DarkSkyApi.apiKey = darkSkyAPIKey;

DarkSkyApi.language = 'en';
DarkSkyApi.postProcessor = (item) => {
  item.NiceFormat = item.dateTime.calendar(null, {
    sameDay: '[Today]',
    nextDay: 'ddd',
    nextWeek: 'ddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] ddd',
    sameElse: 'ddd'
  });

  item.units = DarkSkyApi.getResponseUnits();

  return item
}

const GlobalConfigs = {
  GOOGLE_PLACES_API_KEY: googlePlacesAPIKey,
  GOOGLE_PLACES_API_ENDPOINT: googlePlacesAPIEndpoint,
  DARK_SKY_API_KEY: darkSkyAPIKey,
  DARK_SKY_API_ENDPOINT: darkSkyAPIEndpoint
}

export default {
  ...GlobalConfigs
};
