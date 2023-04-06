import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Pressable, TouchableOpacity, Image, Alert, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/index';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Help } from '../../../index';

const NavList = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const ToMail = () => {
        const recipient = 'adilmustafa006@gmail.com';
        const subject = '';
        const body = '';

        Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);

    }
    const onLogoutAlert = () => {
        Alert.alert(
            'Logout',
            'Are you sure, yout want to logout from this device',
            [{ text: 'Yes', onPress: logout }, { text: 'No', }],
            { cancelable: true }
        )
    }
    const logout = () => {

        setTimeout(() => {
            actions.logout()

        }, 2000);

    }
    return (
        <View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    navigation.navigate('MainScreen')
                }}>
                <View style={styles.modalView}>
                    <Help />

                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={[styles.txt2]}>Close</Text>
                    </TouchableOpacity>

                </View>

            </Modal>


            <View >
                <View style={[styles.border]}></View>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('Settings')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/Vector.png')} />
                    <Text style={[styles.txt]}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('Rescan_SMS')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/repeat.png')} />
                    <Text style={[styles.txt]}>Rescan SMS</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.border]}></View>
            <View >
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('InviteFriends')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/invite.png')} />
                    <Text style={[styles.txt]}>Invite Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        ToMail()
                        // navigation.navigate('ContactUs')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/support.png')} />
                    <Text style={[styles.txt]}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('Subcription')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/subscribe.png')} />
                    <Text style={[styles.txt]}>Subcription </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        setModalVisible(true)
                        // navigation.navigate('Help')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/help.png')} />
                    <Text style={[styles.txt]}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}

                    onPress={onLogoutAlert}
                >
                    <Icon name='close' size={30} style={[styles.img]} />
                    <Text style={[styles.txt]}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavList

const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        margin: 40,
        marginVertical: '60%',
        height: '50%',
        backgroundColor: 'white',

        // backgroundColor: 'red'
        borderWidth: 1
    },
    icon: {
        color: "#483d8b",
        fontSize: 30,
        padding: 10,
    },
    rw: {
        flexDirection: 'row',
    },
    txt: {
        color: '#000000',
        paddingLeft: 20,
        fontSize: 16,
    },
    img: {
        width: 28,
        height: 28,
        marginLeft: 10
    },
    border: {
        borderBottomWidth: 2,
        color: 'black',
        opacity: 0.1

    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        // marginBottom: 36
    },
    txt2: {
        fontWeight: '600',
        fontSize: 20,
        flex: 0,
        textAlign: 'center',
        margin: 8,
        color: '#26bc9e'

        // backgroundColor: 'red'
    }
});

