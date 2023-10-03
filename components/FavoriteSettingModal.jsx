import { StyleSheet, TouchableOpacity, View, Text, Modal, ScrollView, TextInput, Pressable, Image } from "react-native"
import TextTicker from 'react-native-text-ticker'
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteSettingModal = (props) => {
  const [alreadySavedFavoriteWarnVisible, setAlreadySavedFavoriteWarnVisible] = useState(false)
    const fuelIconColor = [
        { name : 'Gazole' , iconColor: '#fedd3f'},
        { name : 'E10', iconColor: '#5add3f'},
        { name : 'E85', iconColor: '#308cf7'},
        { name : 'SP95', iconColor: '#45a532'},
        { name : 'SP98', iconColor: '#4ec535'},
        { name : 'GPLc', iconColor: '#9fbcfc'}
      ]

    useEffect(() => {
      // props.setFavorites([])
      // AsyncStorage.clear()
      setAlreadySavedFavoriteWarnVisible(false)
    }, [])


    const setFuelIconColor = (fuelName) => {
        let iconColor = ''
        fuelIconColor.map( fuelIcon => {
            if(fuelIcon.name == fuelName ){
                iconColor = fuelIcon.iconColor
            }
        })
        return iconColor
    }

    const addOneFavorite = async () => {
      setAlreadySavedFavoriteWarnVisible(false)
      try {
        let key = `${props.fuelType}_${props.cityNameFromGeoloc}_${props.distance}`
        let data = JSON.stringify({
          fuelType: props.fuelType,
          cityName: props.cityNameFromGeoloc,
          geoloc: props.geoLoc,
          distance: props.distance,
          default: false
        })
        //controle != config deja enregistré
        if(!props.favorites.some(e => e.key == key)){
          props.setReloadingFavorites(true)
          AsyncStorage.setItem(
            key,
            data,
            () => {
              AsyncStorage.getItem(key, (err, result) => {
                // console.log(result);
              });
              props.updateFavorites()
            },
          )
        }else{
          props.setReloadingFavorites(false)
          setAlreadySavedFavoriteWarnVisible(true)
        }
      } catch (error) {
        // Error saving data
      }
    }

    const deleteFavorite = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
        props.updateFavorites()
        return true;
      }
      catch(exception) {
          return false;
      }
    }

    const setFavoriteAsDefault = async (key) => {
      props.setReloadingFavorites(true)
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            store.map(station=>{
              if(key[0] == station[0]){
                let actualData = JSON.parse(station[1])
                actualData.default = !actualData.default
                AsyncStorage.mergeItem(station[0], JSON.stringify(actualData))
              }
              if(key[0] != station[0]){
                let otherData = JSON.parse(station[1])
                otherData.default = false
                AsyncStorage.mergeItem(station[0], JSON.stringify(otherData))
              }
            })
          })
          props.updateFavorites()
        })
      })
    }

    const setTextForDefault = (text) => {
      let textArranged = text.toString().split('_')
      return `Du ${textArranged[0]} dans un rayon de ${textArranged[2]} kms autour de ${textArranged[1]}`
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.favoriteModalVisible}
            onRequestClose={() => {
              props.setFavoriteModalVisible(!props.favoriteModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity 
                        style={[styles.button, styles.closeButton]}
                        onPress={() => 
                          {props.setFavoriteModalVisible(!props.favoriteModalVisible)
                          setAlreadySavedFavoriteWarnVisible(false)}
                        }
                        >
                        <Image
                        style={{width: 25, height: 25}}
                        source={require('../assets/images/ui/modal-close-cross.png')}
                        />
                    </TouchableOpacity>
                    <ScrollView
                      style={{
                        display:'flex',
                        width: '100%',
                        height: props.favorites.length > 3 ? 280 : 160,
                        marginTop: 12
                      }}
                    >
                      {props.reloadingFavorites && 
                        props.favorites.length > 0 && 
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            display:'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                          }}
                        >
                          <Text style={{
                            fontSize: 18, 
                            fontFamily: 'coolvetica rg', 
                            color: '#4c4c4c', 
                            padding: 8, 
                            marginLeft: 0,
                            marginTop: 10
                            }}>
                              Rechargement des favoris...
                          </Text>
                        </View>
                      }
                      {props.favorites.length > 0 &&
                        props.favorites.map((favorite, index) => {
                          return(
                            <View
                              key={index}
                              >
                              <View 
                              style={{borderRadius: 4, display: 'flex', flexDirection: 'row', width: '100%', height: 45, backgroundColor: '#efefef', padding: 5, marginTop: 5}}>
                                <View
                                  style={{
                                    width: '7%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff', 
                                    borderRadius: 4, 
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={()=>{
                                      setFavoriteAsDefault(favorite.key)
                                    }}
                                  >
                                    <Image
                                        style={styles.phone}
                                        source={JSON.parse(favorite.data).default ? require('../assets/images/ui/phone-start-selected.png') : require('../assets/images/ui/phone-start-unselected.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    width: '22%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: setFuelIconColor(JSON.parse(favorite.data).fuelType), 
                                    borderRadius: 4, 
                                    marginLeft: 8
                                  }}
                                >
                                  <Text style={{
                                      fontSize: 16, 
                                      fontFamily: 'coolvetica rg', 
                                      color: 'white', 
                                      padding: 8, 
                                      marginLeft: 0,
                                      }}>
                                        {JSON.parse(favorite.data).fuelType}
                                    </Text>
                                </View>
                                <View style={{borderRadius: 4, width: 75, backgroundColor: '#3ac2cd', marginLeft: 8, marginRight: 8}}>
                                    <TextTicker
                                        style={{ fontSize: 16, fontFamily: 'coolvetica rg', padding: 8, color: 'white'}}
                                        duration={3000}
                                        loop
                                        bounce
                                        repeatSpacer={50}
                                        marqueeDelay={1000}
                                    >
                                        {JSON.parse(favorite.data).cityName}
                                    </TextTicker>
                                </View>
                                <View
                                  style={{
                                    width: '22%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#29a7e4', 
                                    borderRadius: 4, 
                                  }}
                                >
                                  <Text style={{fontSize: 16, fontFamily: 'coolvetica rg', color: 'white', padding: 8}}>
                                      {JSON.parse(favorite.data).distance} kms
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: '12%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f1654c', 
                                    borderRadius: 4, 
                                    marginLeft: 8
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={()=>{
                                      deleteFavorite(favorite.key.toString())
                                      props.setReloadingFavorites(true)
                                    }}
                                  >
                                    <Image
                                        style={styles.trash}
                                        source={require('../assets/images/ui/trash.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                            </View>
                            {JSON.parse(favorite.data).default &&
                              <View
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#efefef', 
                                    borderRadius: 4, 
                                  }}
                                >
                                <Text style={{fontSize: 11, fontFamily: 'coolvetica rg', color: 'grey', padding: 5}}>
                                    {setTextForDefault(favorite.key)} s'affichera au démarrage de l'application
                                  </Text>
                              </View>
                            }
                          </View>
                          )
                        })
                      }
                    </ScrollView>
                    {alreadySavedFavoriteWarnVisible &&
                      <Text 
                          style={{fontFamily: 'coolvetica rg', color: '#c02b0f', fontSize: 11}}
                      >
                          Cet enregistrement existe déjà.
                      </Text>
                    }
                    <View style={{borderRadius: 4, display: 'flex', flexDirection: 'row', width: '98%', backgroundColor: '#efefef', padding: 5, marginTop: 15}}>
                      <View
                        style={{
                          width: '22%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: setFuelIconColor(props.fuelType), 
                          borderRadius: 4, 
                          marginLeft: 8
                        }}
                      >
                        <Text style={{
                            fontSize: 16, 
                            fontFamily: 'coolvetica rg', 
                            color: 'white', 
                            padding: 8, 
                            marginLeft: 0,
                            }}>
                              {props.fuelType}
                          </Text>
                      </View>
                        <View style={{borderRadius: 4, width: 65, backgroundColor: '#3ac2cd', marginLeft: 8, marginRight: 8}}>
                            <TextTicker
                                style={{ fontSize: 16, fontFamily: 'coolvetica rg', padding: 10, color: 'white'}}
                                duration={3000}
                                loop
                                bounce
                                repeatSpacer={50}
                                marqueeDelay={1000}
                            >
                                {props.cityNameFromGeoloc}
                            </TextTicker>
                        </View>
                        <View
                          style={{
                            width: '22%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#29a7e4', 
                            borderRadius: 4, 
                          }}
                        >
                          <Text style={{fontSize: 16, fontFamily: 'coolvetica rg', color: 'white', padding: 6}}>
                              {props.distance} kms
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={()=>{
                            addOneFavorite()
                            props.setOpenFavoritesView(true)
                            // getAllFavorites()
                          }}
                        >
                          <Image
                              style={styles.floppy}
                              source={require('../assets/images/ui/floppy-icon.png')}
                          />
                        </TouchableOpacity>
                    </View>
                    <Text 
                        style={{fontFamily: 'coolvetica rg', color: '#4e4e4e', fontSize: 11}}
                    >
                        Appuyez sur la disquette pour enregistrer ces paramètres
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

export default FavoriteSettingModal

const styles = StyleSheet.create({
    
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    width: 360,
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 5
  },
  buttonDelete:{
    backgroundColor: '#999999',
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  closeButton:{
    position: 'absolute',
    zIndex: 5,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#fff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput:{
    backgroundColor:'#d5d5d5', 
    height: 40, 
    width: 150,
    color:'#474747',
    borderRadius: 4,
    fontFamily: 'coolvetica rg',
    fontSize: 15
  },
  loadingWarning:{
    color: '#474747', 
    fontFamily: 'coolvetica rg',
    marginTop: 20,
    marginBottom: 20
  },
  resultsContainer:{
    width: '90%',
    // marginBottom: 15
  },
  cityResultBtn:{
    flex: 1,
    flexDirection: 'row', 
    // justifyContent: 'space-around', 
    // alignItems: 'flex-start',
    width: 220,
    height: 24,
    backgroundColor: '#eaeaea',
    marginTop: 3,
    padding: 2,
    borderRadius: 4
  },
  cityResultName:{
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    color:'#474747', 
    fontFamily: 'coolvetica rg',
    fontSize: 14
  },
  cityResultCP:{
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    color:'#474747', 
    fontFamily: 'coolvetica rg',
    fontSize: 14
  },
  deleteCross:{
    width: 25,
    height: "auto",
    position: 'absolute',
    zIndex: 5
  },
  floppy:{
      position: 'absolute',
      zIndex: -1,
      width: 36,
      height: 36,
      marginTop: 1,
      marginLeft: 24
  },
  trash:{
      width: 32,
      height: 32,
  },
  phone:{
      width: 20,
      height: 35,
  },
})