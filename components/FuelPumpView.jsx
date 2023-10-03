import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import assetsObject from "./AssetsImages"

const FuelPumpView = (props) => {
    const setMajDate = (majDate) => {
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

    if(props.palmaresLenght == 3){
        return (
            <TouchableOpacity 
                key={props.index}
                onPress={() => {
                    props.handleGasStationClicked(props.gasStation, props.fuelPrice, props.maj, props.fuelType)
                }}
                style={[
                    styles.gasStation,
                    props.index == 0 ? {marginTop: '0%', position:'absolute', marginLeft:'28%', width: 28} : {marginTop: '15%'},
                    props.index == 1 ? {marginRight:'25%'} : {marginRight:'0%'}
                ]}
            >
                <Text style={[
                    styles.priceText,
                    props.fuelPrice < 1 || props.fuelPrice > 2 ? {fontSize: 26, marginTop: '21%'} : {fontSize: 30, marginTop: '20%'},
                    props.index == 0 ? {marginTop: '19%', marginLeft: '41%'} : {marginTop: '20%', marginLeft:'44%'},
                    ]}>{props.fuelPrice}</Text>
                <Image
                        style={styles.fuelPumpLogo}
                        source={assetsObject[props.gasStation.logoURI]}
                    />
                <Text style={[
                    styles.city,
                    props.index == 0 ? {marginTop: '109%', marginLeft: '43%'} : {marginTop: '118%', marginLeft:'48%'}
                    ]}>{props.gasStation.ville}</Text>
                <Text style={[
                        styles.maj,
                        {color: setColorDate(props.maj)}
                        ]}>{setMajDate(props.maj)}</Text>
                <Image
                    style={styles.fuelPump}
                    source={require('../assets/images/ui/fuelPump.png')}
                />
            </TouchableOpacity>
        )
    }
    if(props.palmaresLenght == 2){
        return (
            <TouchableOpacity 
                key={props.index}
                onPress={() => {
                    props.handleGasStationClicked(props.gasStation, props.fuelPrice, props.maj, props.fuelType)
                }}
                style={[
                    styles.gasStation,
                    props.index == 0 ? {marginTop: '0%', position:'absolute', marginLeft:'50%', width: 28} : {marginTop: '15%'},
                    props.index == 1 ? {marginRight:'25%'} : {marginRight:'0%'}
                ]}
            >
                <Text style={[
                    styles.priceText,
                    props.fuelPrice < 1 || props.fuelPrice > 2 ? {fontSize: 26, marginTop: '21%'} : {fontSize: 30, marginTop: '20%'},
                    props.index == 0 ? {marginTop: '20%', marginLeft: '41%'} : {marginTop: '21%', marginLeft:'44%'}
                    ]}>{props.fuelPrice}</Text>
                <Image
                        style={styles.fuelPumpLogo}
                        source={assetsObject[props.gasStation.logoURI]}
                    />
                <Text style={[
                    styles.city,
                    props.index == 0 ? {marginTop: '109%', marginLeft: '44%'} : {marginTop: '118%', marginLeft:'50%'}
                    ]}>{props.gasStation.ville}</Text>
                <Text style={[
                        styles.maj,
                        {color: setColorDate(props.maj)}
                        ]}>{setMajDate(props.maj)}</Text>
                <Image
                    style={styles.fuelPump}
                    source={require('../assets/images/ui/fuelPump.png')}
                />
            </TouchableOpacity>
        )
    }
    if(props.palmaresLenght == 1){
        return (
            <TouchableOpacity 
                key={props.index}
                onPress={() => {
                    props.handleGasStationClicked(props.gasStation, props.fuelPrice, props.maj, props.fuelType)
                }}
                style={[
                    styles.gasStation,
                    {marginTop: '0%', position:'absolute', marginLeft:'28%', width: 28}
                ]}
            >
            <Text style={[
                styles.priceText,
                props.fuelPrice < 1 || props.fuelPrice > 2 ? {fontSize: 26, marginTop: '21%'} : {fontSize: 30, marginTop: '20%'},
                {marginTop: '20%', marginLeft: '42%'}
                ]}>{props.fuelPrice}</Text>
            <Image
                    style={styles.fuelPumpLogo}
                    source={assetsObject[props.gasStation.logoURI]}
                />
            <Text style={[
                styles.city,
                {marginTop: '113%', marginLeft: '44%'}
                ]}>{props.gasStation.ville}</Text>
            <Text style={[
                    styles.maj,
                    {color: setColorDate(props.maj)}
                    ]}>{setMajDate(props.maj)}</Text>
            <Image
                style={styles.fuelPump}
                source={require('../assets/images/ui/fuelPump.png')}
            />
            </TouchableOpacity>
        )
    }else{
        return (
            <TouchableOpacity 
                key={props.index}
                onPress={() => {
                    props.handleGasStationClicked(props.gasStation, props.fuelPrice, props.maj, props.fuelType)
                }}
                style={[
                    styles.gasStationLosers,
                    props.index == 0 ? {marginLeft: 0} : {marginLeft: 8},
                ]}
            >
                <Text style={[
                    styles.priceTextLosers,
                    props.fuelPrice < 1 || props.fuelPrice > 2 ? {fontSize: 26, marginTop: '21%'} : {fontSize: 30, marginTop: '20%'},
                    ]}>{props.fuelPrice}</Text>
                <Image
                        style={styles.fuelPumpLogo}
                        source={assetsObject[props.gasStation.logoURI]}
                    />
                <Text style={[
                    styles.cityLosers
                    ]}>{props.gasStation.ville}</Text>
                <Text style={[
                        styles.majLosers,
                        {color: setColorDate(props.maj)}
                        ]}>{setMajDate(props.maj)}</Text>
                <Image
                    style={styles.fuelPumpLosers}
                    source={require('../assets/images/ui/fuelPump.png')}
                />
            </TouchableOpacity>
        )
    }
}

export default FuelPumpView

const styles = StyleSheet.create({
    priceText: {
        position: 'absolute', 
        zIndex: -1,
        fontFamily: 'digitalism',
        fontSize: 30,
        color:'#ffb957',
        backgroundColor: '#525252',
        padding: 4,
        borderRadius: 4,
        marginTop: '19%',
        marginLeft: '42%',
        width: 67,
        height: 120
      },
      priceTextLosers: {
        position: 'absolute', 
        zIndex: -1,
        fontFamily: 'digitalism',
        // fontSize: 30,
        color:'#ffb957',
        backgroundColor: '#525252',
        padding: 4,
        borderRadius: 4,
        marginTop: '21%',
        marginLeft: '43%',
        width: 70,
        height:48
      },
    fontTextMini: {
        fontFamily: 'digitalism',
        fontSize: 25,
        color:'orange'
    },
    gasStation:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 10,
        width: 90,
        height: 150
    },
    gasStationLosers:{
        flexDirection: 'column',
        // justifyContent: 'space-around',
        // alignItems: "center",
        // margin: 10,
        // marginTBottom: 15,
        marginRight: 18,
        width: 90,
        height: 100
    },
    city:{
        position: 'absolute',
        zIndex: 2,
        marginTop: '118%',
        marginLeft: '50%',
        color: '#525252',
        fontSize: 9,
        width: 50,
        height: 35,
        fontFamily: 'coolvetica rg',
    },
    cityLosers:{
        position: 'absolute',
        zIndex: 2,
        marginTop: '118%',
        marginLeft: '48%',
        color: '#525252',
        fontSize: 9,
        width: 50,
        height: 35,
        fontFamily: 'coolvetica rg',
    },
    brandName:{
        position: 'absolute',
        marginTop: '135%',
        zIndex: 2,
        color: '#525252',
        fontSize: 10,
        marginLeft: '35%',
        width: 60,
        height: 25,
        display:'flex',
        alignItems: 'center'
    },
    fuelPump:{
        position: 'absolute',
        zIndex: 1,
        width: 110,
        height: 160
    },
    fuelPumpLosers:{
        position: 'absolute',
        zIndex: 1,
        width: 110,
        height: 160
    },
    fuelPumpLogo:{
        position: 'absolute', 
        zIndex: 2,
        width: 32,
        height: 32,
        marginTop: 74,
        marginLeft: 50
    },
    maj:{
        zIndex: 2,
        fontSize: 8,
        marginTop: 130,
        marginLeft: 44,
        backgroundColor: '#5a7085',
        width: 44,
        padding: 1,
        borderRadius: 3
    },
    majLosers:{
        zIndex: 2,
        fontSize: 8,
        marginTop: 130,
        marginLeft: 44,
        backgroundColor: '#5a7085',
        width: 44,
        height: 13,
        padding: 1,
        borderRadius: 3
    }
})