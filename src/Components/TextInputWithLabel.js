import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const TextInputWithLable = ({
    label,
    value,
    placheHolder,
    isSecure,
    onChangeText,
    maxLength,
    minLength,
    ...props
}) => {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text
                style={{
                    fontSize: 16,
                    marginBottom: 8,
                    fontWeight: 'bold'
                }}
            >{label}</Text>
            <TextInput
                value={value}
                placeholder={placheHolder}
                onChangeText={onChangeText}
                maxLength={maxLength}
                minLength={minLength}
                style={styles.input}
                placeholderTextColor="gray"
                {...props}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    inputStyle: {
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        color: 'black',
        paddingHorizontal: 16
    },
    input: {
        width: '100%',
        height: 70,
        borderRadius: 25,
        backgroundColor: '#eee',
        // marginVertical: 10,
        padding: 10,
        fontSize: 18,
    },
});

export default TextInputWithLable;
