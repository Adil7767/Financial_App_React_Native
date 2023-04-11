import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state);
    // userData.access
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        isSecure: true,
    });

    const { isLoading, email, password, isSecure } = state;

    const updateState = (data) => setState({ ...state, ...data });

    const isValidData = () => {
        const error = validator({
            email,
            password,
        });
        if (error) {
            showError(error);
            return false;
        }
        return true;
    };

    const onLogin = async () => {
        const checkValid = isValidData();
        if (checkValid) {
            updateState({ isLoading: true });
            try {
                const res = await actions.login({
                    email,
                    password,
                });
                console.log("res==>>>>>", res);
                updateState({ isLoading: false });
                showSuccess(res.msg)
                // if (!res.emailVerified) {
                //     alert("Please verify your email");
                // } else {
                const token = res.token;
                dispatch(actions.RESET_PASSWORD({ token }));
                console.log('token', token);
                // }

            } catch (error) {
                console.log('login error', error);
                // showError(error.message);
                updateState({ isLoading: false });
                let err = error.errors.non_field_errors;
                showError(err)

            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.logo}>AdArt</Text>
            <TextInputWithLabel
                label="Email"
                placheHolder="Enter your email"
                onChangeText={(email) => updateState({ email })}
                keyboardType="email-address"
            />
            <TextInputWithLabel
                label="Password"
                placheHolder="Enter your password"
                secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })}
                maxLength={20}
                minLength={4}
            />
            <View>
                <Text style={styles.right}>
                    <Text
                        style={styles.txt}
                        onPress={() => navigation.navigate('ForgetPasssword')}
                    >
                        Forget Password
                    </Text>
                </Text>
            </View>
            <View styel={[styles.btm]}>
                <View style={[styles.rw]}>
                    <ButtonWithLoader
                        text="Login"
                        onPress={onLogin}
                        isLoading={isLoading}
                    />
                    {/* <View style={{ marginVertical: 8 }} /> */}
                    {/* <ButtonWithLoader
                    text="Signup"
                    onPress={() => navigation.navigate('Signup')}
                /> */}
                </View>
                <View style={[styles.text]}>

                    <Text >If don't have account
                        <Pressable onPress={() => navigation.navigate('Signup')}>
                            <Text style={[styles.txt]}>SIGNUP</Text></Pressable></Text>
                </View>
            </View>
        </ScrollView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 24,
        paddingTop: 94,
        backgroundColor: 'white',
    },
    logo: {
        alignSelf: 'center',
        fontSize: 50,
        color: '#5E2CA5',
        fontWeight: '600',
    },

    right: {
        flex: 0,
        textAlign: 'right',
        // alignSelf: 'center',
        marginTop: 0,
        // paddingBottom: 10,
        fontSize: 15,
    },
    rw: {

        // flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 30
    },
    txt: {

        textDecorationLine: 'underline',
        color: '#5E2CA5',
        fontSize: 15
    },
    text: {
        // flex: 0,
        alignItems: 'flex-end',
        fontSize: 15,

    },
    btm: {
        backgroundColor: 'red',
        height: 20
    }
});
export default Login;
