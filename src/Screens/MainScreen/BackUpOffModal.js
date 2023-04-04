import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
const BackUpOffModal = ({ navigation }) => {


    return (
        <View style={[styles.container]}>


            <Text style={styles.txt1}>Data backup allow you to keep backup of your AdArt data onn your own Google drive which can be restored incase you lose your phone or switch to new one.</Text>
            <Text style={[styles.txt3]}>Do you still want to dissable the backup?</Text>
            {/* <View style={[styles.shedule]}> */}
            <TouchableOpacity style={[styles.enabled_disabled]}>
                <Text style={styles.txt2}>YES, DISABLE BACKUP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.enabled_disabled]}>
                <Text style={styles.txt2}>NO, KEEP IT ENABLED</Text>
            </TouchableOpacity>
            {/* </View> */}
        </View >
    );
};

export default BackUpOffModal;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingVertical: 30
    },


    enabled_disabled: {
        paddingVertical: 6
    },
    shedule: {
        flex: 0,
        justifyContent: 'flex-end',
        marginTop: '9%'
        // marginBottom: 36
    },
    txt1: {
        // marginTop: 20,
        fontSize: 16,
        marginHorizontal: 18
    },
    txt3: {
        fontSize: 16,
        marginTop: 20,
        marginHorizontal: 18


    },
    txt2: {
        fontWeight: '800',
        flex: 0,
        textAlign: 'right',
        margin: 8,
        color: '#26bc9e'

        // backgroundColor: 'red'
    }
    // OffText: {
    //     fontSize: 14,
    //     marginHorizontal: 40,
    //     fontWeight: '500',
    //     marginRight: 60
    // },
    // btn: {
    //     flexDirection: 'row',

    // },
})
