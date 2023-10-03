import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native"

const PositionOptionsBar = (props) => {

    return (
        <View style={styles.btnsContainer}>
            <TouchableOpacity 
                onPress={()=>{
                    props.handleGetMyActualPos()
                }}
                style={[
                    styles.distanceBtn, 
                    styles.positionTypeBtn,
                    styles.floppyContainer,
                    {width:50, height:50, backgroundColor: '#b7def6'}
                ]}
            >
                {/* <Text>Ma position</Text> */}
                <Image
                    style={[
                        styles.target,
                        {width:42, height:42}
                    ]}
                      source={require('../assets/images/ui/target-magnifying-small.png')}
                  />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    props.setCpModalVisible(!props.cpModalVisible)
                }}
                style={[
                    styles.distanceBtn, 
                    styles.positionTypeBtn,
                    {width:50, height:50, backgroundColor: '#b7def6'}//b7def6
                ]}>
                {/* <Text>Ville</Text> */}
                <Image
                    style={[
                        styles.target,
                        {width:42, height:42}
                    ]}
                      source={require('../assets/images/ui/city-magnifying-small.png') }
                  />
            </TouchableOpacity>
        </View>
    )
}

export default PositionOptionsBar

const styles = StyleSheet.create({
    btnsContainer:{
        width: '48%',
        marginLeft: '65%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#64798f',
        borderRadius: 4,
        height: 62,
        marginTop: 2
    },
    positionTypeBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        padding: 10,
        fontSize: 14,
        marginTop: 2,
        borderRadius: 4,
        margin:2
    },
    distanceBtn:{
        backgroundColor: '#3ac2cd'
    },
    target:{
        position: 'absolute',
        zIndex: -1,
        width: 40,
        height: 40
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
})