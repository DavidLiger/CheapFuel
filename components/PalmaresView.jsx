import { useEffect, useRef, useState } from "react"
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Image } from "react-native"
import FuelPumpView from "./FuelPumpView"


const PalmaresView = (props) => {  
     const [emptyForThisFuelType, setEmptyForThisFuelType] = useState(false)

    useEffect(() => {
        isEmptyByFuelType()
    }, [props.fuelType, props.gasStations])

    const isEmptyByFuelType = () => {
        if(props.gasStations.length == 1){
            switch (props.fuelType) {
                case 'Gazole':
                    if(props.gasStations[0].gazole_prix == null){
                        setEmptyForThisFuelType(true)
                    }else{
                        setEmptyForThisFuelType(false)
                    }
                    break;
                case 'SP95':
                    if(props.gasStations[0].sp95_prix == null){
                        setEmptyForThisFuelType(true)
                    }else{
                        setEmptyForThisFuelType(false)
                    }
                    break;
                case 'SP98':
                    if(props.gasStations[0].sp98_prix == null){
                        setEmptyForThisFuelType(true)
                    }else{
                        setEmptyForThisFuelType(false)
                    }
                    break;
                case 'E85':
                    if(props.gasStations[0].e85_prix == null){
                        setEmptyForThisFuelType(true)
                    }else{
                        setEmptyForThisFuelType(false)
                    }
                    break;
                case 'E10':
                    if(props.gasStations[0].e10_prix == null){
                        setEmptyForThisFuelType(true)
                    }else{
                        setEmptyForThisFuelType(false)
                    }
                    break;
                case 'GPLc':
                    if(props.gasStations[0].gplc_prix == null){
                        setEmptyForThisFuelType(true)
                    }else{
                        setEmptyForThisFuelType(false)
                    }
                    break;
                default:
                    // setEmptyForThisFuelType(false)
                    break;
            }
        }else{
            setEmptyForThisFuelType(false)
        }
    }

    const handleGasStationClicked = (gasStation, fuelPrice, maj, fuelType) => {
        props.setGasStationSelected({gasStation, fuelPrice, maj, fuelType})
        props.setGasStationModalVisible(true)
    }

    return (
        <View style={styles.globalView}>
            <View style={styles.palmaresView}>
            {props.gasStations.length == 0 && !props.fetchLoading &&
                <Text style={styles.noResults}>Pas de station pour ce carburant dans cette zone..</Text>
            }
            {props.gasStations.length == 1 && emptyForThisFuelType &&
                <Text style={styles.noResults}>Pas de station pour ce carburant dans cette zone...</Text>
            }
            <View style={{width: 250, height: 65}}>
                {props.fetchLoading && 
                    <View 
                        style={{display: 'flex', flexDirection: 'row'}}
                    >
                        <Text style={[
                        styles.noResults,
                        {marginTop: 35, width: '80%'}
                    ]}>
                        Récuperation des données...
                    </Text>
                    <Image
                        style={styles.gif}
                        source={require('../assets/images/ui/loader.gif')}
                        // source={require('../assets/images/ui/splash-cover.png')}
                    />
                    </View>
                }
            </View>
            {props.gasStations != 0 &&
                <View 
                    style={styles.gasStationsContainer}
                    >
                    {props.gasStations.length > 0 && props.fuelType == 'Gazole' &&
                        props.gasStations
                            .filter(n => n.gazole_prix)
                            .sort((a, b) => parseFloat(a.gazole_prix) - parseFloat(b.gazole_prix))
                            .map( (gasStation, index) => {
                                if(index < 3 && props.gasStations.length > 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={3}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.gazole_prix}
                                            maj={gasStation.gazole_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={2}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.gazole_prix}
                                            maj={gasStation.gazole_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 1){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={1}
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
                                if(index < 3 && props.gasStations.length > 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={3}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.sp95_prix}
                                            maj={gasStation.sp95_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={2}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.sp95_prix}
                                            maj={gasStation.sp95_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 1){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={1}
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
                                if(index < 3 && props.gasStations.length > 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={3}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.sp98_prix}
                                            maj={gasStation.sp98_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={2}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.sp98_prix}
                                            maj={gasStation.sp98_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 1){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={1}
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
                    {props.gasStations.length > 0 && props.fuelType == 'E85' && props.gasStations.e85_prix != 'null' &&
                        props.gasStations
                            .filter(n => n.e85_prix)
                            .sort((a, b) => parseFloat(a.e85_prix) - parseFloat(b.e85_prix))
                            .map( (gasStation, index) => {
                                if(index < 3 && props.gasStations.length > 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={3}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.e85_prix}
                                            maj={gasStation.e85_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={2}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.e85_prix}
                                            maj={gasStation.e85_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 1){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={1}
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
                                if(index < 3 && props.gasStations.length > 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={3}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.e10_prix}
                                            maj={gasStation.e10_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={2}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.e10_prix}
                                            maj={gasStation.e10_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 1){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={1}
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
                                if(index < 3 && props.gasStations.length > 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={3}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.gplc_prix}
                                            maj={gasStation.gplc_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 2){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={2}
                                            handleGasStationClicked={handleGasStationClicked}
                                            fuelType={props.fuelType}
                                            fuelPrice={gasStation.gplc_prix}
                                            maj={gasStation.gplc_maj}
                                            gasStation={gasStation}
                                        />
                                    )
                                }
                                if(index < 3 && props.gasStations.length == 1){
                                    return(
                                        <FuelPumpView
                                            key={index}
                                            index={index}
                                            palmaresLenght={1}
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
                </View>
            }
            </View>
            {props.gasStations.length > 0 && !emptyForThisFuelType &&
                <Image
                    style={styles.podium}
                    source={require('../assets/images/ui/podium-numbers.png')}
                />
            }
        </View>
    )
}

export default PalmaresView

const styles = StyleSheet.create({
    globalView:{
        flex: 1,
        width: '100%',
        position:'absolute',
        marginTop:'8%'
    },
    palmaresView:{
        position:'absolute',
        marginTop:'35%'
    },
    gasStationsContainer:{
        marginTop: '3%',
        height: '20%',
        width: 380, 
        display: "flex",
        flexDirection: 'row',
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
    podium:{
        width:'92%',
        height: '41%',
        marginTop: '94%'

    },
    noResults:{
        fontFamily: 'coolvetica rg',
        marginTop: '41%',
        marginLeft: '15%',
        width: '60%',
        fontSize: 15

    },
    gif:{
        width: 25,
        height: 25,
        marginTop: 32
    }
})