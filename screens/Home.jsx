import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-async-storage/async-storage';

import DistanceBar from '../components/DistanceBar';
import FuelTypesBar from '../components/FuelTypesBar';
import GasStationsView from '../components/GasStationsView';
import PositionOptionsBar from '../components/PositionOptionsBar';
import CitySearchModal from '../components/CitySearchModal';
import PalmaresView from '../components/PalmaresView';
import GasStationModal from '../components/GasStationModal';
import FavoritesView from '../components/FavoritesView';
import FavoriteSettingModal from '../components/FavoriteSettingModal';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Home = () => {
  const [geoLoc, setGeoLoc] = useState(false)
  const [fuelPrices, setFuelPrices] = useState()
  const [modalLoading, setModalLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [gasStations, setGasStations] = useState([])
  const [distance, setDistance] = useState(20)
  const [fuelType, setFuelType] = useState('Gazole')
  const [cpModalVisible, setCpModalVisible] = useState(false);
  const [cities, setCities] = useState([])
  const [text, setText] = useState('');
  const [cityNameFromGeoloc, setCityNameFromGeoloc] = useState('')
  const [connectionStatus, setConnectionStatus] = useState(true)
  const [isActualPosition, setIsActualPosition] = useState(false)
  const [gasStationModalVisible, setGasStationModalVisible] = useState(false)
  const [gasStationSelected, setGasStationSelected] = useState()
  const [favoriteModalVisible, setFavoriteModalVisible] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [isUpdatingFavorites, setIsUpdatingFavorites] = useState(false)
  const [reloadingFavorites, setReloadingFavorites] = useState(false)
  const [openFavoritesView, setOpenFavoritesView] = useState(false)
  const [isSetFavorite, setIsSetFavorite] = useState(false)

  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8134166300734689/9107372904';

  const MINUTE_MS = 5000;
  var tenMinutesTimer = 0

  useEffect(() => {
    // getAllServices()
    checkConnexion()
    if(!fuelPrices){
      fetchFuelPrices()
    }
    if(!geoLoc){
      getActualLocation()
    }
    filterGasStationOnDistance(20)
    
    if(favorites.length == 0 && isUpdatingFavorites == false){
      setIsUpdatingFavorites(true)
      getAllFavorites()
    }

    if(favorites.length > 0 && !isSetFavorite){
      setStartFavorite()
    }

    const interval = setInterval(() => {
      if (connectionStatus == false) {
        checkConnexion()
      }else{
        if(isActualPosition){
          trackActualLocation()
          fetchCityOnCoords(geoLoc)
        }
        updateFuelPrices()
      }
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [geoLoc, fuelPrices, connectionStatus])

  const setAllSettings = (favoriteData) => {
    setFuelType('')
    setDistance('')
    setFuelType(favoriteData.fuelType)
    setGeoLoc(favoriteData.geoloc)
    setIsActualPosition(false)
    setCityNameFromGeoloc(favoriteData.cityName)
    setDistance(favoriteData.distance)
    filterGasStationOnDistance(distance)
  }

  const getAllFavorites = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          setFavorites(favorites=>[...favorites, {key: [store[i][0]], data: store[i][1]}])
          setReloadingFavorites(false)
          return true;
        })
      })
    })
  }

  const setStartFavorite = () => {
      favorites.map((favorite)=>{
        console.log(JSON.parse(favorite.data))
        if(JSON.parse(favorite.data).default){
          console.log(JSON.parse(favorite.data))
          setAllSettings(JSON.parse(favorite.data))
          setIsSetFavorite(true)
        }
      })
  }

  const updateFavorites = async () => {
    setFavorites([])
    getAllFavorites()
    setReloadingFavorites(false)
  }

  //get all services
  const getAllServices = () => {
    let allServices = []
    if(fuelPrices){
      fuelPrices.map((fuelPrice) => {
        if(fuelPrice.services_service){
          fuelPrice.services_service.map((service)=>{
            if(!allServices.includes(service)){
              allServices.push(service)
            }
          })
        }
      })
    }
  }

  const getActualLocation = () => {
    setIsActualPosition(true)
    Geolocation.getCurrentPosition(
      position => {
        setGeoLoc(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        setGeoLoc(false);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    )
  }

  // Mobile movement tracking
  const trackActualLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        if(getDistanceFromLatLonInKm(geoLoc.coords.latitude, geoLoc.coords.longitude, position.coords.lat, position.coords.lon) > 1){
          setGeoLoc(position)
          filterGasStationOnDistance(distance)
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    )
  }

  // Mise à jour des données de prix toutes les 10 min
  const updateFuelPrices = () => {
    tenMinutesTimer++
    if(tenMinutesTimer == 119){
      fetchFuelPrices()
      setDistance(20)
      filterGasStationOnDistance(distance)
      tenMinutesTimer = 0
    }
  }

  const fetchFuelPrices = async () => {
    checkConnexion()
    if(connectionStatus){
      try {
        setFetchLoading(true)
        await fetch("https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/exports/json")
        .then(async response => {
          await response.json()
          .then( async json => {
            setFuelPrices(json);
            console.log('is fetching....');
            setFetchLoading(false)
          })
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  const filterGasStationOnDistance = (dist) => {
    setGasStations([])
    if(fuelPrices){
      fuelPrices.map((post) => {
        if(post.geom){
          if(getDistanceFromLatLonInKm(geoLoc.coords.latitude, geoLoc.coords.longitude, post.geom.lat, post.geom.lon) < dist) {
            // ajoute a la volée la marque de la station, a reproduire avec le logo
            let brandName = setGasStationBrand(post.id)
            let logoURI = ''
            if(brandName){
              logoURI = setGasStationLogo(brandName)
            }
            if (logoURI) {
              setGasStations((gasStations) => [...gasStations, { ...post, brandName: brandName, logoURI: logoURI}])
            }
          }
        }
      })
    }
  }

  const setGasStationBrand = (id) => {
    const AllMarquesEnseignesFR = require('../assets/stations_marques.json') 
    let brandName = ''
    if(AllMarquesEnseignesFR){
      AllMarquesEnseignesFR.map( enseigne => {
        if(enseigne.id == id ){
            brandName = enseigne.marque
        }
      })
      return brandName
    }
  }

  const setGasStationLogo = (brandName) => {
    const distinctsMarques = require('../assets/distincts_marques.json')
    let logoPath = ''
    if(distinctsMarques){
      distinctsMarques.map( brand => {
        if(brand.nom == brandName ){
          logoPath = brand.img
        }
      })
      return logoPath
    }
  }

  const handleSetDistance = (dist) => {
    filterGasStationOnDistance(dist)
    setDistance(dist)
  }

  const handleGetMyActualPos = () => {
    setCityNameFromGeoloc('')
    checkConnexion()
    getActualLocation()
    // fetchCityOnCoords(geoLoc)
    setDistance(20)
    filterGasStationOnDistance(distance)
  }

  const handleCitySearchInput = (text) => {
    if(text.length > 3){
      setText(text)
      fetchCities(text)
    }
  }

  const fetchCityOnCoords = async (position) => {
    checkConnexion()
    // console.log('connectionStatus : ' + connectionStatus);
    if(connectionStatus){
      try {
        await fetch(`https://geo.api.gouv.fr/communes?lat=${position.coords.latitude}&lon=${position.coords.longitude}&fields=nom,codesPostaux`)
        .then(async response => {
          await response.json()
          .then( async json => {
            setCityNameFromGeoloc(json[0].nom)
          })
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  const fetchCities = async (value) => {
    checkConnexion()
    if(connectionStatus){
      try {
        setModalLoading(true)
        await fetch("https://geo.api.gouv.fr/communes?nom=" + value)
        .then(async response => {
          await response.json()
          .then( async json => {
            let newArray = json.map((item) => {
              return {key: item.codesPostaux[0], value: item.nom}
            })
            setCities([])
            newArray.map((city, index) => {
              if(index < 20){
                setCities(cities => [...cities, city])
              }
            })
            console.log('is fetching cities....');
          })
        })
        setModalLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleCity = (cityCp, cityName) => {
    const AllCitiesFR = require('../assets/cities.json')
    if(AllCitiesFR){
      AllCitiesFR.cities.map((city) => {
        if(city.zip_code == cityCp){
          setGeoLoc({coords: {latitude: parseFloat(city.latitude), longitude: parseFloat(city.longitude)}})
        }
      })
    }
    setCityNameFromGeoloc(cityName)
    setDistance(20)
    setGasStations([])
    filterGasStationOnDistance()
    setCpModalVisible(false)
  }

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  const checkConnexion = () => {
    NetInfo.fetch().then(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      if(!state.isConnected){
        setConnectionStatus(false)
      }else{
        setConnectionStatus(true)
      }
    })
  }

  return (
    <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={require('../assets/images/ui/BG-app.png')}
      >
        <FuelTypesBar
          fuelType={fuelType}
          setFuelType={setFuelType}
        />
        <View>
          <FavoritesView
            setFavoriteModalVisible={setFavoriteModalVisible}
            favorites={favorites}
            setAllSettings={setAllSettings}
            openFavoritesView={openFavoritesView}
            setOpenFavoritesView={setOpenFavoritesView}
            isActualPosition={isActualPosition}
            setIsActualPosition={setIsActualPosition}
          />
          <FavoriteSettingModal
            setFavoriteModalVisible={setFavoriteModalVisible}
            favoriteModalVisible={favoriteModalVisible}
            geoLoc={geoLoc}
            cityNameFromGeoloc={cityNameFromGeoloc}
            fuelType={fuelType}
            distance={distance}
            favorites={favorites}
            setFavorites={setFavorites}
            updateFavorites={updateFavorites}
            reloadingFavorites={reloadingFavorites}
            setOpenFavoritesView={setOpenFavoritesView}
            setReloadingFavorites={setReloadingFavorites}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around', width: '100%', height: 40}}> 
          {!connectionStatus &&
            <Text style={styles.noConnectionWarning}>Pas de connexion internet</Text>
          }
          {cityNameFromGeoloc &&
              <Text 
                style={styles.cityNameFromGeoloc}
              >{cityNameFromGeoloc}</Text>
          }
        </View>
        <View style={styles.optionsBarContainer}>
            <PositionOptionsBar
              handleGetMyActualPos={handleGetMyActualPos}
              setCpModalVisible={setCpModalVisible}
              cpModalVisible={cpModalVisible}
              /> 
            <CitySearchModal
              setCpModalVisible={setCpModalVisible}
              cpModalVisible={cpModalVisible}
              handleCitySearchInput={handleCitySearchInput}
              setText={setText}
              setCities={setCities}
              text={text}
              handleCity={handleCity}
              modalLoading={modalLoading}
              cities={cities}
              setIsActualPosition={setIsActualPosition}
              />
        </View>
        <PalmaresView
              gasStations={gasStations}
              fuelType={fuelType}
              fetchLoading={fetchLoading}
              setGasStationModalVisible={setGasStationModalVisible}
              setGasStationSelected={setGasStationSelected}
            />
          <DistanceBar
            distance={distance}
            handleSetDistance={handleSetDistance}
            />
          <GasStationsView
              gasStations={gasStations}
              fuelType={fuelType}
              setGasStationModalVisible={setGasStationModalVisible}
              setGasStationSelected={setGasStationSelected}
            />
            {gasStationSelected &&
              <GasStationModal
                gasStationSelected={gasStationSelected}
                gasStationModalVisible={gasStationModalVisible}
                setGasStationModalVisible={setGasStationModalVisible}
              />
            }
          {
            gasStations.length > 0 &&
            <BannerAd
              unitId={
                adUnitId
                // 'ca-app-pub-8134166300734689/9107372904'
              }
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          }
      </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  warnConnexionStatus:{
    marginTop: 5,
    color: 'white',
    marginRight: '65%',
    width: '35%',
  },
  cityNameFromGeoloc:{
    marginTop: 15,
    color: 'white',
    marginLeft: 40,
    width: '55%',
    fontFamily: 'coolvetica rg',
    fontSize: 18
  },
  noConnectionWarning:{
    marginTop: 15,
    color: '#ee2020',
    width: '60%',
    fontFamily: 'coolvetica rg',
    fontSize: 18,
    marginLeft: 35
  },
  optionsBarContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 90,
    marginLeft: 135,
    position: 'absolute',
  },
  fuelTypeBtn:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    padding: 10,
    fontSize: 14
  },
  distanceBtn:{
    backgroundColor: '#29a7e4'
  },
  backgroundImage:{
    flex:1,
      position: 'absolute',
      zIndex: -10,
      width: '100%',
      height: '100%'
  },
  podium:{
    position: 'absolute',
  }
})