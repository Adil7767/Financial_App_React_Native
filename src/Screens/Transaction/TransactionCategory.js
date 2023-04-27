import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements/dist/buttons/Button';

const TransactionCategory = () => {

    const onCheck = async () => {
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
                showError(error.message);
                updateState({ isLoading: false });
                // let err = error.errors.non_field_errors;
                // showError(err)

            }
        }
    };

    return (
        <View>
            <Button title='hello' />
        </View>
    )
}

export default TransactionCategory

const styles = StyleSheet.create({})