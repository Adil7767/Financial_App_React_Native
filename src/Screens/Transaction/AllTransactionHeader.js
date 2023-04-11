import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector } from "react-redux";
import { DrawerModal } from '../../index'
import { useNavigation } from '@react-navigation/native';

const AllTransactionHeader = () => {
    const navigation = useNavigation()

    return (
        <View style={[styles.container]}>

            {/* <View style={{ flexDirection: 'column' }}> */}
            <View style={[styles.header]}>
                <TouchableOpacity style={styles.view}
                    onPress={() => {
                        navigation.goBack()
                    }}

                >
                    <Icon
                        name="arrowleft"
                        style={[styles.icon]}
                    >
                    </Icon>
                </TouchableOpacity>

                <View style={[styles.view, styles.font]}>
                    <Text style={[styles.font]}>Trans.FIlter</Text>
                </View>
                <TouchableOpacity style={styles.view}
                    onPress={() => {
                        navigation.navigate('Bills')
                    }}

                >
                    <Icon
                        name="filter"
                        style={[styles.icon]}
                    >
                    </Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.view}
                    onPress={() => {
                        navigation.navigate('Bills')
                    }}

                >
                    <Icon
                        name="search1"
                        style={[styles.icon]}
                    >
                    </Icon>
                </TouchableOpacity>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={styles.view}
                        onPress={() => {
                            navigation.navigate('SearchBoxModal')
                        }}>
                        <Icon
                            name="ellipsis1"
                            style={[styles.iconellipsis1]}
                        ></Icon>
                    </TouchableOpacity>
                </View>

            </View >



            {/* type of transacion */}

            <View style={[styles.btm]}>
                <TouchableOpacity
                    // style={styles.view}
                    onPress={() => {
                        navigation.navigate('Expences')
                    }}>
                    <Text>Expences</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    //  style={styles.view}
                    onPress={() => {
                        navigation.navigate('SearchBoxModal')
                    }}>
                    <Text>Hello</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // style={styles.view}
                    onPress={() => {
                        navigation.navigate('SearchBoxModal')
                    }}>
                    <Text>Hello</Text>
                </TouchableOpacity>
            </View>

            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#483d8b'
    },
    header: {
        height: 90,
        // elivation: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

    },
    view: {
        margin: 20,
        justifyContent: 'space-between'

    },
    font: {
        fontSize: 15,
        fontStyle: 'bold',
        fontWeight: '500',
        color: "white",
    },
    iconellipsis1: {
        color: "white",
        fontSize: 25,
        transform: [{ rotate: '90deg' }],
    },
    icon: {
        color: "white",
        fontSize: 25
    },


    txt: {
        marginHorizontal: 10,
        marginBottom: 10,

    },
    btn: {
        width: '80%',
        height: 16,
        backgroundColor: 'red',
    },
    btm: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',


    }
})
export default AllTransactionHeader;