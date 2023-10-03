import { StyleSheet, TouchableOpacity, View, Text } from "react-native"

const FuelTypesBar = (props) => {
    const fuels = [
      {type: 'Gazole', label: 'B7', colorSelected: '#fedd3f', colorDefault: '#a38e26'},
      {type: 'SP95', label: 'SP95', colorSelected: '#45a532', colorDefault: '#347a26'},
      {type: 'E10', label: 'E10', colorSelected: '#5add3f', colorDefault: '#45a730'},
      {type: 'SP98', label: 'SP98', colorSelected: '#4ec535', colorDefault: '#368925'},
      {type: 'E85', label: 'E85', colorSelected: '#308cf7', colorDefault: '#2267b7'},
      {type: 'GPLc', label: 'GPLc', colorSelected: '#9fbcfc', colorDefault: '#798ebc'}
    ]

    return (
        <View style={styles.btnsContainer}>
        {fuels.map((fuel, index) => {
          return(
            <TouchableOpacity 
              key={index}
              onPress={()=>{props.setFuelType(fuel.type)}}
              style={[
                styles.fuelTypeBtn, 
                props.fuelType == fuel.type ? {width:70, height:70, backgroundColor: fuel.colorSelected} : {width:60, height:60, backgroundColor: fuel.colorDefault}
                ]}>
              <Text 
                style={[
                  styles.label,
                  props.fuelType == fuel.type ? {fontSize:20, color: 'white'} : {fontSize:16, color: '#c4c4c4'}
                ]}
              >{fuel.label}</Text>
            </TouchableOpacity>
          )
        })
        }
        </View>
    )
}

export default FuelTypesBar

const styles = StyleSheet.create({
    btnsContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      alignItems: 'center'
    },
  fuelTypeBtn:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    padding: 10,
    borderRadius: 12
  },
  label:{
    fontSize: 16,
    fontFamily: 'coolvetica rg',
  },
  distanceBtn:{
    backgroundColor: '#29a7e4'
  },
})