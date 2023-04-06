import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccess2, showSuccess3, showError } from '../../utils/HelpMSGS'
import TextInputWithLable from '../../Components/TextInputWithLabel';
import { showError4, showSuccess } from '../../utils/helperFunction';
import validator from '../../utils/validations';
import actions from '../../redux/actions';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
const ForgetPasssword = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',

    })
    const { isLoading, email, } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            email,
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onReset = async () => {

        const checkValid = isValidData()
        if (checkValid) {

            updateState({ isLoading: true })

            try {
                // console.log('reset mail error')
                const res = await actions.resetmail({
                    email
                })
                console.log("res==>>>>>", res)
                showSuccess(res.msg)
                updateState({ isLoading: false })
                navigation.navigate('ResetPassword')
            } catch (error) {
                console.log('reset mail error', error)
                // let err = error.errors.non_field_errors
                showError('Enter Valid mail or check Internet connection')
                updateState({ isLoading: false })
            }

        }
    }

    return (
        <View style={styles['container']}>
            {/* Logo */}
            <View style={styles['logoContainer']}>
                <Text style={styles['logo']}>AdArt</Text>
            </View>

            {/* Input Fields */}
            <TextInputWithLable
                label="Email"
                placheHolder="Enter your email"
                onChangeText={(email) => updateState({ email })}
                keyboardType="email-address"
            />

            <View style={[styles.btn]}>

                <ButtonWithLoader
                    text="Get OTP"
                    onPress={() => onReset()}
                    isLoading={isLoading}
                />
            </View>
            {/* <View style={styles['btnContainer']}>
                <TouchableOpacity style={styles['button']} onPress={() => onReset()}>
                    <Text style={styles['text']}>Get OTP</Text>
                </TouchableOpacity>

            </View> */}
            {/* <View style={styles['btnContainer']}>
                <TouchableOpacity style={styles['button']} onPress={() => navigation.navigate('Reset_Password')}>
                    <Text style={styles['text']}>Reset Password(By Previos Password)</Text>
                </TouchableOpacity>
            </View> */}
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
    },
    btn: {
        alignItems: 'center'
    }
});

export default ForgetPasssword;