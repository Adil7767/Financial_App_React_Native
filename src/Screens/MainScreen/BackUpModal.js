import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const BackUpModal = () => {
    const navigation = useNavigation();



    const handlePress = () => {
        const url = 'https://drive.google.com/drive';
        Linking.openURL(url);
    };






    return (
        <View style={[styles.container]}>
            <View style={styles.top}>
                <Icon
                    name="security"
                    style={[styles.icon]}
                >
                </Icon>
                {/* <View> */}
                <Text style={styles.TopText}>AdArt Private Backup</Text>
                {/* </View> */}
            </View >
            <Text style={styles.txt1}>Schedule auto-backup to <Text style={styles.txt2}>your personal Google Drive </Text>so if you lose your phone or switch to new one.your data is safe.</Text>
            <Text style={[styles.txt3]}>We undestand your financial data is sensitive and personal to you.Thats why AdArt stores backup on your own Google Drive instead of third-party server.</Text>
            <View style={[styles.shedule]}>
                <TouchableOpacity style={[styles.schedule_daily_backup]} onPress={handlePress}>
                    <Text style={styles.btn_text}>SCHEDULE DAILY BACKUP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BackUpModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 40,
        // backgroundColor: 'red',

    },
    icon: {
        flex: 0,
        color: 'black',
        fontSize: 25,
        marginVertical: 10,
        marginLeft: 20

    },
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    top: {
        flexDirection: 'row',
        marginTop: 20,
        // backgroundColor: 'blue'
        borderBottomWidth: 1,
    },
    // Btn1: {
    //     flexDirection: 'row',
    //     marginTop: 20,
    //     marginBottom: 20
    // },
    TopText: {
        fontSize: 20,
        color: '#000',
        marginHorizontal: 10,
        marginTop: 6,
        fontWeight: '500'
    },
    btn_text: {
        fontSize: 16,
        color: '#000',
        marginHorizontal: 40,
        marginTop: 6,
        fontWeight: '500'
    },
    schedule_daily_backup: {
        flex: 0,
        justifyContent: 'flex-end',
        backgroundColor: '#571AA8',
        paddingVertical: 6
    },
    shedule: {
        flex: 0,
        justifyContent: 'flex-end',
        marginTop: '9%'
        // marginBottom: 36
    },
    txt1: {
        marginTop: 20,
        fontSize: 15,
        marginHorizontal: 8
    },
    txt3: {
        fontSize: 15,
        marginTop: 20,
        marginHorizontal: 8

    },
    txt2: {
        fontWeight: '800'
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
