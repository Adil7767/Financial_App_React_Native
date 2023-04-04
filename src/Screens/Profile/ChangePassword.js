import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from "react-redux";


const Changepassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const txt = useSelector((state) => state)
    var token = txt?.user?.token
    const accessToken = token?.token?.access;
    const DATA = useSelector((state) => state.user);
    const Data = DATA.userData
    // console.log('token', token.token.access)
    const [state, setState] = useState({
        isLoading: false,
        previous_password: '',
        password: '',
        confirm_password: '',
        isSecure: true
    })
    const { isLoading, previous_password, password, confirm_password, isSecure } = state
    const updateState = (data) => {
        setState(() => ({ ...state, ...data }))
        console.log('change', data)
    }
    // console.log('payload', Data)

    const isValidData = () => {
        const error = validator({
            previous_password,
            password,
            confirm_password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onChangepassword = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })

            try {
                const res = await actions.changepassword({
                    previous_password,
                    password,
                    confirm_password

                },

                    {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    }


                )

                console.log("res of Changepassword==>>>>>", res)
                // showMessage("password Change successfully...!!!! Please ReLogin")
                updateState({ isLoading: false })
                showSuccess(res.msg)
                navigation.navigate('MainScreen')
            }
            catch (error) {
                console.log('Changepassword error', error)
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
                    label="Previous password"
                    placheHolder="Enter your Previous password"
                    secureTextEntry={isSecure}
                    onChangeText={(previous_password) => updateState({ previous_password })}
                    keyboardType="password"
                />
                <TextInputWithLable
                    label=" New password"
                    placheHolder="Enter your New password"
                    // isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(password) => updateState({ password })}
                    keyboardType="password"
                    maxLength={20}
                    minLength={4}
                />
                {/* confirm_password */}
                <TextInputWithLable
                    label="Confirm New password"
                    placheHolder="Enter your confirm New password"
                    // isSecure={isSecure}
                    secureTextEntry={isSecure}
                    onChangeText={(confirm_password) => updateState({ confirm_password })}
                    keyboardType="password"
                    maxLength={20}
                    minLength={4}
                />
                <ButtonWithLoader
                    text="Change password"
                    onPress={onChangepassword}
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


export default Changepassword;