export default {
  globalSettings: {
    isEmpty: true,
    isSelected: false,
    isActive: false,
    isOpen: false,
    isLoading: false,
    isError: false,
    isLoaded: false
  },
  googleServices: {
    scriptLoading: false,
    scriptLoaded: false,
    scriptError: false
  },
  tempFavorites: {
    location: '',
    selectedFavorites: []
  },
  userFavorites: {
    favs: [],
    favsLatLng: [],
    favsWeatherData: [],
    favsFullData: []
  },
  individualFavorites: {
    individualFavDetails: []
  },
  appSettings: {
    activeColor: '',
    degreeType: false
  }
};
