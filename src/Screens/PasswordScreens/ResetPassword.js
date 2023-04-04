import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';


const ResetPassword = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        otp: '',
        password: '',
        confirm_password: '',
        isSecure: true
    })
    const { isLoading, otp, password, confirm_password, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            otp,
            password,
            confirm_password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onResetPassword = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })

            try {
                const res = await actions.resetpassword({
                    otp,
                    password,
                    confirm_password

                })

                console.log("res of ResetPassword==>>>>>", res)
                showMessage("Registered successfully...!!!! Please verify your otp")
                updateState({ isLoading: false })
                showSuccess(res.msg)
                navigation.navigate('Login')
            }
            catch (error) {
                console.log('ResetPassword error', error)
                updateState({ isLoading: false })
                let err = error.errors.non_field_errors;
                showError(err)
                // navigation.goBack()
            }
        }
    }
    return (
        <ScrollView style={styles.container}>
            <View >



                <TextInputWithLable
                    label="OTP"
                    placheHolder="Enter your OTP"
                    onChangeText={(otp) => updateState({ otp })}
                    keyboardType="numeric"
                />
                <TextInputWithLable
                    label="Password"
                    placheHolder="Enter your password"
                    // isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(password) => updateState({ password })}
                    keyboardType="password"
                    maxLength={20}
                    minLength={4}
                />
                {/* confirm_password */}
                <TextInputWithLable
                    label="Confirm_password"
                    placheHolder="Enter your confirm_password"
                    // isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(confirm_password) => updateState({ confirm_password })}
                    keyboardType="password"
                    maxLength={20}
                    minLength={4}
                />
                <ButtonWithLoader
                    text="Reset Password"
                    onPress={onResetPassword}
                    isLoading={isLoading}
                />
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',

    },

});


export default ResetPassword;
