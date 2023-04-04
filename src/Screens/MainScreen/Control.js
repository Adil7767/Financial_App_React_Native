import { StyleSheet, Text, View, Image, Button, Linking } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toggle from './Toggle'
import { TouchableOpacity } from 'react-native-gesture-handler';




const openWhatsApp = () => {
    Linking.openURL('https://wa.me/qr/F32M6LYLEUHLD1');
}





const Control = ({ navigation }) => {
    return (

        <View style={[styles.card]}>

            <Text style={[styles.txt]}>Controls</Text>
            <Text style={{
                borderBottomWidth: 1,
                borderColor: '#000000',
                opacity: 0.1
            }}></Text>
            <View style={[styles.rw, styles.row]}>
                <Image
                    style={styles.img}
                    source={require('../../assets/cloud-storage.png')} />
                <Text style={[styles.txt, { paddingEnd: 10 }]}>Backup</Text>
                <Toggle />
            </View>
            <View style={[styles.rw, styles.row, styles.end]}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image
                            style={styles.img}
                            source={require('../../assets/Vector.png')} />
                        <Text>Setting</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity onPress={() => { openWhatsApp() }}>

                        <Image
                            style={styles.img}
                            source={require('../../assets/whatsapp.png')} />
                        <Text>Contact Us</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('MyWidget') }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../assets/widget.png')} />
                    {/* <Icon name='plus' style={[styles.img]} /> */}
                    <Text >Widget</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Control


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FBFBFB',
        marginHorizontal: 10,
        flexDirection: 'column',
        marginVertical: 15,
        fontFamily: 'Poppins',
    },
    txt: {

        fontSize: 17,
        color: '#000000s',
        textAlign: 'center',
        color: 'black',
        paddingTop: 15,

    },
    rw: {
        flexDirection: 'row'
    },
    row: {
        paddingLeft: 10
    },
    img: {
        margin: 15,
        padding: 18,

    },
    end: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'space-around',
        marginEnd: 50
    }

})