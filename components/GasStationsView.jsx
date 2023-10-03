import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native"
import FuelPumpView from "./FuelPumpView"
import { useEffect, useState } from "react";

const GasStationsView = (props) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleGasStationClicked = (gasStation, fuelPrice, maj, fuelType) => {
        props.setGasStationSelected({gasStation, fuelPrice, maj, fuelType})
        props.setGasStationModalVisible(true)
    }

    return (
        <View >
            {props.gasStations != 0 &&
                <ScrollView 
                    style={[
                        styles.gasStationsContainer
                    ]}
                    horizontal={true}
                    >
                    {props.gasStations.length > 0 && props.fuelType == 'Gazole' &&
                        props.gasStations
                            .filter(n => n.gazole_prix)
                            .sort((a, b) => parseFloat(a.gazole_prix) - parseFloat(b.gazole_prix))
                            .map( (gasStation, index) => {
                                if(index > 2){
                                    return (
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.gazole_prix}
                                            maj={gasStation.gazole_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                            })
                    }
                    {props.gasStations.length > 0 && props.fuelType == 'SP95' &&
                        props.gasStations
                            .filter(n => n.sp95_prix)
                            .sort((a, b) => parseFloat(a.sp95_prix) - parseFloat(b.sp95_prix))
                            .map( (gasStation, index) => {
                                if(index > 2){
                                    return (
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.sp95_prix}
                                            maj={gasStation.sp95_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                            })
                    }
                    {props.gasStations.length > 0 && props.fuelType == 'SP98' &&
                        props.gasStations
                            .filter(n => n.sp98_prix)
                            .sort((a, b) => parseFloat(a.sp98_prix) - parseFloat(b.sp98_prix))
                            .map( (gasStation, index) => {
                                if(index > 2){
                                    return (
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.sp98_prix}
                                            maj={gasStation.sp98_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                            })
                    }
                    {props.gasStations.length > 0 && props.fuelType == 'E85' &&
                        props.gasStations
                            .filter(n => n.e85_prix)
                            .sort((a, b) => parseFloat(a.e85_prix) - parseFloat(b.e85_prix))
                            .map( (gasStation, index) => {
                                if(index > 2){
                                    return (
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.e85_prix}
                                            maj={gasStation.e85_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                            })
                    }
                    {props.gasStations.length > 0 && props.fuelType == 'E10' &&
                        props.gasStations
                            .filter(n => n.e10_prix)
                            .sort((a, b) => parseFloat(a.e10_prix) - parseFloat(b.e10_prix))
                            .map( (gasStation, index) => {
                                if(index > 2){
                                    return (
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.e10_prix}
                                            maj={gasStation.e10_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                            })
                    }
                    {props.gasStations.length > 0 && props.fuelType == 'GPLc' &&
                        props.gasStations
                            .filter(n => n.gplc_prix)
                            .sort((a, b) => parseFloat(a.gplc_prix) - parseFloat(b.gplc_prix))
                            .map( (gasStation, index) => {
                                if(index > 2){
                                    return (
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.gplc_prix}
                                            maj={gasStation.gplc_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                            })
                    }
                </ScrollView>
            }
            </View>
    )
}

export default GasStationsView

const styles = StyleSheet.create({
    gasStationsContainer:{
        height: '21%',
        width: '96%', 
        marginLeft:'3%',
        padding: 2,
        display: "flex",
        flexDirection: 'row',
        paddingLeft: 0
    },
    gasStation:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#484848',
        margin: 10,
        alignItems: 'center',
        width: 80
    },
    btnsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
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
})