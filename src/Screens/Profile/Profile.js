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
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();
    const txt = useSelector((state) => state)
    var token = txt?.user?.token
    const AA = token?.token?.access;
    // const DATA = useSelector((state) => state.user);
    // const Data = DATA.userData
    // console.log('token', AA)
    console.log('user', userData)
    useEffect(() => {
        // Define the API endpoint URL and your access token
        const apiUrl = 'https://a3a5-39-53-111-182.ngrok-free.app/api/profile/';
        const accessToken = AA;
        console.log('token', accessToken)
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
            // .catch = (error) => {
            //     let err = error.errors.non_field_errors;
            //     // if (error) {
            //     showError(err)
            //     // ||
            //     showError(error.msg)
            //     // }
            //     // ,
            //     // console.log('erors', error)
            // };
            .catch(function handleError(error) {
                console.log(error);
                // let err = error.errors.non_field_errors;
                // showError(err);
                showError(error.msg);
            });
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
                data={userData}

                // data={userdata}
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
            // keyExtractor={(item) => item.id.toString()}

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
        // backgroundColor: 'red'
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
        // alignItems: 'center',
        marginHorizontal: '10%',
        // justifyContent: 'center',
    },

    label: {
        marginTop: 20,
        color: 'black',
        fontSize: 20
    },
    // input: {
    //     borderColor: '#ccc',
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     padding: 10,
    //     fontSize: 18,
    // },
    // button: {
    //     marginTop: 20,
    //     backgroundColor: '#1E90FF',
    //     borderRadius: 5,
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    // },
    // buttonText: {
    //     color: '#fff',
    //     fontSize: 18,
    // },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    // changeAvatarButton: {
    //     marginTop: 10,
    // },
    // changeAvatarButtonText: {
    //     color: '#1E90FF',
    //     fontSize: 18,
    // },
})







// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useDispatch, useSelector } from "react-redux";
// import ButtonWithLoader from '../../Components/ButtonWithLoader';
// import { setdata } from '../../redux/actions/UserAction';
// import { useNavigation } from '@react-navigation/native';
// import actions from "../../redux/actions/index";
// import { showError, showSuccess } from '../../utils/helperFunction';

// const Profile = () => {
//     const navigation = useNavigation();
//     const [isLoading, setLoading] = useState(false)
//     const [gender, setgender] = useState('')
//     const [userData, setUserData] = useState([]);
//     const dispatch = useDispatch();
//     const txt = useSelector((state) => state)
//     var token = txt?.user?.token
//     const AA = token?.token?.access;
//     console.log('user', userData)

//     const accessToken = AA;
//     const onProfile = async () => {

//         setLoading({ isLoading: true })

//         try {
//             const res = await actions.profile(
//                 {
//                     'Authorization': `Bearer ${accessToken}`,
//                     'Content-Type': 'multipart/form-data',
//                 }


//             )

//             console.log("res of Changepassword==>>>>>", res)
//             // showMessage("password Change successfully...!!!! Please ReLogin")
//             setLoading({ isLoading: false })
//             // showSuccess(res.msg)
//             // navigation.navigate('MainScreen')
//         }
//         catch (error) {
//             setLoading({ isLoading: false })
//             console.log('Profile Error', error)
//             // let err = error.errors.non_field_errors;
//             // showError(err)
//             // navigation.goBack()
//         }
//     }




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
//     // showSuccess('Successfully logged out')
//     const setImage = () => {
//         if (gender == 'M' || gender == 'Male') {
//             return (
//                 <TouchableOpacity >

//                     <Image
//                         style={styles.avatar}
//                         source={require('../../assets/malegender.jpeg')} />

//                 </TouchableOpacity>

//             )
//         } else if (gender == 'F' || gender == 'Female') {
//             return (
//                 <TouchableOpacity >

//                     <Image
//                         style={styles.avatar}
//                         source={require('../../assets/femalegender.jpeg')} />

//                 </TouchableOpacity>

//             )
//         } else {
//             return (
//                 <TouchableOpacity >

//                     <Image
//                         style={styles.avatar}
//                         source={require('../../assets/nongender.jpeg')} />

//                 </TouchableOpacity>

//             )
//         }


//     }
//     return (



//         <View style={styles.container}>
//             <ButtonWithLoader
//                 isLoading={isLoading}
//                 text="Profile"
//                 onPress={onProfile}
//             />

//             <View style={styles.avatarContainer}>
//                 {setImage()}
//             </View>
//             <Text style={[styles.txt]}></Text>

//             <FlatList
//                 data={userData}

//                 // data={userdata}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Text style={[styles.name]}>{item.first_name} {item.last_name}</Text>
//                         <Text style={[styles.label]}>Email: </Text>

//                         <Text style={[styles.txt]}> {item.email}</Text>
//                         <Text style={[styles.label]}>Gender: </Text>
//                         {setgender(item.gender)}
//                         <Text style={[styles.txt]}> {item.gender} </Text>
//                         <Text style={[styles.label]}>Phone Number:</Text>

//                         <Text style={[styles.txt]}>{item.phone_number}</Text>
//                     </View>
//                 )}
//             // keyExtractor={(item) => item.id.toString()}

//             />
//             <View style={[styles.btns]}>
//                 <ButtonWithLoader
//                     isLoading={isLoading}
//                     text="Logout"
//                     onPress={onLogoutAlert}
//                 />
//                 <ButtonWithLoader
//                     isLoading={isLoading}
//                     text="Change Password"
//                     onPress={() => navigation.navigate('ChangePassword')}
//                 />
//             </View>

//         </View>

//     );
// };

// export default Profile;
// const styles = StyleSheet.create({
//     name: {
//         fontSize: 30,
//         textAlign: 'center',
//         marginTop: 0,
//         color: 'blue'

//     },
//     txt: {
//         fontSize: 20,
//         color: 'green',
//         textAlign: 'center',
//         // backgroundColor: 'red'
//     },
//     btns: {
//         flex: 0,
//         flexDirection: 'row',
//         justifyContent: 'space-between',

//         alignItems: 'baseline'

//     },
//     container: {
//         flex: 1,
//         height: '90%',
//         // alignItems: 'center',
//         marginHorizontal: '10%',
//         // justifyContent: 'center',
//     },

//     label: {
//         marginTop: 20,
//         color: 'black',
//         fontSize: 20
//     },
//     // input: {
//     //     borderColor: '#ccc',
//     //     borderWidth: 1,
//     //     borderRadius: 5,
//     //     padding: 10,
//     //     fontSize: 18,
//     // },
//     // button: {
//     //     marginTop: 20,
//     //     backgroundColor: '#1E90FF',
//     //     borderRadius: 5,
//     //     paddingVertical: 10,
//     //     paddingHorizontal: 20,
//     // },
//     // buttonText: {
//     //     color: '#fff',
//     //     fontSize: 18,
//     // },
//     avatarContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//     },
//     // changeAvatarButton: {
//     //     marginTop: 10,
//     // },
//     // changeAvatarButtonText: {
//     //     color: '#1E90FF',
//     //     fontSize: 18,
//     // },
// })


