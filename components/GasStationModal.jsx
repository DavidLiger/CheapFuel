import { StyleSheet, TouchableOpacity, View, Text, Modal, ScrollView, TextInput, Pressable, Image, Linking, Platform } from "react-native"
import assetsObject from "./AssetsImages"
import { useEffect, useState } from "react";

const GasStationModal = (props) => {
    const [disposableFuels, setDisposableFuels] = useState([])
    const [services, setServices] = useState([])

    const fuelPumpGun = [
      { name : 'Gazole' , img: 'b7PumpGun', iconColor: '#fedd3f'},
      { name : 'E10', img : 'e10PumpGun', iconColor: '#5add3f'},
      { name : 'E85', img : 'e85PumpGun', iconColor: '#308cf7'},
      { name : 'SP95', img : 'sp95PumpGun', iconColor: '#45a532'},
      { name : 'SP98', img : 'sp98PumpGun', iconColor: '#4ec535'},
      { name : 'GPLc', img : 'gplcPumpGun', iconColor: '#9fbcfc'}
    ]

    const servicesLogo = [
      {name: "Toilettes publiques", retailName: "Toilettes publiques", img: "toilettesPubliquesIcon" }, 
      {name: "Boutique alimentaire", retailName: "Boutique alimentaire", img: "boutiqueAlimentaireIcon" }, 
      {name: "Boutique non alimentaire", retailName: "Boutique non alimentaire", img: "boutiqueNonAlimentaireIcon" }, 
      {name: "Restauration à emporter", retailName: "Restauration à emporter", img: "restaurationRapideIcon" }, 
      {name: "Station de gonflage", retailName: "Station de gonflage", img: "stationGonflageIcon" }, 
      {name: "Carburant additivé", retailName: "Carburant additivé", img: "carburantAdditiveIcon" }, 
      {name: "Lavage automatique", retailName: "Lavage automatique", img: "lavageAutomatiqueIcon" }, 
      {name: "Vente de gaz domestique (Butane, Propane)", retailName: "Vente de gaz domestique", img: "gazDomestiqueIcon" }, 
      {name: "Laverie", retailName: "Laverie", img: "laverieIcon" }, 
      {name: "Relais colis", retailName: "Relais colis", img: "relaisColisIcon" }, 
      {name: "Restauration sur place", retailName: "Restauration sur place", img: "restaurationSurPlaceIcon" }, 
      {name: "Aire de camping-cars", retailName: "Aire de camping-cars", img: "aireCampingCarIcon" }, 
      {name: "Location de véhicule", retailName: "Location de véhicule", img: "locationVehiculeIcon" }, 
      {name: "Piste poids lourds", retailName: "Piste poids lourds", img: "pistePoidsLourdsIcon" }, 
      {name: "Lavage manuel", retailName: "Lavage manuel", img: "lavageManuelIcon" }, 
      {name: "DAB (Distributeur automatique de billets)", retailName: "Distributeur de billets", img: "DABIcon" }, 
      {name: "Automate CB 24/24", retailName: "Distributeur de billets", img: "DABIcon" }, 
      {name: "Bar", retailName: "Bar", img: "barIcon" }, 
      {name: "Douches", retailName: "Douches", img: "douchesIcon" }, 
      {name: "Espace bébé", retailName: "Espace bébé", img: "espaceBebeIcon" }, 
      {name: "GNV", retailName: "GNV", img: "GNVIcon" }, 
      {name: "Vente d'additifs carburants", retailName: "Additifs carburants", img: "carburantAdditiveIcon" }, 
      {name: "Services réparation / entretien", retailName: "Réparation / entretien", img: "reparationEntretienIcon" }, 
      {name: "Bornes électriques", retailName: "Bornes électriques", img: "bornesElectriquesIcon" }, 
      {name: "Vente de pétrole lampant", retailName: "Vente de pétrole lampant", img: "petroleLampantIcon" }, 
      {name: "Wifi", retailName: "Wifi", img: "wifiIcon" }, 
      {name: "Vente de fioul domestique", retailName: "Fioul domestique", img: "fioulDomestiqueIcon" }
    ]

    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${props.gasStationSelected.gasStation.geom.lat},${props.gasStationSelected.gasStation.geom.lon}`;
    const label = `${props.gasStationSelected.gasStation.brandName} ${props.gasStationSelected.gasStation.ville}`;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });

    useEffect(() => {
      if(props.gasStationSelected){
        setOtherDisposableFuels()
        setGasStationServices()
      }
    },[props.gasStationSelected])

    const setFuelPumpGunImg = (fuelType) => {
      let imgPath = ''
      fuelPumpGun.map( fuelPump => {
        if(fuelPump.name == fuelType ){
          imgPath = fuelPump.img
        }
      })
      return imgPath
    }

    const setFuelIconColor = (fuelName) => {
      let iconColor = ''
      fuelPumpGun.map( fuelPump => {
        if(fuelPump.name == fuelName ){
          iconColor = fuelPump.iconColor
        }
      })
      return iconColor
    }

    const setMajDate = (majDate) => {
      let date = majDate.split(' ')[0].split('-')
      let hour = majDate.split(' ')[1]
      return `${date[2]}/${date[1]}/${date[0]} à ${hour}`
    }

    const setShortMajDate = (majDate) => {
      let date = majDate.split(' ')[0].split('-')
      return `${date[2]}/${date[1]}/${date[0]}`
    }

    const setColorDate = (majDate) => {
        const date1 = new Date();
        const date2 = new Date(majDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // console.log(diffTime + " milliseconds");
        // console.log(diffDays + " days")
        if(diffDays == 1){
            return '#33ff4c'
        }
        if(diffDays == 2){
            return '#b1ff33'
        }
        if(diffDays == 3){
            return '#ffdd33'
        }
        if(diffDays > 3){
            return '#ff9e33'
        }
        if(diffDays > 7){
            return '#ff4633'
        }
    }

    const setOtherDisposableFuels = () => {
      setDisposableFuels([])
        props.gasStationSelected.gasStation.carburants_disponibles.map(disposableFuel=>{
          if(disposableFuel == 'Gazole'){
            setDisposableFuels(disposableFuels=>[...disposableFuels, {name: 'Gazole', price: props.gasStationSelected.gasStation.gazole_prix, maj: props.gasStationSelected.gasStation.gazole_maj}])
          }
          if(disposableFuel == 'E85'){
            setDisposableFuels(disposableFuels=>[...disposableFuels, {name: 'E85', price: props.gasStationSelected.gasStation.e85_prix, maj: props.gasStationSelected.gasStation.e85_maj}])
          }
          if(disposableFuel == 'E10'){
            setDisposableFuels(disposableFuels=>[...disposableFuels, {name: 'E10', price: props.gasStationSelected.gasStation.e10_prix, maj: props.gasStationSelected.gasStation.e10_maj}])
          }
          if(disposableFuel == 'SP95'){
            setDisposableFuels(disposableFuels=>[...disposableFuels, {name: 'SP95', price: props.gasStationSelected.gasStation.sp95_prix, maj: props.gasStationSelected.gasStation.sp95_maj}])
          }
          if(disposableFuel == 'SP98'){
            setDisposableFuels(disposableFuels=>[...disposableFuels, {name: 'SP98', price: props.gasStationSelected.gasStation.sp98_prix, maj: props.gasStationSelected.gasStation.sp98_maj}])
          }
          if(disposableFuel == 'GPLc'){
            setDisposableFuels(disposableFuels=>[...disposableFuels, {name: 'SP95', price: props.gasStationSelected.gasStation.gplc_prix, maj: props.gasStationSelected.gasStation.gplc_maj}])
          }
        })
    }

    const setGasStationServices = () => {
      if(props.gasStationSelected.gasStation.services_service){
        setServices([])
        props.gasStationSelected.gasStation.services_service
        // .filter((e)=>e != 'Automate CB 24/24')
        .map(service=>{
          setServices(services=>[...services, service])
        })
      }
    }

    const setServiceLabel = (serviceName) => {
      let retailName = ''
      servicesLogo.map(service => {
        if(service.name == serviceName){
          retailName = service.retailName
        }
      })
      return retailName
    }

    const setServiceImg = (serviceName) => {
      let imgPath = ''
      servicesLogo.map( service => {
        if(service.name == serviceName ){
          imgPath = service.img
        }
      })
      return imgPath
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.gasStationModalVisible}
            onRequestClose={() => {
              props.setGasStationModalVisible(!props.gasStationModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity 
                    style={[styles.button, styles.closeButton]}
                    onPress={() => props.setGasStationModalVisible(!props.gasStationModalVisible)}
                    >
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../assets/images/ui/modal-close-cross.png')}
                    />
                  </TouchableOpacity>
                <View style={styles.headerContainer}>
                  <Image
                        style={[
                          styles.gasStationLogo
                        ]}
                        source={assetsObject[props.gasStationSelected.gasStation.logoURI]}
                    />
                  <View style={[
                    styles.leftContainer,
                    {display: 'flex', flexDirection: 'column', marginLeft: '38%'}]}>
                    <Text style={[
                      styles.text,
                      {fontSize: 23, height: 30, textAlign: 'left'}
                      ]}>{props.gasStationSelected.gasStation.brandName}</Text>
                    <Text style={[
                      styles.text,
                      {fontSize: 18, height: 25, textAlign: 'left'}
                      ]}>{props.gasStationSelected.gasStation.ville}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.text,
                  {width: '100%', textAlign: 'left', marginLeft: '5%'}
                  ]}>{props.gasStationSelected.gasStation.adresse}</Text>
                <View style={[
                  styles.fuelPriceContainer,
                  {marginTop: '3%'}
                  ]}>
                  <Image
                    style={styles.fuelPumpImg}
                    source={assetsObject[setFuelPumpGunImg(props.gasStationSelected.fuelType)]}
                    />
                  <View style={[
                    styles.leftContainer,
                    {display: 'flex', flexDirection: 'column', marginLeft: '28%', marginTop: '2%'}]}>
                    <View style={[
                      styles.leftContainer,
                      {display: 'flex', flexDirection: 'row', marginTop: '2%', alignItems: 'center'}
                    ]}>
                      <Text style={[
                        styles.text,
                        {width: '38%',fontSize: 28, height: 35, marginLeft: '10%'}
                        ]}>{props.gasStationSelected.fuelType}</Text>
                        <Text style={[
                        styles.text,
                        {width: '5%',fontSize: 23, height: 30}
                        ]}>:</Text>
                      <Text style={[
                        styles.text,
                        {width: '25%',fontSize: 28, height: 35, marginLeft: '3%'}
                        ]}>{props.gasStationSelected.fuelPrice}</Text>
                    </View>
                    <Text style={[
                      styles.text,
                      {fontSize: 17, width: '95%', height: 25, marginLeft: '7%'},
                      {color: setColorDate(props.gasStationSelected.maj)}
                      ]}>MàJ le : {setMajDate(props.gasStationSelected.maj)}</Text>
                  </View>
                </View>
                <View 
                  style={{width: '100%', display: 'flex', flexDirection: 'row'}}
                >
                  {disposableFuels.length > 0 &&
                    <ScrollView
                      style={{marginTop: 3,
                      height: 70,
                      width: 180, 
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      paddingLeft: 0}}
                      horizontal={true}
                    >
                      {
                        disposableFuels.map((fuel, index)=>{
                          if(fuel.name != props.gasStationSelected.fuelType){
                            return(
                              <View
                               key={index}
                               style={{color: 'black', backgroundColor: setFuelIconColor(fuel.name), borderRadius: 6, marginTop: 3, width: 62, marginRight: 6}}
                              >
                                <Text style={{fontFamily: 'coolvetica rg', color: '#ededed', marginLeft: '8%'}}>{fuel.name}</Text>
                                <Text style={{fontFamily: 'coolvetica rg', fontSize: 23, color: '#2c2c2c', marginLeft: '13%'}}>{fuel.price}</Text>
                                <View style={{
                                      backgroundColor: '#5a7085', 
                                      borderRadius: 3,
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: 3
                                    }}>
                                  <Text style={
                                    {
                                      fontFamily: 'coolvetica rg', 
                                      color: setColorDate(fuel.maj), 
                                      fontSize: 11, 
                                      borderRadius: 6,
                                    }
                                    }>
                                      {setShortMajDate(fuel.maj)}
                                  </Text>
                                </View>
                              </View>
                            )
                          }
                        })
                      }
                    </ScrollView>
                  }
                </View>
                <View 
                  style={{width: '100%', display: 'flex', flexDirection: 'row'}}
                >
                  {services.length > 0 &&
                    <ScrollView
                      style={{marginTop: 3,
                      height: 110,
                      width: 180, 
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      paddingLeft: 0}}
                      horizontal={true}
                    >
                      {
                        services.map((service, index)=>{
                          return(
                            <View
                             key={index}
                             style={{color: 'black', borderRadius: 6, marginTop: 3, width: 80 , marginRight: 6,
                             backgroundColor: '#eaeaea',}}
                            >
                              <Image
                                style={styles.serviceImg}
                                source={assetsObject[setServiceImg(service)]}
                                />
                              <View style={{
                                    backgroundColor: '#768ea5', 
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 3
                                  }}>
                                <Text style={
                                  {
                                    fontFamily: 'coolvetica rg', 
                                    color: '#ededed',
                                    fontSize: 10, 
                                    borderRadius: 6,
                                    height: 26
                                  }
                                  }>
                                    {setServiceLabel(service)}
                                </Text>
                              </View>
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  }
                </View>
                <Pressable
                  style={[
                    styles.button, 
                    styles.buttonClose,
                    {display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 7, marginTop: 20, marginBottom: 10, 
                    // backgroundColor: '#3bc75d'
                  }
                  ]}
                  onPress={() => 
                    Linking.openURL(url)
                    }>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../assets/images/ui/markerMap-small.png')}
                  />
                  <Text 
                    style={[
                      styles.textStyle,
                      {fontSize: 20, marginLeft: 10}
                    ]}
                    >Y aller</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
    )
}

export default GasStationModal

const styles = StyleSheet.create({
    
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
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
    justifyContent: 'center'
  },
  text:{
    display: 'flex',
    // backgroundColor:'#d5d5d5', 
    // height: 40, 
    width: 150,
    color:'#474747',
    borderRadius: 4,
    fontFamily: 'coolvetica rg',
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center'
  },
  headerContainer:{
    display: 'flex', 
    flexDirection: 'row', 
    width: '86%',
    alignSelf: 'flex-start',
    height: 72,
    backgroundColor:'#e2e2e2', 
    paddingTop: 10,
    borderRadius: 12
  },
  fuelPriceContainer:{
    display: 'flex', 
    flexDirection: 'row', 
    width: '100%',
    alignSelf: 'flex-start',
    height: 72,
    backgroundColor:'#ededed', 
    paddingTop: 10,
    borderRadius: 6
  },
  leftContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: 'green'
  },
  loadingWarning:{
    color: '#474747', 
    fontFamily: 'coolvetica rg',
    marginTop: 20,
    marginBottom: 20
  },
  resultsContainer:{
    width: '90%',
    marginTop: 25,
    marginBottom: 15
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
    height: 'auto',
    position: 'absolute',
    zIndex: 5
  },
  gasStationLogo:{
      position: 'absolute', 
      zIndex: 2,
      width: 65,
      height: 65,
      marginTop: 3,
      marginLeft: 5
  },
  fuelPumpImg:{
    position: 'absolute', 
      zIndex: 2,
      width: 90,
      height: 55,
      marginLeft: 8,
      marginTop: 9
  },
  serviceImg:{
    // position: 'absolute', 
      zIndex: 2,
      width: 60,
      height: 62,
      marginLeft: 8,
      marginTop: 4,
      marginBottom: 4,

  }
})