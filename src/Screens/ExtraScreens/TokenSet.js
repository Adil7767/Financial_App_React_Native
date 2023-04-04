import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RSAKeychain } from 'react-native-rsa-native';
import ReactNativeBiometrics, { Biometrics } from 'react-native-biometrics';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccess2, showSuccess3 } from '../../utils/HelpMSGS';
import TextInputWithLable from '../../Components/TextInputWithLabel';


function ResetPassword({ navigation }) {
    const Reset = () => {
        showSuccess3()
        navigation.navigate('ResetPassword')
    }
    return (
        <View style={styles['container']}>
            {/* Logo */}
            <View style={styles['logoContainer']}>
                <Text style={styles['logo']}>AdArt</Text>
            </View>

            <TextInputWithLable
                placheHolder="Ex:'MjA/bkc4c5-e389da470e57628d77609b3080dc739e/' "
                label='Token'
                // value='123'
                isSecure='123456'
                onChangeText={text => handleInput('Token', text)}
                keyboardType="number"
            />


            <View style={styles['btnContainer']}>
                <TouchableOpacity style={styles['button']} onPress={() => Reset()}>
                    <Text style={styles['text']}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    button: {
        width: '80%',
        backgroundColor: '#5E2CA5',
        alignItems: 'center',
        padding: 15,
        borderRadius: 25,
        flex: 1,
        marginVertical: 10,
    },
    button2: {
        width: '20%',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
        // marginVertical: 10,
        borderWidth: 1,
        backgroundColor: '#AFE1AF',
        margin: 2,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fingerIcon: {
        width: '20%',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30,
    },
    logo: {
        fontSize: 50,
        color: '#5E2CA5',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 70,
        borderRadius: 25,
        backgroundColor: '#eee',
        marginVertical: 10,
        padding: 10,
        fontSize: 18,
    },
    login: {
        alignSelf: 'center',
        paddingVertical: 10,
        fontSize: 18,
    },
    icon: {
        color: "#483d8b",
        fontSize: 30
    },
    right: {
        flex: 0,
        textAlign: 'right',
        // alignSelf: 'center',
        paddingVertical: 10,
        fontSize: 15,
    }
});

export default ResetPassword;