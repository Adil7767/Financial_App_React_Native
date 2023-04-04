import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
const BackgroungImage = ({ navigation }) => {
    return (
        <View>
            <ImageBackground source={require('../../assets/Rectangle1.png')}
                resizeMode="cover"
                style={styles.bgimg}>
                <View style={[styles.rw]}>
                    <View style={[styles.clm]}>
                        <TouchableOpacity style={[styles.polygon]} onPress={() => navigation.navigate('Settings')}>
                            <ImageBackground source={require('../../assets/heptagon.jpeg')}
                                style={styles.bgimg3}
                                // style={{ backgroundColor: 'red' }}
                                resizeMode="cover">
                                <Image style={[styles.img]} source={require('../../assets/Vector2.png')} />
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.polygon]} onPress={() => navigation.navigate('Bills')}>
                            <ImageBackground source={require('../../assets/heptagon.jpeg')}
                                resizeMode="cover"
                                style={styles.bgimg3}
                            >
                                <Image style={[styles.img1]} source={require('../../assets/check-box.png')} />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <ImageBackground
                                source={require('../../assets/heptagon.jpeg')}
                                resizeMode="cover"
                                style={styles.bgimg2}
                            >
                                <Image style={[styles.img2]} source={require('../../assets/User.png')} />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default BackgroungImage
const styles = StyleSheet.create({
    bgimg: {
        height: 188
    },
    icon: {
        fontSize: 40,
        height: 60,
        width: 60,
        justifyContent: 'center'
    },
    rw: {
        flex: 0,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        top: 50,
        paddingHorizontal: 40
    },
    clm: {
        flexDirection: 'row',
    },
    bgimg2: {
        width: 50,
        marginTop: 40,
        marginRight: 80
    },
    bgimg3: {
        marginStart: 20,

    },
    img: {
        height: 30,
        width: 30,
    },
    img1: {
        height: 34,
        width: 32,
    },
    img2: {
        height: 45,
        width: 45,
    }
})