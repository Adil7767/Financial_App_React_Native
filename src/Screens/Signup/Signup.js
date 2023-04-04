import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';


const Signup = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        gender: 'M',
        password: '',
        confirm_password: '',
        isSecure: true
    })
    const { isLoading, first_name, gender, last_name, phone_number, email, password, confirm_password, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            first_name,
            last_name,
            phone_number,
            email,
            password,
            confirm_password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onSignup = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })

            try {
                const res = await actions.signup({
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    gender,
                    password,
                    confirm_password
                })

                console.log("res of signup==>>>>>", res)
                showMessage("Registered successfully...!!!! Please verify your email")
                showSuccess(res.msg)
                updateState({ isLoading: false })
                navigation.goBack()
            }
            catch (error) {
                console.log('signup error', error)
                showError(error.msg)
                let err = error.errors.non_field_errors;
                showError(err)
                updateState({ isLoading: false })
                // navigation.goBack()
            }
        }
    }
    return (
        <ScrollView style={styles.container}>
            <View >
                <TextInputWithLable
                    label="First Name"
                    placheHolder="Enter your user name"
                    onChangeText={(first_name) => updateState({ first_name })}
                    keyboardType="text"
                />
                <TextInputWithLable
                    label="Last Name"
                    placheHolder="Enter your user name"
                    onChangeText={(last_name) => updateState({ last_name })}
                    keyboardType="text"
                />
                {/* phone_number */}
                <TextInputWithLable
                    label=" Phone Number"
                    placheHolder="Enter your  phone_number"
                    onChangeText={(phone_number) => updateState({ phone_number })}
                    keyboardType="numeric"
                    maxLength={13}
                    minLength={11}
                />
                <TextInputWithLable
                    label=" Gender"
                    placheHolder="Enter your  Gender"
                    onChangeText={(gender) => updateState({ gender })}
                    keyboardType="text"
                    maxLength={11}
                    minLength={1}
                />
                <TextInputWithLable
                    label="Email"
                    placheHolder="Enter your email"
                    onChangeText={(email) => updateState({ email })}
                    keyboardType="email-address"
                />
                <TextInputWithLable
                    label="Password"
                    placheHolder="Enter your password"
                    // isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(password) => updateState({ password })}
                    keyboardType="password"
                />
                {/* confirm_password */}
                <TextInputWithLable
                    label="confirm_password"
                    placheHolder="Enter your confirm_password"
                    // isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(confirm_password) => updateState({ confirm_password })}
                    keyboardType="password"
                    maxLength={20}
                    minLength={4}
                />
                <ButtonWithLoader
                    text="Signup"
                    onPress={onSignup}
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


export default Signup;
