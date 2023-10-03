import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from "react-native"
import TextTicker from "react-native-text-ticker";

const FavoritesView = (props) => {
    const [favoriteBtnSelected, setFavoriteBtnSelected] = useState(false)
    // console.log('props.favorites : ' + JSON.stringify(props.favorites));
    const fuelIconColor = [
        { name : 'Gazole' , iconColor: '#fedd3f'},
        { name : 'E10', iconColor: '#5add3f'},
        { name : 'E85', iconColor: '#308cf7'},
        { name : 'SP95', iconColor: '#45a532'},
        { name : 'SP98', iconColor: '#4ec535'},
        { name : 'GPLc', iconColor: '#9fbcfc'}
      ]

    const setFuelIconColor = (fuelName) => {
        let iconColor = ''
        fuelIconColor.map( fuelIcon => {
            if(fuelIcon.name == fuelName ){
                iconColor = fuelIcon.iconColor
            }
        })
        return iconColor
    }


    return (
        <View style={[
            styles.btnsContainer,
            props.favorites.length != 0 && props.openFavoritesView ? {width: '67%', borderRadius: 4} : {width: 90, borderRadius: 4}
            ]}>
            <TouchableOpacity 
                onPress={()=>{
                    props.setFavoriteModalVisible(true)
                }}
                style={styles.floppyContainer}
            >
                {/* <Text>Ma position</Text> */}
                <Image
                    style={styles.floppy}
                      source={require('../assets/images/ui/floppy-icon.png')}
                  />
            </TouchableOpacity>
            <ScrollView
                style={{
                    width: '100%',
                  }}
                horizontal={true}
            >
            {props.favorites.lenght != 0 &&
                props.favorites.map((favorite, index)=>{
                    return(
                        <TouchableOpacity
                            key={index}
                            style={[
                                {
                                    width: 60,
                                    height: 55,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#91f0f8', 
                                    borderRadius: 4, 
                                    marginLeft: 8,
                                    borderColor: '#ffba15',
                                },
                                favoriteBtnSelected == favorite.key && !props.isActualPosition || JSON.parse(favorite.data).default && !favoriteBtnSelected && !props.isActualPosition ? {borderWidth: 3} : {borderWidth: 0}
                            ]}
                            onPress={()=>{
                                setFavoriteBtnSelected(favorite.key)
                                props.setAllSettings(JSON.parse(favorite.data))
                                props.setIsActualPosition(false)
                            }}
                        >
                            <Text style={{fontSize: 12, fontFamily: 'coolvetica rg', color: 'white', padding: 1, marginTop: 1, backgroundColor: setFuelIconColor(JSON.parse(favorite.data).fuelType), borderRadius: 3}}>
                                {JSON.parse(favorite.data).fuelType}
                            </Text>
                            <View style={{borderRadius: 4, width: 55, backgroundColor: '#3ac2cd', marginLeft: 8, marginRight: 8, marginTop: 1, marginBottom: 1}}>
                                    <TextTicker
                                        style={{ fontSize: 10, fontFamily: 'coolvetica rg', padding: 2, color: 'white'}}
                                        duration={3000}
                                        loop
                                        bounce
                                        repeatSpacer={50}
                                        marqueeDelay={1000}
                                    >
                                        {JSON.parse(favorite.data).cityName}
                                    </TextTicker>
                                </View>
                            <Text
                                style={{borderRadius: 4, fontSize: 10, fontFamily: 'coolvetica rg', padding: 2, color: 'white', backgroundColor: '#29a7e4', marginBottom: 1}}
                            >{JSON.parse(favorite.data).distance} kms</Text>
                        </TouchableOpacity>
                    )
                })
                }
            </ScrollView>
            <TouchableOpacity 
                onPress={()=>{
                    props.setOpenFavoritesView(!props.openFavoritesView)
                }}
                // style={styles.floppyContainer}
            >
                {/* <Text>Ma position</Text> */}
                <Image
                    style={styles.arrows}
                      source={props.openFavoritesView ? require('../assets/images/ui/arrow-left.png') : require('../assets/images/ui/arrow-right.png')}
                  />
            </TouchableOpacity>
        </View>
    )
}

export default FavoritesView

const styles = StyleSheet.create({
    btnsContainer:{
        marginTop: 12,
        marginLeft: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // zIndex: 1,
        backgroundColor: '#64798f',
        height: 62
    },
    floppyContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        padding: 10,
        fontSize: 14,
        marginTop: 2,
        borderRadius: 4,
        margin:2,
        backgroundColor: '#b7def6'
    },
    floppy:{
        position: 'absolute',
        zIndex: -1,
        width: 42,
        height: 42,
    },
    arrows:{
        // position: 'absolute',
        // zIndex: -1,
        width: 36,
        height: 36
    }
})