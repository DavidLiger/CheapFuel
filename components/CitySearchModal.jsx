import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, View, Text, Modal, ScrollView, TextInput, Pressable, Image } from "react-native"

const CitySearchModal = (props) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.cpModalVisible}
            onRequestClose={() => {
              props.setCpModalVisible(!props.cpModalVisible);
            }}>
            <KeyboardAvoidingView style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity 
                    style={[styles.button, styles.closeButton]}
                    onPress={() => props.setCpModalVisible(!props.cpModalVisible)}
                    >
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../assets/images/ui/modal-close-cross.png')}
                    />
                  </TouchableOpacity>
                <View style={{width: '90%', flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center'}}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ville ou commune"
                    onChangeText={newText => props.handleCitySearchInput(newText)}
                    defaultValue={props.text}
                  />
                  <TouchableOpacity 
                    style={[styles.button, styles.buttonDelete]}
                    onPress={()=>{
                      props.setText('')
                      props.setCities([])
                    }}
                    >
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../assets/images/ui/close-cross.png')}
                    />
                  </TouchableOpacity>
                </View>
                {props.modalLoading && 
                  <Text style={styles.loadingWarning}>Loading...</Text>
                }
                {!props.modalLoading &&
                  <ScrollView style={[
                    styles.resultsContainer,
                    props.cities.length > 0 ? {height: 320, marginTop: 25} : {height: 0, marginTop: 0}
                    ]}>
                    {props.cities.length > 0 && props.cities.map( (city, index) => {
                      return (
                        <TouchableOpacity 
                          key={index}
                          onPress={()=>{
                            props.handleCity(city.key, city.value)
                            props.setIsActualPosition(false)
                          }}
                          style={styles.cityResultBtn}
                          >
                          <Text style={styles.cityResultName}>{city.value}</Text>
                          <Text style={styles.cityResultCP}>{city.key}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                }
              </View>
            </KeyboardAvoidingView>
          </Modal>
    )
}

export default CitySearchModal

const styles = StyleSheet.create({
    
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 320,
    margin: 20,
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
  }
})