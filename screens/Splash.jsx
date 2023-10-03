import { Image, StyleSheet, Text, View } from 'react-native'
import { useEffect } from "react";

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 3000);
      });

    return(
        <View
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <Image
                style={styles.gif}
                source={require('../assets/images/ui/splash-mid-res.gif')}
                // source={require('../assets/images/ui/splash-cover.png')}
            />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    gif:{
        width: '100%',
        height: '100%'
    }
})