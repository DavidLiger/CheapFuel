import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native"

const DistanceBar = (props) => {
    const distances = [5, 10, 20, 30, 50]

    return (
        <View style={styles.btnsContainer}>
          {distances.map( (dist, index) => {
            return(
              <TouchableOpacity 
                key={index}
                onPress={()=>{
                  props.handleSetDistance(dist)
                }}
                style={[
                  styles.distanceBtn, 
                  styles.radarTypeBtn, 
                  props.distance == dist ? {width:70, height:70, borderRadius: 35, backgroundColor: '#29a7e4'} : {width:60, height:60, borderRadius: 30, backgroundColor: '#218cbf'}
                  ]}>
                <View style={{backgroundColor: 'white'}}>
                <Text 
                  style={[
                    styles.radarText,
                    props.distance == dist ? {fontSize: 16, color: 'white', backgroundColor: '#29a7e4'} : {fontSize: 12, color: '#d3d3d3', backgroundColor: '#218cbf'}
                  ]}
                  >{dist} kms</Text>
                </View>
                <Image
                    style={[
                      styles.radar,
                      props.distance == dist ? {width:60, height:60} : {width:50, height:50}
                    ]}
                    source={
                      props.distance == dist ?
                      require('../assets/images/ui/radar.png'):
                      require('../assets/images/ui/radar-disabled.png')
                    }
                />
              </TouchableOpacity>
            )
          })
          }
        </View>
    )
}

export default DistanceBar

const styles = StyleSheet.create({
    btnsContainer:{
      flexDirection: 'column',
      // justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: '2%',
      marginLeft:'78%',
      height: '46%'
    },
    radarTypeBtn:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '8%',
      height: 60,
      width: 60,
      padding: 10,
      fontSize: 14,
      borderRadius: 30
    },
    distanceBtn:{
      backgroundColor: '#29a7e4'
    },
    radarText:{
      // fontSize: 12,
      padding:1,
      color: 'white',
      backgroundColor: '#29a7e4',
      fontFamily: 'coolvetica rg',
    },
    radar:{
        position: 'absolute',
        zIndex: -1,
        width: 50,
        height: 50
    },
})