import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/index';
const NavList = ({ navigation }) => {
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
                        navigation.navigate('ContactUs')
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
                        navigation.navigate('Help')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/help.png')} />
                    <Text style={[styles.txt]}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}

                    onPress={onLogoutAlert}
                >
                    {/* <ButtonWithLoader
                isLoading={isLoading}
                text="Logout"
                onPress={onLogoutAlert}
            /> */}

                    {/* <Image
                        style={[styles.img]}
                        source={require('../../../assets/help.png')} /> */}
                    <Icon name='close' size={30} style={[styles.img]} />
                    <Text style={[styles.txt]}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavList

const styles = StyleSheet.create({
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

    }
});

