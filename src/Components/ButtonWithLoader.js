//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

// create a component
const ButtonWithLoader = ({
    isLoading,
    text,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btnStyle}>

            {!!isLoading ? <ActivityIndicator size="large" color="white" />
                : <Text style={styles.textStyle}>{text}</Text>
            }
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginBottom: 30,
        minWidth: '40%'
    },
    textStyle: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white'
    }
});

//make this component available to the app
export default ButtonWithLoader;
