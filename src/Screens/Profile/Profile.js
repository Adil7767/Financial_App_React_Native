import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { setdata } from '../../redux/actions/UserAction';
import { useNavigation } from '@react-navigation/native';
import actions from "../../redux/actions/index";
import { showError, showSuccess } from '../../utils/helperFunction';

const Profile = () => {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false)
    const [gender, setgender] = useState('')
    const [result, setresult] = useState()
    const txt = useSelector((state) => state)
    var token = txt?.user?.token
    const AA = token?.token?.access;
    useEffect(() => {
        onprofile()
    }, []);

    const onprofile = async () => {
        const accessToken = AA;

        try {
            const res = await actions.profile({
            },
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            )
            console.log("profile data==>>>>>", res)
            setresult([res])
        }
        catch (error) {
            console.log('profile error', error)
            showError('Unable to get profile data')
        }
    }
    const logout = () => {
        setLoading(true)
        setTimeout(() => {
            actions.logout()
            setLoading(false)
        }, 2000);
    }
    const onLogoutAlert = () => {
        Alert.alert(
            'Logout',
            'Are you sure, yout want to logout from this device',
            [{ text: 'Yes', onPress: logout }, { text: 'No', }],
            { cancelable: true }
        )
    }
    const setImage = () => {
        if (gender == 'M' || gender == 'Male') {
            return (
                <TouchableOpacity >
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/malegender.jpeg')} />
                </TouchableOpacity>

            )
        } else if (gender == 'F' || gender == 'Female') {
            return (
                <TouchableOpacity >

                    <Image
                        style={styles.avatar}
                        source={require('../../assets/femalegender.jpeg')} />

                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity >

                    <Image
                        style={styles.avatar}
                        source={require('../../assets/nongender.jpeg')} />

                </TouchableOpacity>
            )
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {setImage()}
            </View>
            <Text style={[styles.txt]}></Text>
            <FlatList
                data={result}
                renderItem={({ item }) => (
                    <View>
                        <Text style={[styles.name]}>{item.first_name} {item.last_name}</Text>
                        <Text style={[styles.label]}>Email: </Text>
                        <Text style={[styles.txt]}> {item.email}</Text>
                        <Text style={[styles.label]}>Gender: </Text>
                        {setgender(item.gender)}
                        <Text style={[styles.txt]}> {item.gender} </Text>
                        <Text style={[styles.label]}>Phone Number:</Text>
                        <Text style={[styles.txt]}>{item.phone_number}</Text>
                    </View>
                )}
            />
            <View style={[styles.btns]}>
                <ButtonWithLoader
                    isLoading={isLoading}
                    text="Logout"
                    onPress={onLogoutAlert}
                />
                <ButtonWithLoader
                    isLoading={isLoading}
                    text="Change Password"
                    onPress={() => navigation.navigate('ChangePassword')}
                />
            </View>
        </View>
    );
};
export default Profile;
const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 0,
        color: 'blue'

    },
    txt: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
    },
    btns: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'baseline'
    },
    container: {
        flex: 1,
        height: '90%',
        marginHorizontal: '10%',
    },

    label: {
        marginTop: 20,
        color: 'black',
        fontSize: 20
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
})