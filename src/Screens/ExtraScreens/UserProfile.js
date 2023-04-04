// import React, { Component, useState } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Button } from 'react-native-elements';
// import { useSelector, useDispatch } from 'react-redux';
// import ButtonWithLoader from '../../Components/ButtonWithLoader';
// import actions from '../../redux/actions';
// import { useNavigation } from '@react-navigation/native';
// const Profile = () => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state)
//     var AA = data.user.token
//     const userData = useSelector((state) => state.auth.userData)
//     console.log("user data in profile screen", userData)
//     const [isLoading, setLoading] = useState(false)

//     const onLogoutAlert = () => {
//         Alert.alert(
//             'Logout',
//             'Are you sure, yout want to logout from this device',
//             [{ text: 'Yes', onPress: logout }, { text: 'No', }],
//             { cancelable: true }
//         )
//     }
//     const logout = () => {
//         setLoading(true)
//         setTimeout(() => {
//             actions.logout()
//             setLoading(false)
//         }, 2000);

//     }
//     return (
//         <View style={styles.container}>
//             <Text>Name:{userData.first_name} {userData.last_name}</Text>
//             <Text>Gendar:{userData.Gendar}</Text>
//             <Text>Phone  Number:{userData.Gendar}</Text>
//             <Text>Email Adress:{userData.email}</Text>

//             <Text style={{ marginBottom: 16 }}>{userData.email}</Text>
//             <ButtonWithLoader
//                 isLoading={isLoading}
//                 text="Logout"
//                 onPress={onLogoutAlert}
//             />
//             <Button title='Change Password' onPress={() => navigation.navigate('ChangePassword')}></Button>

//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
// });

// //make this component available to the app
// export default Profile;




// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, Alert } from 'react-native';
// import { useDispatch, useSelector } from "react-redux";
// import ButtonWithLoader from '../../Components/ButtonWithLoader';
// import { setdata } from '../../redux/actions/User/UserAction';
// import { useNavigation } from '@react-navigation/native';

// const Profile = () => {
//     const navigation = useNavigation();
//     const [isLoading, setLoading] = useState(false)

//     const [userData, setUserData] = useState([]);
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state)
//     var AA = data.user.token.token
//     var userdata = data.user.userData


//     useEffect(() => {
//         // Define the API endpoint URL and your access token
//         const apiUrl = 'https://d8b3-103-153-39-9.in.ngrok.io/api/profile/';
//         const accessToken = AA;
//         console.log(accessToken)
//         // Send a request to the API endpoint
//         fetch(apiUrl, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => response.json())
//             .then(data => setUserData(data))
//             .catch(error => console.log(error));
//     }, []);

//     const logout = () => {
//         setLoading(true)
//         setTimeout(() => {
//             actions.logout()
//             setLoading(false)
//         }, 2000);

//     }
//     const onLogoutAlert = () => {
//         Alert.alert(
//             'Logout',
//             'Are you sure, yout want to logout from this device',
//             [{ text: 'Yes', onPress: logout }, { text: 'No', }],
//             { cancelable: true }
//         )
//     }

//     return (
//         <View>
//             <Text>User Data:</Text>
//             <FlatList
//                 data={userData}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Text>Name: {item.first_name}{item.last_name}</Text>
//                         <Text>Email: {item.email}</Text>
//                         <Text>Gendar: {item.gendar}</Text>
//                         <Text>phone_number: {item.phone_number}</Text>
//                     </View>
//                 )}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//             <ButtonWithLoader
//                 isLoading={isLoading}
//                 text="Logout"
//                 onPress={onLogoutAlert}
//             />
//             <Button title='Change Password' onPress={() => navigation.navigate('ChangePassword')}></Button>

//         </View>
//     );
// };

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, Alert } from 'react-native';
// import { useDispatch, useSelector } from "react-redux";
// import ButtonWithLoader from '../../Components/ButtonWithLoader';
// import { setdata } from '../../redux/actions/User/UserAction';
// import { useNavigation } from '@react-navigation/native';

// const Profile = () => {
//     const navigation = useNavigation();
//     const [isLoading, setLoading] = useState(false)

//     const [userData, setUserData] = useState([]);
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state)
//     var AA = data.user.token.token
//     var userdata = data.user.userData


//     useEffect(() => {
//         // Define the API endpoint URL and your access token
//         const apiUrl = 'https://d8b3-103-153-39-9.in.ngrok.io/api/profile/';
//         const accessToken = AA;
//         console.log(accessToken)
//         // Send a request to the API endpoint
//         fetch(apiUrl, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => response.json())
//             .then(data => setUserData([data])) // store data in an array
//             .catch(error => console.log(error));
//     }, []);

//     const logout = () => {
//         setLoading(true)
//         setTimeout(() => {
//             actions.logout()
//             setLoading(false)
//         }, 2000);

//     }
//     const onLogoutAlert = () => {
//         Alert.alert(
//             'Logout',
//             'Are you sure, yout want to logout from this device',
//             [{ text: 'Yes', onPress: logout }, { text: 'No', }],
//             { cancelable: true }
//         )
//     }

//     return (
//         <View>
//             <Text>User Data:</Text>
//             <FlatList
//                 data={userData}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Text>Name: {item.first_name} {item.last_name}</Text>
//                         <Text>Email: {item.email}</Text>
//                         <Text>Gendar: {item.gendar}</Text>
//                         <Text>phone_number: {item.phone_number}</Text>
//                     </View>
//                 )}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//             <ButtonWithLoader
//                 isLoading={isLoading}
//                 text="Logout"
//                 onPress={onLogoutAlert}
//             />
//             <Button title='Change Password' onPress={() => navigation.navigate('ChangePassword')}></Button>

//         </View>
//     );
// };

// export default Profile;