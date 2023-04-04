import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { setdata } from '../../redux/actions/User/UserAction';
import { useNavigation } from '@react-navigation/native';
import actions from "../../redux/actions/index";
import { showError, showSuccess } from '../../utils/helperFunction';

const Profile = () => {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false)

    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();
    const data = useSelector((state) => state)
    var AA = data.user.token.token.access
    var userdata = data.user?.userData
    var Data = data?.user?.userData
    // console.log('my data', AA)
    console.log('User Data', userData)

    useEffect(() => {
        // Define the API endpoint URL and your access token
        const apiUrl = 'https://d8b3-103-153-39-9.in.ngrok.io/api/profile/';
        const accessToken = AA;
        // console.log(accessToken)
        // Send a request to the API endpoint
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setUserData([data])) // store data in an array
            .catch = (error) => {
                let err = error.errors.non_field_errors;
                // if (error) {
                showError(err)
                // ||
                showError(error.msg)
                // }
                // ,
                // console.log('erors', error)
            };
    }, []);

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
    // showSuccess('Successfully logged out')

    return (
        <View>
            <Text>User Data:</Text>
            <FlatList
                data={userData}

                // data={userdata}
                renderItem={({ item }) => (
                    <View>
                        <Text style={[styles.txt]}>Name: {item.first_name} {item.last_name}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Gender: {item.gender}</Text>
                        <Text>phone_number: {item.phone_number}</Text>
                    </View>
                )}
            // keyExtractor={(item) => item.id.toString()}
            />
            <ButtonWithLoader
                isLoading={isLoading}
                text="Logout"
                onPress={onLogoutAlert}
            />
            <Button title='Change Password' onPress={() => navigation.navigate('ChangePassword')}></Button>

        </View>
    );
};

export default Profile;
const styles = StyleSheet.create({
    txt: {
        fontsize: 20
    }
})
